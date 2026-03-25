/**
 * AI Learning Gems — Browser-based Chat (Direct OpenRouter API)
 *
 * SINGLE SOURCE OF TRUTH for all chatbot JavaScript.
 *
 * Do NOT edit chat-script-loader.html directly — it is auto-generated.
 * After editing this file, run:  ./scripts/build-chat.sh
 * That script wraps this JS in <script> tags with CDN deps (marked + DOMPurify)
 * to produce chat-script-loader.html, which Quarto inlines into every page.
 *
 * SECURITY MODEL:
 * - V1: CDN scripts (marked.js, DOMPurify) pinned with SRI hashes
 * - V2: All LLM output sanitized via DOMPurify.sanitize(marked.parse(...))
 * - V4: API key auto-expires after 24h of inactivity
 * - V5: CSP meta tag restricts connect-src to openrouter.ai only
 */
// Run immediately if DOM is already loaded (dynamic script injection),
// otherwise wait for DOMContentLoaded (inline script).
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChat);
} else {
    initChat();
}

function initChat() {
    const sidebar = document.getElementById("gemini-chat-sidebar");
    const fab = document.getElementById("gemini-chat-fab");
    const closeBtn = document.getElementById("close-chat-btn");
    const askAiBtn = document.getElementById("ask-ai-btn");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const messagesContainer = document.getElementById("chat-messages");
    const selectionIndicator = document.getElementById("current-selection-indicator");
    const selectionPreview = selectionIndicator ? selectionIndicator.querySelector(".selection-preview") : null;
    const clearSelectionBtn = document.getElementById("clear-selection-btn");
    const modelSelect = document.getElementById("chat-model-select");
    const apiKeyInput = document.getElementById("chat-api-key-input");
    const apiKeySaveBtn = document.getElementById("chat-api-key-save");
    const apiKeyStatus = document.getElementById("chat-api-key-status");
    const clearChatBtn = document.getElementById("clear-chat-btn");

    const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";
    const STORAGE_KEY_API = "openrouter_api_key";
    const STORAGE_KEY_MODELS_CACHE = "openrouter_free_models";
    const STORAGE_KEY_MODELS_TS = "openrouter_free_models_ts";
    const MODELS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
    const STORAGE_KEY_SELECTED_MODEL = "openrouter_selected_model";
    const STORAGE_KEY_LAST_ACTIVITY = "openrouter_last_activity";
    const KEY_EXPIRY_MS = 24 * 60 * 60 * 1000;
    const STORAGE_KEY_CHAT_MESSAGES = "chat_messages_" + window.location.pathname;

    const SYSTEM_PROMPT =
        "You are a helpful and knowledgeable AI teaching assistant for a textbook. " +
        "You are provided with the text content of the current chapter. " +
        "Answer the user's question based on this content. " +
        "Use markdown formatting in your responses.";

    let currentSelection = "";
    let lastContentSelection = "";
    let conversationHistory = [];
    let contextInitialized = false;
    let currentStreamController = null;
    let editingState = null; // { wrapper, previousInput } when editing a message

    // V2 FIX: All markdown→HTML goes through DOMPurify
    function safeParse(markdownText) {
        return DOMPurify.sanitize(marked.parse(markdownText));
    }

    function formatModelName(modelId) {
        if (!modelId) return "";
        // Normalize: strip :free suffix and date stamps for matching
        const normalized = modelId.replace(/:free$/, "").replace(/-\d{8,}$/, "");
        const cachedJson = localStorage.getItem(STORAGE_KEY_MODELS_CACHE);
        if (cachedJson) {
            try {
                const models = JSON.parse(cachedJson);
                // Exact match first
                const exact = models.find(m => m.id === modelId);
                if (exact && exact.name) return exact.name.replace(/\s*\(free\)\s*$/i, "");
                // Fuzzy: match by normalized ID (handles date-stamped variants)
                const fuzzy = models.find(m => m.id.replace(/:free$/, "").replace(/-\d{8,}$/, "") === normalized);
                if (fuzzy && fuzzy.name) return fuzzy.name.replace(/\s*\(free\)\s*$/i, "");
                // Prefix: match provider/base (e.g. "minimax/minimax-m2.5" matches "minimax/minimax-m2.5:free")
                const prefix = models.find(m => m.id.startsWith(normalized));
                if (prefix && prefix.name) return prefix.name.replace(/\s*\(free\)\s*$/i, "");
            } catch (e) { }
        }
        // Fallback: clean up the raw ID and title-case it
        let name = modelId;
        name = name.replace(/:free$/, "");
        name = name.replace(/^[^/]+\//, "");
        name = name.replace(/-\d{8,}$/, "");
        name = name.replace(/-/g, " ");
        name = name.replace(/\b\w/g, c => c.toUpperCase());
        return name;
    }

    if (!sidebar || !fab) {
        console.error("Chatbot elements not found.");
        return;
    }

    closeSidebar();

    // ── Chat Persistence ──────────────────────────────────────────────────
    // Messages are stored per-page in localStorage keyed by pathname.
    // Each entry is {role, html, modelLabel?} for display reconstruction.

    function saveChatMessages() {
        var msgs = [];
        messagesContainer.querySelectorAll(".message-wrapper, .message:not(.system):not(.message-wrapper .message), .message-model-label:not(.message-wrapper .message-model-label)").forEach(function (el) {
            if (el.classList.contains("message-wrapper")) {
                var label = el.querySelector(".message-model-label");
                var msg = el.querySelector(".message");
                if (msg) {
                    msgs.push({
                        type: "wrapped",
                        role: msg.classList.contains("user") ? "user" : "assistant",
                        html: msg.innerHTML,
                        raw: msg.getAttribute("data-raw") || "",
                        label: label ? label.textContent : ""
                    });
                }
            } else if (el.classList.contains("message-model-label")) {
                msgs.push({ type: "label", text: el.textContent });
            } else if (el.classList.contains("message")) {
                msgs.push({
                    type: "msg",
                    role: el.classList.contains("user") ? "user" : "assistant",
                    html: el.innerHTML
                });
            }
        });
        localStorage.setItem(STORAGE_KEY_CHAT_MESSAGES, JSON.stringify(msgs));
    }

    function restoreChatMessages() {
        var json = localStorage.getItem(STORAGE_KEY_CHAT_MESSAGES);
        if (!json) return;
        try {
            var msgs = JSON.parse(json);
            var pendingLabel = "";
            for (var i = 0; i < msgs.length; i++) {
                var entry = msgs[i];
                if (entry.type === "label") {
                    pendingLabel = entry.text;
                    continue;
                }
                var label = entry.label || pendingLabel;
                var role = entry.role || "assistant";
                var html = entry.html || "";
                var raw = entry.raw || "";
                pendingLabel = "";

                var wrapper = document.createElement("div");
                wrapper.classList.add("message-wrapper");
                if (label) {
                    var lbl = document.createElement("div");
                    lbl.classList.add("message-model-label");
                    lbl.textContent = label;
                    wrapper.appendChild(lbl);
                }
                var div = document.createElement("div");
                div.classList.add("message", role);
                div.innerHTML = DOMPurify.sanitize(html);
                if (raw) div.setAttribute("data-raw", raw);
                wrapper.appendChild(div);

                var btnRow = document.createElement("div");
                btnRow.classList.add("message-btn-row");
                if (role === "user") btnRow.appendChild(createEditButton(wrapper, raw));
                btnRow.appendChild(createCopyButton(div));
                wrapper.appendChild(btnRow);

                messagesContainer.appendChild(wrapper);
            }
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (e) { }
    }

    function clearChat() {
        if (currentStreamController) {
            currentStreamController.abort();
            currentStreamController = null;
        }
        var children = Array.from(messagesContainer.children);
        children.forEach(function (el) {
            if (!el.classList.contains("system")) el.remove();
        });
        conversationHistory = [];
        contextInitialized = false;
        localStorage.removeItem(STORAGE_KEY_CHAT_MESSAGES);
    }

    restoreChatMessages();

    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", clearChat);
    }

    // V4 FIX: Check key expiry on load
    const savedKey = localStorage.getItem(STORAGE_KEY_API);
    const lastActivity = parseInt(localStorage.getItem(STORAGE_KEY_LAST_ACTIVITY) || "0", 10);
    if (savedKey && (Date.now() - lastActivity < KEY_EXPIRY_MS)) {
        updateApiKeyUI(true);
        loadFreeModels(savedKey);
    } else if (savedKey) {
        clearStoredKey();
        updateApiKeyUI(false);
    } else {
        updateApiKeyUI(false);
    }

    function getApiKey() {
        return localStorage.getItem(STORAGE_KEY_API) || "";
    }

    function touchActivity() {
        localStorage.setItem(STORAGE_KEY_LAST_ACTIVITY, String(Date.now()));
    }

    function clearStoredKey() {
        localStorage.removeItem(STORAGE_KEY_API);
        localStorage.removeItem(STORAGE_KEY_LAST_ACTIVITY);
        localStorage.removeItem(STORAGE_KEY_MODELS_CACHE);
        localStorage.removeItem(STORAGE_KEY_MODELS_TS);
    }

    function updateApiKeyUI(hasKey) {
        if (!apiKeyStatus) return;
        if (hasKey) {
            apiKeyStatus.textContent = "Saved locally";
            apiKeyStatus.className = "api-key-status connected";
            if (apiKeyInput) apiKeyInput.placeholder = "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022  (stored in your browser)";
            if (apiKeyInput) apiKeyInput.value = "";
            if (apiKeySaveBtn) apiKeySaveBtn.textContent = "Clear";
        } else {
            apiKeyStatus.textContent = "No key";
            apiKeyStatus.className = "api-key-status disconnected";
            if (apiKeyInput) apiKeyInput.placeholder = "Paste your OpenRouter key...";
            if (apiKeySaveBtn) apiKeySaveBtn.textContent = "Save";
        }
    }

    if (apiKeySaveBtn) {
        apiKeySaveBtn.addEventListener("click", () => {
            const existing = localStorage.getItem(STORAGE_KEY_API);
            if (existing) {
                clearStoredKey();
                updateApiKeyUI(false);
                resetModelSelect();
            } else {
                const key = apiKeyInput ? apiKeyInput.value.trim() : "";
                if (key.length < 10) return;
                localStorage.setItem(STORAGE_KEY_API, key);
                touchActivity();
                updateApiKeyUI(true);
                loadFreeModels(key);
            }
        });
    }

    if (apiKeyInput) {
        apiKeyInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (apiKeySaveBtn) apiKeySaveBtn.click();
            }
        });
    }

    function resetModelSelect() {
        if (!modelSelect) return;
        modelSelect.innerHTML = "";
        const opt = document.createElement("option");
        opt.value = "openrouter/free";
        opt.textContent = "Auto (Best Free Model)";
        modelSelect.appendChild(opt);
    }

    async function loadFreeModels(apiKey) {
        if (!modelSelect) return;
        const cachedJson = localStorage.getItem(STORAGE_KEY_MODELS_CACHE);
        const cachedTs = parseInt(localStorage.getItem(STORAGE_KEY_MODELS_TS) || "0", 10);
        if (cachedJson && (Date.now() - cachedTs < MODELS_CACHE_TTL_MS)) {
            populateModelSelect(JSON.parse(cachedJson));
            return;
        }
        try {
            const resp = await fetch(OPENROUTER_MODELS_URL, {
                headers: { "Authorization": "Bearer " + apiKey }
            });
            if (!resp.ok) return;
            const data = await resp.json();
            const freeModels = data.data
                .filter(m => m.pricing && m.pricing.prompt === "0" && m.pricing.completion === "0")
                .filter(m => (m.context_length || 0) >= 128000)
                .sort((a, b) => (b.context_length || 0) - (a.context_length || 0))
                .map(m => ({ id: m.id, name: m.name, ctx: m.context_length }));
            localStorage.setItem(STORAGE_KEY_MODELS_CACHE, JSON.stringify(freeModels));
            localStorage.setItem(STORAGE_KEY_MODELS_TS, String(Date.now()));
            populateModelSelect(freeModels);
        } catch (err) {
            console.warn("Failed to fetch models:", err);
        }
    }

    function populateModelSelect(freeModels) {
        if (!modelSelect) return;
        modelSelect.innerHTML = "";
        const autoOpt = document.createElement("option");
        autoOpt.value = "openrouter/free";
        autoOpt.textContent = "Auto (Best Free Model)";
        modelSelect.appendChild(autoOpt);
        for (const m of freeModels) {
            if (m.id === "openrouter/free") continue;
            const opt = document.createElement("option");
            opt.value = m.id;
            const ctxLabel = m.ctx ? " (" + Math.round(m.ctx / 1000) + "K)" : "";
            opt.textContent = m.name + ctxLabel;
            modelSelect.appendChild(opt);
        }
        // Restore saved model choice if it's still in the list
        var saved = localStorage.getItem(STORAGE_KEY_SELECTED_MODEL);
        if (saved && modelSelect.querySelector('option[value="' + CSS.escape(saved) + '"]')) {
            modelSelect.value = saved;
        }
    }

    if (modelSelect) {
        modelSelect.addEventListener("change", function () {
            localStorage.setItem(STORAGE_KEY_SELECTED_MODEL, modelSelect.value);
        });
    }

    if (fab) fab.addEventListener("click", openSidebar);
    if (closeBtn) closeBtn.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !sidebar.classList.contains("hidden")) closeSidebar();
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "l") {
            e.preventDefault();
            captureSelection();
            openSidebar();
            if (chatInput) chatInput.focus();
        }
    });

    function openSidebar() {
        sidebar.classList.remove("hidden");
        document.body.classList.remove("chat-closed");
        document.body.classList.add("chat-open");
        setTimeout(() => chatInput && chatInput.focus(), 350);
    }

    function closeSidebar() {
        sidebar.classList.add("hidden");
        document.body.classList.add("chat-closed");
        document.body.classList.remove("chat-open");
    }

    function captureSelection() {
        const sel = window.getSelection();
        const text = sel ? sel.toString().trim() : "";
        let textToUse = "";
        if (text.length > 5 && !sidebar.contains(sel.anchorNode)) textToUse = text;
        else if (lastContentSelection.length > 5) textToUse = lastContentSelection;
        if (textToUse.length > 5) { currentSelection = textToUse; updateSelectionUI(currentSelection); }
    }

    document.addEventListener("selectionchange", () => {
        const sel = window.getSelection();
        if (!sel || sidebar.contains(sel.anchorNode)) return;
        const text = sel.toString().trim();
        if (text.length > 5) lastContentSelection = text;
    });

    document.addEventListener("mouseup", (e) => {
        if (sidebar.contains(e.target) || (fab && fab.contains(e.target)) || (askAiBtn && askAiBtn.contains(e.target))) return;
        const sel = window.getSelection();
        const text = sel ? sel.toString().trim() : "";
        const isSidebarOpen = !sidebar.classList.contains("hidden");
        if (text.length > 5) {
            if (isSidebarOpen) { currentSelection = text; updateSelectionUI(currentSelection); if (askAiBtn) askAiBtn.classList.remove("visible"); }
            else if (askAiBtn) { const range = sel.getRangeAt(0); const rect = range.getBoundingClientRect(); askAiBtn.style.top = rect.top - 10 + "px"; askAiBtn.style.left = (rect.left + rect.width / 2) + "px"; askAiBtn.classList.add("visible"); }
        } else { if (askAiBtn) askAiBtn.classList.remove("visible"); }
    });

    if (askAiBtn) { askAiBtn.addEventListener("click", () => { captureSelection(); openSidebar(); askAiBtn.classList.remove("visible"); if (chatInput) chatInput.focus(); }); }
    if (clearSelectionBtn) { clearSelectionBtn.addEventListener("click", () => { currentSelection = ""; updateSelectionUI(""); }); }
    if (chatInput) { const h = () => captureSelection(); chatInput.addEventListener("mousedown", h); chatInput.addEventListener("touchstart", h); chatInput.addEventListener("focus", h); }

    function updateSelectionUI(text) {
        if (!selectionIndicator || !selectionPreview) return;
        if (text) { selectionIndicator.classList.remove("hidden"); selectionPreview.textContent = text.length > 60 ? text.substring(0, 60) + "\u2026" : text; }
        else { selectionIndicator.classList.add("hidden"); }
    }

    if (sendBtn) sendBtn.addEventListener("click", sendMessage);
    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
        chatInput.addEventListener("input", () => { if (sendBtn) sendBtn.disabled = chatInput.value.trim() === ""; chatInput.style.height = "auto"; chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + "px"; });
    }

    function initConversationIfNeeded() {
        if (contextInitialized) return;
        const contentEl = document.getElementById("quarto-document-content") || document.querySelector("main") || document.body;
        const pageText = contentEl.innerText;
        conversationHistory = [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: "Chapter content:\n\n" + pageText + "\n\n(Please acknowledge this context.)" },
            { role: "assistant", content: "I have received the chapter content and am ready to answer your questions." }
        ];
        contextInitialized = true;
    }

    async function sendMessage() {
        const query = chatInput.value.trim();
        if (!query) return;
        if (editingState) commitEdit();
        const apiKey = getApiKey();
        if (!apiKey) { addMessage("To chat, paste your OpenRouter API key above. It\u2019s free to create one at [openrouter.ai/keys](https://openrouter.ai/keys) \u2014 no credit card required. Your key stays in your browser and is never sent to us.", "assistant"); return; }

        let userText = "";
        if (currentSelection) userText += "I have selected the following text:\n\"" + currentSelection + "\"\n\n";
        userText += query;

        // Display: show selection as blockquote, then question
        var displayText = "";
        if (currentSelection) displayText += "> " + currentSelection.replace(/\n/g, "\n> ") + "\n\n";
        displayText += query;
        addMessage(displayText, "user");
        chatInput.value = ""; chatInput.style.height = "auto"; sendBtn.disabled = true;
        initConversationIfNeeded();
        conversationHistory.push({ role: "user", content: userText });
        currentSelection = ""; updateSelectionUI("");

        const selectedModel = modelSelect ? modelSelect.value : "openrouter/free";

        // Create wrapper upfront so the DOM structure never changes during streaming
        const msgWrapper = document.createElement("div");
        msgWrapper.classList.add("message-wrapper");

        const modelLabel = document.createElement("div");
        modelLabel.classList.add("message-model-label");
        msgWrapper.appendChild(modelLabel);

        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", "assistant");
        msgDiv.textContent = "Thinking\u2026";
        msgWrapper.appendChild(msgDiv);

        messagesContainer.appendChild(msgWrapper);

        if (currentStreamController) currentStreamController.abort();
        currentStreamController = new AbortController();

        try {
            const MAX_RETRIES = 3;
            let attempt = 0;
            let response = null;

            while (attempt < MAX_RETRIES) {
                attempt++;
                try {
                    response = await fetch(OPENROUTER_API_URL, {
                        method: "POST",
                        headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json", "HTTP-Referer": window.location.origin, "X-OpenRouter-Title": "AI Learning Gems Textbook" },
                        body: JSON.stringify({ model: selectedModel, messages: conversationHistory, stream: true }),
                        signal: currentStreamController.signal
                    });
                    if (response.status === 429) {
                        const errBody = await response.text();
                        try {
                            const errJson = JSON.parse(errBody);
                            const rawModel = errJson.error && errJson.error.metadata && errJson.error.metadata.raw;
                            if (rawModel) {
                                const modelMatch = rawModel.match(/^([^\s]+)/);
                                if (modelMatch) modelLabel.textContent = formatModelName(modelMatch[1]);
                            }
                        } catch (e) { }
                        if (attempt < MAX_RETRIES) {
                            msgDiv.textContent = "Model busy, retrying (" + attempt + "/" + MAX_RETRIES + ")\u2026";
                            await new Promise(r => setTimeout(r, 2000 * attempt));
                            continue;
                        }
                        console.error("Chat 429 after " + MAX_RETRIES + " retries:", errBody);
                        throw { name: "RateLimited" };
                    }
                    if (!response.ok) { const errBody = await response.text(); console.error("Chat API error:", response.status, errBody); throw new Error("API error " + response.status + ": " + errBody); }
                    break;
                } catch (fetchErr) {
                    if (fetchErr.name === "AbortError" || fetchErr.name === "RateLimited") throw fetchErr;
                    if (attempt >= MAX_RETRIES) throw fetchErr;
                    msgDiv.textContent = "Retrying (" + attempt + "/" + MAX_RETRIES + ")\u2026";
                    await new Promise(r => setTimeout(r, 2000 * attempt));
                }
            }

            touchActivity();
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            let fullResponse = "";
            let modelIdentified = false;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                while (true) {
                    const lineEnd = buffer.indexOf("\n");
                    if (lineEnd === -1) break;
                    const line = buffer.substring(0, lineEnd).trim();
                    buffer = buffer.substring(lineEnd + 1);
                    if (!line.startsWith("data: ")) continue;
                    const jsonStr = line.substring(6);
                    if (jsonStr === "[DONE]") continue;
                    try {
                        const parsed = JSON.parse(jsonStr);
                        if (!modelIdentified && parsed.model) { modelLabel.textContent = formatModelName(parsed.model); modelIdentified = true; }
                        const delta = parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content;
                        if (delta !== undefined && delta !== null) { fullResponse += delta; msgDiv.innerHTML = safeParse(fullResponse); messagesContainer.scrollTop = messagesContainer.scrollHeight; }
                    } catch (parseErr) {
                        console.warn("SSE parse failed for line:", jsonStr.substring(0, 100));
                    }
                }
            }

            if (fullResponse) { msgDiv.innerHTML = safeParse(fullResponse); conversationHistory.push({ role: "assistant", content: fullResponse }); attachCopyButton(msgDiv); }
            else { msgDiv.textContent = "No response received. The model may be temporarily unavailable."; }
            saveChatMessages();
        } catch (err) {
            if (err.name === "AbortError") return;
            if (err.name === "RateLimited") {
                msgDiv.textContent = "This model is under heavy load right now. Try picking a different one from the dropdown.";
            } else {
                console.error("Chat error:", err);
                msgDiv.textContent = "Something went wrong. Check the browser console for details.";
            }
            saveChatMessages();
        }
        currentStreamController = null;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addMessage(text, role) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("message-wrapper");

        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", role);
        msgDiv.innerHTML = safeParse(text);
        msgDiv.setAttribute("data-raw", text);

        wrapper.appendChild(msgDiv);

        var btnRow = document.createElement("div");
        btnRow.classList.add("message-btn-row");
        if (role === "user") {
            btnRow.appendChild(createEditButton(wrapper, text));
        }
        btnRow.appendChild(createCopyButton(msgDiv));
        wrapper.appendChild(btnRow);

        messagesContainer.appendChild(wrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function createCopyButton(msgDiv) {
        var copyBtn = document.createElement("button");
        copyBtn.classList.add("message-action-btn", "message-copy-btn");
        copyBtn.setAttribute("aria-label", "Copy message");
        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(msgDiv.innerText).then(function () {
                copyBtn.classList.add("copied");
                setTimeout(function () { copyBtn.classList.remove("copied"); }, 1500);
            });
        });
        return copyBtn;
    }

    function createEditButton(userWrapper, rawText) {
        var editBtn = document.createElement("button");
        editBtn.classList.add("message-action-btn", "message-edit-btn");
        editBtn.setAttribute("aria-label", "Edit message");
        editBtn.addEventListener("click", function () {
            if (editingState && editingState.wrapper === userWrapper) {
                // Cancel edit: restore previous input and exit edit mode
                chatInput.value = editingState.previousInput;
                chatInput.style.height = "auto";
                if (sendBtn) sendBtn.disabled = chatInput.value.trim() === "";
                editBtn.classList.remove("cancel-mode");
                editBtn.setAttribute("aria-label", "Edit message");
                editingState = null;
                return;
            }

            // Enter edit mode: save current input, load message text, swap icon
            // Cancel any other active edit first
            if (editingState) {
                var prevBtn = editingState.wrapper.querySelector(".message-edit-btn");
                if (prevBtn) { prevBtn.classList.remove("cancel-mode"); prevBtn.setAttribute("aria-label", "Edit message"); }
                chatInput.value = editingState.previousInput;
            }

            editingState = { wrapper: userWrapper, previousInput: chatInput.value };
            var msgEl = userWrapper.querySelector(".message.user");
            var raw = (msgEl && msgEl.getAttribute("data-raw")) || rawText || (msgEl && msgEl.innerText) || "";
            chatInput.value = raw;
            chatInput.style.height = "auto";
            chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + "px";
            if (sendBtn) sendBtn.disabled = false;
            editBtn.classList.add("cancel-mode");
            editBtn.setAttribute("aria-label", "Cancel edit");
            chatInput.focus();
        });
        return editBtn;
    }

    function commitEdit() {
        if (!editingState) return;
        var userWrapper = editingState.wrapper;
        // Count how many user messages exist from this one onward (inclusive)
        var allWrappers = Array.from(messagesContainer.children).filter(function (el) { return !el.classList.contains("system"); });
        var idx = allWrappers.indexOf(userWrapper);
        var userMsgCount = 0;
        if (idx >= 0) {
            for (var i = idx; i < allWrappers.length; i++) {
                if (allWrappers[i].querySelector && allWrappers[i].querySelector(".message.user")) userMsgCount++;
            }
            // Remove this message + everything after it from DOM
            for (var i = allWrappers.length - 1; i >= idx; i--) {
                allWrappers[i].remove();
            }
        }
        // Pop that many user+assistant pairs from conversation history
        var popped = 0;
        while (conversationHistory.length > 0 && popped < userMsgCount) {
            var last = conversationHistory.pop();
            if (last.role === "user") popped++;
        }
        editingState = null;
    }

    function attachCopyButton(msgDiv) {
        var wrapper = msgDiv.closest(".message-wrapper");
        if (!wrapper) return;
        var btnRow = document.createElement("div");
        btnRow.classList.add("message-btn-row");
        btnRow.appendChild(createCopyButton(msgDiv));
        wrapper.appendChild(btnRow);
    }
}

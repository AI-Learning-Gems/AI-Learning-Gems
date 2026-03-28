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
    const clearChatBtn = document.getElementById("clear-chat-btn");

    // Auth UI elements
    const authSection = document.getElementById("chat-auth-section");
    const authOptions = document.getElementById("chat-auth-options");
    const authConnected = document.getElementById("chat-auth-connected");
    const oauthBtn = document.getElementById("chat-oauth-btn");
    const apiKeyInput = document.getElementById("chat-api-key-input");
    const apiKeySaveBtn = document.getElementById("chat-api-key-save");
    const apiKeyStatus = document.getElementById("chat-api-key-status");
    const authMethodLabel = document.getElementById("chat-auth-method-label");
    const authClearBtn = document.getElementById("chat-auth-clear");
    const customModelRow = document.getElementById("custom-model-input-row");
    const customModelInput = document.getElementById("custom-model-input");
    const customModelConfirm = document.getElementById("custom-model-confirm");
    const customModelCancel = document.getElementById("custom-model-cancel");
    const CUSTOM_SENTINEL = "__custom__";

    const MATH_MODELS = [
        { id: "deepseek/deepseek-v3.2-speciale", name: "DeepSeek V3.2 Speciale" },
        { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
        { id: "anthropic/claude-opus-4.6", name: "Claude Opus 4.6" },
        { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" }
    ];

    const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";
    const STORAGE_KEY_API = "openrouter_api_key";
    const STORAGE_KEY_MODELS_CACHE = "openrouter_free_models";
    const STORAGE_KEY_MODELS_TS = "openrouter_free_models_ts";
    const MODELS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
    const STORAGE_KEY_SELECTED_MODEL = "openrouter_selected_model";
    const STORAGE_KEY_CUSTOM_MODEL = "openrouter_custom_model";
    const STORAGE_KEY_LAST_ACTIVITY = "openrouter_last_activity";
    const KEY_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;
    const STORAGE_KEY_CHAT_MESSAGES = "chat_messages_" + window.location.pathname;
    const STORAGE_KEY_AUTH_METHOD = "openrouter_auth_method"; // "key" or "oauth"
    const STORAGE_KEY_PKCE_VERIFIER = "openrouter_pkce_verifier";
    const STORAGE_KEY_CONTENT_HASH = "chat_content_hash_" + window.location.pathname;
    const OPENROUTER_AUTH_URL = "https://openrouter.ai/auth";

    const SYSTEM_PROMPT = [
        "# ROLE",
        "You are a learning coach for a textbook chapter. The full chapter text is appended below.",
        "Your job is to help the user deeply understand and permanently retain the chapter's content.",
        "You are NOT a search engine. You are NOT a Q&A bot. You are a Socratic tutor that makes the",
        "user think, recall, and articulate — because research shows that is how durable learning happens.",
        "",
        "# HOW YOU OPERATE — THREE GEARS",
        "",
        "You silently shift between three gears based on the user's behavior.",
        "The user never selects a gear. You infer it from their messages.",
        "",
        "## GEAR 1 — SOCRATIC (default, ~70% of turns)",
        "Ask ONE question at a time. Wait for the user's answer. Never dump multiple questions.",
        "Your question should require the user to RETRIEVE or GENERATE knowledge, not just recognize it.",
        "",
        "When to use Gear 1:",
        "- The user opens the chat and says hi, or mentions a topic → ask what they think they know about it",
        "- The user asks 'what is X?' or 'how does X work?' → do NOT answer directly. Ask: 'Before I explain,",
        "  what's your current understanding of X?' or 'What do you think X does and why?'",
        "- The user gives a correct answer → push deeper: 'Right. Now WHY is that the case?' or 'What would",
        "  break if that assumption didn't hold?'",
        "- The user gives a partially correct answer → affirm the correct part, then ask a targeted follow-up",
        "  about the incorrect or missing part: 'You're right that [X]. But what about [Y]?'",
        "- The user says 'quiz me' or 'test me' → generate a question from the chapter. Start with a",
        "  concept-level question, then increase difficulty if they answer correctly. Always ask them to",
        "  EXPLAIN their reasoning after answering, even if correct.",
        "",
        "## GEAR 2 — GUIDED EXPLANATION (when the user is stuck, ~25% of turns)",
        "Give a concise, targeted explanation grounded in the chapter content.",
        "Immediately after the explanation, ask ONE comprehension-check question.",
        "Never stay in Gear 2 for more than one turn — always bounce back to Gear 1.",
        "",
        "When to shift to Gear 2:",
        "- The user says 'I don't know', 'no idea', 'I'm lost', 'I give up', 'just tell me', or 'explain'",
        "- The user gives two consecutive wrong or off-track answers to the same concept",
        "- The user says 'help' or 'hint' → give a hint first (not the full answer). If they ask again, give",
        "  the explanation.",
        "",
        "Format for Gear 2:",
        "1. Start with a brief empathetic acknowledgment: 'No worries, this part trips people up.'",
        "2. Give a focused explanation (3-6 sentences max). Reference the specific part of the chapter.",
        "3. End with a comprehension check: 'To make sure that clicked: [question about what you just explained]'",
        "",
        "## GEAR 3 — DIRECT ANSWER (factual lookup, ~5% of turns)",
        "Answer directly and concisely. Then offer to return to the learning flow.",
        "",
        "When to shift to Gear 3:",
        "- The user asks a factual lookup: 'what's the equation for X?', 'which section covers Y?',",
        "  'what does symbol Z stand for?'",
        "- The user asks about something outside the chapter (general question, off-topic)",
        "- The user pastes an error message or asks about code/tooling",
        "",
        "Format for Gear 3:",
        "1. Answer the question directly.",
        "2. Add: 'Want me to quiz you on this to help it stick?'",
        "",
        "# SCOPE LOCKING",
        "",
        "When the user first engages, establish what section or topic they are working on:",
        "- If they mention a topic → confirm: 'Got it, I\\'m focused on [topic]. Let\\'s make sure this sticks.'",
        "- If they highlighted text before opening chat → the highlighted text appears as a blockquote at the",
        "  start of their message. Use it as the scope: 'I see you\\'re looking at [paraphrase]. Let me check",
        "  your understanding of this.'",
        "- If they say nothing specific → ask: 'What part of the chapter are you working through right now?'",
        "",
        "Once scope is locked, keep ~80% of questions within that section. The other ~20% are interleaved",
        "callbacks to earlier topics (see INTERLEAVING below).",
        "",
        "When the user demonstrates solid understanding (2-3 correct answers with good explanations),",
        "suggest moving on: 'You seem solid on [topic]. Ready to move to [next topic], or should I throw",
        "a few curveball questions first?'",
        "",
        "# INTERLEAVING (after 3-4 exchanges on the current topic)",
        "",
        "Every 3-4 exchanges, insert ONE question from a previously discussed topic or an earlier section",
        "of the chapter. Tell the user why you are doing this:",
        "'Switching topics for a moment — mixing things up helps retention. [question about earlier concept]'",
        "",
        "This is non-negotiable. Even if the user is in the middle of a topic, the interleaving must happen.",
        "It will feel like an interruption. That is the point. After the interleaved question, return to the",
        "current topic.",
        "",
        "# CONFIDENCE CALIBRATION (every 5-6 exchanges)",
        "",
        "Periodically ask: 'Quick confidence check: on a scale of 1-5, how well do you think you understand",
        "[current concept]?'",
        "Then test them on it. If their confidence was high and they get it wrong, note the mismatch gently:",
        "'Interesting — you rated yourself a 4 but stumbled on [specific point]. That\\'s actually normal;",
        "it\\'s called the illusion of knowing. Let\\'s nail this down.'",
        "If their confidence was low and they get it right, boost them: 'You rated yourself a 2, but you",
        "just explained it perfectly. Give yourself more credit.'",
        "",
        "# SUGGESTED NEXT ACTIONS",
        "",
        "At the end of every response in Gear 1 or Gear 2, append 2-3 suggested actions the user can click",
        "or type. Format them as a bulleted list under a bold header. These should be contextually relevant,",
        "not generic.",
        "",
        "Example (after the user correctly explains a concept):",
        "**Try one of these:**",
        "- 'Quiz me on [concept] with a harder question'",
        "- 'How does [concept] connect to [related concept from different section]?'",
        "- 'Walk me through the math behind [equation referenced nearby]'",
        "",
        "Example (after the user gets something wrong):",
        "**Try one of these:**",
        "- 'Explain [concept] to me — I want to understand it'",
        "- 'Give me a simpler example of [concept]'",
        "- 'What\\'s the key difference between [concept A] and [concept B]?'",
        "",
        "Do NOT suggest 'Quiz me' if the user just got something wrong. Suggest explanation or",
        "re-engagement first.",
        "",
        "# TEACH MODE",
        "",
        "If the user says 'let me teach you', 'teach mode', or 'I\\'ll explain it to you':",
        "Pretend you are a smart but confused student who has NOT read the chapter. The user must explain",
        "the concept to you. You ask naive follow-up questions:",
        "- 'Wait, why would that be true?'",
        "- 'But what if [edge case]? Wouldn\\'t that break your explanation?'",
        "- 'I\\'m confused — you said X but earlier you said Y. Which is it?'",
        "",
        "Use the chapter content as your hidden evaluation rubric. When the user\\'s explanation covers the",
        "key points correctly, reveal that you 'understand now' and summarize what they taught you (which",
        "confirms back to them what they got right). If they miss something important, keep asking questions",
        "until they either cover it or give up (at which point, shift to Gear 2).",
        "",
        "# SESSION SUMMARY",
        "",
        "When the user says 'done', 'summary', 'wrap up', or 'how did I do':",
        "Provide a brief session summary:",
        "",
        "**Session Summary:**",
        "- ✅ **Solid:** [concepts the user demonstrated understanding of, with specifics]",
        "- ⚠️ **Needs review:** [concepts the user struggled with or got wrong, with specifics]",
        "- 📖 **Suggested re-reading:** [specific section or paragraph to revisit]",
        "",
        "Then offer: 'Want me to keep quizzing you on the topics you need to review?'",
        "",
        "# FORMATTING RULES",
        "",
        "- Use markdown formatting: **bold** for emphasis, `code` for symbols/equations, > for quotes from",
        "  the chapter.",
        "- Use LaTeX math formatting ($...$ for inline, $$...$$ for block) when showing equations.",
        "- Keep responses SHORT. Gear 1 responses should be 2-5 sentences plus one question. Gear 2",
        "  explanations should be 4-8 sentences plus one question. Gear 3 answers should be 1-3 sentences.",
        "- Never generate walls of text. If an explanation needs to be long, break it into steps and pause",
        "  between steps: 'Here\\'s step 1... Does that make sense before I continue?'",
        "",
        "# OPENING MESSAGE BEHAVIOR",
        "",
        "When the conversation starts (first user message after the chat is opened):",
        "- If the user highlighted text: engage with that text immediately using Gear 1.",
        "- If the user asks a question: respond in the appropriate gear.",
        "- If the user says 'hi', 'hello', or anything vague: respond with:",
        "  'Hey! What part of the chapter are you working through? I can quiz you on it, walk you through",
        "  the tricky parts, or you can try teaching it to me — that\\'s actually the fastest way to find",
        "  gaps in your understanding.'",
        "",
        "# WHAT YOU MUST NEVER DO",
        "",
        "- Never start your response with a long explanation when the user asked a conceptual question.",
        "  Ask them first. The default is ALWAYS Gear 1 unless a Gear 2 or Gear 3 trigger is present.",
        "- Never ask more than one question per response. One question. Wait.",
        "- Never say 'Great question!' or 'That\\'s a great question!' — these are empty filler.",
        "- Never use the phrase 'Let\\'s dive in' or 'Let\\'s explore' — these are AI tells.",
        "- Never refuse to explain when the user explicitly asks for an explanation. Gear 2 always honors",
        "  a direct request. The Socratic approach is the default, not a prison.",
        "- Never lecture. If you catch yourself writing more than 6 sentences without asking a question, stop",
        "  and ask one."
    ].join("\n");

    let currentSelection = "";
    let lastContentSelection = "";
    let conversationHistory = [];
    let contextInitialized = false;
    let currentStreamController = null;
    let editingState = null; // { wrapper, previousInput } when editing a message
    let chatGeneration = 0; // incremented on clearChat to invalidate stale saves

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

    function quickHash(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash.toString(36);
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
        chatGeneration++;
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
    rebuildConversationHistory();

    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", clearChat);
    }

    function rebuildConversationHistory() {
        var wrappers = messagesContainer.querySelectorAll(".message-wrapper");
        if (wrappers.length === 0) return;
        initConversationIfNeeded();
        wrappers.forEach(function (w) {
            var msg = w.querySelector(".message");
            if (!msg) return;
            var raw = msg.getAttribute("data-raw") || msg.innerText || "";
            if (!raw) return;
            var role = msg.classList.contains("user") ? "user" : "assistant";
            conversationHistory.push({ role: role, content: raw });
        });
    }

    // ── PKCE Helpers ────────────────────────────────────────────────────
    function generateCodeVerifier() {
        var array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return btoa(String.fromCharCode.apply(null, array))
            .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    async function generateCodeChallenge(verifier) {
        var encoder = new TextEncoder();
        var data = encoder.encode(verifier);
        var hash = await crypto.subtle.digest("SHA-256", data);
        return btoa(String.fromCharCode.apply(null, new Uint8Array(hash)))
            .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    // ── Auth State Management ────────────────────────────────────────────
    // V4 FIX: Check key expiry on load
    var savedKey = localStorage.getItem(STORAGE_KEY_API);
    var lastActivity = parseInt(localStorage.getItem(STORAGE_KEY_LAST_ACTIVITY) || "0", 10);
    if (savedKey && (Date.now() - lastActivity < KEY_EXPIRY_MS)) {
        showConnectedUI();
        loadFreeModels(savedKey);
    } else if (savedKey) {
        clearStoredAuth();
        showAuthOptions();
    } else {
        showAuthOptions();
    }

    // Handle OAuth callback: check URL for ?code= parameter
    handleOAuthCallback();

    function getApiKey() {
        return localStorage.getItem(STORAGE_KEY_API) || "";
    }

    function touchActivity() {
        localStorage.setItem(STORAGE_KEY_LAST_ACTIVITY, String(Date.now()));
    }

    function clearStoredAuth() {
        localStorage.removeItem(STORAGE_KEY_API);
        localStorage.removeItem(STORAGE_KEY_AUTH_METHOD);
        localStorage.removeItem(STORAGE_KEY_LAST_ACTIVITY);
        localStorage.removeItem(STORAGE_KEY_MODELS_CACHE);
        localStorage.removeItem(STORAGE_KEY_MODELS_TS);
        sessionStorage.removeItem(STORAGE_KEY_PKCE_VERIFIER);
    }

    function showAuthOptions() {
        if (authOptions) authOptions.style.display = "";
        if (authConnected) authConnected.style.display = "none";
    }

    function showConnectedUI() {
        if (authOptions) authOptions.style.display = "none";
        if (authConnected) authConnected.style.display = "";
        var method = localStorage.getItem(STORAGE_KEY_AUTH_METHOD) || "key";
        if (apiKeyStatus) {
            apiKeyStatus.textContent = "Connected";
            apiKeyStatus.className = "api-key-status connected";
        }
        if (authMethodLabel) {
            authMethodLabel.textContent = method === "oauth" ? "via OpenRouter login" : "via API key";
        }
    }

    // ── OAuth PKCE Flow ──────────────────────────────────────────────────
    if (oauthBtn) {
        oauthBtn.addEventListener("click", async function () {
            var verifier = generateCodeVerifier();
            sessionStorage.setItem(STORAGE_KEY_PKCE_VERIFIER, verifier);
            var challenge = await generateCodeChallenge(verifier);
            var callbackUrl = window.location.origin + window.location.pathname;
            var authUrl = OPENROUTER_AUTH_URL +
                "?callback_url=" + encodeURIComponent(callbackUrl) +
                "&code_challenge=" + encodeURIComponent(challenge) +
                "&code_challenge_method=S256";
            window.location.href = authUrl;
        });
    }

    async function handleOAuthCallback() {
        var params = new URLSearchParams(window.location.search);
        var code = params.get("code");
        if (!code) return;

        // Clean the URL immediately so the code isn't visible/reusable
        var cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);

        var verifier = sessionStorage.getItem(STORAGE_KEY_PKCE_VERIFIER);
        if (!verifier) {
            console.warn("OAuth callback received but no PKCE verifier found in session.");
            return;
        }
        sessionStorage.removeItem(STORAGE_KEY_PKCE_VERIFIER);

        try {
            var resp = await fetch("https://openrouter.ai/api/v1/auth/keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: code,
                    code_verifier: verifier,
                    code_challenge_method: "S256"
                })
            });

            if (!resp.ok) {
                var errText = await resp.text();
                console.error("OAuth key exchange failed:", resp.status, errText);
                showAuthOptions();
                addMessage("OpenRouter sign-in failed (error " + resp.status + "). You can try again or paste your API key directly.", "assistant");
                return;
            }

            var data = await resp.json();
            var key = data.key;
            if (!key) {
                console.error("OAuth response missing key:", data);
                showAuthOptions();
                addMessage("OpenRouter sign-in failed (no key in response). You can try again or paste your API key directly.", "assistant");
                return;
            }

            localStorage.setItem(STORAGE_KEY_API, key);
            localStorage.setItem(STORAGE_KEY_AUTH_METHOD, "oauth");
            touchActivity();
            showConnectedUI();
            loadFreeModels(key);
        } catch (err) {
            console.error("OAuth key exchange error:", err);
            showAuthOptions();
            addMessage("OpenRouter sign-in failed (" + err.message + "). You can try again or paste your API key directly.", "assistant");
        }
    }

    // ── Direct Key Entry ─────────────────────────────────────────────────
    if (apiKeySaveBtn) {
        apiKeySaveBtn.addEventListener("click", function () {
            var key = apiKeyInput ? apiKeyInput.value.trim() : "";
            if (key.length < 10) return;
            localStorage.setItem(STORAGE_KEY_API, key);
            localStorage.setItem(STORAGE_KEY_AUTH_METHOD, "key");
            touchActivity();
            if (apiKeyInput) apiKeyInput.value = "";
            showConnectedUI();
            loadFreeModels(key);
        });
    }

    if (apiKeyInput) {
        apiKeyInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                if (apiKeySaveBtn) apiKeySaveBtn.click();
            }
        });
    }

    // ── Disconnect (Clear) ───────────────────────────────────────────────
    if (authClearBtn) {
        authClearBtn.addEventListener("click", function () {
            clearStoredAuth();
            showAuthOptions();
            resetModelSelect();
        });
    }

    function resetModelSelect() {
        if (!modelSelect) return;
        modelSelect.innerHTML = "";
        var opt = document.createElement("option");
        opt.value = "openrouter/free";
        opt.textContent = "Auto (Best Free Model)";
        modelSelect.appendChild(opt);
        appendMathModels();
        appendCustomSentinel();
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
        var autoOpt = document.createElement("option");
        autoOpt.value = "openrouter/free";
        autoOpt.textContent = "Auto (Best Free Model)";
        modelSelect.appendChild(autoOpt);
        for (var i = 0; i < freeModels.length; i++) {
            var m = freeModels[i];
            if (m.id === "openrouter/free") continue;
            var opt = document.createElement("option");
            opt.value = m.id;
            var ctxLabel = m.ctx ? " (" + Math.round(m.ctx / 1000) + "K)" : "";
            opt.textContent = m.name + ctxLabel;
            modelSelect.appendChild(opt);
        }
        // Restore saved custom model if present
        var savedCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_MODEL);
        if (savedCustom) insertCustomModelOption(savedCustom);
        appendMathModels();
        appendCustomSentinel();
        // Restore saved model choice if it's still in the list
        var saved = localStorage.getItem(STORAGE_KEY_SELECTED_MODEL);
        if (saved && modelSelect.querySelector('option[value="' + CSS.escape(saved) + '"]')) {
            modelSelect.value = saved;
        }
    }

    function appendMathModels() {
        if (!modelSelect) return;
        var sep = document.createElement("option");
        sep.disabled = true;
        sep.textContent = "\u2500\u2500\u2500 Math models \u2500\u2500\u2500";
        modelSelect.appendChild(sep);
        for (var i = 0; i < MATH_MODELS.length; i++) {
            var m = MATH_MODELS[i];
            var opt = document.createElement("option");
            opt.value = m.id;
            opt.setAttribute("data-math", "true");
            opt.textContent = "" + m.name;
            modelSelect.appendChild(opt);
        }
    }

    function appendCustomSentinel() {
        if (!modelSelect) return;
        var existing = modelSelect.querySelector('option[value="' + CUSTOM_SENTINEL + '"]');
        if (existing) return;
        var sep = document.createElement("option");
        sep.disabled = true;
        sep.textContent = "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500";
        modelSelect.appendChild(sep);
        var opt = document.createElement("option");
        opt.value = CUSTOM_SENTINEL;
        opt.textContent = "Custom model\u2026";
        modelSelect.appendChild(opt);
    }

    function insertCustomModelOption(modelId) {
        if (!modelSelect) return;
        var prev = modelSelect.querySelector('option[data-custom="true"]');
        if (prev) prev.remove();
        var opt = document.createElement("option");
        opt.value = modelId;
        opt.setAttribute("data-custom", "true");
        opt.textContent = "\u2605 " + formatModelName(modelId);
        var sentinel = modelSelect.querySelector('option[value="' + CUSTOM_SENTINEL + '"]');
        if (sentinel) {
            modelSelect.insertBefore(opt, sentinel);
        } else {
            modelSelect.appendChild(opt);
        }
    }

    if (modelSelect) {
        modelSelect.addEventListener("change", function () {
            if (modelSelect.value === CUSTOM_SENTINEL) {
                showCustomModelInput();
                return;
            }
            localStorage.setItem(STORAGE_KEY_SELECTED_MODEL, modelSelect.value);
        });
    }

    function showCustomModelInput() {
        if (!customModelRow || !customModelInput) return;
        customModelRow.style.display = "";
        var existing = localStorage.getItem(STORAGE_KEY_CUSTOM_MODEL);
        customModelInput.value = existing || "";
        customModelInput.focus();
        // Revert dropdown to the previously selected model (don't leave it on the sentinel)
        var saved = localStorage.getItem(STORAGE_KEY_SELECTED_MODEL);
        if (saved && modelSelect.querySelector('option[value="' + CSS.escape(saved) + '"]')) {
            modelSelect.value = saved;
        } else {
            modelSelect.value = "openrouter/free";
        }
    }

    function hideCustomModelInput() {
        if (customModelRow) customModelRow.style.display = "none";
        if (customModelInput) customModelInput.value = "";
    }

    function confirmCustomModel() {
        var modelId = customModelInput ? customModelInput.value.trim() : "";
        if (!modelId) return;
        // Normalize: strip leading/trailing whitespace, ensure no spaces
        modelId = modelId.replace(/\s+/g, "");
        localStorage.setItem(STORAGE_KEY_CUSTOM_MODEL, modelId);
        insertCustomModelOption(modelId);
        modelSelect.value = modelId;
        localStorage.setItem(STORAGE_KEY_SELECTED_MODEL, modelId);
        hideCustomModelInput();
    }

    if (customModelConfirm) {
        customModelConfirm.addEventListener("click", confirmCustomModel);
    }
    if (customModelCancel) {
        customModelCancel.addEventListener("click", hideCustomModelInput);
    }
    if (customModelInput) {
        customModelInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") { e.preventDefault(); confirmCustomModel(); }
            if (e.key === "Escape") { e.preventDefault(); hideCustomModelInput(); }
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

    // Detect touch device (iPad reports as Macintosh since iPadOS 13)
    var isTouchDevice = ('ontouchend' in document) || (navigator.maxTouchPoints > 0);
    var selectionEndTimer = null;

    // On touch devices, add popup-side class for right-side positioning
    if (isTouchDevice && askAiBtn) {
        askAiBtn.classList.add("popup-side");
    }

    function positionAskAiPopup(rect) {
        if (!askAiBtn) return;
        var sel = window.getSelection();
        if (sel && !sel.isCollapsed) {
            try { window.__savedSelectionRange = sel.getRangeAt(0).cloneRange(); } catch (e) { }
        }
        if (isTouchDevice) {
            askAiBtn.style.left = rect.right + "px";
            askAiBtn.style.top = (rect.top + rect.height / 2) + "px";
        } else {
            askAiBtn.style.top = rect.top - 10 + "px";
            askAiBtn.style.left = (rect.left + rect.width / 2) + "px";
        }
        askAiBtn.classList.add("visible");
    }

    document.addEventListener("mouseup", (e) => {
        if (sidebar.contains(e.target) || (fab && fab.contains(e.target)) || (askAiBtn && askAiBtn.contains(e.target))) return;
        const sel = window.getSelection();
        const text = sel ? sel.toString().trim() : "";
        const isSidebarOpen = !sidebar.classList.contains("hidden");
        if (text.length > 5) {
            if (isSidebarOpen) { currentSelection = text; updateSelectionUI(currentSelection); if (askAiBtn) askAiBtn.classList.remove("visible"); }
            else if (askAiBtn) { const range = sel.getRangeAt(0); const rect = range.getBoundingClientRect(); positionAskAiPopup(rect); }
        } else { if (askAiBtn) askAiBtn.classList.remove("visible"); }
    });

    // Touch device: show Ask AI popup via debounced selectionchange (mouseup doesn't fire)
    if (isTouchDevice) {
        document.addEventListener("selectionchange", function () {
            if (selectionEndTimer) clearTimeout(selectionEndTimer);
            selectionEndTimer = setTimeout(function () {
                var sel = window.getSelection();
                if (!sel || sel.isCollapsed) return;
                if (sidebar.contains(sel.anchorNode)) return;
                var text = sel.toString().trim();
                if (text.length <= 5) return;
                var isSidebarOpen = !sidebar.classList.contains("hidden");
                if (isSidebarOpen) {
                    currentSelection = text;
                    updateSelectionUI(currentSelection);
                    return;
                }
                if (document.body.classList.contains("highlighter-active") || document.body.classList.contains("highlighter-eraser")) return;
                if (askAiBtn) {
                    try {
                        var range = sel.getRangeAt(0);
                        var rect = range.getBoundingClientRect();
                        if (rect.width === 0 && rect.height === 0) return;
                        positionAskAiPopup(rect);
                    } catch (e) { }
                }
            }, 600);
        });
    }

    var askAiAction = document.getElementById("ask-ai-action");
    if (askAiAction) { askAiAction.addEventListener("click", (e) => { e.stopPropagation(); captureSelection(); openSidebar(); if (askAiBtn) askAiBtn.classList.remove("visible"); if (chatInput) chatInput.focus(); }); }
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
        var contentEl = document.getElementById("quarto-document-content") || document.querySelector("main") || document.body;
        var clone = contentEl.cloneNode(true);
        var chatInClone = clone.querySelector("#gemini-chat-container");
        if (chatInClone) chatInClone.remove();
        var pageText = clone.textContent.replace(/\s+/g, " ").trim();

        localStorage.setItem(STORAGE_KEY_CONTENT_HASH, quickHash(pageText));

        conversationHistory = [
            {
                role: "system",
                content: [
                    { type: "text", text: SYSTEM_PROMPT },
                    {
                        type: "text",
                        text: "---\n\nCHAPTER CONTENT (use this as your knowledge base for all questions):\n\n" + pageText,
                        cache_control: { type: "ephemeral", ttl: "1h" }
                    }
                ]
            }
        ];
        contextInitialized = true;
    }

    async function sendMessage() {
        const query = chatInput.value.trim();
        if (!query) return;
        if (editingState) commitEdit();
        var sendGeneration = chatGeneration;
        const apiKey = getApiKey();
        if (!apiKey) { addMessage("To chat, sign in with OpenRouter (one click) or paste your API key above. It\u2019s free at [openrouter.ai/keys](https://openrouter.ai/keys) \u2014 no credit card required.", "assistant"); return; }

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
        msgDiv.innerHTML = "<em>Planning next move\u2026</em>";
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
                        headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json", "HTTP-Referer": window.location.origin, "X-OpenRouter-Title": "AI Learning Gems - Learning Coach" },
                        body: JSON.stringify({
                            model: selectedModel,
                            messages: conversationHistory,
                            stream: true,
                            cache_control: { type: "ephemeral", ttl: "1h" }
                        }),
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

            if (fullResponse) { msgDiv.innerHTML = safeParse(fullResponse); msgDiv.setAttribute("data-raw", fullResponse); conversationHistory.push({ role: "assistant", content: fullResponse }); attachCopyButton(msgDiv); }
            else { msgDiv.textContent = "No response received. The model may be temporarily unavailable."; }
            if (sendGeneration === chatGeneration) saveChatMessages();
        } catch (err) {
            if (err.name === "AbortError") return;
            if (err.name === "RateLimited") {
                msgDiv.textContent = "This model is under heavy load right now. Try picking a different one from the dropdown.";
            } else {
                console.error("Chat error:", err);
                msgDiv.textContent = "Something went wrong. Check the browser console for details.";
            }
            if (sendGeneration === chatGeneration) saveChatMessages();
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

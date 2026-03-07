document.addEventListener("DOMContentLoaded", () => {
    // --- Elements ---
    const sidebar = document.getElementById("gemini-chat-sidebar");
    const fab = document.getElementById("gemini-chat-fab");
    const closeBtn = document.getElementById("close-chat-btn");
    const askAiBtn = document.getElementById("ask-ai-btn");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const messagesContainer = document.getElementById("chat-messages");
    const selectionIndicator = document.getElementById("current-selection-indicator");
    const selectionPreview = selectionIndicator.querySelector(".selection-preview");
    const clearSelectionBtn = document.getElementById("clear-selection-btn");
    const modelSelect = document.getElementById("chat-model-select");

    // --- State ---
    let currentSelection = "";
    // Configuration: API endpoint (assumes local proxy is running)
    const API_URL = "http://127.0.0.1:8000/chat";

    // --- Initialization ---
    // --- Initialization ---
    // Default to OPEN on large screens, CLOSED on small
    if (window.innerWidth > 1000) {
        openSidebar();
    } else {
        closeSidebar();
    }

    // --- Event Listeners ---

    // 1. Toggle Sidebar
    fab.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);

    function openSidebar() {
        sidebar.classList.remove("hidden");
        document.body.classList.remove("chat-closed");
        document.body.classList.add("chat-open");
    }

    function closeSidebar() {
        sidebar.classList.add("hidden");
        document.body.classList.add("chat-closed");
        document.body.classList.remove("chat-open");
    }

    // --- NEW: Global Shortcut (Cmd+Shift+L / Ctrl+Shift+L) ---
    const captureSelection = () => {
        const current = window.getSelection();
        const currentText = current.toString().trim();

        let textToUse = "";

        // 1. Is the current selection valid and NOT inside the sidebar?
        if (currentText.length > 5 && !sidebar.contains(current.anchorNode)) {
            textToUse = currentText;
        }
        // 2. Fallback: Use the last known valid content selection
        else if (lastContentSelection.length > 5) {
            textToUse = lastContentSelection;
        }

        if (textToUse.length > 5) {
            currentSelection = textToUse;
            updateSelectionUI(currentSelection);
        }
    };

    document.addEventListener("keydown", (e) => {
        // Cmd+Shift+L or Ctrl+Shift+L
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "l") {
            e.preventDefault();
            captureSelection();
            openSidebar();
            chatInput.focus();
        }
    });

    // --- REFINED: Selection Handling ---
    let lastContentSelection = "";

    // Continuous tracking of selection in the main document
    document.addEventListener("selectionchange", () => {
        const selection = window.getSelection();
        // Ensure selection is not inside the sidebar (e.g. typing in chat)
        if (sidebar.contains(selection.anchorNode)) return;

        const text = selection.toString().trim();
        if (text.length > 5) {
            lastContentSelection = text;

            // Re-trigger visual indicator (Ask AI button) logic?
            // Optional: We can keep the mouseup logic JUST for positioning the button.
        }
    });

    document.addEventListener("mouseup", (e) => {
        // Ignore clicks inside the chat UI
        if (sidebar.contains(e.target) || fab.contains(e.target)) return;

        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (text.length > 5) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            askAiBtn.style.top = `${rect.top + window.scrollY - 10}px`;
            askAiBtn.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
            askAiBtn.classList.add("visible");
        } else {
            // Only hide if we aren't clicking the button itself
            askAiBtn.classList.remove("visible");
        }
    });

    // Capture on interaction - MULTIPLE triggers to ensure we catch it before it clears
    const handleInputInteraction = () => {
        captureSelection();
    };

    // 'mousedown' fires before 'focus' and before the browser clears the selection
    chatInput.addEventListener("mousedown", handleInputInteraction);
    // 'touchstart' for mobile support
    chatInput.addEventListener("touchstart", handleInputInteraction);
    // 'focus' as a backup
    chatInput.addEventListener("focus", handleInputInteraction);

    // "Ask AI" Button Click
    askAiBtn.addEventListener("click", () => {
        captureSelection();
        openSidebar();
        askAiBtn.classList.remove("visible");
        chatInput.focus();
    });

    // Clear Selection
    clearSelectionBtn.addEventListener("click", () => {
        currentSelection = "";
        updateSelectionUI("");
    });

    function updateSelectionUI(text) {
        if (text) {
            selectionIndicator.classList.remove("hidden");
            selectionPreview.textContent = text.length > 60 ? text.substring(0, 60) + "..." : text;
        } else {
            selectionIndicator.classList.add("hidden");
        }
    }

    // 5. Send Message
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    chatInput.addEventListener("input", () => {
        sendBtn.disabled = chatInput.value.trim() === "";
    });

    // --- Functions ---

    async function sendMessage() {
        const query = chatInput.value.trim();
        if (!query) return;

        // UI Updates
        addMessage(query, "user");
        chatInput.value = "";
        sendBtn.disabled = true;

        // Show loading state
        const loadingId = addMessage("Thinking", "assistant", true);

        // Prepare Payload
        // Get entire page content as HTML to preserve structure (tables, code blocks)
        const contentEl = document.getElementById("quarto-document-content") || document.querySelector("main") || document.body;
        const pageContext = contentEl.innerHTML;

        // Get selected model
        const selectedModel = modelSelect.value;

        const payload = {
            query: query,
            selection: currentSelection,
            context: pageContext,
            url: window.location.href,
            model: selectedModel
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("API request failed");
            }

            const data = await response.json();

            // Remove loading message
            removeMessage(loadingId);

            // Add AI response
            addMessage(data.response, "assistant");

        } catch (error) {
            console.error(error);
            removeMessage(loadingId);
            addMessage("Error: Could not connect to the local chat server. Is `python scripts/chat_server.py` running?", "assistant");
        }

    }

    function addMessage(text, role, isLoading = false) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", role);
        if (isLoading) msgDiv.id = `msg-${Date.now()}`;

        if (role === "assistant" && !isLoading) {
            // Render Markdown
            msgDiv.innerHTML = marked.parse(text);
        } else {
            msgDiv.textContent = text;
        }

        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return msgDiv.id;
    }

    function removeMessage(id) {
        if (!id) return;
        const el = document.getElementById(id);
        if (el) el.remove();
    }
});

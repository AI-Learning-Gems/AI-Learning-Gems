/**
 * AI Learning Gems — Text Highlighter Extension
 *
 * SINGLE SOURCE OF TRUTH for highlighter JavaScript.
 *
 * Uses web-highlighter (alienzhou) for Selection API capture,
 * DOM-independent serialization, and restoration.
 * Persists highlights to localStorage keyed by page pathname.
 *
 * Architecture mirrors the chatbot extension:
 * - include-after.html provides the DOM (toolbar UI + FAB)
 * - highlighter.css provides the styles
 * - highlighter-loader.html loads the CDN dependency + this script
 */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHighlighter);
} else {
    initHighlighter();
}

function initHighlighter() {
    if (typeof Highlighter === "undefined") {
        console.warn("web-highlighter library not loaded; highlighter extension disabled.");
        return;
    }

    var fab = document.getElementById("highlighter-fab");
    var toolbar = document.getElementById("highlighter-toolbar");
    var closeBtn = document.getElementById("hl-close-btn");
    var eraserBtn = document.getElementById("hl-eraser-btn");
    var clearAllBtn = document.getElementById("hl-clear-all-btn");
    var clearConfirmRow = document.getElementById("hl-clear-confirm-row");
    var clearConfirmBtn = document.getElementById("hl-clear-confirm");
    var clearCancelBtn = document.getElementById("hl-clear-cancel");
    var countLabel = document.getElementById("hl-count");
    var colorSwatches = document.querySelectorAll(".hl-color-swatch");
    var hlPopup = document.getElementById("hl-popup");
    var hlPopupAsk = document.getElementById("hl-popup-ask");
    var hlPopupErase = document.getElementById("hl-popup-erase");

    if (!fab || !toolbar) {
        console.error("Highlighter DOM elements not found.");
        return;
    }

    var STORAGE_KEY = "highlights_" + window.location.pathname;
    var STORAGE_KEY_COLOR = "highlighter_active_color";
    var activeColor = localStorage.getItem(STORAGE_KEY_COLOR) || "hl-yellow";
    var isActive = false;
    var isEraser = false;
    var highlighter = null;
    var popupHighlightId = null;

    var COLOR_ACCENTS = {
        "hl-yellow": "#eab308", "hl-green": "#22c55e", "hl-coral": "#ef4444",
        "hl-blue": "#3b82f6", "hl-peach": "#f59e0b", "hl-gold": "#b45309",
        "hl-emerald": "#15803d", "hl-crimson": "#b91c1c", "hl-sky": "#1d4ed8",
        "hl-amber": "#c2410c", "hl-lavender": "#8b5cf6", "hl-lime": "#84cc16",
        "hl-silver": "#94a3b8", "hl-teal": "#14b8a6", "hl-fuchsia": "#c026d3"
    };

    // ── Initialize web-highlighter ──────────────────────────────────

    var contentRoot = document.getElementById("quarto-document-content")
        || document.querySelector("main")
        || document.documentElement;

    highlighter = new Highlighter({
        $root: contentRoot,
        exceptSelectors: [
            "#highlighter-container",
            "#gemini-chat-container",
            "#gemini-chat-sidebar",
            "pre",
            "code",
            "nav",
            "header",
            "footer",
            ".quarto-title-meta",
            ".sidebar",
            "#quarto-sidebar",
            "#TOC"
        ],
        style: {
            className: "highlight-mengshou-wrap"
        }
    });

    // ── Event: highlight created ────────────────────────────────────

    highlighter.on(Highlighter.event.CREATE, function (data) {
        if (!data || !data.sources) return;
        var stored = getAllStoredSources();
        var sources = data.sources;
        for (var i = 0; i < sources.length; i++) {
            var src = sources[i];
            highlighter.addClass(activeColor, src.id);
            stored.push({
                id: src.id,
                startMeta: src.startMeta,
                endMeta: src.endMeta,
                text: src.text,
                color: activeColor
            });
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        updateCount();
    });

    // ── Event: highlight removed ────────────────────────────────────

    highlighter.on(Highlighter.event.REMOVE, function (data) {
        if (!data || !data.ids) return;
        var stored = getAllStoredSources();
        var removedIds = data.ids;
        var filtered = stored.filter(function (entry) {
            return removedIds.indexOf(entry.id) === -1;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        updateCount();
    });

    // ── Event: click on highlight ─────────────────────────────────
    // Uses direct DOM delegation instead of web-highlighter's CLICK
    // event, which only fires when .run() is active.

    contentRoot.addEventListener("click", function (e) {
        var wrapNode = e.target.closest(".highlight-mengshou-wrap");
        if (!wrapNode) return;

        var id = highlighter.getIdByDom(wrapNode);
        if (!id) return;

        if (isEraser) {
            highlighter.remove(id);
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        popupHighlightId = id;
        var rect = wrapNode.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var topY = rect.top;

        if (hlPopup) {
            hlPopup.style.left = centerX + "px";
            hlPopup.style.top = topY + "px";
            hlPopup.classList.add("visible");
        }
    });

    // ── Popup: Ask AI ───────────────────────────────────────────

    if (hlPopupAsk) {
        hlPopupAsk.addEventListener("click", function (e) {
            e.stopPropagation();
            var idToUse = popupHighlightId;
            hidePopup();
            if (!idToUse) return;

            var doms = highlighter.getDoms(idToUse);
            if (!doms || doms.length === 0) return;

            var text = "";
            for (var i = 0; i < doms.length; i++) {
                text += doms[i].textContent;
            }
            text = text.trim();
            if (text.length === 0) return;

            var sel = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(doms[0]);
            if (doms.length > 1) {
                var lastDom = doms[doms.length - 1];
                range.setEnd(lastDom, lastDom.childNodes.length || lastDom.textContent.length);
            }
            sel.removeAllRanges();
            sel.addRange(range);

            var chatFab = document.getElementById("gemini-chat-fab");
            if (chatFab) {
                setTimeout(function () { chatFab.click(); }, 80);
            }
        });
    }

    // ── Popup: Erase ────────────────────────────────────────────

    if (hlPopupErase) {
        hlPopupErase.addEventListener("click", function (e) {
            e.stopPropagation();
            var idToRemove = popupHighlightId;
            hidePopup();
            if (idToRemove) {
                highlighter.remove(idToRemove);
            }
        });
    }

    // ── Hide popup on click elsewhere ───────────────────────────

    document.addEventListener("mousedown", function (e) {
        if (hlPopup && hlPopup.classList.contains("visible")) {
            if (!hlPopup.contains(e.target) && !e.target.closest(".highlight-mengshou-wrap")) {
                hidePopup();
            }
        }
    });

    function hidePopup() {
        if (hlPopup) hlPopup.classList.remove("visible");
        popupHighlightId = null;
    }

    // ── Restore saved highlights ────────────────────────────────────

    restoreHighlights();

    // ── FAB click: toggle toolbar ───────────────────────────────────

    fab.addEventListener("click", function () {
        if (toolbar.classList.contains("hidden")) {
            openToolbar();
        } else {
            closeToolbar();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeToolbar);
    }

    // ── Color swatches ──────────────────────────────────────────────

    colorSwatches.forEach(function (swatch) {
        swatch.addEventListener("click", function () {
            activeColor = swatch.getAttribute("data-color");
            localStorage.setItem(STORAGE_KEY_COLOR, activeColor);
            colorSwatches.forEach(function (s) { s.classList.remove("active"); });
            swatch.classList.add("active");
            setEraserMode(false);
            updateHighlightButtonColor();
        });
    });

    // ── Eraser toggle ───────────────────────────────────────────────

    if (eraserBtn) {
        eraserBtn.addEventListener("click", function () {
            setEraserMode(!isEraser);
        });
    }

    // ── Clear all (with confirm/cancel) ───────────────────────────

    function showClearConfirm() {
        if (clearAllBtn) clearAllBtn.style.display = "none";
        if (eraserBtn) eraserBtn.style.visibility = "hidden";
        if (clearConfirmRow) clearConfirmRow.style.display = "";
    }

    function hideClearConfirm() {
        if (clearConfirmRow) clearConfirmRow.style.display = "none";
        if (clearAllBtn) clearAllBtn.style.display = "";
        if (eraserBtn) eraserBtn.style.visibility = "";
    }

    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", showClearConfirm);
    }

    if (clearConfirmBtn) {
        clearConfirmBtn.addEventListener("click", function () {
            highlighter.removeAll();
            localStorage.removeItem(STORAGE_KEY);
            updateCount();
            hideClearConfirm();
        });
    }

    if (clearCancelBtn) {
        clearCancelBtn.addEventListener("click", hideClearConfirm);
    }

    // ── Keyboard shortcut: Escape closes toolbar ────────────────────

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            hidePopup();
            if (isActive) closeToolbar();
        }
    });

    // ── Helper functions ────────────────────────────────────────────

    function openToolbar() {
        toolbar.classList.remove("hidden");
        fab.classList.add("active");
        isActive = true;
        document.body.classList.add("highlighter-active");
        highlighter.run();
        updateCount();
    }

    function closeToolbar() {
        toolbar.classList.add("hidden");
        fab.classList.remove("active");
        isActive = false;
        isEraser = false;
        document.body.classList.remove("highlighter-active");
        document.body.classList.remove("highlighter-eraser");
        if (eraserBtn) eraserBtn.classList.remove("active");
        hideClearConfirm();
        highlighter.stop();
    }

    function setEraserMode(on) {
        isEraser = on;
        if (on) {
            document.body.classList.add("highlighter-eraser");
            document.body.classList.remove("highlighter-active");
            if (eraserBtn) eraserBtn.classList.add("active");
            highlighter.stop();
        } else {
            document.body.classList.remove("highlighter-eraser");
            document.body.classList.add("highlighter-active");
            if (eraserBtn) eraserBtn.classList.remove("active");
            highlighter.run();
        }
    }

    function getAllStoredSources() {
        var json = localStorage.getItem(STORAGE_KEY);
        if (!json) return [];
        try {
            return JSON.parse(json);
        } catch (e) {
            return [];
        }
    }

    function restoreHighlights() {
        var sources = getAllStoredSources();
        for (var i = 0; i < sources.length; i++) {
            var s = sources[i];
            try {
                highlighter.fromStore(s.startMeta, s.endMeta, s.text, s.id);
                if (s.color) {
                    highlighter.addClass(s.color, s.id);
                }
            } catch (err) {
                console.warn("Failed to restore highlight " + s.id + ":", err);
            }
        }
        updateCount();
    }

    function updateCount() {
        if (!countLabel) return;
        var domNodes = highlighter.getDoms();
        var idSet = {};
        for (var i = 0; i < domNodes.length; i++) {
            var id = highlighter.getIdByDom(domNodes[i]);
            if (id) idSet[id] = true;
        }
        var n = Object.keys(idSet).length;
        countLabel.textContent = n + (n === 1 ? " highlight" : " highlights");
    }

    // ── Persist active color & sync Ask AI popup ─────────────────

    function updateHighlightButtonColor() {
        var accent = COLOR_ACCENTS[activeColor] || "#eab308";
        var hlBtn = document.getElementById("ask-ai-highlight");
        var popup = document.getElementById("ask-ai-btn");
        if (hlBtn) {
            hlBtn.style.color = accent;
        }
        if (popup) {
            popup.style.setProperty("--hl-popup-accent", accent);
            popup.style.setProperty("--hl-popup-accent-glow", accent.replace(")", ", 0.2)").replace("rgb", "rgba").replace("#", ""));
            var r = parseInt(accent.slice(1, 3), 16);
            var g = parseInt(accent.slice(3, 5), 16);
            var b = parseInt(accent.slice(5, 7), 16);
            popup.style.setProperty("--hl-popup-accent", accent);
            popup.style.setProperty("--hl-popup-accent-glow", "rgba(" + r + "," + g + "," + b + ",0.2)");
        }
    }

    function setActiveSwatchFromStorage() {
        var saved = localStorage.getItem(STORAGE_KEY_COLOR);
        if (!saved) return;
        colorSwatches.forEach(function (s) {
            if (s.getAttribute("data-color") === saved) {
                s.classList.add("active");
            } else {
                s.classList.remove("active");
            }
        });
    }

    setActiveSwatchFromStorage();
    updateHighlightButtonColor();

    // ── Ask AI popup "Highlight" button ──────────────────────────

    var askAiHighlightBtn = document.getElementById("ask-ai-highlight");
    if (askAiHighlightBtn) {
        askAiHighlightBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            var askAiPopup = document.getElementById("ask-ai-btn");
            if (askAiPopup) askAiPopup.classList.remove("visible");

            var sel = window.getSelection();
            if (!sel || sel.isCollapsed) return;

            highlighter.run();
            highlighter.fromRange(sel.getRangeAt(0));
            if (!isActive) {
                highlighter.stop();
            }
        });
    }
}

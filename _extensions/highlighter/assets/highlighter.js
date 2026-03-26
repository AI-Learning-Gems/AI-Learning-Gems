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
    var countLabel = document.getElementById("hl-count");
    var colorSwatches = document.querySelectorAll(".hl-color-swatch");

    if (!fab || !toolbar) {
        console.error("Highlighter DOM elements not found.");
        return;
    }

    var STORAGE_KEY = "highlights_" + window.location.pathname;
    var activeColor = "hl-yellow";
    var isActive = false;
    var isEraser = false;
    var highlighter = null;

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

    // ── Event: click on highlight (eraser mode) ─────────────────────

    highlighter.on(Highlighter.event.CLICK, function (data) {
        if (isEraser && data && data.id) {
            highlighter.remove(data.id);
        }
    });

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
            colorSwatches.forEach(function (s) { s.classList.remove("active"); });
            swatch.classList.add("active");
            setEraserMode(false);
        });
    });

    // ── Eraser toggle ───────────────────────────────────────────────

    if (eraserBtn) {
        eraserBtn.addEventListener("click", function () {
            setEraserMode(!isEraser);
        });
    }

    // ── Clear all ───────────────────────────────────────────────────

    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", function () {
            highlighter.removeAll();
            localStorage.removeItem(STORAGE_KEY);
            updateCount();
        });
    }

    // ── Keyboard shortcut: Escape closes toolbar ────────────────────

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isActive) {
            closeToolbar();
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
}

/**
 * exercises.js — Interaction logic for all 4 exercise types + localStorage persistence.
 * Loaded by the exercises Lua filter only on pages that contain exercises.
 */
(function () {
  "use strict";

  // =====================================================================
  // localStorage helpers
  // =====================================================================
  var STORAGE_PREFIX = "exercise-";

  function saveState(id, state) {
    try {
      localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(state));
    } catch (_) { /* quota exceeded or private browsing */ }
  }

  function loadState(id) {
    try {
      var raw = localStorage.getItem(STORAGE_PREFIX + id);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function clearState(id) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + id);
    } catch (_) { /* ignore */ }
  }

  // =====================================================================
  // Shared UI helpers
  // =====================================================================
  function showEl(el) { if (el) el.style.display = ""; }
  function hideEl(el) { if (el) el.style.display = "none"; }

  function showFeedback(container, isCorrect) {
    var correctFb = container.querySelector(".exercise-feedback-correct");
    var incorrectFb = container.querySelector(".exercise-feedback-incorrect");
    if (isCorrect) {
      showEl(correctFb);
      hideEl(incorrectFb);
    } else {
      hideEl(correctFb);
      showEl(incorrectFb);
    }
  }

  function lockOptions(container) {
    container.querySelectorAll(".exercise-option").forEach(function (opt) {
      opt.classList.add("disabled");
    });
  }

  function showReset(container) {
    var resetDiv = container.querySelector(".exercise-reset");
    showEl(resetDiv);
  }

  // =====================================================================
  // 1. MCQ
  // =====================================================================
  function initMCQ(container) {
    var correct = container.getAttribute("data-correct");
    var exerciseId = container.getAttribute("data-exercise-id");
    var options = container.querySelectorAll(".exercise-option");

    function apply(selected) {
      var isCorrect = selected === correct;
      options.forEach(function (opt) {
        var optVal = opt.getAttribute("data-option");
        opt.classList.remove("selected", "correct", "incorrect");
        if (optVal === selected) {
          opt.classList.add("selected", isCorrect ? "correct" : "incorrect");
        }
        if (optVal === correct) {
          opt.classList.add("correct");
        }
      });
      showFeedback(container, isCorrect);
      lockOptions(container);
      showReset(container);
      saveState(exerciseId, { answered: true, selected: selected, correct: isCorrect });
    }

    // Restore saved state
    var saved = loadState(exerciseId);
    if (saved && saved.answered) {
      apply(saved.selected);
    }

    // Click handler
    options.forEach(function (opt) {
      opt.addEventListener("click", function () {
        if (opt.classList.contains("disabled")) return;
        apply(opt.getAttribute("data-option"));
      });
    });

    // Reset handler
    var resetBtn = container.querySelector(".exercise-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        clearState(exerciseId);
        options.forEach(function (opt) {
          opt.classList.remove("selected", "correct", "incorrect", "disabled");
        });
        hideEl(container.querySelector(".exercise-feedback-correct"));
        hideEl(container.querySelector(".exercise-feedback-incorrect"));
        hideEl(container.querySelector(".exercise-reset"));
      });
    }
  }

  // =====================================================================
  // 2. Prediction Prompt
  // =====================================================================
  function initPredict(container) {
    var correct = container.getAttribute("data-correct");
    var exerciseId = container.getAttribute("data-exercise-id");
    var options = container.querySelectorAll(".exercise-option");
    var revealBtn = container.querySelector(".exercise-reveal-btn");
    var revealDiv = container.querySelector(".exercise-predict-reveal");
    var selectedValue = null;

    function selectOption(val) {
      selectedValue = val;
      options.forEach(function (opt) {
        opt.classList.remove("selected");
        if (opt.getAttribute("data-option") === val) {
          opt.classList.add("selected");
        }
      });
      if (revealBtn) revealBtn.disabled = false;
    }

    function reveal() {
      var isCorrect = selectedValue === correct;
      options.forEach(function (opt) {
        var optVal = opt.getAttribute("data-option");
        if (optVal === selectedValue) {
          opt.classList.add(isCorrect ? "correct" : "incorrect");
        }
        if (optVal === correct) {
          opt.classList.add("correct");
        }
      });
      showEl(revealDiv);
      lockOptions(container);
      if (revealBtn) revealBtn.style.display = "none";
      showReset(container);
      saveState(exerciseId, { answered: true, selected: selectedValue, correct: isCorrect });
    }

    // Restore
    var saved = loadState(exerciseId);
    if (saved && saved.answered) {
      selectOption(saved.selected);
      reveal();
    }

    // Click handlers
    options.forEach(function (opt) {
      opt.addEventListener("click", function () {
        if (opt.classList.contains("disabled")) return;
        selectOption(opt.getAttribute("data-option"));
      });
    });

    if (revealBtn) {
      revealBtn.addEventListener("click", function () {
        if (selectedValue) reveal();
      });
    }

    // Reset
    var resetBtn = container.querySelector(".exercise-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        clearState(exerciseId);
        selectedValue = null;
        options.forEach(function (opt) {
          opt.classList.remove("selected", "correct", "incorrect", "disabled");
        });
        hideEl(revealDiv);
        if (revealBtn) {
          revealBtn.style.display = "";
          revealBtn.disabled = true;
        }
        hideEl(container.querySelector(".exercise-reset"));
      });
    }
  }

  // =====================================================================
  // 3. Ordering / Parsons Problem
  // =====================================================================
  function initOrder(container) {
    var correctJson = container.getAttribute("data-correct");
    var correctOrder = JSON.parse(correctJson);
    var exerciseId = container.getAttribute("data-exercise-id");
    var list = container.querySelector(".exercise-order-list");
    var checkBtn = container.querySelector(".exercise-check-btn");
    var feedbackDiv = container.querySelector(".exercise-order-feedback");

    // Shuffle items on first load (if no saved state)
    function shuffleList() {
      var items = Array.from(list.children);
      for (var i = items.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        list.appendChild(items[j]);
        items.splice(j, 1, items[i]);
      }
    }

    function getCurrentOrder() {
      return Array.from(list.querySelectorAll(".exercise-order-item")).map(function (item) {
        return item.getAttribute("data-option");
      });
    }

    function setOrder(order) {
      order.forEach(function (label) {
        var item = list.querySelector('[data-option="' + label + '"]');
        if (item) list.appendChild(item);
      });
    }

    function checkOrder() {
      var current = getCurrentOrder();
      var allCorrect = true;
      var items = list.querySelectorAll(".exercise-order-item");
      items.forEach(function (item, idx) {
        item.classList.remove("correct", "incorrect");
        if (current[idx] === correctOrder[idx]) {
          item.classList.add("correct");
        } else {
          item.classList.add("incorrect");
          allCorrect = false;
        }
      });
      showEl(feedbackDiv);
      if (checkBtn) checkBtn.disabled = true;
      showReset(container);
      saveState(exerciseId, { answered: true, order: current, correct: allCorrect });
    }

    // Init SortableJS
    if (typeof Sortable !== "undefined") {
      Sortable.create(list, {
        animation: 150,
        handle: ".order-handle",
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen"
      });
    }

    // Restore or shuffle
    var saved = loadState(exerciseId);
    if (saved && saved.answered) {
      setOrder(saved.order);
      checkOrder();
    } else {
      shuffleList();
    }

    // Check handler
    if (checkBtn) {
      checkBtn.addEventListener("click", function () {
        if (!checkBtn.disabled) checkOrder();
      });
    }

    // Reset
    var resetBtn = container.querySelector(".exercise-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        clearState(exerciseId);
        var items = list.querySelectorAll(".exercise-order-item");
        items.forEach(function (item) {
          item.classList.remove("correct", "incorrect");
        });
        hideEl(feedbackDiv);
        if (checkBtn) checkBtn.disabled = false;
        hideEl(container.querySelector(".exercise-reset"));
        shuffleList();
      });
    }
  }

  // =====================================================================
  // 4. Fill-in-the-Blank
  // =====================================================================
  function initFillin(container) {
    var correct = container.getAttribute("data-correct");
    var exerciseId = container.getAttribute("data-exercise-id");
    var select = container.querySelector(".fillin-select");
    var checkBtn = container.querySelector(".exercise-check-btn");
    var feedbackDiv = container.querySelector(".exercise-fillin-feedback");

    function check() {
      if (!select) return;
      var val = select.value;
      if (!val) return;
      var isCorrect = val === correct;
      select.classList.remove("correct", "incorrect");
      select.classList.add(isCorrect ? "correct" : "incorrect");
      showEl(feedbackDiv);
      select.disabled = true;
      if (checkBtn) checkBtn.disabled = true;
      showReset(container);
      saveState(exerciseId, { answered: true, selected: val, correct: isCorrect });
    }

    // Restore
    var saved = loadState(exerciseId);
    if (saved && saved.answered) {
      if (select) select.value = saved.selected;
      check();
    }

    // Check handler
    if (checkBtn) {
      checkBtn.addEventListener("click", check);
    }

    // Reset
    var resetBtn = container.querySelector(".exercise-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        clearState(exerciseId);
        if (select) {
          select.value = "";
          select.disabled = false;
          select.classList.remove("correct", "incorrect");
        }
        hideEl(feedbackDiv);
        if (checkBtn) checkBtn.disabled = false;
        hideEl(container.querySelector(".exercise-reset"));
      });
    }
  }

  // =====================================================================
  // Initialize all exercises on page load
  // =====================================================================
  function initAll() {
    document.querySelectorAll(".exercise-mcq").forEach(initMCQ);
    document.querySelectorAll(".exercise-predict").forEach(initPredict);
    document.querySelectorAll(".exercise-order").forEach(initOrder);
    document.querySelectorAll(".exercise-fillin").forEach(initFillin);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();

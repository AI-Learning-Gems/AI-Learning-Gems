-- exercises.lua: Quarto Lua filter for interactive exercises
-- Transforms fenced divs (.exercise-mcq, .exercise-predict, .exercise-order, .exercise-fillin)
-- into interactive HTML widgets with JS/CSS dependency injection.

local has_exercises = false

-- Simple hash function (djb2) for generating exercise IDs from content
local function djb2_hash(str)
  local hash = 5381
  for i = 1, #str do
    hash = ((hash * 33) + string.byte(str, i)) % 2147483647
  end
  return string.format("%x", hash)
end

-- Convert a list of Pandoc inlines to an HTML string
local function inlines_to_html(inlines)
  local doc = pandoc.Pandoc({pandoc.Plain(inlines)})
  return pandoc.write(doc, "html")
end

-- Convert a list of Pandoc blocks to an HTML string
local function blocks_to_html(blocks)
  local doc = pandoc.Pandoc(blocks)
  return pandoc.write(doc, "html")
end

-- Extract plain text from inlines (for hashing)
local function inlines_to_text(inlines)
  return pandoc.utils.stringify(inlines)
end

-- Extract bullet list items from a BulletList block.
-- Returns a list of {label=string, html=string} with auto-assigned labels A, B, C, D...
local function extract_options(bullet_list)
  local options = {}
  local label_code = 65 -- ASCII 'A'
  for _, item in ipairs(bullet_list.content) do
    local html = blocks_to_html(item)
    -- Strip <p> wrappers that pandoc adds for single-block list items
    html = html:gsub("^%s*<p>%s*", ""):gsub("%s*</p>%s*$", "")
    local label = string.char(label_code)
    label_code = label_code + 1
    table.insert(options, {label = label, html = html})
  end
  return options
end

-- Find and remove nested divs with a specific class from a div's content.
-- Returns the extracted blocks and the remaining content.
local function extract_nested_div(div_content, class_name)
  local extracted_blocks = {}
  local remaining = {}
  for _, block in ipairs(div_content) do
    if block.t == "Div" and block.classes:includes(class_name) then
      for _, b in ipairs(block.content) do
        table.insert(extracted_blocks, b)
      end
    else
      table.insert(remaining, block)
    end
  end
  return extracted_blocks, remaining
end

-- Find the first BulletList in a list of blocks
local function find_bullet_list(blocks)
  for i, block in ipairs(blocks) do
    if block.t == "BulletList" then
      return block, i
    end
  end
  return nil, nil
end

-- Find the first OrderedList in a list of blocks
local function find_ordered_list(blocks)
  for i, block in ipairs(blocks) do
    if block.t == "OrderedList" then
      return block, i
    end
  end
  return nil, nil
end

-- Collect all blocks before the first list (stem/question text)
local function collect_stem(blocks, list_index)
  local stem = {}
  for i = 1, list_index - 1 do
    table.insert(stem, blocks[i])
  end
  return stem
end


------------------------------------------------------------------------
-- MCQ Handler
------------------------------------------------------------------------
local function handle_mcq(div)
  local correct = div.attributes["correct"] or ""

  -- Extract feedback divs
  local correct_fb, content1 = extract_nested_div(div.content, "feedback-correct")
  local incorrect_fb, content2 = extract_nested_div(content1, "feedback-incorrect")

  local correct_fb_html = blocks_to_html(correct_fb)
  local incorrect_fb_html = blocks_to_html(incorrect_fb)

  -- Find bullet list (options) in remaining content
  local blist, blist_idx = find_bullet_list(content2)
  if not blist then return nil end

  local stem_blocks = collect_stem(content2, blist_idx)
  local stem_html = blocks_to_html(stem_blocks)
  local options = extract_options(blist)

  local exercise_id = djb2_hash(stem_html .. correct)

  -- Build HTML
  local html_parts = {}
  table.insert(html_parts, string.format(
    '<div class="exercise exercise-mcq" data-exercise-id="%s" data-correct="%s">',
    exercise_id, correct
  ))
  table.insert(html_parts, '<div class="exercise-header"><span class="exercise-icon">&#9997;</span> <span class="exercise-label">Check Your Understanding</span></div>')
  table.insert(html_parts, '<div class="exercise-stem">' .. stem_html .. '</div>')
  table.insert(html_parts, '<div class="exercise-options">')
  for _, opt in ipairs(options) do
    table.insert(html_parts, string.format(
      '<div class="exercise-option" data-option="%s"><span class="option-label">%s</span><span class="option-text">%s</span></div>',
      opt.label, opt.label, opt.html
    ))
  end
  table.insert(html_parts, '</div>')
  table.insert(html_parts, '<div class="exercise-feedback exercise-feedback-correct" style="display:none;">' .. correct_fb_html .. '</div>')
  table.insert(html_parts, '<div class="exercise-feedback exercise-feedback-incorrect" style="display:none;">' .. incorrect_fb_html .. '</div>')
  table.insert(html_parts, '<div class="exercise-reset" style="display:none;"><button class="exercise-reset-btn">Reset</button></div>')
  table.insert(html_parts, '</div>')

  has_exercises = true
  return pandoc.RawBlock("html", table.concat(html_parts, "\n"))
end


------------------------------------------------------------------------
-- Prediction Prompt Handler
------------------------------------------------------------------------
local function handle_predict(div)
  local correct = div.attributes["correct"] or ""

  -- Extract reveal div
  local reveal_blocks, content1 = extract_nested_div(div.content, "predict-reveal")
  local reveal_html = blocks_to_html(reveal_blocks)

  -- Find bullet list
  local blist, blist_idx = find_bullet_list(content1)
  if not blist then return nil end

  local stem_blocks = collect_stem(content1, blist_idx)
  local stem_html = blocks_to_html(stem_blocks)
  local options = extract_options(blist)

  local exercise_id = djb2_hash(stem_html .. correct .. "predict")

  local html_parts = {}
  table.insert(html_parts, string.format(
    '<div class="exercise exercise-predict" data-exercise-id="%s" data-correct="%s">',
    exercise_id, correct
  ))
  table.insert(html_parts, '<div class="exercise-header"><span class="exercise-icon">&#129300;</span> <span class="exercise-label">Make a Prediction</span></div>')
  table.insert(html_parts, '<div class="exercise-stem">' .. stem_html .. '</div>')
  table.insert(html_parts, '<div class="exercise-options">')
  for _, opt in ipairs(options) do
    table.insert(html_parts, string.format(
      '<div class="exercise-option" data-option="%s"><span class="option-label">%s</span><span class="option-text">%s</span></div>',
      opt.label, opt.label, opt.html
    ))
  end
  table.insert(html_parts, '</div>')
  table.insert(html_parts, '<button class="exercise-reveal-btn" disabled>Reveal Answer</button>')
  table.insert(html_parts, '<div class="exercise-feedback exercise-predict-reveal" style="display:none;">' .. reveal_html .. '</div>')
  table.insert(html_parts, '<div class="exercise-reset" style="display:none;"><button class="exercise-reset-btn">Reset</button></div>')
  table.insert(html_parts, '</div>')

  has_exercises = true
  return pandoc.RawBlock("html", table.concat(html_parts, "\n"))
end


------------------------------------------------------------------------
-- Ordering / Parsons Problem Handler
------------------------------------------------------------------------
local function handle_order(div)
  local correct = div.attributes["correct"] or ""

  -- Extract feedback div
  local feedback_blocks, content1 = extract_nested_div(div.content, "order-feedback")
  local feedback_html = blocks_to_html(feedback_blocks)

  -- Find bullet list
  local blist, blist_idx = find_bullet_list(content1)
  if not blist then return nil end

  local stem_blocks = collect_stem(content1, blist_idx)
  local stem_html = blocks_to_html(stem_blocks)
  local options = extract_options(blist)

  local exercise_id = djb2_hash(stem_html .. correct .. "order")

  -- Build JSON array of correct order for JS to check
  local correct_labels = {}
  for lbl in correct:gmatch("[^,]+") do
    table.insert(correct_labels, '"' .. lbl:match("^%s*(.-)%s*$") .. '"')
  end
  local correct_json = "[" .. table.concat(correct_labels, ",") .. "]"

  -- Shuffle options for initial display (deterministic shuffle based on exercise_id)
  -- We provide all options in original order; JS will shuffle on first load
  local html_parts = {}
  table.insert(html_parts, string.format(
    '<div class="exercise exercise-order" data-exercise-id="%s" data-correct=\'%s\'>',
    exercise_id, correct_json
  ))
  table.insert(html_parts, '<div class="exercise-header"><span class="exercise-icon">&#128260;</span> <span class="exercise-label">Put in Order</span></div>')
  table.insert(html_parts, '<div class="exercise-stem">' .. stem_html .. '</div>')
  table.insert(html_parts, '<ul class="exercise-order-list">')
  for _, opt in ipairs(options) do
    table.insert(html_parts, string.format(
      '<li class="exercise-order-item" data-option="%s"><span class="order-handle">&#9776;</span><span class="option-label">%s</span><span class="option-text">%s</span></li>',
      opt.label, opt.label, opt.html
    ))
  end
  table.insert(html_parts, '</ul>')
  table.insert(html_parts, '<button class="exercise-check-btn">Check Order</button>')
  table.insert(html_parts, '<div class="exercise-feedback exercise-order-feedback" style="display:none;">' .. feedback_html .. '</div>')
  table.insert(html_parts, '<div class="exercise-reset" style="display:none;"><button class="exercise-reset-btn">Reset</button></div>')
  table.insert(html_parts, '</div>')

  has_exercises = true
  return pandoc.RawBlock("html", table.concat(html_parts, "\n"))
end


------------------------------------------------------------------------
-- Fill-in-the-Blank Handler
------------------------------------------------------------------------
local function handle_fillin(div)
  -- Extract feedback div
  local feedback_blocks, content1 = extract_nested_div(div.content, "fillin-feedback")
  local feedback_html = blocks_to_html(feedback_blocks)

  -- Find the ordered list (numbered steps)
  local olist, olist_idx = find_ordered_list(content1)
  if not olist then return nil end

  local stem_blocks = collect_stem(content1, olist_idx)
  local stem_html = blocks_to_html(stem_blocks)

  -- Parse the ordered list, looking for the fill-in syntax:
  -- {CORRECT|A: text|B: text|C: text}
  local steps_html = {}
  local correct_answer = ""
  local exercise_text = stem_html

  for _, item in ipairs(olist.content) do
    local item_text = pandoc.utils.stringify(item)
    exercise_text = exercise_text .. item_text

    -- Check if this item contains the fill-in syntax {CORRECT|A: ...|B: ...|C: ...}
    local fillin_match = item_text:match("{([^}]+)}")
    if fillin_match and fillin_match:find("|") then
      -- Parse: first element is correct answer label, rest are options
      local parts = {}
      for part in fillin_match:gmatch("[^|]+") do
        table.insert(parts, part:match("^%s*(.-)%s*$"))
      end
      if #parts >= 2 then
        correct_answer = parts[1]
        local select_html = string.format('<select class="fillin-select" data-correct="%s">', correct_answer)
        select_html = select_html .. '<option value="">-- Select --</option>'
        for i = 2, #parts do
          local opt_label, opt_text = parts[i]:match("^([A-Z]):%s*(.*)")
          if opt_label and opt_text then
            select_html = select_html .. string.format('<option value="%s">%s</option>', opt_label, opt_text)
          else
            select_html = select_html .. string.format('<option value="%s">%s</option>', parts[i], parts[i])
          end
        end
        select_html = select_html .. '</select>'

        -- Build the step with the dropdown replacing the {…} pattern.
        -- Work on plain text: split item_text around the {…} and reassemble with the select.
        local before = item_text:match("^(.-)%s*{")
        local after = item_text:match("}%s*(.-)$")
        if not before then before = "" end
        if not after then after = "" end
        table.insert(steps_html, before .. " " .. select_html .. " " .. after)
      end
    else
      local item_html = blocks_to_html(item)
      item_html = item_html:gsub("<ol[^>]*>", ""):gsub("</ol>", "")
      item_html = item_html:gsub("<li>", ""):gsub("</li>", "")
      item_html = item_html:gsub("<p>", ""):gsub("</p>", "")
      table.insert(steps_html, item_html)
    end
  end

  local exercise_id = djb2_hash(exercise_text .. "fillin")

  local html_parts = {}
  table.insert(html_parts, string.format(
    '<div class="exercise exercise-fillin" data-exercise-id="%s" data-correct="%s">',
    exercise_id, correct_answer
  ))
  table.insert(html_parts, '<div class="exercise-header"><span class="exercise-icon">&#9999;&#65039;</span> <span class="exercise-label">Fill in the Blank</span></div>')
  table.insert(html_parts, '<div class="exercise-stem">' .. stem_html .. '</div>')
  table.insert(html_parts, '<ol class="exercise-steps">')
  for _, step in ipairs(steps_html) do
    table.insert(html_parts, '<li class="exercise-step">' .. step .. '</li>')
  end
  table.insert(html_parts, '</ol>')
  table.insert(html_parts, '<button class="exercise-check-btn">Check Answer</button>')
  table.insert(html_parts, '<div class="exercise-feedback exercise-fillin-feedback" style="display:none;">' .. feedback_html .. '</div>')
  table.insert(html_parts, '<div class="exercise-reset" style="display:none;"><button class="exercise-reset-btn">Reset</button></div>')
  table.insert(html_parts, '</div>')

  has_exercises = true
  return pandoc.RawBlock("html", table.concat(html_parts, "\n"))
end


------------------------------------------------------------------------
-- Main Div filter
------------------------------------------------------------------------
local function process_div(div)
  if div.classes:includes("exercise-mcq") then
    return handle_mcq(div)
  elseif div.classes:includes("exercise-predict") then
    return handle_predict(div)
  elseif div.classes:includes("exercise-order") then
    return handle_order(div)
  elseif div.classes:includes("exercise-fillin") then
    return handle_fillin(div)
  end
  return nil
end


------------------------------------------------------------------------
-- Inject JS/CSS dependencies (only if exercises are present)
------------------------------------------------------------------------
local function inject_dependencies(doc)
  if has_exercises then
    quarto.doc.add_html_dependency({
      name = "exercises",
      version = "1.0.0",
      stylesheets = {"assets/exercises.css"},
      scripts = {"assets/exercises.js"}
    })
    -- SortableJS from CDN for ordering exercises
    quarto.doc.include_text("in-header",
      '<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.6/Sortable.min.js"></script>'
    )
  end
  return doc
end


------------------------------------------------------------------------
-- Return the filter
------------------------------------------------------------------------
return {
  {Div = process_div},
  {Pandoc = inject_dependencies}
}

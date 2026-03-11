# Python Environment

This project uses a **conda environment** named `ai-learning-gems`.

## Terminal Commands

**PREFERRED: Use the full path to the Python executable.** This works reliably in all contexts (interactive shells, IDE subprocesses, subagents, non-interactive scripts):

```bash
$(conda info --base)/envs/ai-learning-gems/bin/python script.py
```

**FALLBACK: If you are in an interactive terminal** where conda has been initialized, you can activate the env:

```bash
conda activate ai-learning-gems
```

**WHY:** `conda activate` requires shell hooks from `conda init` which are loaded by `.zshrc`/`.bashrc`. IDE-spawned subshells (Cursor, Antigravity, Windsurf) often don't source these files, causing `CondaError: Run 'conda init' before 'conda activate'`. The full path approach bypasses this entirely.

## Rules

- **ALWAYS** use `$(conda info --base)/envs/ai-learning-gems/bin/python` when running Python in terminal commands, especially in workflows and subagents.
- For `pip` and `uv pip`, use: `$(conda info --base)/envs/ai-learning-gems/bin/pip` or activate first if in an interactive shell.
- **NEVER** use bare `python` or `pip` without the env path or activation.
- **NEVER** use the base conda env or system Python.
- **ALWAYS** double-quote file paths in `rm` commands to prevent word-splitting on spaces, e.g. `rm -rf "/path/to/folder/"`.

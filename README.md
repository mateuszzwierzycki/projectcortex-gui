# Project Cortex GUI

This repository contains the frontend web application (GUI) for **[Project Cortex](https://github.com/mateuszzwierzycki/projectcortex)**.

## 🚀 Getting Started (For Humans)

The GUI is a modern web application built using [Vite](https://vitejs.dev/) and React. It is located entirely within the `code/gui` directory.

To run the application locally:

1. **Ensure Node.js is installed** on your system.
2. **Navigate to the frontend directory:**

   ```bash
   cd code/gui
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

---

## 🤖 AI-Assisted Development Structure

This repository is built on a structured template designed specifically for long-term, AI-assisted development. It enforces a strict dual-folder workspace to prevent AI agents from losing context or generating disorganized file structures over time.

### How to Use This Template

Whenever you start a new conversation with an AI agent in this repository, you **must** prime it with the system rules.

**Copy and paste this exact prompt as your first message to the AI:**

> **System Prompt Override:** You are operating in Project Cortex. Before doing anything else, read the AI-only documentation in `memory/README.md`, `memory/constraints/architecture.md`, and `code/README.md`. 
> **CRITICAL FIRST STEP:** Check the date of the last log file in the `memory/` directory. Then, review the current state of the `code/` directory (or use `git status` / `git diff`). If there are undocumented code changes that occurred after the last log, you MUST retroactively create a summary log for those changes before answering my first prompt. Acknowledge when you are ready.

When you finish your current session with an agent, tell it "that's it for today" (or something similar). This triggers the agent to summarize the conversation and create a log file in the `memory/` directory.

### Project Structure

- `code/gui/`: The shared workspace where development happens.
- `memory/`: Auto-managed storage where the AI synthesizes and archives conversation logs to maintain context over months or years.

*Note: The `README.md` files located inside `code/` and `memory/` are system instructions written exclusively for the AI. You do not need to read them unless you want to modify how the AI behaves.*

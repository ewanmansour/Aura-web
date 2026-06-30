---
name: specify-cli
description: Run spec-driven development (SDD) processes, project initialization, coding agent integrations, extensions, presets, bundles, and workflows using the specify CLI tool.
argument-hint: "[init|check|version|self|extension|integration|preset|bundle|workflow] [args]"
metadata:
  author: antigravity
  version: "1.0.0"
---

# Specify CLI (GitHub Spec Kit)

`specify-cli` is the command-line interface tool for **GitHub Spec Kit** designed to manage the lifecycle of **Spec-Driven Development (SDD)** projects.

## When to Use

Activate this skill when:
- Bootstrapping or initializing a new Spec-Driven Development project.
- Checking system dependencies and agent setups for Spec Kit.
- Managing Spec Kit extensions, coding agent integrations, presets, and bundles.
- Organizing and running automation workflows within an SDD project.

## Commands Reference

The CLI supports the following subcommands. If the `specify` command is not immediately recognized due to shell session path configurations, use the absolute path: `C:\Users\ewanm_g\.local\bin\specify`.

### 1. Project Initialization
```bash
specify init [PROJECT_NAME]
```
Initializes a new Spec Kit project, setting up the necessary directory templates, constitution files, and configs.

### 2. Environment Verification
```bash
specify check
```
Verifies that all required system dependencies (compilers, git, python, agent environments) are installed and configured.

### 3. CLI Self-Management
```bash
specify self [check|upgrade]
```
Checks for updates or upgrades the CLI in place. To upgrade to a specific tag:
```bash
specify self upgrade --tag vX.Y.Z
```

### 4. Extensions & Integrations
- **Presets**: `specify preset [list|install]`
- **Extensions**: `specify extension [list|install|uninstall]`
- **Integrations**: `specify integration [list|setup]`
- **Bundles**: `specify bundle [discover|install]`
- **Workflows**: `specify workflow [list|run]`

## Execution Tips

- On Windows, if the terminal has not been restarted, access the tool using:
  ```powershell
  C:\Users\ewanm_g\.local\bin\specify [COMMAND]
  ```
- To view the version and environment details:
  ```bash
  specify version
  ```

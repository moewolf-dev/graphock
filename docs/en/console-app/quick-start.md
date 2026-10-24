---
documentation_status: draft
reviewed_at: 2026-10-24
---

# First session

Use a small, non-sensitive file whose content you can check by hand. That makes it easy to tell an import problem from a parsing problem.

## 1. Complete initial setup

On first launch, an **Initial Setup** card outlines the path: a data directory for Graphock, optional sign-in, and importing a first file. It does not contain theme, rendering or language controls.

After setup, open **Settings → General** for those options:

- Theme: light, dark or system.
- Rendering: **basic** is always available. **Blur** and **glass** use the galaxy backdrop and are offered only on a capable Mac; the selection falls back to basic when capability is unknown. **Glass** is a manual choice.

## 2. Open a local workspace

Select the local workspace. It does not require an account, and it does not send files anywhere.

## 3. Import a file

1. Open **Files** and choose **Import File**, or drop a file onto the import area.
2. Confirm that the file list shows the expected name, type and size.
3. If the file is rejected, read the reason. Unsupported, unreadable, suspicious and oversized files are blocked instead of skipped. See [formats and limits](./formats-limits.md).

## 4. Parse it locally

1. Select the imported file.
2. Start the local parse action in the workspace. Local parsing uses the built-in in-process parser; it does not start a model or a remote service.
3. Wait for the parse phases to finish. A started task is not a finished task.
4. Open the result and compare several fields or lines with the original file.

## 5. Explore the workspace

- **Graph** shows relationships between files, tasks and structured data. It requires Pro and a signed-in account.
- **File Galaxy** is another view of workspace files and connections. It requires Pro. It is not a measure of statistical significance or semantic similarity.
- **Tasks** lists task records and outputs. It requires Pro; local parse results from the workspace remain readable in the workspace.
- **Reports** summarises task output and requires Pro.

## 6. Sign in when you need more

Cloud parsing, Pro features and community templates require a Graphock account. See [sign in](./sign-in.md) and [Free and Pro](./free-pro.md).

## If something fails

Check [troubleshooting](./troubleshooting.md) before re-importing the same file repeatedly. A file that appears in **Files** is not automatically selected for a task, and a task that was submitted is not automatically complete.

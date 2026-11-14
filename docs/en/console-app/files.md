---
documentation_status: draft
---

# Files and imports

Graphock records each file you import and reads it where it already lives. The original is not moved, renamed or edited, and removing a file record in the app does not delete the file from disk.

## Prerequisites

- Graphock Console is installed and opens. See [install](./install.md).
- The file or folder is on this Mac, or inside a network share you configured under **Settings → Data Sources**.
- The format is one your build can process. See [formats and limits](./formats-limits.md).
- macOS allows access to the location. Picking a file in the system dialog grants access to that file; authorizing a folder under Data Sources grants access to that folder.

## Steps

### Import from the workspace

1. Open **Workspace**.
2. Use the import control at the top of **File Management**: click it, press Return or Space while it is focused, or drop files and folders onto it.
3. In the macOS dialog, select one or more files and confirm. `All Supported Files` accepts anything, the `Documents` and `Images` entries narrow the list, and several files can be chosen at once.
4. Watch **Imported Files**. After a successful import the group opens and each file added in this session carries a **NEW** badge.

Dropping files anywhere else in the two-column workspace also imports them: while you drag, the window shows a **Drop to import** overlay, and a single drop is imported once.

In a sandboxed App Store build the picker also returns a security-scoped bookmark for every selected file, and an import without bookmarks is refused. That build is not published yet; this describes its design, not an available download.

### Import a folder

A dropped folder is walked and its files are imported one by one. One drop is limited to 16 levels, 500 files, 512 MiB in total and 512 MiB per file. Symbolic links are rejected instead of followed, and entries that cannot be read are reported as rejected rather than imported.

### Import from the menu bar

The menu-bar item opens an **Add files** panel with the same drop area, an **Import files…** command, **Open Graphock** and **Quit Graphock**. The panel reports the outcome in one line: `Imported 2 file(s).`, `Imported 2, rejected 1.` or `No files selected.`, and shows an error line when the import fails. Files imported this way appear in the open workspace without waiting for a manual refresh.

### The Files page

**Files** is titled **Local Files** and lists the imported records as a table with **Name**, **Size**, **Type**, **Modified** and **Actions**. **Import File** adds records, and the empty state reads **No files imported yet** with a **Browse Files** button. Records created here belong to the local runtime scope, so they appear in a local workspace and not in a cloud workspace.

### Browse the workspace tree

**File Management** groups entries into three collapsible groups:

- **Imported Files** for files you imported.
- **Local Files** for files reachable through a data-source folder you authorized.
- **Task Output Files** for the artifacts of completed tasks.

Each group shows its count and starts collapsed. Selecting a row toggles it as a task input, and the request box lists the current selection. A data-source root can be expanded to browse its files and refreshed to re-read the folder; that does not import the files.

### Where imported files live

| Item | Location | Notes |
| --- | --- | --- |
| Original file | Where you imported it | Unchanged. Graphock keeps the path and a SHA-256 hash and does not edit the file |
| Workspace input | The workspace input folder inside Graphock's user data folder | A symbolic link to the original in the Direct build, replaced by a copy if linking fails. The sandboxed App Store build copies the file |
| File record | Graphock's local database, status `indexed` | Removing the record does not touch the original |
| Task output | The task's output folder and its artifacts | Written by the task, not by the import |

Graphock's user data folder sits inside the app's macOS application-support directory, and the Direct build uses its own folder name. **Settings → About** can show the resolved path with the current file, task, artifact, database and workspace counts under **Developer Profile**.

### Open a file

- On the **Files** page, **Preview** opens an inline preview: text and JSON show the first 5,000 characters, images render inline, and any other type shows a bracketed placeholder with its type and size. **Close** hides the preview.
- In the workspace, selecting a file does not open it. It adds the file to the task inputs, and **Task Output Files** rows expand to list a task's artifacts.
- PDF and Office documents are not rendered in the **Files** page preview.

### Remove a file

1. On the **Files** page, choose **Remove** in the row.
2. The record is deleted from Graphock's catalog and the row disappears. The original file stays on disk.
3. **Remove** is disabled when a record does not allow deletion, for example a read-only demo entry.

To stop using a file in a request without deleting its record, remove it from the task inputs with the trash control in the request box.

## Expected result

- The imported file appears in **Imported Files** and on the **Files** page with the size from disk and the type guessed from its extension.
- Graphock re-checks every source when it reads the catalog: a file that no longer exists disappears from the tree, and a file that needs access again is shown as **Unavailable** and cannot be selected.
- Importing never starts a task. A file in **Files** is not proof that a provider accepts it for a particular request.

## Common errors

| What you see | What it means | What to do |
| --- | --- | --- |
| The file never appears in the list | The dialog was cancelled, the file could not be read, or the record could not be written. The **Files** page logs the failure instead of showing a message | Confirm the file exists and is a regular file, then import it again |
| `Imported 2, rejected 1.` in the menu-bar panel | One entry hit a drop limit, was a symbolic link, or could not be read | Import that file on its own, or from a smaller folder |
| **Some files are not supported** | The file check found formats this build cannot process, and the dialog lists them | **Exclude and continue** drops only the listed files; **Back to selection** returns to the request |
| **Selected files cannot be processed** | At least one file is blocked: unreadable, larger than 10 GiB, not a regular file, unrecognized, or a suspicious container | Replace or remove those files. Renaming the extension does not help |
| This format is not included in the App Store local parser | The bundled App Store parser does not cover the format | Use a format from [formats and limits](./formats-limits.md), or the Direct build |
| A row is shown as **Unavailable** | macOS no longer allows access to that path, or the file is gone | Restore access to the folder under **Settings → Data Sources**, or import the file again |
| A parse is refused as too large | The built-in parser stops at 128 MiB per file, and uploading applies the same cap | Split the file and process the parts separately |
| The preview shows a bracketed placeholder | The type has no inline preview | Open the file in its own app |

## Support and version

- **Settings → About** shows the app version, build, commit, channel, platform and architecture. Include them when you report a problem.
- This page documents only behaviour checked against the current source. A control that is described nowhere is not documented yet; do not assume it works.
- Contact [info@moewolf.com](mailto:info@moewolf.com) with the exact message, the file type and size, and your channel (Direct or Mac App Store). Do not send a full customer file.

## Related links

- [Formats and limits](./formats-limits.md)
- [First session](./quick-start.md)
- [Tasks](./tasks.md)
- [Settings](./settings.md)
- [Troubleshooting](./troubleshooting.md)

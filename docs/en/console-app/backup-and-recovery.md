---
documentation_status: draft
---

# Backup and recovery

Graphock keeps its own records in a local database and an app data folder, while your imported files stay where you put them. This page explains what to copy before you reinstall or move to another Mac, and what the app does **not** recover for you.

## Prerequisites

- The app closed, so no task is writing to the database while you copy it.
- Finder access to your own folders and to the app data folder.
- **Settings → About** shows the resolved data location with the current file, task, artifact, database and workspace counts under **Developer Profile**. Use it to confirm the path before copying anything.

## What is stored, and where

| Item | Where it lives | Backed up by copying the app data folder? |
| --- | --- | --- |
| Original imported files | Wherever you imported them from | **No** — they were never moved |
| Workspace input links or copies | The workspace input folder inside the app data folder | Yes (the links only)
| Settings, provider records and secrets | App database plus the system secret storage | Partly: secrets are not in the database |
| File records, task history, artifacts | App database and task output folders | Yes |
| Demo data | A projection in the app database | Yes |

Secrets — provider API keys, SMB passwords, MCP pairings — are held by the system secret storage, not in the database file. Backing up the data folder alone therefore restores the records but not the secrets; you re-enter those after a restore.

## Steps

### Back up before reinstalling or moving

1. Quit Graphock and confirm no task is running.
2. Open **Settings → About → Developer Profile** and note the data folder path.
3. Copy the whole data folder to a location outside the app, for example an external disk.
4. If you also need the imported content, copy the folders you originally imported from. Those are your files, not the app's copy.
5. Keep the backup until the restored installation shows your tasks and files correctly.

### Restore on the same Mac

1. Quit Graphock.
2. Replace the app data folder with the backup, keeping the same folder name.
3. Start Graphock and open **Settings → About** to confirm the counts.
4. Re-enter provider keys, SMB passwords and MCP pairing where the app asks for them.
5. If the build is the sandboxed App Store build, open a file once so the app can regain access to it. See [Files and imports](./files.md).

### Restore on another Mac

1. Install the **same channel** you used before. The Direct build and the App Store build use different app names and therefore different data folders.
2. Quit the app, copy the data folder into the matching location, and start it.
3. Re-authorize imported folders. Bookmarks and links pointing outside the app do not survive a move to another machine.
4. Cross-machine transfer of the local database is not a supported migration path; export the results you need from the task artifacts instead.

## Expected result

- After a backup and restore on the same Mac, the task history, file records and settings are the ones from the backup.
- Files themselves are unchanged: Graphock stores a path and a SHA-256 hash and does not edit your originals.
- After moving to another Mac, the app starts, but external authorizations and secrets must be granted again.

## Common errors

| What you see | What it means | What to do |
| --- | --- | --- |
| Tasks and files are gone after reinstalling | The data folder was removed together with the app, or the build channel changed | Restore the copied data folder into the same channel's location |
| Records exist but a task cannot read its input | The original file moved, or the workspace link points outside the app after a machine change | Re-import the file; the record alone does not contain the content |
| Provider keys are missing after a restore | Secrets live in the system secret storage, not in the database | Re-enter the keys; see [Agents, MCP and providers](./agents-and-mcp.md) |
| Uninstalling "deleted everything" | Removing the app does not remove the data folder | Nothing to fix; the folder is still on disk until you delete it |

## Support and version

- Backups are a manual file operation; the desktop app has no built-in backup button in this build.
- There is no user-facing full reset either; see [Settings](./settings.md) for what exists.
- Deleting an account is a different operation from deleting local data; see [Account deletion](./account-deletion.md).

## Related links

- [Files and imports](./files.md)
- [Settings](./settings.md)
- [Account deletion](./account-deletion.md)
- [Troubleshooting](./troubleshooting.md)

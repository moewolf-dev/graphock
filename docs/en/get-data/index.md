---
documentation_status: current
reviewed_at: 2026-10-14
---

# Import files

Open Files in the desktop app and use Import File to select local files. Start with a small set and confirm the names, types and sizes in the list before running a batch.

## Preview and verify

Use the available Preview action on a file. Preview availability depends on the file's capabilities and type. The file list distinguishes metadata from actual content; a successful import alone does not prove that a parser or model can process every format.

Keep original source files available for checking generated results. When a task fails, record the application version, file type and error category. Avoid attaching private files or credentials to a public issue.

## Local and remote processing

File providers supply input material; model and processing adapters handle tasks. These are different configuration steps. Selecting a local workspace is not equivalent to selecting a local model. Before processing sensitive material, inspect the runtime and provider used by the task and the provider's data policy.

The retired database-connection walkthrough is not a current import procedure. Use the actual file import and provider settings exposed by your installed version.

See [data format checks](./data-formats.md) and [service configuration](./connect-sources.md).

---
documentation_status: draft
---

# Local, account-free usage

Local usage is the part of Graphock that runs entirely on your Mac. It needs no Graphock account and does not upload your files.

## What you can do without signing in

- Create and open a local workspace.
- Import files and browse them in **Files**.
- Parse supported text formats with the built-in local parser.
- Manage application settings: theme, rendering, language, local runtime configuration and updates.
- Keep local task records and inspect parse results from the workspace.

## How local parsing works

The local parser reads the file in-process. It does not start a model, a Python helper or a remote provider. If a format is outside the built-in parser, you get an unsupported-format message instead of a fabricated result.

Only the files you select are read. Graphock does not scan your disk or your network on its own.

## Free account usage

Signing in adds cloud parsing. A signed-in Free account can submit files to the cloud runtime within the monthly allowance. Cloud processing is subject to the configured provider, its limits and its data policy; it is not a local operation.

## What requires Pro

- **Tasks** page, **Templates**, **Graph**, **File Galaxy** and **Reports**.
- Downloading community templates into your own template list.
- Any feature the app labels **Pro**.

Pro is a one-time purchase that unlocks these client features permanently for the account. It does not make cloud parsing unlimited. See [Free and Pro](./free-pro.md).

## What local usage does not include

- No PDF, Office, image or OCR understanding through the built-in local parser. Those require a configured service and usually a signed-in session.
- No background indexing of folders you did not import.
- No account recovery. Local data lives on this device; if you delete it or lose the device, Graphock cannot restore it.

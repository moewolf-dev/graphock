---
documentation_status: draft
---

# Local, account-free usage

Local usage is the part of Graphock that runs entirely on your Mac. It does not upload your files. Whether an account is needed depends on the edition:

| Edition | Local work |
| --- | --- |
| Mac App Store | No account. The app opens into the local workspace. |
| Direct | A Graphock account is required at launch. Local parsing still runs on the device. |

See [Direct and Mac App Store editions](./editions.md) for the full comparison.

## What you can do locally

- Create and open a local workspace.
- Import files and browse them in **Files**.
- Parse supported documents with the built-in local engine.
- Extract text from images and document pages with Apple Vision OCR, in English, Chinese, French and Japanese.
- Manage application settings: theme, rendering, language, local runtime configuration and updates.
- Keep local task records and inspect parse results from the workspace.

## How local parsing works

The local engines read the file in-process. They do not start a model, a Python helper or a remote provider. If a format is outside the local engines, you get an unsupported-format message instead of a fabricated result.

Only the files you select are read. Graphock does not scan your disk or your network on its own.

## Cloud usage

Signing in adds cloud parsing. A signed-in account can submit files to the cloud runtime within the monthly allowance. Cloud processing is subject to the configured provider, its limits and its data policy; it is not a local operation. When the cloud is busy, the app says so and local features keep working.

## What requires Pro

In the Direct build, Pro unlocks:

- **Tasks** page, **Templates**, **Graph**, **File Galaxy** and **Reports**.
- Downloading community templates into your own template list.
- Any feature the app labels **Pro**.

Pro is a one-time purchase that unlocks these client features permanently for the account. It does not make cloud parsing unlimited. The Mac App Store edition includes these features with the app.

## What local usage does not include

- No Python medium, heavy or VLM workers inside the apps. Those run in the cloud or, for the Direct build, as optional add-ons after launch.
- No background indexing of folders you did not import.
- No account recovery. Local data lives on this device; if you delete it or lose the device, Graphock cannot restore it.

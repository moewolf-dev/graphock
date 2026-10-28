---
documentation_status: draft
---

# Agents, MCP and providers

Graphock Console has no separate **Agents** page in this build. The surfaces that decide what an agent may use are in **Settings**: **AI Providers** supplies the language, vision and OCR models, **File Providers** supplies remote document services, **Sidecars** runs bundled local engines, and **MCP Settings** exposes a local listener that a separate MCP client can pair with. Tasks, templates and the request box drive the agent loop itself. See [Tasks](./tasks.md) for that side.

## Prerequisites

- Graphock Console is installed and opens. See [install](./install.md).
- Editing provider records, saving a key, listing file providers, saving their configuration, storing their secrets, and starting or stopping a sidecar need no account. They are local settings operations.
- **Test connection** for an AI provider, and **Test connection** for a file provider, need a signed-in account. The probe goes through the Graphock session.
- **MCP Settings** needs a signed-in account with a verified Pro entitlement. Starting the listener, reading its status, stopping it and reading its log are gated on `tasks.manage`.
- A remote provider needs its own API key, its endpoint, and the data-handling permission you grant in **Settings → Privacy Policy**.

Pro is granted by the service, never by this page. Buying it is coming soon, and this page quotes no price. See [Free and Pro](./free-pro.md).

## What you can do

### AI Providers

Choose **Providers** in the top bar, or **Settings → AI Providers**. The middle column holds five text entries and two vision entries, plus one entry per provider you configured. The right pane follows the selected entry: a language model, a vision model, an OCR or document model, or a configured instance.

| Entry | What it configures |
| --- | --- |
| OpenAI-compatible | Any server that speaks the OpenAI chat API, including a self-hosted gateway |
| Ollama | A local Ollama server, default `http://localhost:11434` |
| DeepSeek | DeepSeek's OpenAI-compatible endpoint, default model `deepseek-chat` |
| OpenRouter | OpenRouter's OpenAI-compatible endpoint |
| Gemini | Google's Generative Language API, default model `gemini-2.0-flash` |
| OpenAI Vision | A vision model for image description |
| Ollama Vision | A local vision model served by Ollama |

The OCR pane's **Configure** action opens the same form with that model's defaults: its capabilities, its privacy class and whether a probe is required. The verified OCR and document models in this build are Z.AI GLM-OCR, Alibaba Qwen3.5-OCR, Alibaba Qwen-VL-OCR Latest, and two Hugging Face OCR models, alongside a local OCR worker and a local VLM worker that run through the bundled sidecars. A model that declares a probe must be probed before it can be enabled.

The form takes a name, base URL, API key, model name, timeout in milliseconds, optional maximum tokens, region, endpoint and custom headers.

1. Fill the fields and save.
2. A new provider is stored, then enabled. A model that requires a probe is probed first; if the probe fails, the form reports the error and the saved record stays disabled.
3. Choose **Test connection** to see success, latency and the model list the provider returns. A failure shows the provider's error.
4. Use the switch in the detail header to enable or disable a configured instance. The switch is only offered for a saved record; a catalog entry without stored credentials shows a disabled switch and the reason.
5. **Replace key** clears the masked value so a new key can be entered. The stored key is never shown again, only a masked form such as a prefix and a suffix.

### Where provider secrets live

- Provider secrets are handed to the operating system's credential store and are not written to the app database. The database keeps the provider record, and the secret is stored under the provider's own account name.
- If that storage is unavailable, saving a key fails closed with `OS secret storage unavailable. Unlock the macOS Keychain for this app or use cloud mode.` There is no plaintext fallback.
- **Settings → About** reports whether system secret storage is available, so check it before blaming the provider.
- The stored value cannot be read back in the interface. Use **Replace key** to rotate it; deleting a provider record also removes its stored secret.

### File Providers

**Settings → File Providers** configures remote document services: Azure Document Intelligence, Google Document AI, AWS Textract and the Unstructured API. Each entry shows its capabilities, its configuration fields, the secrets it needs and its support status.

1. Enter the configuration values and the secrets. Each secret field shows whether a value is stored and its masked form, and offers a clear action.
2. **Save config** writes the settings. **Test connection** needs a signed-in account and reports the provider's answer.
3. The enable switch is offered only when the provider is both available in this build and configured. An unavailable provider shows its reason instead of a switch.

Text extraction from images and documents also depends on the AI Providers entries; a file provider alone does not add a chat model.

### Sidecars

**Settings → Sidecars** starts, stops and configures the engines the build ships, grouped as **Default** (OCR, Parser Lite, Parser Medium, Parser Heavy, VLM) and **Third-party**. A sidecar runs on this Mac; its health and configuration are reported in the same tab. This page does not repeat that reference; see [Settings](./settings.md).

### MCP Settings

**Settings → MCP Settings** is titled **Local MCP access**. The listener binds to this Mac only and stays off until you start it.

1. Optionally tick **Allow local task creation**. The granted scopes become `workspace:read` plus `parse`. Without it, only `workspace:read` is granted, and a client cannot create a task.
2. Choose **Start and pair**. The server listens on `127.0.0.1` at port 39100 by default and tries the next nine ports when one is busy. The page then shows the endpoint, the granted scopes, and the pairing token once.
3. Copy the token into your MCP client immediately. It is displayed only once in that session; restarting issues a new one.
4. **Rotate pairing token** stops the running server and starts a new one, which invalidates the old token. **Stop and revoke** closes the port and revokes the pairing.
5. The token expires after one hour. Stopping the server is the way to revoke it before then.

What the local server accepts, as checked in the source:

- JSON-RPC 2.0 over HTTP `POST` to `/`. Other methods return 405, other paths 404.
- Only a loopback `Host` header is accepted; a mismatched authority is rejected with 421. An `Origin` header is accepted only when it is a loopback HTTP origin; a missing origin is allowed.
- `Authorization: Bearer` with the current pairing token is required, otherwise 401. A token that lacks the scope a method needs is refused with 403.
- `Content-Type: application/json` is required, the body is limited to 1 MiB, and the request must finish within ten seconds.
- At most 120 requests per minute per client address; beyond that the answer is 429 with a retry hint.
- `initialize` answers with protocol version 2024-11-05 and server name `graphock-console-app`.
- Tools: `listTemplates` lists the task templates, `createTask` submits a local task from a file already imported into Graphock, and `getTaskStatus` reports a task this MCP session created. `createTask` exists in the tool list only when the `parse` scope was granted.
- Task creation accepts only a ready file record whose runtime target is local. The tool stages that file, creates a local workspace and runs the task locally. Absolute input paths are not persisted.
- Task status is limited to tasks created by the same MCP session; any other task ID is reported as outside the session.
- The server keeps a log at `mcp/mcp-server.log` in the app's log folder.

## What is gated, and where

| Action | Requirement enforced by the main process |
| --- | --- |
| List, save, enable or delete an AI provider record | None beyond the app itself |
| Save or clear an AI provider key | None beyond the app itself |
| Read the provider support matrix, export provider records | None beyond the app itself |
| Test or probe an AI provider | Signed-in account |
| List file providers, save their configuration, set or clear their secrets | None beyond the app itself |
| Test a file provider connection | Signed-in account |
| Start, read or stop the local MCP listener, read its log | Pro (`tasks.manage`) |

The gate is applied before the operation runs, so a refusal is reported as an error instead of a silent no-op. The messages are `Sign in to use this feature.`, `Sign in and upgrade to Pro to use this feature.`, and `This build does not include this capability.`

## Local versus cloud processing

- A provider whose privacy class is `local` runs on this Mac: Ollama text and vision models, the bundled OCR and VLM workers, and the sidecars. Their traffic stays on the device.
- A provider whose privacy class is `remote` sends the request and the relevant file content to that service. That includes the OpenAI, DeepSeek, OpenRouter, Gemini, Z.AI, Alibaba and Hugging Face entries, and all four file providers.
- Before a remote call, outbound consent records the purpose of the send: generating a response with a language model, extracting text from an image or document, describing an image, parsing document content, testing a provider connection, or drafting a graph schema. **Settings → Privacy Policy** lists the permissions you granted and can revoke them; revocation stops future sends and cannot recall data already delivered.
- Cloud parsing is separate from providers: it needs a signed-in account and draws from the monthly cloud allowance, which Pro does not raise. See [Free and Pro](./free-pro.md).
- The MCP listener is local. A task it creates runs locally, and the paired client never receives a file path it can browse.

## Expected result

- A saved provider appears as its own entry in the **AI Providers** middle column, with a masked key and a working enable switch once it is configured and, if required, probed.
- A successful test reports latency and, when the provider offers one, a model list.
- **MCP Settings** shows **Running on 127.0.0.1:port** with the scopes it granted, and **Stopped** after you revoke the pairing.
- A paired client can list templates, create one local task from an imported file when the parse scope was granted, and read that task's status. Nothing else is exposed.

## Common errors and limitations

| What you see | What it means | What to do |
| --- | --- | --- |
| `An active Pro entitlement is required for tasks.manage` on **MCP Settings** | Starting, reading or stopping the listener is Pro-gated | Sign in with a Pro account. The tab itself is not hidden, but every call is refused |
| `Authentication is required for providers:test` | Testing a provider needs a session | Sign in, then test again |
| `OS secret storage unavailable. Unlock the macOS Keychain for this app or use cloud mode.` | The system credential store refused the write | Unlock the Keychain, relaunch, and save the key again. There is no plaintext fallback |
| The provider form says an API key is required | A remote provider is being saved and no key was entered, and no stored key is being kept | Enter the key, or keep the existing masked key |
| Test shows `Connection failed` or a provider message | The key, endpoint, region or model is wrong, the provider refused the request, or it is unreachable | Correct the field named in the message, then test again |
| A Hugging Face or Ollama vision entry cannot be enabled | The model declares a probe, and the probe has not succeeded | Run the probe by saving the entry again with a valid model name |
| The file provider switch is disabled | The provider is unavailable in this build, or it is not configured yet | Configure it and save; if it stays unavailable, the entry names the reason |
| `Could not start or pair the local MCP server.` | The page could not reach the main process, or the start was refused | Read the error line under the card, and check the MCP log |
| No port could be opened | Ports 39100 to 39109 are all in use | Stop the other process, then start again |
| The MCP client gets 401 `Valid MCP pairing token required` | The token is missing, stale, rotated or expired | Copy the token from the page again, and restart the pairing if it expired |
| The MCP client gets 403 `Pairing token lacks the required scope` | The client called `createTask` without the `parse` scope | Restart with **Allow local task creation** ticked and pair again |
| The MCP client gets 421 `Invalid local MCP host` | The client addressed the server with a hostname or port the listener does not own | Use the `127.0.0.1` address and the port the page shows |
| The MCP client gets 429 | More than 120 requests were made in a minute from that address | Wait for the retry window, or send fewer requests |
| `Select a ready local file imported into Graphock first` | `createTask` was given a file ID that is missing, not ready, or belongs to the cloud runtime | Import the file locally, wait for it to be ready, and pass its ID |
| `Task is outside this MCP session` | `getTaskStatus` was asked about a task another run or the interface created | Query only tasks the same MCP session created |

Limitations of this build:

- There is no **Agents** page, no agent list and no per-agent permissions screen. Agent behaviour is configured through providers, sidecars, templates and tasks.
- The OCR and document model catalog has no browsable entry in the middle column of **AI Providers**. The OCR pane is populated only for the model that was selected, so there is no list of every catalog entry to browse.
- There is no MCP resource or prompt support, no streaming transport, and no tool that browses folders, reads arbitrary paths or edits files. The three tools above are the whole surface.
- The MCP tab has no visible log viewer; the log file is the only record.
- The pairing token cannot be revoked separately from stopping the server, and it is not recoverable after the page loses it.
- Provider secrets are per installation. Signing in on another Mac does not copy them.
- Windows and Linux packages are not available. On Windows the release capability table reports the Pro features, including `tasks.manage`, as unavailable, so MCP access would be refused as a missing capability rather than by an entitlement check.

## Support and version

- **Settings → About** shows the app version, build, commit, channel, platform and architecture, and whether system secret storage is available. Include them when you report a problem.
- This page documents only behaviour checked against the current source. A control that is described nowhere is not documented yet; do not assume it works.
- Contact [info@moewolf.com](mailto:info@moewolf.com) with the exact message, the provider or MCP tool name, and your channel (Direct or Mac App Store). Never send an API key or a pairing token.

## Related links

- [Graph and File Galaxy](./graph-and-galaxy.md)
- [Tasks](./tasks.md)
- [Settings](./settings.md)
- [Free and Pro](./free-pro.md)
- [Sign in](./sign-in.md)
- [Troubleshooting](./troubleshooting.md)
- [Limitations](./limitations.md)

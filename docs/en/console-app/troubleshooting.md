---
documentation_status: draft
---

# Troubleshooting

Start with the exact message. Graphock reports a reason instead of silently continuing, and each reason points at a different fix.

## Access messages

| Message | What to do |
| --- | --- |
| Sign in to use this feature. | The feature needs a Graphock account. Use [sign-in](./sign-in.md). |
| Sign in and upgrade to Pro to use this feature. | The account is signed in but has no verified Pro entitlement. Check **Settings → General → Account**. |
| This build does not include this capability. | The installed build does not contain the required component. Use the published package for your channel; do not patch the app manually. |
| This month's cloud allowance is used up. | Wait for the next UTC month or use local parsing. The allowance does not carry over. |

## Import and parsing

- **File rejected as unsupported.** The format is outside the built-in parser or the configured service. Check [formats and limits](./formats-limits.md); renaming the extension does not help.
- **File blocked as unreadable.** macOS denied access, the file disappeared, or it is not a regular file. Re-import with a narrower folder permission.
- **File blocked as too large.** Local parsing stops at 128 MiB per file, and the app applies the same 128 MiB cap when uploading to a cloud service. Split the file and process the parts separately.
- **Nothing happens after starting a task.** Watch the parse phases. If the engine cannot start, check the **Sidecars** page and the local runtime status, then retry. A task that stays queued is not a completed task.
- **Result looks wrong.** Compare a sample of fields with the source file. A file in **Files** is not proof that a provider accepted it for that task.

## Sign-in

- **Browser never returns.** The app's URL scheme is blocked (`graphock://` for the App Store build, `graphock-direct://` for the Direct build). Reopen the app and retry.
- **Invalid or expired link on the relay page.** Start sign-in again from the app. Do not reuse an old relay URL.
- **Wrong account.** Sign out and sign in with the account that owns the purchase.

## Rendering

- **The galaxy backdrop does not appear.** Blur and glass are optional. On unsupported, low-core, low-memory or unknown-capability Macs the app stays on the basic theme. Select the mode again in **Settings → General** to see whether it is offered.
- **Text is hard to read in blur or glass.** Switch to **basic**. The app also disables live blur when the system requests reduced transparency, and falls back to opaque surfaces where `backdrop-filter` is unavailable.

## Local data

- **I uninstalled but my files are gone / still there.** Uninstalling removes the app, not your original files. Local app data can remain on the device; its location depends on the build and its sandbox. Back up anything you need before removing it.
- **I lost my local workspace.** Local data is not backed up to Graphock. Restore from your own backup; the service cannot recover it.

## Before contacting support

Collect the app version, macOS version, the exact message, the channel (Direct or Mac App Store) and, for account issues, the request ID shown in the deletion panel. Do not send passwords, API keys or full customer files.

Contact [info@moewolf.com](mailto:info@moewolf.com).

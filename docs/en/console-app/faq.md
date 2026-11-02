---
documentation_status: draft
---

# Frequently asked questions

Short answers to the questions that come up most often. Each answer links to the page with the full steps; when a capability is not available yet, this page says so instead of describing it as shipped.

## Before you start

**Which macOS versions are supported?**
macOS 13.3 or later for the current build. Graph needs the same minimum because its database engine is gated on it. See [Requirements](./requirements.md).

**Do I need an account to use the app?**
It depends on the edition. The Mac App Store edition opens into the local workspace without an account; signing in is only needed for cloud parsing. The Direct build requires a Graphock account when it starts, and its Pro features need a Pro entitlement. See [Direct and Mac App Store editions](./editions.md).

**Which files can it read?**
The local engine reads PDF, Office and OpenDocument files, plus text, CSV/TSV, JSON and HTML source. Apple Vision OCR extracts text from images and pages in English, Chinese, French and Japanese. The full list and the 128 MiB import limit are on [formats and limits](./formats-limits.md). A blocked file is reported by name; it is never silently skipped or replaced by another parser.

## Daily use

**Why is Start Task disabled?**
The request is incomplete, or the selected files are not all supported. Start Task needs at least one input plus a prompt or a chosen feature. See [Tasks](./tasks.md).

**Why is File Galaxy or Graph disabled?**
Both are Pro features (`galaxy.explore` and `graph.explore`). The navigation item is greyed out when the account has no verified Pro entitlement. Graph additionally needs macOS 13.3 or later.

**Where did my files go?**
Your originals are untouched; Graphock stores the path and a SHA-256 hash. Workspace inputs are links (or copies, in the App Store build) inside the app data folder. Removing a file record does not delete your file. See [Files and imports](./files.md).

**Can I run a task twice?**
Submit the same inputs again, or reuse a completed artifact as the next input when its producer allows it. Graphock does not resume a finished task.

**Does a stalled task mean it failed?**
Not necessarily. **Still running (checking… may be stalled)** means no recent progress was observed. Wait, then cancel and retry if it stays. See [Troubleshooting](./troubleshooting.md).

## Account and purchases

**Why can I not buy Pro yet?**
The Direct Pro purchase is coming soon: the website checkout is not on sale in this build, so no price is shown until it is live. The Mac App Store edition is a separate paid app, not a Pro upgrade. See [Buying, restoring and editions](./buy-and-restore.md).

**I paid on the website but the app still says Free.**
Sign out and back in with the purchasing account in the Direct build. Entitlements come from the service, never from a local flag. The Mac App Store edition has no Pro line and nothing to restore.

**Does Pro raise the cloud allowance?**
No. The signed-in account has 50 cloud calls per UTC month, shared across devices that use the same account. Pro does not raise it today.

**Do old subscriptions still work?**
Graphock no longer sells new subscriptions. Existing subscriptions and orders are not cancelled. Their renewal, payment-failure and cancellation events keep being processed.

**Does a Direct Pro purchase work in the Mac App Store build?**
No. The two editions are separate licences; buying Pro on the website does not unlock the App Store app, and the App Store purchase does not add Pro to a Graphock account.

**Can I buy Graphock in mainland China?**
No. Neither the Direct edition nor the Mac App Store edition is sold in mainland China.

## Data and privacy

**Does uninstalling remove my data?**
No. Removing the app leaves the data folder in place; Settings, file records, task history and artifacts remain until you delete that folder. See [Backup and recovery](./backup-and-recovery.md).

**Where are API keys stored?**
Provider records live in the app database; the secret itself is handed to the system secret storage. **About** shows whether that storage is available. See [Agents, MCP and providers](./agents-and-mcp.md).

**Does deleting my account delete local files?**
Account deletion removes server-side records within the documented retention windows; it does not touch files on your Mac. See [Account deletion](./account-deletion.md).

**Can I use the app on Windows or Linux?**
Only the Direct edition has a Windows build, and it is not released yet. Linux has no build. The Mac App Store edition is macOS only. See [Known limitations](./limitations.md).

## Support

**Where do I report a problem?**
[info@moewolf.com](mailto:info@moewolf.com). Include the app version, macOS version, the page you were on and the exact message. Do not send API keys, tokens or full receipts.

**What should I check before reporting?**
Confirm the version in **Settings → About**, retry once, and look the message up in [Troubleshooting](./troubleshooting.md). If a task failed, the row keeps its error message.

## Related links

- [Overview](./index.md)
- [Quick start](./quick-start.md)
- [Troubleshooting](./troubleshooting.md)
- [Known limitations](./limitations.md)

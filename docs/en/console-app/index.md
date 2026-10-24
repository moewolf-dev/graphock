---
documentation_status: draft
reviewed_at: 2026-10-24
---

# Graphock Console App

Graphock Console is the desktop application. Files, tasks, graph databases and local settings live on your Mac; the website is for downloads, account pages and documentation, not for processing files.

## Availability at a glance

| Capability | Status | Notes |
| --- | --- | --- |
| Local parsing (text, CSV/TSV, JSON, HTML source) | **Available** | Runs in the app, no account required |
| Workspace, Files, Settings | **Available** | Local workspaces do not require sign-in |
| Sign-in through graphock.com | **Available** | Required for cloud and Pro features |
| Cloud parsing | **Requires sign-in** | Monthly allowance, shared across devices |
| Tasks page, Templates, Graph, File Galaxy, Reports | **Requires Pro** | Pro is a one-time purchase |
| Buying Pro | **Coming soon** | No price is shown until checkout is live |
| Mac App Store build | **Coming soon** | StoreKit purchase is not available yet |
| Windows and Linux builds | **Not available** | Packaging placeholders only |

Availability describes what the application checks at runtime. A feature can still be unavailable because of your build, your account or the service you configured.

## Start here

1. [Check the requirements](./requirements.md).
2. [Install Graphock](./install.md).
3. [Follow the first session](./quick-start.md).
4. [Understand local, Free usage](./local-free.md).
5. [Review supported formats and limits](./formats-limits.md).
6. [Sign in](./sign-in.md) when you need cloud or Pro features.
7. [Read what Free and Pro include](./free-pro.md).
8. [Delete your account](./account-deletion.md) when you need to.
9. [Troubleshoot a failure](./troubleshooting.md).
10. [Check current limitations](./limitations.md).

## What the desktop app does not do

- It does not process files on the website. Website pages describe the product; the desktop app performs the work.
- It does not silently substitute a different parser when a format is unsupported. A blocked file is reported, not skipped.
- It does not grant Pro from a client-side claim. Entitlements are verified by the Graphock service.
- It does not make cloud results local. A local workspace and a cloud workspace have separate runtimes.

Graphock is under active development. This guide marks planned or unavailable capabilities explicitly instead of describing them as shipped.

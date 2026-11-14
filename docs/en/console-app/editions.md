---
documentation_status: draft
---

# Direct and Mac App Store editions

Graphock ships in two editions built from the same code. They are licensed separately, and neither edition is sold in mainland China.

## At a glance

| | Direct (macOS and Windows) | Mac App Store (macOS) |
| --- | --- | --- |
| Price | Free to download; Pro is a one-time purchase on graphock.com | One-time paid download; USD 39.00 in the App Store |
| Graphock account | Required when the app starts | Only needed for cloud parsing |
| Local features | Free tier, plus Pro features after a Pro purchase | Every local feature included |
| Pro | Purchased through the website checkout and tied to the account | Not sold in the app; the download is the purchase |
| Cloud parsing | Signed-in account, monthly allowance | Signed-in account, monthly allowance |
| Updates | Manual download from the download page | Delivered by the App Store |
| Mainland China | Not sold | Not sold |

## What both editions share

- The same local document engine, Apple Vision OCR and Apple native document reader.
- The same workspace, Files page, settings and local task record.
- The same monthly cloud parsing allowance for signed-in accounts. Pro does not raise it.
- The same supported OCR languages: English, Chinese, French and Japanese.

## Where they differ

- **Sign-in.** The Direct build asks you to sign in before the workspace opens. The App Store build opens straight into the local workspace and only asks for an account when you use cloud parsing.
- **Purchases.** A Direct Pro purchase belongs to the Graphock account that bought it. The App Store edition is paid for through the App Store; there is nothing to buy inside the app and no Pro flag to restore.
- **Pro portability.** Buying one edition does not unlock the other. A Direct Pro purchase and the App Store app are separate licences.
- **Delivery.** Direct installers are downloaded from graphock.com and updated by downloading again. The App Store build is installed and updated by the App Store.
- **Availability.** Both editions are excluded from sale in mainland China.

## Local engines by edition

| Capability | Direct | Mac App Store |
| --- | --- | --- |
| Local document engine (TypeScript) | Included | Included |
| Apple Vision OCR | Included | Included |
| Apple native document reader | Included | Included |
| OCR languages | English, Chinese, French, Japanese | English, Chinese, French, Japanese |
| Windows local OCR | Windows build | Not applicable |
| Python medium/heavy/VLM workers | Optional add-ons after launch | Not included |
| Medium parser alternative | Reserved, not shipped | Reserved, not shipped |
| Apple Intelligence image reader | Reserved, not enabled | Reserved, not enabled |

A capability that is not in your edition is shown with its name and a reason instead of disappearing. See [Free and Pro](./free-pro.md) and [formats and limits](./formats-limits.md).

## Choosing an edition

- Choose **Direct** when you want the free download, a paid Pro upgrade for the account, or the Windows build.
- Choose the **Mac App Store** edition when you want one purchase that includes every local feature and no account for local work.

Do not install both editions expecting one entitlement to cover both. See [Install Graphock](./install.md).

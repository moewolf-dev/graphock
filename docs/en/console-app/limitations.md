---
documentation_status: draft
---

# Limitations

This page lists what the current release does not do. It is intentionally blunt: an unavailable feature is not described as shipped.

## Distribution

- **Mac App Store build: coming soon.** The build is not published. A StoreKit purchase bridge exists in the code base, but purchasing depends on the released app and an App Store product that has been configured and verified; no product is available today.
- **One-time Pro purchase: coming soon.** No checkout is live, so this guide quotes no price.
- **Windows and Linux: not available.** Configuration exists in the source tree, but no package is released.
- A Direct package is installable only when it appears on the download page. There is no silent auto-update.

## Parsing

- The built-in local parser covers text, CSV/TSV, JSON and HTML source up to 128 MiB per file. PDF, Office, image and OCR extraction require a configured service and are not part of the built-in parser.
- The Mac App Store build restricts local parsing to the parsers in its capability manifest and does not run templates, models or parsing services locally.
- Cloud processing depends on the provider's own limits and data policy. It can fail, be slow or be unavailable; it is not a guaranteed service level.
- Graphock does not repair malformed source data or invent missing values.

## Account and quota

- Pro is tied to a Graphock account and verified by the service. Offline Pro use is limited by the last verified state.
- The cloud allowance is finite (currently 50 calls per UTC month, no carry-over) and Pro does not raise it today.
- Deleting an account removes cloud data; local files remain on the device.
- Existing subscriptions are no longer sold, but they are not cancelled by Graphock. Their events continue to be processed.

## Privacy

- Local parsing does not upload files. Cloud parsing sends the selected files to the configured provider.
- Local sidecars, when present in a build, run on the device; their availability depends on the channel and package.
- Graphock does not scan folders you did not import.

## Documentation status

Pages carry `documentation_status`. A page marked current was reviewed against the desktop workflow; archived pages exist for old URLs and are not instructions. Translations may lag behind the English source and are marked as pending rather than presented as reviewed.

## What is deliberately out of scope

Charts, dashboards, real-time collaboration and other retired workflows are not documented as current features. The website keeps their old URLs with retirement notices so links do not break; it does not promise a return date.

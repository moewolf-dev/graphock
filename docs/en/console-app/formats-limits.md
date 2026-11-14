---
documentation_status: draft
---

# Formats and limits

Format support depends on the local engines in your edition, not only on the file extension. The full edition comparison is on [Direct and Mac App Store editions](./editions.md).

## Built-in local engine

| Group | Extensions | Notes |
| --- | --- | --- |
| Documents | `.pdf`, `.docx`, `.pptx`, `.xlsx`, `.odt`, `.odp`, `.ods` | Parsed in-process; text, tables and sheet names are returned |
| Plain text and markup | `.txt`, `.md`, `.markdown`, `.xml`, `.yaml`, `.yml`, `.css`, `.js`, `.ts`, `.tsx`, `.jsx`, `.vue`, `.py` | Decoded as UTF-8, UTF-8 with BOM, UTF-16LE or UTF-16BE |
| Delimited data | `.csv`, `.tsv` | Parsed as rows; result metadata includes headers, row count and sample rows |
| JSON | `.json` | Parsed as structured text |
| HTML source | `.html`, `.htm` | Source text, not a rendered page or a browser sandbox |

The local engine never downloads a parser or starts a helper process. A format outside this list is reported as unsupported instead of being sent somewhere else.

## OCR

Apple Vision OCR is included in both macOS editions. Supported languages are English, Chinese, French and Japanese. OCR runs on the device and does not need an account or a cloud call.

The Windows build uses a local OCR engine of its own; it does not use Apple Vision. Cloud OCR through a configured service remains a separate feature.

## Limits

- **Local parse size:** 128 MiB per file. A larger file is blocked before parsing.
- **Import probe size:** files above 10 GiB are rejected before support checks. Exactly 10 GiB is allowed by the probe, but it cannot be parsed by the local engine.
- **Batch probing:** at most four files are inspected concurrently. Large batches take longer; that is not a failure.
- **Unknown files:** a file that cannot be recognized, or cannot be read, blocks the selection. Graphock does not silently drop it.
- **Rejected categories:** video containers, installers, executables and archives are rejected even if renamed. Detection uses magic bytes, structure and text heuristics as well as the extension.

## Python workers and optional add-ons

Cloud parsing uses the Python-based medium, heavy and VLM workers on the Graphock service. Those workers are never bundled with either app.

- **Mac App Store edition:** no Python workers, and no download of executable code.
- **Direct edition:** the optional add-ons announced after launch are downloaded only after the user asks for them; the app verifies them before use.

A capability that is not part of your edition is listed by name with the reason instead of being silently missing.

## Cloud and configured services

Cloud parsing accepts the formats supported by the selected provider, within that provider's own limits (for example image or PDF byte and page limits). Those limits are shown by the service configuration; Graphock does not raise them.

The app additionally refuses to upload a file larger than 128 MiB, even when the provider would accept it. That cap is separate from the provider limits and is not configurable.

A file appearing in **Files** is not proof that a particular provider accepts it. Check the support decision shown before submitting a task.

## Encoding and malformed input

Text decoding is bounded and does not repair arbitrary binary data. If a file contains invalid byte sequences or mixed encodings, the parse result may be incomplete or rejected. Convert the file to UTF-8 and try again rather than renaming it.

---
documentation_status: draft
---

# Formats and limits

Format support depends on the runtime, not only on the file extension.

## Built-in local parser

| Group | Extensions | Notes |
| --- | --- | --- |
| Plain text and markup | `.txt`, `.md`, `.markdown`, `.xml`, `.yaml`, `.yml`, `.css`, `.js`, `.ts`, `.tsx`, `.jsx`, `.vue`, `.py` | Decoded as UTF-8, UTF-8 with BOM, UTF-16LE or UTF-16BE |
| Delimited data | `.csv`, `.tsv` | Parsed as rows; result metadata includes headers, row count and sample rows |
| JSON | `.json` | Parsed as structured text |
| HTML source | `.html`, `.htm` | Source text, not a rendered page or a browser sandbox |

If a file's extension is not in this table, the built-in local parser cannot process it. Images, PDF, Office documents, OCR and model-based extraction require a configured service.

## Limits

- **Local parse size:** 128 MiB per file. A larger file is blocked before parsing.
- **Import probe size:** files above 10 GiB are rejected before support checks. Exactly 10 GiB is allowed by the probe, but it cannot be parsed by the built-in parser.
- **Batch probing:** at most four files are inspected concurrently. Large batches take longer; that is not a failure.
- **Unknown files:** a file that cannot be recognized, or cannot be read, blocks the selection. Graphock does not silently drop it.
- **Rejected categories:** video containers, installers, executables and archives are rejected even if renamed. Detection uses magic bytes, structure and text heuristics as well as the extension.

## App Store build

The Mac App Store build includes only the local parsers listed in its capability manifest. A format outside that list is reported as *not included in the App Store local parser*, even when the Direct build supports it. The App Store build also runs local parsing only: templates, models and parsing services are not part of that local parser.

## Cloud and configured services

Cloud parsing accepts the formats supported by the selected provider, within that provider's own limits (for example image or PDF byte and page limits). Those limits are shown by the service configuration; Graphock does not raise them.

A file appearing in **Files** is not proof that a particular provider accepts it. Check the support decision shown before submitting a task.

## Encoding and malformed input

Text decoding is bounded and does not repair arbitrary binary data. If a file contains invalid byte sequences or mixed encodings, the parse result may be incomplete or rejected. Convert the file to UTF-8 and try again rather than renaming it.

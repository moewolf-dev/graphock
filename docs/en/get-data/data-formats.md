---
documentation_status: current
reviewed_at: 2026-10-14
---

# Check input and output formats

Treat file import, preview, parsing and model input as separate capabilities. A file can appear in the workspace while a particular processing task does not support its content.

## Before processing

- Confirm the filename, type and size in Files.
- Preview the source when that action is available.
- Check that the selected task and adapter accept the input type. Image OCR and a text-only language model do not have identical requirements.
- For tables or structured files, inspect a small sample for missing values, unexpected types and inconsistent fields.

## After processing

Inspect the actual output. If a task promises structured data, check that the file is valid in the requested format and that required fields are present. Compare extracted values to the original file. Preserve the relationship to the source so that a mistaken field can be traced and corrected.

Provider payload limits, file size and format support vary with the selected runtime and task. This guide does not claim a universal file-size limit or support for every database and document format.

For your first graph, use [the graph inspection workflow](../getting-started/first-visualization.md).

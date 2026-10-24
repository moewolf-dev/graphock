---
documentation_status: current
reviewed_at: 2026-10-15
---

# Review graph data and file relationships

Use graph exploration to understand processing provenance and structured relationships. Always distinguish the displayed graph from the accuracy of the information it represents.

## Provenance review

In Graph's task-relationships mode, inspect connections involving files and tasks. Locate the source and generated output you are comparing. Review the task context when a result seems incomplete or unexpected. A generated result should be evaluated using its source material, rather than accepted because it has a node in a graph.

## Structured-data review

Data-analysis mode reads a selected graph database. Use its Import dialog to select eligible files, review a generated blueprint and its node/edge mappings, and import into a chosen database. Inspect per-file failures before querying; a source file in Files is not proof that it was imported into a graph database.

Select the database, build and execute a query, then inspect the returned nodes and edges. Look for duplicated entities, missing connections and relationships that do not match the input. Check filters, the query limit and the Truncated indicator before interpreting counts or an empty view. A limited query result is not the complete database.

Validate important claims directly against source content. A graph may help reveal a problem but is not an independent source of truth. See [the import and query steps](../getting-started/first-visualization.md#data-analysis).

## File exploration

File Galaxy offers another view of the workspace's files and connections. Use it to navigate material, then return to the file or task view to check actual content. It is not a statistical significance test or a guarantee of semantic similarity.

The previous statistical calculations and sales-dashboard walkthroughs were not verified against this desktop workflow. Their URLs now carry retirement notices. Follow [your first file graph](../getting-started/first-visualization.md) for the supported starting point.

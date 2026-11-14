---
documentation_status: current
reviewed_at: 2026-10-15
---

# Inspect your first file graph

This guide uses the desktop graph views. It does not require an unverified dashboard chart builder.

## Prepare a result

Import a small file you can read yourself. Configure a supported service and task, then inspect the generated output before opening a graph. If extraction produced incorrect entities or fields, fix the task or input; a visualization will not correct the content.

## Task relationships

Open Graph and choose the task-relationships mode. Inspect the files and tasks shown for the selected workspace. Follow their connections to understand which work produced an output. Use the underlying file and task views when you need to check the actual source or result content.

## Data analysis

Data analysis queries a selected graph database; importing a file into Files alone does not populate this view.

1. Open Graph and choose Data Analysis. In the Graph DB column, select an existing database for the current workspace. If none exists, choose Import.
2. In the import dialog, select an eligible imported file or task output. Start with a small CSV whose columns you understand. A disabled source is not accepted by this import flow.
3. Continue to Generate Blueprint. Review the proposed node labels, identifiers, properties and edge mappings; correct mappings and resolve reported issues before importing.
4. Choose the target database or name a new database, then choose Start Import. Inspect each file's result. A partial import is not a successful import of every selected file; use Retry Failed Imports when appropriate.
5. Select the database and use the query builder to choose the nodes, relationships and filters you need. Execute the query, then inspect the returned nodes and edges.

Check the query limit and any Truncated indicator before drawing conclusions from counts or missing connections. An empty query result can mean that the selected database or filter does not match the data; it does not by itself prove a rendering failure. Confirm important relationships against the source material.

## File Galaxy

Open File Galaxy for a spatial view of workspace files. Select a file node and inspect its connections. Use the file's available actions to review its contents. An empty map can simply mean that the workspace has no relevant files; verify workspace selection before changing rendering settings.

Continue with [analysis practice](../analyze-data/index.md).

---
documentation_status: draft
---

# Graph and File Galaxy

Graphock has two visual surfaces for work you already did. **Graph** draws the relations recorded by a finished task and lets you query an imported graph database. **File Galaxy** draws your files, tasks and import folders as one 3D scene. Both pages render from local records; neither one parses or transforms a file.

## Prerequisites

- A signed-in Graphock account with a verified Pro entitlement. **Graph** requires `graph.explore` and **File Galaxy** requires `galaxy.explore`; both are Pro features.
- macOS 13.3 or later for **Graph**, because its database engine is gated on that version. On an older macOS the build reports the capability as unavailable instead of loading the page.
- A Mac with working graphics acceleration for **File Galaxy**. WebGL is the default; if you choose WebGPU and it cannot initialize, the scene falls back to WebGL.
- For **Graph → Task Relations**: at least one completed task whose run wrote a relation-graph artifact.
- For **Graph → Data Analysis**: a workspace and at least one graph database in it. The page picks an open workspace from the list, or creates one when none exists.

Without Pro the top-bar **Graph** and **File Galaxy** entries are disabled and their tooltip states the reason: `Sign in to use this feature.`, `Sign in and upgrade to Pro to use this feature.` or `This build does not include this capability.` Opening the route directly is refused in the main process, the window returns to the workspace, and a banner repeats the reason. Buying Pro is coming soon; this page quotes no price. See [Free and Pro](./free-pro.md).

## Steps

### Open Graph

1. Choose the **Graph** icon in the top bar. The selected tab is kept in the window location, so reopening the page returns to the tab you used.
2. The page opens on one of two tabs: **Task Relations** or **Data Analysis**.
3. The footer reports the size of what is currently drawn, for example `Nodes: 42 | Edges: 61`.

### Task Relations

The left column is the **Task List**. Each row shows the task title, its status and completion time, and the state of its relation data.

| Row label | Meaning |
| --- | --- |
| Has relation data | The task wrote a relation-graph artifact and it passed validation |
| No relation data | The task is not completed, or it has no relation artifact |
| Loading... | The artifact is being read |
| Artifact file missing | The record exists but its file is gone |
| Invalid relation data | The artifact is malformed, oversized, or references nodes it does not contain |

1. Select a task. Only completed and succeeded tasks can produce a graph; any other task states **No relation data**.
2. The canvas draws the relation graph. If the task has no artifact, the canvas says **No relation artifact**; if the artifact is rejected, it says **Invalid relation data**; an artifact with no nodes reports **This task produced an empty relation graph.**
3. Select a node or an edge to open a details panel on the right. It shows the fields the item carries: ID, label, type and properties when present. **Close** or Escape dismisses it.
4. Selecting a different task discards the previous graph. A late response from the previous selection is dropped instead of replacing the canvas.

When Demo Data is loaded and no task is selected yet, the page selects the Demo package's default task so a graph appears without extra clicks. A selection you make yourself is never overwritten.

### Data Analysis

1. The left column is **Graph DB**. It lists the databases of the current workspace. **Refresh** re-reads the list, and **Import** opens the import dialog.
2. Expand a database to read its schema: node labels with their properties and primary keys, and edge types with their source and target labels. **Refresh Schema** reloads it from the database.
3. Pick node labels and edge types, set the traversal direction, add filters, and choose sorting and pagination. The limit defaults to 200 and must be between 1 and 1000.
4. **Preview** builds the query text without running it; **Execute Query** runs it and draws the result. **Cancel Query** stops a running query.
5. The result panel reports node and edge counts, and marks a result as **Truncated** when the database returned fewer rows than exist.
6. Double-click a node to expand it: Graphock runs one bounded query for that node's identity and merges the neighbours into the canvas. Double-click it again to collapse that expansion. In layouts that support focus zoom, double-click zooms to the node instead.
7. **Import** creates or fills a database from imported files that look like CSV, JSON, JSONL, NDJSON, SQL or DDL sources, with a mapping step before the run.

A Demo database is a read-only projection: its import button and mutation controls are disabled and its panel shows the mapping summary.

### Canvas controls

The toolbar in the top-left corner of the canvas has:

- a layout selector. In this build the D3 renderer offers force, tree, grid, circle pack, radial tree, tree of life and Stern–Brocot tree. A layout is only listed when the active renderer supports it.
- **+** and **−** to zoom, **Fit** to frame the whole graph, and the refresh control to recompute the layout.
- undo and redo for layout and style changes made in this session.
- **Display**, **Layout** and **Style** panels. **Display** chooses which text is drawn (node type, edge type, caption, properties) and each field's font size. **Layout** exposes the chosen layout's parameters, with an advanced toggle. **Style** sets per-type colours, label colours, icons and images, and offers **Reset all styles**.
- fullscreen expand and collapse. Escape leaves fullscreen.
- a search box that narrows the canvas to nodes whose label contains the text.

With a mouse, scroll to zoom and drag to pan. Clicking a node or edge opens its details; clicking empty canvas clears the selection and the details panel. Escape also clears the selection.

### Open File Galaxy

1. Choose the **File Galaxy** icon in the top bar.
2. While the snapshot loads, the page shows **Loading...**; a failed read shows **Error** with the reason and a **Retry** button.
3. The scene groups objects into clusters:
   - one cluster per task, holding that task's input and output files;
   - one cluster per imported directory;
   - an **Imported Files** cluster for imported files that belong to no task or directory.
4. A star is a file. Its size follows the file size on a logarithmic scale, and its colour follows the file family: text, tabular, document, audio, video, image, archive or unknown. A ring marks an output file.
5. When there is nothing to draw, the page states **No files or tasks available. Import files to see them in the galaxy.** with a **Go to Files** button.

### Galaxy controls

The toolbar above the scene has **Back**, **Refresh**, **Fit to View**, **Reset View**, the display toggles, the backend selector, **Legend** and **Search**.

- **Refresh** re-reads the snapshot. The page also refreshes itself when a task event arrives, and when the window regains focus after a task event while the page is visible.
- **Fit to View** frames every star in the model. **Reset View** returns the camera to its starting position and points it at the origin.
- **Auto Rotate** turns the whole scene; **Task Rotate** turns the task clusters and their satellites. Both pause while you are pressing on a star or a cluster.
- **Core Light**, **Star Corona** and **Star Halo** switch individual lighting effects off when the scene is too bright or too slow.
- **Backend** offers **Auto**, **WebGPU** and **WebGL**; the label next to it shows the backend actually in use. Switching keeps the camera where it was.
- **Legend** explains the colour families and the output and selected rings. **Search** opens a list of every star with its name, role and cluster; type to filter, move with the arrow keys, choose with Enter, and close with Escape.

With a mouse, drag to orbit the camera and scroll to zoom. Camera distance is clamped between 2 and 200, so the view cannot pass through the core or fly away.

### Galaxy keyboard shortcuts

Clicking the scene gives it keyboard focus, so the shortcuts below work without tabbing through the page first. A focus ring is drawn when the canvas is reached with the keyboard.

| Key | Action |
| --- | --- |
| `+`, `=` or the numeric keypad plus | Zoom in |
| `-`, `_` or the numeric keypad minus | Zoom out |
| `0` or Home | Reset the view |
| `F` | Fit all stars |
| Escape | Clear the current selection |

Shortcuts are ignored while the focus is in a text field, and while Control, Option or Command is held, so they never take over a system shortcut. Escape also clears a selection when the scene does not have focus, unless a field is focused.

### Selection and the details card

- Hovering a star shows a card with its name, role, type, size when known, and status. The card follows the pointer until you click.
- Clicking a star locks the card in place and adds the file ID. Clicking empty space, pressing Escape, or choosing another object clears it.
- Choosing a star in the Search list locks the same card. It does not move the camera.
- A click on a cluster selects it and clears the star card, but this build draws no cluster card, so the click leaves only the selection highlight.

## Expected result

- **Graph → Task Relations** draws the selected task's relation graph, and its details panel describes the node or edge you clicked.
- **Graph → Data Analysis** draws the result of the query you executed, with its node and edge counts, or explains why the result is empty.
- **File Galaxy** draws one scene from the local snapshot, and hovering or clicking a star describes that exact file record.
- Neither page edits your files: a graph or a galaxy view is a read of local records. Removing a record outside these pages changes what they draw.

## Common errors and limitations

| What you see | What it means | What to do |
| --- | --- | --- |
| The **Graph** or **File Galaxy** icon is disabled | The account has no verified Pro entitlement, is signed out, or the build does not include the capability | Sign in with a Pro account, or stay in the workspace. The tooltip names the reason |
| A banner after opening the page: `Sign in and upgrade to Pro to use this feature.` | The route guard refused the page before it mounted | Same as above; the workspace remains usable |
| A render-error banner with the code `limit-exceeded`, `invalid-config` or `unsupported-layout` | The graph is larger than the renderer accepts, the layout configuration is invalid, or the D3 renderer does not support the chosen layout | Use a smaller query, raise the limit only up to 1000, pick another layout, or reload the layout parameters. The banner names the cause and the hint |
| `Invalid relation data` | The relation artifact has duplicate node IDs, edges pointing at missing nodes, more than 800 nodes, or more than 2000 edges | Rerun the task that produced the artifact; this page will not draw a payload it cannot lay out |
| `Artifact file missing` | The artifact record survived but its file did not | Rerun the task, or restore the artifact file |
| `No relation artifact` | The task finished without a relation-graph artifact | Choose another task. Not every task produces relations |
| The **Graph DB** list is empty, or asks for a workspace | No workspace was available, or the workspace has no graph database yet | Open the workspace first, then use **Import** to create a database |
| `Truncated` in the query result panel | The database returned fewer rows than the query matched | Narrow the filters or raise the limit, up to 1000 |
| **Backend** is set to WebGPU and a fallback notice appears | WebGPU was unavailable or failed to initialize, so the scene switched to WebGL | Continue with WebGL, or retry WebGPU after checking the graphics environment |
| `WebGL context lost` overlay | The GPU driver reset the context, for example after sleep or a memory shortage | Wait for the driver to restore the context; the overlay clears itself. Use **Retry** if it stays |
| A task or task-file limit notice appears | The default snapshot limits task clusters to 200 and task input/output files to 5000; imported directory and ungrouped files are handled separately | The scene is partial. Use **Refresh** after the underlying records change; refreshing alone does not raise the limits |
| A snapshot refresh or incomplete-data notice appears | The last successful scene is being shown after a failed refresh, or some snapshot items could not be read | Choose **Refresh** and investigate persistent problems with support |
| The scene is slow or the fans spin up | The 3D scene animates continuously while rotation is on | Turn off **Auto Rotate** and **Task Rotate**, or switch the backend |
| Nothing happens on an arrow key or Enter | The scene or the search list does not have focus | Click the scene, or open **Search** and use its list |

Additional limitations of this build:

- Dragging a star or a cluster is not wired to the scene, so positions cannot be rearranged. Nothing is saved if you expect that.
- Selecting a cluster shows no details card, only the highlight, because the card is only implemented for files.
- The graph canvas always uses the D3 renderer here; the WebGL 3D layout is not selectable from this page.
- The galaxy is a local view. It shows no server-side or cloud-only records that are absent from this Mac's database.
- Windows and Linux packages are not available, and a Windows build's capability table marks `graph.explore` and `galaxy.explore` unavailable, so both pages are refused there as a missing capability.

## Support and version

- **Settings → About** shows the app version, build, commit, channel, platform and architecture. Include them when you report a problem.
- This page documents only behaviour checked against the current source. A control that is described nowhere is not documented yet; do not assume it works.
- Contact [info@moewolf.com](mailto:info@moewolf.com) with the exact message, the task ID or database name, whether the Graph or the File Galaxy page was open, and your channel (Direct or Mac App Store). Do not send a full customer file.

## Related links

- [Tasks](./tasks.md)
- [Files and imports](./files.md)
- [Free and Pro](./free-pro.md)
- [Agents, MCP and providers](./agents-and-mcp.md)
- [Settings](./settings.md)
- [Troubleshooting](./troubleshooting.md)
- [Limitations](./limitations.md)

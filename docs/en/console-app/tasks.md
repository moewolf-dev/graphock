---
documentation_status: draft
---

# Tasks

A task is one submitted request over the selected inputs. Graphock stores the task, its events and its artifacts in the local database, and every surface reads the same record: the workspace history, the task detail, and the **Tasks** page.

## Prerequisites

- At least one imported input. See [Files](./files.md).
- A format the build can process. The app checks the selected files before submitting; see [formats and limits](./formats-limits.md).
- For the **Tasks** page and the other Pro-gated areas: a signed-in account with a verified Pro entitlement. Local parse operations are not Pro-gated, but the page is.
- For a cloud task: a signed-in account, a reachable service, and remaining monthly cloud allowance.

## Steps

### Start a task

1. Open **Workspace** and select the inputs in **Imported Files** or **Task Output Files**.
2. Describe the request in the request box, or apply a feature or template. In a build that offers them, also choose the model, the parsing services and the output type.
3. Choose the round submit control labelled **Start Task**.
4. The control is enabled only when the request is complete: at least one input, and a prompt or a selected feature. When the model and service controls exist, a stale model selection or a service conflict keeps it disabled.
5. Graphock checks the selected files before submitting. When every file is supported, the request is submitted directly; otherwise a dialog reports the unsupported or blocked files.
6. The new task is created, selected, and added to the workspace task history.

In the App Store local-parser profile the request box has no template, model, service or output controls. It states that the bundled parser runs on this Mac and that templates, models and Python services do not run.

### Follow a running task

- **Task History** in the workspace lists the tasks of the current workspace. Selecting one opens its detail above the list.
- The detail shows the task title, status, task ID with a copy button, the input count, the created time, a progress bar, a status line, the engine running the work when it is reported, and **Live output**.
- While a task is active the status line can read `stage parsing`, `waiting: ...`, or **Still running (checking… may be stalled)**. The last one means the app has not seen recent progress; it is not a failure.
- The **Tasks** page shows one row per task with a status dot, the input name, the run mode, the status, a queue badge when the task is queued, the stage, the percent, the created time, and the summary line for the whole list, for example `3 completed, 2 failed`. A running row also shows a progress bar, and a failed row shows its error message.

### Open the result

- **Show Result** on the **Tasks** page renders the stored result: JSON is pretty-printed, and any other payload shows up to 2,000 characters.
- Expanding a row on the **Tasks** page lists its artifacts with **Open**, **Reveal** and **Export**. **Task Output Files** in the workspace tree shows the same artifacts for completed tasks.
- An artifact can be used as the next input when its producer allows it. Text-like outputs (md, txt, json, csv, tsv, html, yaml, xml) qualify unless the producer declares otherwise.
- An artifact list can be empty. That is a real result, not a loading state, and each surface says so instead of leaving a spinner.

### Cancel a task

1. Choose **Cancel** on the **Tasks** page row, or the cancel control on the workspace task card.
2. The action is offered only while the app reports the task as cancellable, which covers the queued, preparing, running and processing range. The app's own capability flag decides. A failed, cancelled, interrupted or expired task offers **Retry** instead, and a completed task offers neither action.
3. The status changes to **Canceling**, then **Cancelled**. A cancelled task is not a failed one and keeps a neutral status tone.

### Retry a task

**Retry** is offered for failed, cancelled, interrupted and expired tasks. A completed task cannot be retried, and the detail says so. Retry re-runs the same task record, so the history keeps one entry instead of adding a second.

## States and progress

| Status shown | Meaning |
| --- | --- |
| Creating | The record exists and preflight has not finished |
| Queued | Waiting for the runtime. The row shows the queue position and how many tasks are ahead when the main process reports them |
| Preparing | An attempt is claimed and the inputs are being prepared |
| Running | Work is executing. A percentage appears when the runtime reports one |
| Canceling | Cancellation was requested and is not final yet |
| Completed | Terminal success |
| Failed | Terminal failure. The error message and diagnostics are shown |
| Cancelled | Terminal. Cancelled by request |
| Interrupted | Terminal. The run was interrupted, for example when the app stopped |
| Expired | Terminal. The task's queue entry or lease expired |

Cloud compatibility statuses `downloading` and `uploading` are shown as **Running**. Stored history is never rewritten to match the display.

A started task is not a finished task, and a queued task is not a completed task. Check the status and the artifacts instead of assuming the work finished.

## Free and Pro

Feature access is decided in the app's main process and only displayed by the interface. Nothing in the interface can grant Pro.

- Without an account: local parsing (`parse.local`) and local settings (`settings.local`). The local parse operations behind task submission, the local task list, cancel, retry and artifact reads are in that group.
- With a signed-in account: cloud parsing and every Graphock backend call. Cloud parsing stops when the monthly allowance is used up, and the app reports that as a quota denial.
- With a verified Pro entitlement: the **Tasks** page, **Templates**, **Graph**, **File Galaxy** and **Reports** (`tasks.manage`, `templates.manage`, `graph.explore`, `galaxy.explore`).
- A submission that needs a workspace also needs Pro: creating or reading a workspace is a Pro-gated operation (`tasks.manage`), so a build that submits through a workspace refuses the request without Pro and reports the reason instead of starting work. The App Store local-parser path does not create a workspace.
- Pro does not raise the cloud allowance, add priority queueing or add storage. Purchasing is coming soon, and this page quotes no price. See [Free and Pro](./free-pro.md).

| Message | Meaning |
| --- | --- |
| Sign in to use this feature. | The action needs a Graphock account |
| Sign in and upgrade to Pro to use this feature. | The account is signed in but has no verified Pro entitlement |
| This build does not include this capability. | The installed build does not contain the required component |
| This month's cloud allowance is used up. | The monthly cloud allowance is exhausted or reserved until the next UTC month |

## Expected result

- The submitted task appears in the history with **Creating** or **Queued**, then reaches a terminal status without further input.
- A completed task's artifacts appear under **Task Output Files** and on the **Tasks** page.
- A failed task shows its error text and diagnostics instead of an empty result.

## Common errors

| What you see | What it means | What to do |
| --- | --- | --- |
| Nothing happens after **Start Task** | The control was disabled (no input, or no prompt and no feature), the file check did not finish, or a workspace could not be created | Complete the request, read the message under the request box, and submit again |
| The selected model is no longer available. Choose another. | The configured model was removed or disabled | Pick another model, or configure the provider in **Settings → AI Providers** |
| VLM is not suitable for an explicitly text-only selection. | Every input is text and the only service is a vision model | Add a parser service or choose a VLM-compatible input |
| File parsing cannot read an explicitly image-only selection. | Every input is an image and the only service is a plain parser | Add a VLM or OCR service |
| The task workspace is no longer available. | The workspace record was removed | Import the input into the current workspace and submit again |
| This workspace cannot run local tasks. | The workspace belongs to the other runtime target, for example a cloud workspace while submitting locally | Switch the run mode, or use the matching workspace |
| The task workspace is not writable. Check permissions and try again. | The input or output folder cannot be written | Fix the folder permissions, or re-import into a new workspace |
| The task input could not be found. / One or more input files are no longer available. | A selected file was moved, replaced or deleted | Refresh **Imported Files**, select the file again, and submit |
| Not enough free disk space to start this task. | The volume holding the workspace is full | Free space and retry |
| Task inputs could not be prepared. Please try again. | Staging the inputs failed | Retry once. If it repeats, check disk space and folder permissions |
| The task failed. | The engine reported a failure without a more specific message | Read the diagnostics and the last event, then retry |
| The task stays **Queued** | The runtime has not claimed it yet, or it is waiting behind other work | A queued task is not a completed task. Wait, check the runtime status, or cancel it |
| The **Tasks** entry is disabled, or the page returns to the workspace with a banner | The feature guard denied `tasks.manage`, so the app did not mount the page | Sign in with a Pro account, or keep working in the workspace |

## Support and version

- **Settings → About** shows the app version, build, commit, channel, platform and architecture. Include them when you report a problem.
- This page documents only behaviour checked against the current source. A control that is described nowhere is not documented yet; do not assume it works.
- Contact [info@moewolf.com](mailto:info@moewolf.com) with the exact message, the task ID, the input type and size, and your channel (Direct or Mac App Store). Do not send a full customer file.

## Related links

- [Files and imports](./files.md)
- [Formats and limits](./formats-limits.md)
- [Free and Pro](./free-pro.md)
- [Settings](./settings.md)
- [Troubleshooting](./troubleshooting.md)

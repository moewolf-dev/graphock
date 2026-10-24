---
documentation_status: current
reviewed_at: 2026-10-15
---

# Start with a file workspace

Begin with a few non-sensitive files whose contents you can check. This makes it easier to distinguish an import problem from a task or provider configuration problem.

## A first session

1. Install the desktop package for your operating system from the website download page.
2. Sign in through the desktop application's login flow.
3. Select a local or cloud workspace supported by your account.
4. Open Files and use Import File. Confirm that the file list contains the expected names, types and sizes.
5. Configure the runtime and provider required by your task in Settings.
6. Return to the local or cloud workspace, select the input files there, and follow the task steps below. Inspect the output and compare a few extracted fields against the original material.
7. Open Graph to inspect task relationships or structured data, or open File Galaxy to explore the workspace's file connections.

## Run the first task

1. In the selected workspace, import a small file through the import area or select an existing input. Check the selected-input list; a file appearing in Files is not enough to select it for this task.
2. Choose a suitable feature/template or enter your request in the prompt box. For a readable text file, start with a short summary request and compare the result with the original.
3. Check the model, parsing services and output type in the controls below the prompt. Use a configured model or a valid default. Resolve model/service warnings before submitting.
4. Choose the upward-arrow submit button at the bottom right of the prompt box, labelled Start Task. If it is disabled, check selected inputs, the request or feature, and configuration warnings. If a file-support check blocks the request, inspect its message and adjust the inputs or processing setup.
5. Review the task status and generated files in the task/result area. A submitted task is not a completed task. Open the output and verify it before processing more files.

## Before increasing the batch

Check that the chosen service is available, the model supports the requested input and the output format fits your use case. File import is not proof that every processing adapter supports that file. Provider limits and failures should be resolved on a small task before processing a larger collection.

Continue with [file import](../get-data/index.md) and [service configuration](../get-data/connect-sources.md).

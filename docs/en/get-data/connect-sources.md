---
documentation_status: current
reviewed_at: 2026-10-15
---

# Configure processing services

Configure model and processing services in the desktop Settings provider section. These adapters are distinct from importing input files.

## Registered adapter families

| Adapter | Configuration boundary |
| --- | --- |
| OpenAI-compatible API | Requires a compatible endpoint, supported model and credentials. API compatibility is not certification of every provider or model. |
| Ollama | Requires a running local Ollama service and an installed model. |
| Ollama Vision | Requires a vision-capable local model and image input compatible with the adapter. |
| Z.AI GLM-OCR | Requires the service's supported endpoint/model and credentials. |
| Alibaba Qwen OCR | Requires the service's supported endpoint/model and credentials. |
| Hugging Face image-to-text | Experimental vision/image-to-text adapter, not a registered OCR adapter. Requires a compatible endpoint and model; verify output with a small task. |

Set the endpoint, model and credentials required by the selected adapter. Test a small task before using the configuration for a larger batch. A service's presence in the registry does not guarantee that your account has access to it.

## Processing and privacy

Local services require a running runtime. Remote providers apply their own pricing, usage limits and data policies. Cloud availability depends on workspace configuration and account permissions. Dedicated Azure, Google Cloud, AWS and Unstructured document connectors are not part of this verified adapter list.

Do not paste credentials into prompts, screenshots or public support reports.

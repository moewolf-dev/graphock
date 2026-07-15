# Graphock

Graphock is the public coordination repository for community templates, public documentation, licensing notices, and future release indexes for the Graphock project.

This repository is public, but it is not a blanket open source grant for every file in the tree. See [LICENSE_POLICY.md](LICENSE_POLICY.md) before reusing code, documentation, templates, release metadata, or third-party notices.

## Current Scope

- `community/templates/` stores reviewed community template submissions.
- `schemas/` contains byte-for-byte public copies of selected canonical schemas from `graphock-harness-spec`.
- `docs/` is the public documentation index.
- `licenses/` and `THIRD_PARTY_NOTICES.md` track licensing and redistributed third-party materials.
- `releases/` is reserved for release metadata and checksums. Do not commit large binary artifacts here.

## Validation

```bash
npm ci
npm run validate
```

The validator checks schema lock integrity and community template structure. Empty template directories are valid; external submissions remain closed until the template license allowlist is explicitly approved in `LICENSE_POLICY.md`.

## Template Contributions

Community templates are submitted by pull request under `community/templates/`. See [community/templates/README.md](community/templates/README.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

---
documentation_status: draft
---

# Requirements

## Operating system

- macOS 13.3 (Ventura) or later. The application declares 13.3 as its minimum system version; older releases are not supported.
- Apple silicon or Intel, according to the download offered for your Mac. If no package is listed for your architecture, that build has not been published.
- Windows and Linux packages are not released. Configuration files for those platforms are placeholders and must not be treated as a download promise.

## Hardware

There is no published minimum CPU or memory figure for parsing. Two practical limits apply instead:

- Local parsing is bounded per file: see [formats and limits](./formats-limits.md).
- The blur and glass rendering modes are optional. On a Mac that reports fewer than 4 CPU cores, less than 8 GB of memory, an unknown capability set or macOS below 13, Graphock starts in the basic rendering mode and leaves the effect off. You can change it in **Settings → General** under **Graphics rendering**. The basic mode is always available.

## Permissions

- **Files and folders:** macOS asks for access when you import outside the app container. Grant the narrowest folder you need. A denied permission blocks the import; it is not reported as an unsupported format.
- **Local network:** browsing SMB/NAS hosts requires the Local Network permission. Graphock does not scan your network; it connects only to hosts you configure.
- **Browser return:** sign-in opens your browser and returns through the app's registered URL scheme (`graphock-direct://` for the Direct build, `graphock://` for the Mac App Store build). If the scheme is blocked, the app cannot complete sign-in.

## Network and account

- Local parsing works offline. No account is required for a local workspace.
- Sign-in, cloud parsing, entitlement checks and updates contact Graphock services. A proxy or firewall that blocks those endpoints leaves the app in an unauthenticated or offline state.
- Cloud processing sends the files you submit to the configured service. Review the provider's retention policy before sending sensitive material.

## Disk

Allow space for imported files, generated outputs, task records and local graph databases. The app does not duplicate every imported file, but generated artifacts and exported databases consume additional space. Removing a workspace record does not delete your original files.

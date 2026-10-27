---
documentation_status: draft
---

# Install Graphock

## Direct download

**Status: available when a signed package is listed on the download page.**

1. Open [graphock.com/download](/download) and choose the package for your Mac. Both Apple silicon and Intel packages are offered only when they have been built and signed for release.
2. Open the `.dmg` and drag **Graphock** to **Applications**, or unzip the `.zip` and move the app yourself.
3. Start Graphock from Applications. macOS may ask you to confirm that the app was downloaded from the internet.
4. If macOS reports that the app cannot be verified or is damaged, stop. Do not disable Gatekeeper or remove quarantine flags. Report the exact message to support with your macOS version and the package name.

A package that is not listed on the download page has not been published. Do not install a build from an unofficial mirror.

## Mac App Store

**Status: coming soon.** The Mac App Store build is not published. When it is available, purchase and installation will go through the App Store, and the App Store will own updates.

## Installing both builds

Side-by-side installation and isolation of local data between the Direct and Mac App Store builds have not yet been verified. Do not rely on both builds coexisting until this is confirmed for the released packages. Pro and the cloud allowance are intended to follow the same Graphock account across channels.

## Updates

- **Direct build:** Graphock can check the release catalog and tell you when a newer Direct version exists. Installation is a manual download; there is no silent self-update.
- **Mac App Store build:** updates are delivered by the App Store. The Direct catalog is not queried.

## Uninstall

1. Quit Graphock.
2. Move Graphock from Applications to the Trash.
3. If you choose to remove local app data, first back up any workspaces and task records you need. The location can depend on the build and its sandbox; do not assume removing a single folder clears both builds. Removing local data does not delete your Graphock account or cloud data.
4. To delete the account itself, use [account deletion](./account-deletion.md). Uninstalling is not a deletion request.

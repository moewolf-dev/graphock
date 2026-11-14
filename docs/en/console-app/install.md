---
documentation_status: draft
---

# Install Graphock

## Direct download

**Status: available when a signed package is listed on the download page.**

1. Open [graphock.com/download](https://graphock.com/download) and choose the package for your Mac. Both Apple silicon and Intel packages are offered only when they have been built and signed for release.
2. Open the `.dmg` and drag **Graphock Direct** to **Applications**, or unzip the `.zip` and move the app yourself. The Mac App Store build is named **Graphock**.
3. Start the app from Applications. macOS may ask you to confirm that it was downloaded from the internet.
4. Sign in with your Graphock account. The Direct build requires an account before the workspace opens; see [Sign in](./sign-in.md).
5. If macOS reports that the app cannot be verified or is damaged, stop. Do not disable Gatekeeper or remove quarantine flags. Report the exact message to support with your macOS version and the package name.

A package that is not listed on the download page has not been published. Do not install a build from an unofficial mirror.

## Mac App Store

**Status: not published yet.** When it is available, the App Store edition is a one-time paid download that includes every local feature. The purchase and installation go through the App Store, the App Store owns updates, and no Graphock account is needed for local work. Signing in is only required for cloud parsing.

## Installing both builds

The Direct and Mac App Store builds are separate licences and namespace their local data separately. Do not expect one purchase to unlock the other, and do not assume that removing one build removes the other build's data. Side-by-side installation on the released packages is verified as part of the release checklist before the App Store listing goes live.

## Updates

- **Direct build:** Graphock can check the release catalog and tell you when a newer Direct version exists. Installation is a manual download; there is no silent self-update.
- **Mac App Store build:** updates are delivered by the App Store. The Direct catalog is not queried.

## Uninstall

1. Quit the app.
2. Move **Graphock Direct** (or **Graphock**, for the Mac App Store build) from Applications to the Trash.
3. If you choose to remove local app data, first back up any workspaces and task records you need. The location can depend on the build and its sandbox; do not assume removing a single folder clears both builds. Removing local data does not delete your Graphock account or cloud data.
4. To delete the account itself, use [account deletion](./account-deletion.md). Uninstalling is not a deletion request.

---
documentation_status: current
reviewed_at: 2026-10-14
---

# Install and sign in

Download a desktop package matching your operating system and architecture from the Graphock website. Keep the version information when reporting a problem; available packages and account access may change between releases.

## Sign-in flow

Open the installed application and use its login screen. The app starts a browser-based authentication flow. Complete that flow with your existing account, then return to the desktop app when prompted. The website's console login and the desktop callback have different destinations; do not replace a desktop callback with an unrelated web route.

If the browser finishes authentication but the app remains signed out, retry from the app and confirm that the operating system allowed the desktop callback to open the installed application. Do not paste access tokens or callback URLs into issue reports.

## Workspace access

Signing in is required for the current desktop application. Access to a cloud workspace or a particular processing service depends on account permissions and configuration. A successful sign-in does not guarantee that every provider is configured or that cloud processing is enabled.

After login, follow the [interface tour](./tour-interface.md). Never include credentials, account tokens or private files in a support message.

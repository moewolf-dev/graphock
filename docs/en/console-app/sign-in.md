---
documentation_status: draft
reviewed_at: 2026-10-24
---

# Sign in to Graphock

Signing in links the desktop app to your Graphock account. It is required for cloud parsing and Pro features. Local parsing does not require an account.

## What happens when you sign in

1. Graphock opens `graphock.com/console-login` in your default browser. The page explains that the Graphock app is opening sign-in and continues automatically.
2. Auth0 authenticates you with the method configured for your account.
3. The browser returns to the app through the app's registered URL scheme:
   - Mac App Store build: `graphock://callback`
   - Direct build: `graphock-direct://callback`
4. Graphock verifies the returned state and stores the session encrypted with the macOS keychain. Tokens are never written as plain text.

If the browser never returns to the app, the scheme is not registered or a browser extension blocked the redirect. Reopen the app and start sign-in again.

## The relay page

The relay page is a real page on graphock.com, not a web view embedded in the app. It shows the Graphock logo and localised copy and continues once per sign-in attempt. Adding `?auto=0` to its URL stops the automatic step and leaves the button available; that is useful when you want to check the page before continuing.

An invalid or expired sign-in link is reported on the page. The page never falls back to an account form of its own; authentication stays with Auth0.

## Sessions and account switching

- The app refreshes the session in the background. If the refresh fails, cloud and Pro actions are denied until you sign in again.
- Signing out clears the local session and discards in-flight cloud results from the previous session.
- Signing in with a different account replaces the session; local files and workspaces stay on the device.
- A Pro entitlement is verified by the service for the signed-in account. A local licence claim is never trusted.

## If you cannot sign in

- **No browser opens:** check the default browser and any URL-scheme blocking policy.
- **Wrong account:** sign out in the app and sign in again. Account deletion requires the same account that started the request.
- **Pro still denied after logging in:** open **Settings → General → Account** and check the entitlement source. Entitlement is re-checked when the session changes, so sign out and in again if it is stale. Purchases must be associated with the same Graphock account.
- **Cloud quota denied:** the monthly allowance is exhausted or reserved. Wait for the UTC month to roll over or check the allowance shown in the app.

See [troubleshooting](./troubleshooting.md) for error messages outside sign-in.

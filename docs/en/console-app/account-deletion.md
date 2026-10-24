---
documentation_status: draft
---

# Delete your account

Account deletion starts in the app and is verified by the Graphock service. It is separate from uninstalling the app or clearing local data.

## Before you start

- Deletion needs the same Graphock account that is signed in. Signing in with a different account is rejected.
- You will be asked to verify your identity again in the browser before the request is submitted.
- Original files and local workspaces stay on this device. They are not uploaded and are not deleted by the request.
- A deletion request may be saved on this device while it is unsubmitted. That draft still needs identity verification; it is not a completed deletion.

## Steps

1. Sign in and open **Settings → General → Account**.
2. Choose **Request account deletion**.
3. Read the warning and confirm that you understand local files stay on the device.
4. Type `DELETE` when asked.
5. Complete the secure browser verification.

## Status you may see

| Status | Meaning |
| --- | --- |
| Draft saved | The request exists on this device but identity verification is not complete |
| Deletion is in progress | The service accepted the request; cleanup is running |
| Deletion needs support review | The cleanup service paused the request and shows a code; keep the receipt and contact support |
| Account deletion is complete | The account and associated cloud data have been deleted |
| Deletion status is unavailable | The last saved status is shown, or the service cannot be reached; connect and refresh |

You can reopen the panel after signing out to check progress, but you must sign in with the same account to act on the request.

## After deletion

- Cloud data and the account itself are removed according to the service's deletion flow. A completed status is the confirmation.
- Local files and local workspaces remain. Remove them separately if you no longer need them.
- Temporary application cache is a separate choice offered after completion. Clearing it does not affect your original files.
- Pro entitlements tied to the deleted account cannot be transferred to a new account.

## If deletion is blocked

Read the reason shown in the panel instead of retrying repeatedly. A held purchase, an open dispute or a verification mismatch must be resolved first; support can explain the specific block without asking for your password.

---
documentation_status: draft
---

# Buying, restoring and editions

Graphock has two editions with different purchase models. Read [Direct and Mac App Store editions](./editions.md) first if you are not sure which one you installed.

**Status: the Direct Pro purchase is not on sale yet.** No website price is quoted here: an amount is only valid after the live checkout and product configuration are verified. The Mac App Store edition lists USD 39.00 in the App Store when it is available.

## Direct build: Free and Pro

The Direct build is free to download and requires a Graphock account when it starts.

### Buy Pro on the website

1. Open the pricing page and choose **Pro**.
2. The checkout shows the amount, the currency and the one-time nature of the purchase. This guide deliberately does not repeat a number.
3. Complete the payment with the same email address you use for Graphock, or sign in to the site first.
4. When the page returns, the site confirms the purchase and the desktop app picks up the entitlement the next time it refreshes your account.

If the checkout says the product is not configured, the store is not open yet. Do not retry a payment: nothing was charged.

### Check the plan in the app

1. Open **Settings → General → Account**.
2. Read the plan line and the cloud allowance line.
3. If it says Free while you expect Pro, sign out and back in before contacting support. The entitlement is read from the service, never from a local flag.

### Restore a Direct purchase

There is nothing to restore locally. A Direct Pro purchase belongs to the Graphock account that bought it; signing in on another Mac with the same account restores Pro. If the plan line is stale, sign out and sign back in.

Restoring never creates a second entitlement and never changes the account that owns the purchase.

## Mac App Store build

The App Store edition is a one-time paid download.

- The purchase happens in the App Store before installation; there is nothing to buy inside the app.
- Every local feature is included. No account is needed for local parsing, Files, settings or local tasks.
- There is no Pro state to restore in the app, and no purchase or upgrade button.
- Updates and refunds are handled by the App Store under Apple's terms.
- Signing in is only required for cloud parsing, within the monthly allowance.

## Editions are licensed separately

- A Direct Pro purchase does not unlock the App Store edition.
- The App Store purchase does not create Pro on a Graphock account.
- The monthly cloud allowance follows the signed-in Graphock account in both editions; Pro does not raise it.

## Refunds and old subscriptions

- **Direct:** a full Stripe refund revokes Pro for that purchase. Other purchases on the same account are unaffected.
- **Mac App Store:** refunds are handled by Apple; the app itself has no refund flow.
- Graphock no longer sells new subscriptions. Existing subscriptions, orders and invoices are not cancelled or erased by the one-time product. Their renewal, payment-failure and cancellation events continue to be processed.

## Not sold in mainland China

Neither edition is offered for sale in mainland China.

## Related pages

- [Direct and Mac App Store editions](./editions.md)
- [Free and Pro](./free-pro.md)
- [Sign in](./sign-in.md)
- [Account deletion](./account-deletion.md)

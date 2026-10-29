---
documentation_status: draft
---

# Buying and restoring Pro

Pro is a one-time purchase that unlocks the account-level features listed in [Free and Pro](./free-pro.md). This page covers where the purchase is made, how an existing purchase is restored, and what to check when the app says you are still on Free.

**Status: purchasing is not on sale yet.** No price is quoted here: an amount is only valid after the live checkout and product configuration are verified.

## Prerequisites

- A Graphock account you can sign in with. See [Sign in](./sign-in.md).
- For the website purchase: a browser and a payment method accepted at checkout.
- For the Mac App Store build: the App Store account that will own the purchase.
- The build you are using. The Direct build and the Mac App Store build obtain the same entitlement in different ways.

## Steps

### Check what the app currently reports

1. Open **Settings → Account**.
2. Read the plan line and the cloud allowance line.
3. If it says Free while you expect Pro, keep this page open and use **Restore purchases** (Mac App Store build) or sign out and back in (Direct build) before contacting support.

### Buy on the website

1. Open the pricing page and choose the Pro column.
2. The checkout shows the amount, the currency and the one-time nature of the purchase. This guide deliberately does not repeat a number.
3. Complete the payment with the same email address you use for Graphock, or sign in to the site first.
4. When the page returns, the site confirms the purchase and the desktop app picks up the entitlement the next time it refreshes your account.

If the checkout says the product is not configured, the store is not open yet. Do not retry a payment: nothing was charged.

### Buy in the Mac App Store build

1. Open **Settings → Account** in the App Store build.
2. Choose the Pro purchase action and confirm with the App Store sheet.
3. The app sends the signed transaction to the Graphock service, which records the entitlement for your account.
4. If the sheet reports that the product is unavailable, the release build has no configured product yet; the purchase is not possible in that build.

### Restore purchases

- **Mac App Store build:** open **Settings → Account** and use **Restore purchases**. The app asks the App Store for your past transactions, verifies each one with the service, and refreshes the plan line.
- **Direct build:** there is nothing to restore locally. The entitlement belongs to the signed-in account and is re-read from the service; sign out and sign back in if the plan line is stale.
- Restoring never creates a second entitlement and never changes the account that owns the purchase.

### After the purchase

- Free and Pro share the same monthly cloud allowance today; Pro does not raise it. See [Free and Pro](./free-pro.md).
- Both channels share Pro when they are tied to the same Graphock account.
- Signing out does not cancel a purchase.

## Expected result

- The plan line changes from Free to Pro after the service confirms the purchase, and the Pro-gated pages become reachable.
- A restored purchase produces the same plan line as a new purchase.
- The app never shows Pro because of a local flag: the entitlement always comes from the service.

## Common errors

| What you see | What it means | What to do |
| --- | --- | --- |
| `Checkout unavailable` | The website has no configured product or price yet | Wait for the store to open; nothing was charged |
| `Product not available` in the App Store sheet | The build has no configured App Store product | Use the released build once the product exists |
| Plan still shows Free after paying | The app has not refreshed the account yet, or the purchase used a different account | Open **Settings → Account**, sign out, sign in with the purchasing account, then restore |
| `Restore purchases` finds nothing | The App Store account has no Graphock purchase, or the build is the Direct build | Sign in with the account that owns the purchase; use restore only in the App Store build |
| Pro disappears after a refund | A full refund revokes Pro for that purchase | Contact [info@moewolf.com](mailto:info@moewolf.com) if the refund was not requested |

## Support and version

- Both channels require macOS 13.3 or later for the current build; see [requirements](./requirements.md).
- Purchase questions, invoicing and volume licensing: [info@moewolf.com](mailto:info@moewolf.com).
- Do not send full receipts or payment details in a support request; the transaction identifier is enough.

## Related links

- [Free and Pro](./free-pro.md)
- [Sign in](./sign-in.md)
- [Account deletion](./account-deletion.md)
- [Troubleshooting](./troubleshooting.md)

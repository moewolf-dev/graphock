---
documentation_status: draft
---

# Settings

Settings changes this installation. It needs no account, it is not synchronised to a Graphock account, and it does not change the website or your cloud data.

## Prerequisites

- Graphock Console is running.
- For provider, data-source and sidecar entries: the credentials and permissions those services require.
- For the **Databases** tab: a verified Pro entitlement, because its read-only inspection calls are Pro-gated.

## Steps

### Open Settings

Use the Settings control in the top bar. The window keeps the selected category and item, so a deep link reopens the same page, and an unknown item falls back to that tab's default entry.

### The tabs that exist

| Placement | Tab | Layout | What it contains |
| --- | --- | --- | --- |
| Top | **AI Providers** | Category, item list, detail | OpenAI-compatible, Ollama, DeepSeek, OpenRouter and Gemini text providers, the two vision (VLM) entries, and one entry per configured provider |
| Top | **File Providers** | Category, item list, detail | Azure Document Intelligence, Google Document AI, AWS Textract, Unstructured API |
| Top | **Sidecars** | Category, item list, detail | **Default**: OCR, Parser Lite, Parser Medium, Parser Heavy, VLM. **Third-party**: the engines this build ships. Group headings are labels, not pages |
| Top | **Data Sources** | Category, item list, detail | Local Data Sources, SMB / NAS, Cloud Storage (R2), Google Drive, Notion, Third-party Sources, plus one entry per authorized folder or share |
| Top | **MCP Settings** | Single page | The local MCP server: start and pair, rotate the pairing token, stop and revoke |
| Top | **Databases** | Category, item list, detail | Read-only inspection: App SQLite, the LadybugDB engine, and the registered databases |
| Top | **Demo Data** | Category, item list, detail | **App Demo Data**: load or clear the bundled sample package, with its version and counts |
| Bottom | **General** | Category, item list, detail | **General** (run mode, theme, rendering, language) and **Account** (profile, plan, cloud calls, sign-in, purchase state, account deletion) |
| Bottom | **Notification Settings** | Single page | The local notification list and the webhook configuration |
| Bottom | **About** | Single page | Version, build, commit, channel, platform, architecture, secret-storage availability, update check, developer profile |
| Bottom | **Privacy Policy** | Single page | Outbound data permissions and the privacy snapshot |
| Bottom | **Terms of Service** | Single page | The terms snapshot |

When the window is narrower than 900 pixels, the middle item list collapses and only the category and detail columns remain.

### Change appearance, rendering and language

Open **Settings → General → General**.

1. **Theme**: **Dark**, **Light** or **System**. **System** follows the macOS appearance and reacts when macOS switches.
2. **Graphics rendering**: **Basic (fastest, current look)**, **Dynamic blur** or **Liquid glass (experimental)**. Blur and glass use the galaxy backdrop and the window material, while 3D canvases always keep the basic interface.
3. **Language**: English or Chinese in this build.

The first run picks a concrete mode. A Mac with at least 4 CPU cores and 8 GB of memory on macOS 13 or later starts in **Dynamic blur**; a weaker Mac, a non-Mac host or an unmeasurable capability set starts in **Basic**. **Glass** is only ever chosen by you. When the system asks for reduced transparency, live blur is disabled and surfaces fall back to opaque.

### Choose a processing mode

**Settings → General → General → Run Mode** offers **Local**, **Cloud** and **Hybrid**. Local keeps the workspace local. In this build, Cloud and Hybrid both open the cloud workspace, and the top bar warns that cloud mode sends files and processing data off this device.

### Manage the account

**Settings → General → Account** shows the profile fields (email, nickname, subject, avatar), the **Plan** (`Local Free (not signed in)`, `Free` or `Pro`), the **Pro source** when Pro is verified (apple, web or direct), and **Cloud calls this month** as used / limit when the service reports an allowance.

- While signed out, the panel offers a sign-in entry: **Sign in to upgrade to Pro** in the Direct build, **Sign in to use an existing Pro account** in the App Store build.
- While signed in, it offers **Sign out**.
- Where purchasing is not connected, the panel says so instead of showing a price. Pro is never granted from the panel.
- The account deletion controls are at the bottom of the same page. See [delete your account](./account-deletion.md).

### Other tabs

- **AI Providers** and **File Providers** store credentials and test them against the service. A saved key is shown masked; the full value is not displayed again.
- **Sidecars** starts, stops and configures the bundled services and reports health. **Third-party** lists the engines the build actually ships; a catalog failure is reported inside that group and never hides the default five.
- **Data Sources** authorizes local folders, configures SMB shares, and lists the remaining source types. Cloud Storage (R2), Google Drive, Notion and Third-party Sources currently show that they have no user-controllable enable state yet; their switches stay disabled.
- **MCP Settings** binds a local listener to this Mac and stays off until you start it. The pairing token is shown once; starting again issues a new one, and stopping revokes the pairing.
- **Databases** is read-only. It shows the App SQLite file (path, readability, size, schema and migration versions, tables, views, indexes and foreign keys) and the LadybugDB engine with its registered databases. Inspection never modifies a database.
- **Demo Data** loads or clears the bundled sample package. A missing, corrupted or unsupported package is reported instead of loaded.
- **Notification Settings** lists local notifications and stores one webhook. The webhook must be a public HTTPS endpoint without embedded credentials; local and private destinations are blocked, and the first delivery waits for outbound consent. Registering a webhook needs a signed-in Pro session.
- **Privacy Policy** shows the outbound data permissions you granted, with a revoke action, and the privacy snapshot. Revocation stops future sends; data already delivered cannot be recalled.
- **Terms of Service** shows the bundled terms snapshot with its source commit and sync time.
- **About** shows version, build, commit, channel, platform and architecture, whether system secret storage is available, and a **Check for update** action. An App Store build states that updates are delivered by the App Store.
- **About → Developer Profile** loads the resolved user data folder and the current row counts.

## Where settings are stored

| What you change | Where it is kept |
| --- | --- |
| Theme, rendering mode, language, run mode, workspace view mode, pane sizes | This installation's own local app storage, inside the app's user data folder |
| Providers and API keys | Provider records in the app database; the secret itself is handed to the system secret storage. **About** shows whether that storage is available |
| Data-source authorizations and SMB shares | App database records, with the SMB password held as a secret |
| Sidecars and third-party engines | App database configuration, started and stopped from the **Sidecars** tab |
| MCP pairing | Issued by the local MCP server for this run; shown once |
| Notifications and webhook | App database records |
| Demo data | A projection in the app database, loaded from the bundled package |
| Privacy and Terms snapshots | Content bundled with the app, shown with its source commit and sync time |

These values are local: signing in on another Mac does not copy them. Whether the Direct build and the App Store build can be installed side by side and keep their data isolated has not been verified, so do not rely on two builds sharing or separating this data. See [install](./install.md).

## Reset and uninstall caveats

- Removing the app does not remove its data folder. Settings, file records, task history and artifacts stay on the device.
- There is no user-facing reset for all settings. **Settings → About → Developer Profile** offers **Reset dev data**, which only runs in a development profile and is rejected elsewhere; it is not a production reset.
- Clearing temporary cache is offered in the account-deletion panel after a deletion completes. It does not touch your original files.
- Maintenance operations that delete cache, task history, source authorizations or secrets exist in the app's main process but are not exposed in Settings in this build, so they are not documented here as user actions.
- The Direct build and the App Store build use different app names, so each resolves its own user data folder. Treat the isolation between two installed builds as unverified rather than guaranteed.

## Expected result

- The selected theme, rendering mode, language and run mode apply immediately and survive a restart.
- Settings you change in a tab are still there when you reopen the app, because they are written to the app's own storage and database.
- Signing out or changing accounts does not move or delete local settings, file records or workspaces.

## Common errors

| What you see | What it means | What to do |
| --- | --- | --- |
| The item list disappears | The window is narrower than 900 pixels | Widen the window. The category and detail columns still work |
| A tab opens a different item than the link named | The item no longer exists, for example a removed provider, sidecar engine or data source | The tab falls back to its default entry. Select the item again |
| Blur or glass does not appear | The Mac is below the thresholds, its capability set is unknown, or the system requests reduced transparency | Stay on **Basic**. The app does not fake the effect |
| A provider asks for its key again | Secret storage is unavailable in this environment, so keys cannot persist | Check the state in **About**, and configure the key again while storage is available |
| Sign in to use this feature. / Sign in and upgrade to Pro to use this feature. | The read behind that tab is session- or Pro-gated, for example database inspection or a webhook save | Sign in with an account that has Pro, or leave that tab alone |
| Reset rejected: Reset is only allowed on the dev profile | **Reset dev data** applies to a development profile only | Nothing to fix in a released build. Back up the data folder before removing anything by hand |
| Failed to check for updates | The Direct release catalog cannot be reached, or update checks do not apply to this build | Retry later; an App Store build is updated by the App Store |
| MAS sandbox active: … unavailable; templates requiring these capabilities will be limited. | A sandboxed App Store build does not include those capabilities | Use a capability the build lists, or the Direct build |

## Support and version

- **Settings → About** shows the app version, build, commit, channel, platform and architecture. Include them when you report a problem.
- This page documents only the tabs and behaviour present in the current source. A tab described nowhere is not documented yet; do not assume it exists.
- Contact [info@moewolf.com](mailto:info@moewolf.com) with the exact message and your channel (Direct or Mac App Store). Do not send passwords, API keys or full customer files.

## Related links

- [Install Graphock](./install.md)
- [First session](./quick-start.md)
- [Files and imports](./files.md)
- [Tasks](./tasks.md)
- [Sign in](./sign-in.md)
- [Delete your account](./account-deletion.md)
- [Troubleshooting](./troubleshooting.md)

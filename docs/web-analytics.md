# Web Analytics and campaign attribution

The public locale layout mounts one `SiteAnalytics` component inside Suspense.
It uses `@vercel/analytics/next` for pageviews and Next.js route changes. Do not
add the old manual tracking script alongside it.

## Campaign policy

- Save the last tagged visit in `sessionStorage` for the current tab's session.
- Keep that campaign across untagged navigation, language changes and reloads.
- A new tagged visit replaces the previous campaign as a whole, without mixing labels.
- New direct sessions have no manufactured source or campaign.
- Allow `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term`.
- Labels may contain letters (including Arabic), numbers, spaces, dots,
  underscores and hyphens, up to 80 characters. Do not put personal details in labels.
- Never store the raw query string, ad click IDs or referrer URLs. Before sending
  analytics, remove unapproved query parameters and fragments from event URLs.
- If browser storage is unavailable, attribution remains in memory until a full
  reload; contact and navigation continue to work.

## Conversion events

| Event | Trigger | Properties |
| --- | --- | --- |
| `whatsapp_click` | Primary or middle click on a `https://wa.me` link | `locale`, `placement`, saved UTM labels |
| `enquiry_submitted` | Contact server action returns `ok: true` | `locale`, `form`, saved UTM labels |

WhatsApp clicks indicate intent, not confirmed messages or sales. No event includes
the WhatsApp URL/message, name, email, phone, organisation or project brief.
Failed, rejected and honeypot enquiries do not emit a success event. Analytics
failure does not change the contact form's result. Enquiries keep the campaign
labels in their existing `vision` details, requiring no database migration.

## Verification

Run `npm test -- contract/campaign-attribution.test.ts contract/campaign-session.test.ts
components/analytics/SiteAnalytics.test.tsx components/sections/StudioContact.test.tsx`,
then `npm run typecheck` and `npm run build`.

For a production smoke check in a regular browser, enter through a tagged link,
navigate to another public page and check that the analytics script loads once.
Observe the SDK's view/event requests in Network and the Production analytics
dashboard. Automated/headless traffic may be excluded by Vercel. Avoid submitting
fake enquiries to the live database.

Web Analytics must be enabled on the Vercel project before deployment. The Vercel
UTM dashboard requires Web Analytics Plus or Enterprise; Pro supports custom events.
This change does not enable or purchase an add-on. Saved campaign labels in enquiries
and conversion event properties do not depend on the UTM dashboard panel.

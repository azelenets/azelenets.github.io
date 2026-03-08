# Analytics Setup (GTM + GA4)

This project uses Google Tag Manager container `GTM-KFBC3XH2` and pushes events through `dataLayer`.

## Implemented Events

### `virtual_page_view`
Pushed on each React Router route change.

Payload:
- `page_path`
- `page_location`
- `page_title`

### `consent_status_updated`
Pushed when user selects consent in the privacy banner.

Payload:
- `consent_choice` (`accepted` | `rejected`)

### `cta_click`
Pushed when user clicks elements tagged with `data-cta-id`.

Payload:
- `cta_id`
- `cta_section`
- `cta_label`
- `page_path`

### `outbound_click`
Pushed when user clicks external links (`http/https` to another origin) or `mailto:` / `tel:`.

Payload:
- `link_url`
- `link_domain`
- `link_text`
- `page_path`

## Consent Mode

Default consent is set in `index.html` before GTM loads:
- `analytics_storage: denied`
- all ad storage/signals: `denied`
- `functionality_storage: granted`
- `security_storage: granted`

User choice is persisted in:
- `aegis_consent_choice` (`accepted` | `rejected`)

## GTM Configuration

## 1) Data Layer Variables
Create Data Layer Variables in GTM:
- `DLV - page_path` -> `page_path`
- `DLV - page_location` -> `page_location`
- `DLV - page_title` -> `page_title`
- `DLV - consent_choice` -> `consent_choice`
- `DLV - cta_id` -> `cta_id`
- `DLV - cta_section` -> `cta_section`
- `DLV - cta_label` -> `cta_label`
- `DLV - link_url` -> `link_url`
- `DLV - link_domain` -> `link_domain`
- `DLV - link_text` -> `link_text`

## 2) Triggers
Create Custom Event triggers:
- `CE - virtual_page_view` for event name `virtual_page_view`
- `CE - cta_click` for event name `cta_click`
- `CE - outbound_click` for event name `outbound_click`
- `CE - consent_status_updated` for event name `consent_status_updated` (optional observability)

## 3) Tags (GA4)
Create GA4 Event tags:

1. `GA4 - virtual_page_view`
- Event name: `page_view` (or `virtual_page_view` if you prefer custom naming)
- Trigger: `CE - virtual_page_view`
- Params:
  - `page_path` = `{{DLV - page_path}}`
  - `page_location` = `{{DLV - page_location}}`
  - `page_title` = `{{DLV - page_title}}`

2. `GA4 - cta_click`
- Event name: `cta_click`
- Trigger: `CE - cta_click`
- Params:
  - `cta_id` = `{{DLV - cta_id}}`
  - `cta_section` = `{{DLV - cta_section}}`
  - `cta_label` = `{{DLV - cta_label}}`
  - `page_path` = `{{DLV - page_path}}`

3. `GA4 - outbound_click`
- Event name: `outbound_click`
- Trigger: `CE - outbound_click`
- Params:
  - `link_url` = `{{DLV - link_url}}`
  - `link_domain` = `{{DLV - link_domain}}`
  - `link_text` = `{{DLV - link_text}}`
  - `page_path` = `{{DLV - page_path}}`

Recommended:
- Keep one pageview strategy only. If using `virtual_page_view` tag above, disable duplicate auto-pageviews from other GA4 tags/triggers.

## QA Checklist

1. Open GTM Preview (Tag Assistant).
2. Verify `consent_status_updated` appears after banner choice.
3. Navigate across routes and verify exactly one `virtual_page_view` per route.
4. Click tracked CTA buttons and verify `cta_click` payload values.
5. Click external links and verify `outbound_click` payload values.
6. Verify GA4 DebugView receives events with expected parameters.
7. Publish GTM container with version notes.

## Tracked CTA IDs

Current IDs in code:
- `nav_contact_mobile`
- `nav_contact_desktop`
- `hero_deploy_solution`
- `hero_view_stack`
- `protocols_view_credentials`
- `protocols_explore_arsenal`
- `mission_download_cv`
- `footer_privacy_policy`

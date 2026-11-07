# Uproc Make Integration

> Official [Uproc](https://uproc.io) integration with [Make](https://www.make.com/) (formerly Integromat).
> 
> Status: ✅ **Approved and published** (09/13/2022)
> 
> **🔗 Official Integration on Make App Store:** https://www.make.com/apps/uproc
>
> **🔗 469 Data Tools Catalog:** [uproc.io/applications/data-validation/tools](https://uproc.io/applications/data-validation/tools)

---

---

## Available Tools

Uproc exposes **469 data validation, enrichment and transformation tools** across 12 categories:

| Category | Count | Examples |
|----------|-------|----------|
| **Audio** | 3 | Speech by text, Text by speech, Advanced speech by text |
| **Communication** | 70 | Email exists, Mobile lookup, LinkedIn profiles, Social networks |
| **Company** | 42 | Company by CIF/domain/name, Financial data, Decision makers, Social profiles |
| **Finance** | 29 | IBAN validation, BIC lookup, Crypto wallet, VAT, Currency conversion |
| **Geographic** | 83 | Address validation, Coordinates, Air quality, City/Zipcode/Phone lookup |
| **Image** | 8 | OCR, QR code decode/encode, Barcode, EXIF metadata, Screenshot |
| **Internet** | 51 | Domain check, Whois, DNS, IP lookup, URL analysis, Technologies |
| **Numbers** | 12 | Prime, Even/Odd, Valid decimal, Modulus, Number comparison |
| **Personal** | 58 | Name validation, DNI/NIE/NIF, Age ranges, Person lookup, LinkedIn/Twitter URI |
| **Product** | 37 | ISBN, EAN, UPC, VIN, ASIN, Book lookup, Product by barcode |
| **Security** | 5 | Luhn/UUID, Password strength, Domain/IP blacklists |
| **Text** | 71 | String validation, List operations, Sentiment, Markdown/HTML, Translation, Hashing |

👉 **See the full catalog with descriptions and pricing:** [Uproc Data Tools](https://uproc.io/applications/data-validation/tools)

## What this integration is

This folder contains the complete source code of the official Uproc integration on Make, implemented as a [Custom App](https://www.make.com/help/custom-apps).

**Important:** This integration only exposes Uproc's **Data Process tools** (email validation, enrichment, lookup, etc.). It does **NOT** expose platform modules (Document Ingest, Approval Management, Campaign Automation, etc.).

The modules available from Make are:
- **Select a Tool** → Run any Data Process tool from Uproc
- **Make an API Call** → Make generic API calls to Uproc's `/process` endpoint

This integration allows Make users to use Uproc's ~400 tools to process data:
- Validate emails
- Look up company data
- Check IBANs
- Get geographical data
- And many more...

## Project structure

```
uproc-make/
├── 01-base/             # Base API configuration (URL, headers, sanitization)
├── 02-connections/      # Connections and authentication (email + API key)
├── 03-webhooks/         # Webhooks (not implemented — Make doesn't support webhooks for Custom Apps)
├── 04-modules/          # Main modules (data process tools only):
│   ├── Make an API Call/  # Generic calls to /process endpoint
│   └── Select a Tool/     # Run data process tools (VERIFIED)
├── 05-remote_procedures/ # Remote procedures to list data process tools
├── 06-iml_functions/    # Make functions (listfields, prepareWebhook, showErrors)
├── 07-groups/           # Module groups (Other)
├── 08-readme/           # README (how-to connect)
├── 09-review/           # Review status (approved 09/13/2022)
├── 10-app_flow/         # Publication flow
├── 11-components_map/   # Visual components map (components_map.jpg)
└── README.md            # This file
```

## Integration modules

### 1. Select a Tool (main module)

Runs any Uproc Data Process tool.

**What it does:**
- Execute Uproc processors from Make (email validation, enrichment, lookup, etc.)
- Supports all available data process processors in Uproc
- Returns results directly in the Make workflow

**Input parameters:**
- `tool` → Processor name (e.g., "check-email-exists", "get-company-financial-by-name")
- `params` → Processor-specific parameters (JSON)

**Usage example:**
```
Make: Google Sheets (Trigger) → Uproc: Select a Tool (check-email-exists) → Make: Google Sheets (Update)
```

### 2. Make an API Call

Generic API calls to Uproc's `/process` endpoint.

**What it does:**
- Run any Uproc processor via the `/process` endpoint
- Supports all HTTP methods needed for `/process`
- Returns results directly in the Make workflow

**Input parameters:**
- `url` → Endpoint path (always `/process` for data process)
- `method` → HTTP method (POST for running processors)
- `body` → Request body JSON (processor + params)
- `headers` → Additional headers (optional)

**Usage example:**
```
Make: Schedule (Trigger) → Uproc: Make an API Call (POST /process) → Make: Slack (Send message)
```

## Authentication

The integration uses **Basic Auth** with email + API key.

**How to obtain credentials:**
1. Log in at [app.uproc.io/account/integrations](https://app.uproc.io/account/integrations)
2. Go to **Settings → Integrations**
3. In **API Credentials** copy:
   - **Username** (your email)
   - **API Key (real)** (real API key)
4. In Make, create a Uproc connection and paste the credentials

## Make integration limitations

The Make integration **only exposes data process tools** (email validation, enrichment, etc.). It does **NOT expose:**

| Uproc Module | Available on Make? | Why |
|--------------|-------------------|-----|
| Data Process tools | ✅ Yes | Core tools (check-email-exists, get-company-financial-by-name, etc.) |
| Document Ingest | ❌ No | Requires file upload + OCR + classification (not supported by Make) |
| Approval Management | ❌ No | Requires approval workflow management (not supported by Make) |
| Campaign Automation | ❌ No | Requires campaign execution (not supported by Make) |
| Lead Management | ❌ No | Requires pipeline lead management (not supported by Make) |
| Customer Care | ❌ No | Requires ticket management (not supported by Make) |

**Note:** Make does not support:
- Incoming webhooks (see `3-webhooks/README.md`)
- Mass file upload (needed for Document Ingest)
- Complex approval management
- Multi-channel campaign execution
- Pipeline lead management

## Use cases with Make

### 1. Bulk email validation
```
Make: Google Sheets (Trigger) → Uproc: Select a Tool (check-email-exists) → Make: Google Sheets (Update)
```

### 2. Lead enrichment
```
Make: Typeform (Trigger) → Uproc: Select a Tool (get-company-financial-by-name) → Make: Slack (Send message)
```

### 3. IBAN validation
```
Make: Google Sheets (Trigger) → Uproc: Select a Tool (check-bank-iban-valid) → Make: Google Sheets (Update)
```

### 4. Company data enrichment
```
Make: Google Sheets (Trigger) → Uproc: Select a Tool (get-company-financial-by-name) → Make: Google Sheets (Update)
```

## Publication and review

- **Status:** ✅ Approved and published (09/13/2022)
- **App URL:** [Make App Store — Uproc](https://www.make.com/apps/uproc)
- **Private app:** Available to the author
- **Published:** Available for all Make organizations

### Publication flow (according to Make)
1. **Private** → App is visible only to the author
2. **Published (approval not requested)** → Shareable via link
3. **Published (pending approval)** → Sent to Make's review
4. **Approved** → Available publicly on Make App Store

### Review status
- **Approval date:** 09/13/2022 11:02
- **Current status:** Public
- **Reviewer:** TBS
- **Developer contact:** Miquel <miquel@uproc.io>

## Development

### File structure

Each Make module requires:
- `communication.json`: Communication logic with Uproc API
- `interface.json`: Field definitions (input/output)
- `mappeable_parameters.json`: Fields that can be mapped from other modules
- `samples.json`: Response examples
- `static_parameters.json`: Module static parameters

### New data process tools

To add a new data process tool to the integration:
1. Add the tool to remote procedures (5-remote_procedures/)
2. Update mappeable_parameters to include the new tool
3. Update samples.json with example responses
4. Run test scenarios in Make before publishing

### New API calls

To add new generic API calls:
1. Create new module in 4-modules/
2. Define the communication.json with `/process` endpoint
3. Define the interface.json with necessary fields
4. Add samples.json with example responses

### Webhooks

⚠️ **Webhooks are not implemented.** Make does not support webhooks for Custom Apps. Alternatives:
- **Polling** → Make runs a module that queries Uproc periodically
- **Schedule trigger** → Make schedules Uproc module execution
- **Manual trigger** → User manually runs Uproc modules

## Integration links

| Resource | URL |
|----------|-----|
| **Make App Store — Uproc** | https://www.make.com/apps/uproc |
| **Make Docs — Custom Apps** | https://www.make.com/help/custom-apps |
| **Zapier Integration** | https://zapier.com/apps/uproc/integrations |
| **n8n Node** | https://n8n.io/integrations/uproc |
| **Uproc API Docs** | https://docs.uproc.io |

## Documentation

| Resource | URL |
|----------|-----|
| **Uproc Docs** | https://docs.uproc.io |
| **API Reference** | https://docs.uproc.io/api/ |
| **MCP Tools** | https://docs.uproc.io/mcp/ |
| **CLI Reference** | https://docs.uproc.io/cli/ |
| **Applications** | https://docs.uproc.io/applications/ |

## Related integration repos

| Resource | URL |
|----------|-----|
| **Zapier source code** | https://github.com/uproc-io/uproc-zapier |
| **n8n node source code** | https://github.com/uproc-io/uproc-n8n |

---

> **Note:** The integration was created when Make was called Integromat (before 2022). The app still works correctly with the new name. It only exposes data process tools, not the full platform modules.

## Author

| Field | Value |
|-------|-------|
| **Name** | Miquel Colomer |
| **Email** | [miquel@uproc.io](mailto:miquel@uproc.io) |
| **Website** | [uproc.io](https://uproc.io) |
| **LinkedIn** | https://www.linkedin.com/in/miquelcolomersalas/ |
| **Phone** | +34 605 28 12 20 |
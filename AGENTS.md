# UProc Make Integration — AGENTS.md

> Official UProc integration with [Make](https://www.make.com/) (formerly Integromat).
> **Status:** ✅ Approved and published (09/13/2022)

---

## Project structure

```
uproc-make/
├── 01-base/             # API base configuration (URL, headers, sanitization)
├── 02-connections/      # Connections and authentication (email + API key)
├── 03-webhooks/         # Webhooks (not implemented)
├── 04-modules/          # Main modules (data process tools only):
│   ├── Make an API Call/  # Generic calls to /process endpoint
│   └── Select a Tool/     # Run data process tools
├── 05-remote_procedures/ # Remote procedures to list tools
├── 06-iml_functions/    # Make functions (listfields, prepareWebhook, showErrors)
├── 07-groups/           # Module groups
├── 08-readme/           # README (how to connect)
├── 09-review/           # Review status (approved 09/13/2022)
├── 10-app_flow/         # Publication flow
├── 11-components_map/   # Visual components map
└── README.md            # Main documentation
```

## Module files

Each module in `04-modules/` requires:
- `communication.json` → Communication logic with UProc API
- `interface.json` → Field definitions (input/output)
- `mappeable_parameters.json` → Fields mappable from other modules
- `samples.json` → Response examples
- `static_parameters.json` → Static parameters

## Authentication

The integration uses **Basic Auth** with email + API key.

- **email** → Your UProc email (Username)
- **api_key** → Your real API key (from Settings → Integrations at app.uproc.io)

Credentials are encoded in Basic Auth:
```
Authorization: Basic base64(email:apikey)
```

## Integration modules

### 1. Select a Tool (main tool)

Runs any Data Process tool from UProc.

**Input parameters:**
- `tool` → Processor name (e.g., "check-email-exists", "get-company-financial-by-name")
- `params` → Processor-specific parameters (JSON)

### 2. Make an API Call

Generic API calls to UProc's `/process` endpoint.

**Input parameters:**
- `url` → Endpoint path (always `/process` for data process)
- `method` → HTTP method (POST for running processors)
- `body` → Request body JSON (processor + params)
- `headers` → Additional headers (optional)

## Integration limitations

| UProc Module | Available on Make? | Why |
|--------------|-------------------|-----|
| Data Process tools | ✅ Yes | Core tools (check-email-exists, get-company-financial-by-name, etc.) |
| Document Ingest | ❌ No | Requires file upload + OCR + classification |
| Approval Management | ❌ No | Requires approval workflow management |
| Campaign Automation | ❌ No | Requires campaign execution |
| Lead Management | ❌ No | Requires pipeline lead management |
| Customer Care | ❌ No | Requires ticket management |

## Publication and review

- **Status:** ✅ Approved and published (09/13/2022)
- **App URL:** [Make App Store - UProc](https://www.make.com/apps/uproc)
- **Approval date:** 09/13/2022 11:02
- **Reviewer:** TBS

## Publication flow (Make)

1. **Private** → App is visible only to the author
2. **Published (approval not requested)** → Shareable via link
3. **Published (pending approval)** → Sent to Make's review
4. **Approved** → Available publicly on Make App Store

## Webhooks

⚠️ **Webhooks not implemented.** Make does not support incoming webhooks for Custom Apps. Alternatives:
- **Polling** → Make queries UProc periodically
- **Schedule trigger** → Make schedules execution
- **Manual trigger** → User runs manually

## External resources

- **Make App Store:** https://www.make.com/apps/uproc
- **Make Docs — Custom Apps:** https://www.make.com/help/custom-apps
- **UProc Documentation:** https://docs.uproc.io
- **UProc API:** https://api.uproc.io
- **Zapier Integration:** ../uproc-zapier/README.md

## Notes

- Integration was created when Make was called Integromat (before 2022)
- Only exposes data process tools, not platform modules
- Make does not support incoming webhooks, mass file upload, or complex workflows
- `Make an API Call` and `Select a Tool` modules are approved and published
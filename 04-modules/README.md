# Modules for Make (data process tools only)

This folder contains the main modules of the UProc integration on Make.

**Note:** This integration only exposes UProc's **data process tools** (check-email-exists, get-company-financial-by-name, check-bank-iban-valid, etc.). It does **NOT expose platform modules** (Document Ingest, Approval Management, Campaign Automation, etc.).

### Current modules

| Module | Description | Type |
|--------|-------------|------|
| **Make an API Call** | Generic API calls to any UProc endpoint | Universal |
| **Select a Tool** | Run any UProc data process tool | Trigger/Action |

### 1. Make an API Call

Allows making generic API calls to any UProc v2 endpoint.

**Main use:**
- Calls to endpoints without specific modules
- Complete customization of headers, body, query strings
- Access to full responses (headers, body, status code)

**Input parameters:**
- `url` → Endpoint path (e.g., "/process", "/v2/data")
- `method` → HTTP method (GET, POST, PUT, DELETE, PATCH)
- `body` → Request body (JSON)
- `headers` → Additional headers (optional)

**Output parameters:**
- `output` → API response (headers, body, statusCode)

**Example:**
```json
{
	"url": "/process",
	"method": "POST",
	"body": {
		"processor": "check-email-exists",
		"params": {
			"email": "test@example.com"
		}
	}
}
```

**Module file structure:**
```
Make an API Call/
├── communication.json    # API communication logic
├── interface.json        # Field definitions (input/output)
├── mappeable_parameters.json # Mappable fields
├── samples.json          # Response examples
└── static_parameters.json # Static parameters (empty)
```

### 2. Select a Tool

Runs any UProc data process tool.

**Main use:**
- Email validation (`check-email-exists`)
- Data enrichment (`get-company-financial-by-name`, etc.)
- OCR (`extract-data-from-document`)
- Any processor available in UProc

**Input parameters:**
- `tool` → Processor name (e.g., "check-email-exists")
- `params` → Processor-specific parameters (JSON)

**Output parameters:**
- `output` → Processor result

**Example:**
```json
{
	"processor": "check-email-exists",
	"params": {
		"email": "test@example.com"
	}
}
```

**Module file structure:**
```
Select a Tool/
├── communication.json    # API communication logic with /process
├── interface.json        # Field definitions (input/output)
├── mappeable_parameters.json # Mappable fields
├── samples.json          # Response examples
└── static_parameters.json # Static parameters (empty)
```

### Module comparison

| Feature | Make an API Call | Select a Tool |
|---------|------------------|---------------|
| **Type** | Universal | Trigger/Action |
| **Endpoint** | Any | `/process` |
| **Parameters** | Customizable | Processor-specific |
| **Auth** | Basic Auth | Basic Auth |
| **Typical use** | Custom endpoints | Data processors |
| **Flexibility** | High (any endpoint) | Medium (processors only) |
| **Ease of use** | Medium (requires API knowledge) | High (just choose processor) |

### Adding new modules

To add a new module to the integration:

1. Create directory in `4-modules/`
2. Add files:
   - `communication.json` → API communication logic
   - `interface.json` → Field definitions (input/output)
   - `mappeable_parameters.json` → Mappable fields
   - `samples.json` → Response examples
   - `static_parameters.json` → Static parameters (if applicable)
3. Add module to `7-groups/groups.json`
4. Run test scenarios in Make
5. Send for Make review (see `9-review/README.md`)

### File structure per module

Each Make module requires:
- `communication.json` → Communication logic with UProc API
- `interface.json` → Field definitions (input/output)
- `mappeable_parameters.json` → Fields mappable from other modules
- `samples.json` → Response examples (JSON)
- `static_parameters.json` → Module static parameters (optional)

### Test scenarios

Before publishing any new module, you need to create test scenarios in Make demonstrating:
1. Successful module execution
2. Error handling (API error)
3. Correct parameter responses

Test scenarios must be shared with Make for review.

### Publication

Once modules are ready and test scenarios are approved:
1. Publish module to Make App Store
2. Make test scenarios available for review (see `9-review/README.md`)
3. Wait for Make approval
4. Once approved, modules will be available for all Make users

---

> **Note:** Both modules are approved and published on Make App Store (since 09/13/2022). They only expose data process tools, not full platform modules.
> 
> **🔗 Make App Store — UProc:** https://www.make.com/apps/uproc
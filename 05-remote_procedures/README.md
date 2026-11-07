# UProc Remote Procedures

## Remote procedures to list data process tools

This folder contains the remote procedures that list data process tools and groups from UProc.

### Structure

```
5-remote_procedures/
├── README.md              # This file
├── groups/                # List tool groups
│   ├── communications.json
│   └── parameters.json
├── parameters/            # List parameters of a data process tool
│   ├── communications.json
│   └── parameters.json
└── tools/                 # List data process tools by group
    ├── communications.json
    └── parameters.json
```

### 1. groups (List tool groups)

Lists UProc's data process tool groups (validation, enrichment, lookup, etc.).

**Endpoint:**
```
GET /zapier/processor/{{parameters.tool}}
```

**Usage:** List available data process tool groups in UProc.

### 2. parameters (List tool parameters)

Lists the parameters that a specific data process tool accepts.

**Endpoint:**
```
GET /zapier/processor/{{parameters.tool}}
```

**Parameters:**
- `tool` → Data process tool name (e.g., "check-email-exists")

**Usage:** Get the parameters that a data process tool accepts to execute it.

### 3. tools (List data process tools by group)

Lists data process tools from a specific group.

**Endpoint:**
```
GET /zapier/processors/{{parameters.group}}
```

**Parameters:**
- `group` → Group name (e.g., "validation", "enrichment", "lookup", etc.)

**Response:**
```json
[
	{
		"id": "check-email-exists",
		"name": "Check email exists",
		"help_text": "Validates if an email exists"
	},
	{
		"id": "get-company-financial-by-name",
		"name": "Get company financial by name",
		"help_text": "Looks up company financial data"
	},
	...
]
```

### Usage in Make

These procedures are used for:
1. List available data process tools → "Select a Tool"
2. Get parameters → "Select a Tool"
3. List tool groups → "Make an API Call"

### API endpoints

| Procedure | Endpoint | Method | Description |
|-----------|----------|--------|-------------|
| `groups` | `/zapier/processor/{{tool}}` | GET | List tool groups |
| `parameters` | `/zapier/processor/{{tool}}` | GET | List parameters of a tool |
| `tools` | `/zapier/processors/{{group}}` | GET | List tools from a group |

### Usage examples

#### List tools from "validation"
```
Make: UProc: List tools (group="validation") → UProc: /zapier/processors/validation
```

#### Get parameters of "check-email-exists"
```
Make: UProc: Get parameters (tool="check-email-exists") → UProc: /zapier/processor/check-email-exists
```

### Important note

These procedures **only list data process tools**, not platform modules. Data process tools are:

- **Validation**: check-email-exists, check-email-exists-extended, check-bank-iban-valid, get-mobile-hlr-lookup
- **Enrichment**: get-company-financial-by-name, get-company-info-by-name, get-email-recipient-by-company, get-address-normalized
- **Geographic lookup**: get-country-by-ip, get-country-by-name, get-address-normalized
- **Others**: qr, md5, phone-parsed, etc.

**DO NOT include:**
- Document Ingest, Approval Management, Campaign Automation
- Lead Management, Customer Care, Financial Reconciliation
- Or any other platform module

### File structure per procedure

Each remote procedure requires:
- `communications.json` → Communication logic with UProc API
- `parameters.json` → Input parameters (if applicable)

### Notes

- These endpoints were created for the Zapier integration (hence the `/zapier/` prefix)
- They are kept for compatibility with the Zapier integration
- Make and Zapier share the same base API (`/api/v2`)
- Endpoints only list data process tools, not platform modules

---

> **Note:** The `/zapier/*` endpoints are legacy (created for Zapier) but kept for compatibility. They only list data process tools, not platform modules.
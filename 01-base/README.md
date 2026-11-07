# UProc Base Configuration

## UProc API base configuration for Make

This folder contains the base configuration for all UProc API calls from Make.

### Files

- `base.json` → Base configuration (base URL, auth headers, error handling, sanitization)
- `common.json` → Common configuration (empty for now)
- `README.md` → This file

### base.json

```json
{
	"baseUrl": "https://api.uproc.io/api/v2",
	"headers": {
		"authorization": "Basic {{base64(connection.email + ':' + connection.apikey)}}"
	},
	"response": {
		"error": {
			"message": "[{{statusCode}}] \n{{showErrors(body.message)}}"
		}
	},
	"log": {
		"sanitize": [ "request.headers.authorization" ]
	}
}
```

**Purpose:**
- Defines the API base URL: `https://api.uproc.io/api/v2`
- Configures Basic Auth with email + API key from the connection
- Configures error handling with log sanitization
- Ensures credentials are not saved in logs

### common.json

```json
{}
```

**Purpose:** Common configuration (currently empty).

### Sanitization

The configuration includes automatic credential sanitization:
- `request.headers.authorization` → Removed from logs
- `{{showErrors(body.message)}}` → Safe error handling

This ensures user credentials are never saved in logs.

### Authentication

Authentication uses **Basic Auth** with email + API key:
```
Authorization: Basic base64(email:apikey)
```

Where:
- `email` → User's email (UProc Username)
- `apikey` → Real API key (from Settings → Integrations)

### API URL

All UProc API calls use this base:
```
https://api.uproc.io/api/v2
```

Endpoints accessible from Make:
- `/process` → Run data process tool (only supported endpoint)
- `/zapier/processors/{group}` → List data process tools by group
- `/zapier/processor/{tool}` → List parameters of a data process tool
- `/profile` → Get user profile

**Note:** Make only supports data process tools, not platform modules.

---

> **Note:** This configuration applies to all integration modules. If you need to change the base URL, modify this file and all modules will inherit the changes.
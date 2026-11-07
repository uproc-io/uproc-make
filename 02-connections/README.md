# UProc Connections

## Connections and Authentication for Make

This folder contains the UProc connection configuration for Make.

### Structure

```
2-connections/
├── README.md              # This file
└── uProc/
    ├── common.json          # Common configuration (empty)
    ├── communication.json   # Communication configuration (profile, validation)
    └── parameters.json     # Input parameters (email + API key)
```

### communication.json

```json
{
	"url": "https://api.uproc.io/api/v2/profile",
	"headers": {
		"authorization": "Basic {{base64(parameters.email + ':' + parameters.apikey)}}"
	},
	"response": {
		"error": {
			"type": "{{body.message[1].error}}",
			"message": "{{body.message[1].msg}}"
		},
		"valid": "{{if(body.error, false, true)}}"
	},
	"log": {
		"sanitize": ["request.headers.authorization"]
	}
}
```

**Purpose:**
- Validates that connection credentials are correct by calling `/profile`
- Returns `valid: true/false` based on whether the response has an error

### Connection parameters

The user must provide:
- `email` → UProc account email (Username)
- `apikey` → Real API key (from Settings → Integrations)

### How to obtain credentials

1. Log in at [app.uproc.io](https://app.uproc.io)
2. Go to **Settings → Integrations**
3. In the **API Credentials** section:
   - **Username** → User's email
   - **API Key (real)** → Real API key
4. Copy both values and paste them in Make when creating the connection

### Error handling

Make uses this error format:
```json
{
	"error": {
		"type": "{{body.message[1].error}}",
		"message": "{{body.message[1].msg}}"
	}
}
```

This ensures authentication errors are shown clearly to the user.

### Sanitization

The configuration includes:
```json
"log": {
	"sanitize": ["request.headers.authorization"]
}
```

This ensures credentials (email + API key) are not saved in logs or exposed accidentally.

---

> **Note:** Connection validation is done automatically whenever a UProc connection is created or edited in Make. If the credentials are incorrect, Make will show an error and will not allow saving the connection.
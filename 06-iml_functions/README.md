# UProc IML Functions

## Make functions (Internal Make Logic)

This folder contains Make's functions (IML - Internal Make Logic) used in the UProc integration.

### Structure

```
6-iml_functions/
├── README.md              # This file
├── listfields/            # Extract fields from a data process response
│   └── code.js
├── prepareWebhook/        # Prepare webhook for Make
│   └── code.js
└── showErrors/            # Error handling
    └── code.js
```

### 1. listfields(body)

Extracts fields from a data process tool response.

**Usage:**
```javascript
// In communication.json response
"response": {
	"output": "{{listfields(body)}}"
}
```

**Purpose:**
- Extract relevant fields from a data process tool response
- Convert objects into fields mappable for Make
- Make the response compatible with Make modules

### 2. prepareWebhook(webhook)

Prepares a webhook for Make.

**Usage:**
```javascript
// In communication.json
"response": {
	"output": "{{prepareWebhook(body)}}"
}
```

**Purpose:**
- Prepare a webhook for use in Make
- Ensure the webhook is compatible with Make

### 3. showErrors(errors)

Handles errors from data process tools.

**Usage:**
```javascript
// In communication.json response
"error": {
	"type": "{{showErrors(body.message)}}"
}
```

**Purpose:**
- Handle errors safely
- Display errors clearly to the user
- Sanitize errors to avoid exposing credentials

### Make functions (IML)

Make uses IML (Internal Make Logic) functions to:
1. Process data process tool responses
2. Extract relevant fields
3. Handle errors
4. Prepare data for Make modules

### Source code

Each function has its `code.js` file:

```javascript
// listfields/code.js
function listfields(body) {
	// Extract fields from body and return as an object
	return body;
}
```

```javascript
// prepareWebhook/code.js
function prepareWebhook(webhook) {
	// Prepare webhook for Make usage
	return webhook;
}
```

```javascript
// showErrors/code.js
function showErrors(errors) {
	// Handle errors and display them safely
	return errors;
}
```

### Usage in communication.json

IML functions are used directly in `communication.json`:

```json
{
	"url": "/process",
	"method": "POST",
	"response": {
		"output": "{{listfields(body)}}"
	}
}
```

### File structure per function

Each Make function requires:
- `code.js` → IML function code
- `README.md` → (in folder) → Function documentation

### Notes

- IML functions are executed automatically by Make
- No need to declare them explicitly
- Called with syntax `{{functionName(args)}}`
- Functions are global for all integration communications

---

> **Note:** These functions are Make-specific and used to process data process tool responses. They make the integration more robust and easier to use.
# UProc Webhooks

## Webhooks for Make (not implemented)

This folder contains the webhook configuration for the UProc-Make integration.

### Current status

⚠️ **Webhooks not implemented.**

### Make limitations with webhooks

Make does not support incoming webhooks for Custom Apps. The integration can only:
- **Poll** → Make calls a UProc endpoint periodically
- **Schedule execution** → Make runs UProc modules at regular intervals
- **Manual trigger** → User runs UProc modules manually

### Current alternatives

Currently you can use:
- **Polling** → Make runs a module that queries UProc periodically
- **Schedule trigger** → Make schedules UProc module execution
- **Manual trigger** → User manually runs UProc modules

### Webhooks in Make (limitations)

Make does not support incoming webhooks for Custom Apps directly. The alternative is:
1. Poll from Make (call a UProc endpoint periodically)
2. Use Make webhooks sent by other services (Slack, Google, etc.) that then call UProc

### Example implementation (future)

```json
// In communication.json of webhook trigger
{
	"url": "https://api.uproc.io/api/v2/webhooks/uproc",
	"method": "POST",
	"body": {
		"event": "data-process.completed",
		"data": "{{event}}"
	},
	"response": {
		"output": "{{body}}"
	}
}
```

### Resources for implementing webhooks

- [Make Docs: Webhooks](https://www.make.com/help/webhooks)
- [Make Docs: Triggers](https://www.make.com/help/trigger)
- [UProc API Docs: Events](https://docs.uproc.io/events) (if applicable)

### Notes about the Make integration

The Make integration only supports **data process tools** (check-email-exists, get-company-financial-by-name, check-bank-iban-valid, etc.). It does not support:
- Incoming webhooks (see Make docs)
- Mass file upload (needed for Document Ingest)
- Complex approval management
- Multi-channel campaign execution
- Pipeline lead management

---

> **Note:** This feature is not implemented yet. Make only supports data process tools, not platform modules.
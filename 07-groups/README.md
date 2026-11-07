# UProc Groups

## Module groups for Make (data process tools only)

This folder contains the group configuration for the UProc integration modules on Make.

### Structure

```
7-groups/
├── README.md              # This file
└── groups.json            # Group and module list
```

### groups.json

```json
[
	{
		"label": "Other",
		"modules": [
			"groups",
			"makeApiCall"
		]
	}
]
```

**Purpose:**
- Organize modules into groups for Make App Store
- Show modules in logical sections (Other, etc.)
- Facilitate user navigation in Make

### Current groups

| Group | Modules | Description |
|-------|---------|-------------|
| Other | `groups`, `makeApiCall` | General modules |

### How to add new groups

To add a new group to the integration:

1. Add an object to the `groups.json` array:
```json
{
	"label": "New group",
	"modules": ["module1", "module2"]
}
```
2. Publish the module to Make App Store
3. Make test scenarios available for review

### Recommended groups (data process tools only)

To better organize data process tools, recommended groups:
- **Validation** → `check-email-exists`, `check-email-exists-extended`, `check-bank-iban-valid`, `get-mobile-hlr-lookup`
- **Enrichment** → `get-company-financial-by-name`, `get-company-info-by-name`, `get-email-recipient-by-company`, `get-address-normalized`
- **Lookup** → `get-country-by-ip`, `get-country-by-name`, `get-url-screenshot`
- **General** → `makeApiCall`

**Note:** These groups only include data process tools, not platform modules (Document Ingest, Approval Management, Campaign Automation, etc.).

### Make group structure

Make organizes modules into groups to:
1. Improve user experience
2. Facilitate module search
3. Organize modules by functionality

Groups appear in Make App Store as:
```
Validation
- Check email exists
- Check bank IBAN valid
- Get mobile HLR lookup
- ...

Enrichment
- Get company financial by name
- Get company info by name
- Get email recipient by company
- ...

General
- Make an API Call
```

### Notes

- Groups are Make App Store specific
- They do not affect integration functionality
- They only change the visual organization of modules in Make
- Can be added/modified when new data process tools are added

---

> **Note:** Groups are configured in `groups.json` and used exclusively for visual organization in Make App Store. They do not affect module functionality.
> 
> **🔗 Make App Store — UProc:** https://www.make.com/apps/uproc
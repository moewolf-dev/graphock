# Get Data

Import and prepare your data for analysis in Graphock.

## Overview

Graphock supports a wide variety of data sources, making it easy to connect to your existing data infrastructure.

## Supported Data Sources

### File Uploads

Upload files directly from your computer:

- **CSV** - Comma-separated values
- **Excel** - .xlsx and .xls files
- **JSON** - JSON arrays and objects
- **TSV** - Tab-separated values

### Databases

Connect to popular databases:

- **PostgreSQL**
- **MySQL**
- **SQL Server**
- **Oracle**
- **MongoDB** (via connector)

### Cloud Services

Import from cloud platforms:

- **Google Sheets**
- **Microsoft Excel Online**
- **Amazon S3**
- **Azure Blob Storage**

### APIs

Connect to REST APIs:

- Custom endpoints
- OAuth authentication
- API key authentication
- Pagination support

## Data Requirements

### Structured Data

Your data should be organized in a tabular format:

| ID | Name | Category | Value | Date |
|----|------|----------|-------|------|
| 1 | Product A | Electronics | 100 | 2024-01-01 |
| 2 | Product B | Software | 200 | 2024-01-02 |
| 3 | Product C | Services | 150 | 2024-01-03 |

### Best Practices

✅ **Column Headers**: Clear, descriptive names
✅ **Consistent Types**: Each column has one data type
✅ **No Empty Rows**: Continuous data without gaps
✅ **Date Formats**: Standard date formats (ISO 8601)
✅ **Unique Identifiers**: Optional but recommended

❌ **Avoid**:
- Merged cells
- Multiple headers
- Hidden rows/columns
- Complex nested structures

## File Size Limits

| Plan | Maximum File Size | Rows |
|------|-------------------|------|
| Free | 10 MB | 50,000 |
| Pro | 100 MB | 1,000,000 |
| Enterprise | Unlimited | Unlimited |

## Import Data

### Method 1: File Upload

1. Click **New Project**
2. Select **Upload Data**
3. Choose your file
4. Preview and verify
5. Click **Import**

### Method 2: Database Connection

1. Click **New Project**
2. Select **Connect Database**
3. Choose database type
4. Enter connection details:
   - Host
   - Port
   - Database name
   - Username/Password
5. Test connection
6. Select table(s) to import

### Method 3: Google Sheets

1. Click **New Project**
2. Select **Google Sheets**
3. Authorize Graphock access
4. Choose a spreadsheet
5. Select sheet(s) to import

### Method 4: API Connection

1. Click **New Project**
2. Select **Connect API**
3. Enter API endpoint URL
4. Configure authentication:
   - API Key
   - OAuth
   - Bearer Token
5. Test endpoint
6. Import data

## Data Preview

After importing, you'll see a preview:

```
┌─────────────────────────────────────────┐
│  Data Preview: sales_data.csv          │
├─────────────────────────────────────────┤
│  ✓ 1,234 rows imported                 │
│  ✓ 5 columns detected                  │
├─────────────────────────────────────────┤
│  Date      │ Product │ Sales │ Region │
│  2024-01-01│ Widget A│ 120   │ North  │
│  2024-01-02│ Widget B│ 95    │ South  │
│  2024-01-03│ Widget A│ 150   │ East   │
│  ...       │ ...     │ ...   │ ...    │
└─────────────────────────────────────────┘
```

### Automatic Type Detection

Graphock automatically detects:

- **Numbers**: 123, 45.67
- **Text**: Apple, "Hello World"
- **Dates**: 2024-01-01, January 1, 2024
- **Booleans**: true, false, yes, no

### Manual Type Correction

If types are incorrect:

1. Click on a column header
2. Select **Change Type**
3. Choose correct type from dropdown
4. Apply to column

## Data Transformation

### Basic Transformations

After import, you can:

**Rename Columns**
- Click column header
- Enter new name
- Press Enter

**Reorder Columns**
- Drag column header
- Drop in new position

**Delete Columns**
- Click column header
- Select **Delete Column**

**Filter Rows**
- Click **Filter** button
- Set conditions
- Apply filter

### Advanced Transformations

**Create Calculated Fields**
- Click **Add Field**
- Enter formula: `Sales * 1.1`
- Name the field
- Click **Create**

**Split Columns**
- Click **Split Column**
- Choose delimiter
- Preview results
- Click **Split**

**Merge Columns**
- Select multiple columns
- Click **Merge**
- Choose separator
- Click **Merge**

## Data Refresh

### Automatic Refresh

Configure automatic data refresh:

1. Open project settings
2. Go to **Data Source**
3. Set refresh interval:
   - Every 15 minutes
   - Every hour
   - Every day
   - Custom schedule
4. Save settings

### Manual Refresh

Refresh data anytime:

1. Click **Refresh** in toolbar
2. Choose refresh method:
   - **Full Refresh**: Reload all data
   - **Incremental**: Load only new data
3. Confirm refresh

## Data Governance

### Data Privacy

Your data is secure:

- **Encryption**: All data encrypted at rest
- **Access Control**: Role-based permissions
- **Compliance**: GDPR and SOC 2 compliant
- **Data Retention**: Configurable retention policies

### Data Audit

Track data changes:

- Import history
- Modification logs
- User activity
- Access records

## Troubleshooting

### Import Failed

**Check:**
- File format is supported
- File size within limits
- No corrupted data
- Sufficient storage space

### Data Looks Wrong

**Verify:**
- Column headers are correct
- Data types are accurate
- No missing values
- Character encoding (UTF-8)

### Can't Connect to Database

**Try:**
- Connection details are correct
- Firewall allows Graphock access
- Database user has permissions
- Network connection is stable

## Next Steps

Once your data is imported:

1. **[Create visualizations](/create-visualizations/)** - Build charts and graphs
2. **[Prepare data](/get-data/data-preparation/)** - Clean and transform
3. **[Analyze data](/analyze-data/)** - Discover insights

---

Ready to analyze? [Create Your First Visualization →](/create-visualizations/)

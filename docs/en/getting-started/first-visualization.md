# Your First Visualization

Create your first chart in Graphock with this step-by-step guide.

## Before You Start

Make sure you have:

- ✅ A Graphock account (if not, [sign up](/getting-started/sign-up))
- ✅ A data file (CSV, Excel, or JSON)

**Don't have data?** [Download our sample dataset](/examples/sample-datasets)

## Step 1: Import Your Data

### Option A: Upload a File

1. Click **New Project** in the dashboard
2. Select **Upload Data**
3. Choose your file (CSV, Excel, or JSON)
4. Wait for import to complete

### Option B: Connect to a Database

1. Click **New Project**
2. Select **Connect Database**
3. Choose your database type (PostgreSQL, MySQL, etc.)
4. Enter your connection details
5. Select a table to import

## Step 2: Preview Your Data

After importing, you'll see a data preview:

```
Date      | Product  | Sales | Region
----------|----------|-------|--------
2024-01-01| Widget A | 120   | North
2024-01-01| Widget B | 95    | South
2024-01-02| Widget A | 150   | East
...
```

**Check that:**
- Column headers are correct
- Data types look right
- No missing critical data

## Step 3: Create a Chart

1. Click **Add Visualization**
2. Choose a chart type (start with **Bar Chart**)
3. Drag and drop fields into:
   - **X-Axis**: Date
   - **Y-Axis**: Sales
   - **Color**: Product

Your chart will appear instantly!

## Step 4: Customize Your Chart

### Change Colors

1. Click on the chart
2. Select **Color** in the right panel
3. Choose a color palette or custom colors

### Add Labels

1. Click **Labels** in the right panel
2. Enable **Show Data Labels**
3. Choose label format

### Adjust Axes

1. Click **Axes** in the right panel
2. Customize title, range, and format
3. Add gridlines for better readability

## Step 5: Save Your Work

1. Click **Save** in the top right
2. Enter a name for your visualization
3. Add a description (optional)
4. Click **Save**

## Step 6: Share Your Visualization

### Export as Image

1. Click **Export**
2. Select **PNG** or **SVG**
3. Choose resolution
4. Click **Download**

### Get Shareable Link

1. Click **Share**
2. Toggle **Public Link**
3. Copy the URL
4. Share with anyone!

## Example: Building a Sales Chart

### Data Structure

| Date | Product | Sales | Region |
|------|---------|-------|--------|
| 2024-01-01 | Widget A | 120 | North |
| 2024-01-02 | Widget B | 95 | South |
| 2024-01-03 | Widget A | 150 | East |
| 2024-01-04 | Widget C | 200 | West |

### Chart Configuration

- **Type**: Bar Chart
- **X-Axis**: Date
- **Y-Axis**: Sales
- **Color**: Product
- **Title**: "Monthly Sales by Product"

### Result

A colorful bar chart showing sales trends for each product over time!

## Common Issues

### Data Not Showing?

- Check that fields are assigned to axes
- Verify data types are correct
- Look for empty or null values

### Chart Looks Wrong?

- Try a different chart type
- Check axis scaling
- Ensure color field has data

### Can't See My Data?

- Confirm the import completed successfully
- Check the data preview for issues
- Verify your dataset isn't too large for the visualization

## Next Steps

Now that you've created your first visualization:

1. **[Learn about chart types](/create-visualizations/chart-types/)** - Explore more options
2. **[Build a dashboard](/create-visualizations/build-dashboard)** - Combine multiple charts
3. **[Explore examples](/examples/)** - See what's possible

## Pro Tips

- 🎯 Start simple, then add complexity
- 🎨 Use consistent colors across charts
- 📊 Add clear titles and labels
- 🔄 Save different versions to compare

---

Ready for more? [Explore Chart Types →](/create-visualizations/chart-types/)

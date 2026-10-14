# Create Visualizations

Transform your data into beautiful, insightful visualizations.

## Overview

Graphock provides a comprehensive set of chart types and visualization tools to help you tell your data story.

## Choosing the Right Chart

Select the right chart type for your data and goals:

### Comparison

| Chart Type | Best For | Data Size |
|------------|----------|------------|
| **Bar Chart** | Compare categories | Small-Medium |
| **Column Chart** | Compare values over time | Small-Medium |
| **Grouped Bar** | Compare multiple series | Small-Medium |
| **Stacked Bar** | Show composition | Small-Medium |

### Distribution

| Chart Type | Best For | Data Size |
|------------|----------|------------|
| **Histogram** | Show frequency distribution | Medium-Large |
| **Box Plot** | Show statistical distribution | Medium |
| **Violin Plot** | Compare distributions | Medium |

### Relationship

| Chart Type | Best For | Data Size |
|------------|----------|------------|
| **Scatter Plot** | Show correlation | Small-Medium |
| **Network Graph** | Show connections | Small-Medium |
| **Heat Map** | Show density/intensity | Medium |

### Composition

| Chart Type | Best For | Data Size |
|------------|----------|------------|
| **Pie Chart** | Show proportions | Small |
| **Donut Chart** | Show proportions | Small |
| **Stacked Area** | Show composition over time | Small-Medium |

### Trend

| Chart Type | Best For | Data Size |
|------------|----------|------------|
| **Line Chart** | Show trends over time | Small-Large |
| **Area Chart** | Show magnitude over time | Small-Medium |
| **Sparkline** | Show mini trends | Small |

## Quick Start: Create a Chart

### Step 1: Add Visualization

1. Open your project
2. Click **Add Visualization**
3. Choose a chart type

### Step 2: Assign Fields

Drag fields from the Data Panel to chart areas:

```
[Date] → X-Axis
[Sales] → Y-Axis
[Category] → Color
```

### Step 3: Customize

Use the Properties Panel to:
- Change colors
- Add labels
- Format axes
- Apply filters

### Step 4: Analyze

- Explore your data
- Identify patterns
- Discover insights

## Chart Types

### Bar Charts

**When to use:** Comparing categories

**Best practices:**
- Order bars by value
- Use horizontal bars for long labels
- Limit to 10-15 categories

**Example:** Sales by Product Category

```
Product A |████████████| 120
Product B |████████    | 95
Product C |███████████ | 150
Product D |█████       | 75
```

### Line Charts

**When to use:** Showing trends over time

**Best practices:**
- Use consistent time intervals
- Show data points for clarity
- Avoid too many lines on one chart

**Example:** Monthly Revenue Trend

```
Revenue ($)
  │
  │      ╱────╲
  │    ╱      ╲
  │   ╱        ╲
  │  ╱          ╲
  │ ╱            ╲
  │╱              ╲
  └──────────────────── Time
```

### Network Graphs

**When to use:** Visualizing relationships and connections

**Best practices:**
- Limit nodes to 50-100 for readability
- Use size for importance
- Use color for categories
- Enable interactive features

**Example:** Social Network Connections

```
     (A)──(B)
    ╱  ╲    │
  (C)  (D)─(E)
   │    │   │
  (F)──(G)─(H)
```

### Scatter Plots

**When to use:** Showing correlations between two variables

**Best practices:**
- Add trend lines
- Use size/color for dimensions
- Check for outliers
- Ensure sample size is adequate

**Example:** Price vs. Sales

```
Sales
  │     ●
  │   ● ● ●
  │ ● ● ● ● ●
  │● ● ● ● ● ●
  │───────────── Price
```

### Pie Charts

**When to use:** Showing proportions of a whole

**Best practices:**
- Limit to 5-7 categories
- Use for simple comparisons
- Consider alternatives (bar charts)
- Start at 12 o'clock

**Example:** Market Share

```
    ╱────╲
   ╱      ╲
  ╱   30%  ╲
 │╱────────╲│
 ││  25%   ││
 │╲        ╱│
  ╲  20%  ╱
   ╲      ╱
    ╲────╱
      25%
```

## Customization Options

### Colors

Choose from:

- **Color Palettes**: Pre-built schemes
- **Custom Colors**: Pick your own
- **Conditional Formatting**: Color by value
- **Gradient**: Smooth color transitions

**Example:**
```
Value < 50: Red
Value 50-100: Yellow
Value > 100: Green
```

### Labels

Add information to your chart:

- **Data Labels**: Show values on chart
- **Axis Labels**: Describe axes
- **Title**: Chart title
- **Legend**: Explain colors/shapes

### Tooltips

Interactive hover information:

- Show additional data
- Format values
- Add context
- Custom styling

### Animations

Bring your charts to life:

- **Entrance Animation**: Chart appears smoothly
- **Update Animation**: Smooth transitions
- **Interaction Animation**: Highlight effects

## Advanced Features

### Combo Charts

Combine multiple chart types:

**Example:** Bar + Line Chart

```
Sales (Bar)    ╱────╲
                ╱      ╲
Profit (Line) ──╱        ╲──
```

### Small Multiples

Show multiple small charts:

- **Small Multiples**: Grid of charts
- **Trellis Chart**: By category
- **Faceted View**: Multiple perspectives

### Interactive Elements

Make charts interactive:

- **Click to Filter**: Filter by clicking
- **Zoom and Pan**: Navigate large data
- **Brush Selection**: Select data range
- **Cross-filter**: Filter other charts

## Best Practices

### Design Principles

1. **Keep it Simple**: Remove unnecessary elements
2. **Be Clear**: Use descriptive titles and labels
3. **Be Accurate**: Avoid misleading visualizations
4. **Be Consistent**: Use consistent styling
5. **Tell a Story**: Guide the viewer to insights

### Common Mistakes to Avoid

❌ **3D Effects**: Make charts harder to read
❌ **Too Many Colors**: Confusing and overwhelming
❌ **Cluttered Labels**: Reduce readability
❌ **Wrong Chart Type**: Misleading data representation
❌ **Missing Context**: Unclear what data shows

### Accessibility

Make visualizations accessible:

- Use sufficient contrast
- Provide alternative text
- Support screen readers
- Use color-blind friendly palettes
- Include data tables

## Export Options

### Image Formats

- **PNG**: Best for web, supports transparency
- **SVG**: Vector format, scalable
- **PDF**: For documents and presentations
- **JPG**: Compressed, smaller file size

### Resolution

Choose based on use case:

- **Web**: 72-150 DPI
- **Print**: 300 DPI
- **Presentations**: 150-200 DPI

### Interactive Exports

- **HTML**: Embed in websites
- **Graphock Link**: Share live visualization
- **Embed Code**: Copy and paste

## Next Steps

Explore more visualization options:

1. **[Chart Types Guide](/create-visualizations/chart-types/)** - Detailed chart type documentation
2. **[Build Dashboard](/create-visualizations/build-dashboard)** - Combine multiple charts
3. **[Examples](/examples/)** - See sample visualizations

---

Ready to explore? [Learn About Chart Types →](/create-visualizations/chart-types/)

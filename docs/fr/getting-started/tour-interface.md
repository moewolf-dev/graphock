# 界面导览

熟悉 Graphock 的用户界面和导航。

## 主仪表板

登录后，您将看到主仪表板：

```
┌─────────────────────────────────────────────────────┐
│  [Logo]  Graphock      [搜索]  [用户资料]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  欢迎回来，Alex！                                │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ 项目 1   │  │ 项目 2   │  │ 项目 3   │        │
│  └──────────┘  └──────────┘  └──────────┘        │
│                                                     │
│  [+ 新建项目]                                   │
└─────────────────────────────────────────────────────┘
```

### 顶部导航栏

- **Logo**：点击返回仪表板
- **搜索**：查找项目、数据和帮助
- **用户资料**：设置、登出和账户

## 项目视图

打开任何项目进入工作区：

```
┌─────────────────────────────────────────────────────┐
│  [←] Project Name    [Save] [Share] [Export]      │
├─────────┬──────────────────┬───────────────────────┤
│         │                  │                       │
│ Data    │   Canvas         │   Properties Panel   │
│ Panel   │                  │                       │
│         │   [Chart]        │   • Chart Type       │
│ Table   │                  │   • Colors           │
│         │                  │   • Labels           │
│ Fields  │                  │   • Axes             │
│         │                  │                       │
│ [Drag]  │                  │                       │
│         │                  │                       │
└─────────┴──────────────────┴───────────────────────┘
```

### 左侧面板：数据面板

显示您的数据源和可用字段：

#### Data Sources Tab
- List of all imported tables
- Database connections
- API endpoints

#### Fields Tab
- Available columns from your data
- Data types (number, text, date)
- Field metadata

### 中央：画布

您的可视化工作区：

- **添加可视化**：创建新图表
- **拖拽重新排列**：移动图表位置
- **调整大小**：调整图表尺寸
- **缩放**：放大/缩小以获得更好视图

### 右侧面板：属性面板

自定义您的可视化：

#### Chart Section
- **Type**: Bar, line, pie, etc.
- **Colors**: Color palette and custom colors
- **Labels**: Show/hide data labels
- **Tooltips**: Hover information

#### Axes Section
- **X-Axis**: Field, title, format, range
- **Y-Axis**: Field, title, format, range

#### Filters Section
- Add filters to your data
- Date ranges
- Category selections

## 工具栏操作

### 保存
- 保存当前工作
- 另存为新版本

### 分享
- 创建可分享链接
- 设置权限（查看/编辑）
- 邀请团队成员

### 导出
- 下载为 PNG/SVG 图像
- 导出数据为 CSV
- 导出报告为 PDF

### Settings
- Project settings
- Data refresh settings
- Theme preferences

## 键盘快捷键

使用快捷键加速您的工作流程：

| 操作 | Windows/Linux | Mac |
|------|---------------|-----|
| Save | Ctrl+S | Cmd+S |
| Undo | Ctrl+Z | Cmd+Z |
| Redo | Ctrl+Y | Cmd+Y |
| Delete | Delete | Delete |
| Copy | Ctrl+C | Cmd+C |
| Paste | Ctrl+V | Cmd+V |
| Zoom In | Ctrl+= | Cmd+= |
| Zoom Out | Ctrl+- | Cmd+- |
| New Project | Ctrl+N | Cmd+N |

## 侧边导航

访问不同部分：

```
┌─────────────────┐
│  📊 Dashboard  │
│  📁 Projects   │
│  📈 Analytics  │
│  👥 Team       │
│  ⚙️ Settings   │
│  ❓ Help       │
└─────────────────┘
```

### Dashboard
- Overview of your projects
- Recent activity
- Quick actions

### Projects
- All your projects
- Folders and organization
- Search and filter

### Analytics
- Data insights
- Performance metrics
- Usage statistics

### Team
- Team members
- Collaboration
- Permissions

### Settings
- Account settings
- Preferences
- Integrations

### Help
- Documentation
- Tutorials
- Contact support

## 响应式设计

Graphock 适应不同的屏幕尺寸：

### Desktop
- Full workspace
- All panels visible
- Maximum features

### Tablet
- Collapsible panels
- Touch-optimized
- Core features

### Mobile
- Simplified interface
- Essential features
- On-the-go viewing

## 自定义选项

### 主题

- **浅色**：干净、明亮的界面
- **深色**：护眼的现代风格
- **系统**：跟随您的设备设置

### 语言

Graphock 支持多种语言：

- 英语
- 中文（简体）
- 法语
- 日语

在设置 > 偏好设置 > 语言中更改。

## 获取帮助

### 上下文帮助

点击 **?** 图标以获取：
- 页面特定指导
- 功能工具提示
- 相关文档

### Live Chat

Available on Pro and Enterprise plans:

- Real-time support
- Screen sharing
- Expert guidance

### Documentation

Access full documentation anytime:

- Comprehensive guides
- Video tutorials
- Step-by-step instructions

## 效率提示

1. **使用搜索** - 使用 Ctrl/Cmd+K 快速查找任何内容
2. **固定面板** - 保持常用面板打开
3. **创建模板** - 重用图表配置
4. **使用快捷键** - 加速常见任务
5. **组织项目** - 使用文件夹进行更好的管理

## 下一步

现在您已经熟悉了操作环境：

1. **[导入数据](/get-data/connect-sources)** - 连接您的数据源
2. **[创建图表](/create-visualizations/)** - 构建可视化
3. **[探索功能](/analyze-data/)** - 发现高级功能

---

准备探索了吗？[查看图表类型 →](/create-visualizations/chart-types/)

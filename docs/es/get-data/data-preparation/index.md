# 数据准备

在导入后清查和转换您的数据。

## 概述

良好的数据准备是成功分析的关键。使用这些工具确保您的数据干净、一致且可用。

## 数据清理

### 删除重复数据

识别并删除重复的记录：

```javascript
// 示例：查找重复的订单
DELETE FROM orders
WHERE id IN (
  SELECT MIN(id)
  FROM orders
  GROUP BY order_number
);
```

**最佳实践**：
- 使用唯一标识符
- 保留最新的记录
- 检查业务规则

### 处理缺失值

处理空值的不同策略：

**删除**：移除包含缺失值的记录
```sql
-- 删除缺失值的行
DELETE FROM table WHERE important_column IS NULL;
```

**填充**：用默认值或计算值替换
```javascript
// 使用平均值填充
UPDATE table
SET price = AVG(price)
WHERE price IS NULL;

// 使用默认值
UPDATE table
SET status = 'unknown'
WHERE status IS NULL;

// 使用前值填充
UPDATE table
SET region = LAG(region, 1, '')
WHERE region IS NULL;
```

**标记**：明确标记缺失值
```javascript
// 使用特殊值标记
UPDATE table
SET price = 'N/A'
WHERE price IS NULL;
```

### 标准化数据格式

确保一致的数据格式：

**日期格式**
```javascript
// 统一为 ISO 8601
2024-01-01  // YYYY-MM-DD
2024-01-01T12:00:00Z  // 带时区
```

**文本格式**
```javascript
// 统一大小写
TRIM(UPPER(name))  // 去除空格并大写
```

**数值格式**
```javascript
// 统一数字格式
CAST(price AS DECIMAL(10,2))  // 保留2位小数
```

### 验证数据质量

检查常见问题：

- **值范围**：确保数值在合理范围内
- **枚举值**：验证分类字段使用有效的值
- **外键完整性**：确保引用存在
- **数据类型一致性**：验证字段类型匹配数据

```sql
-- 验证示例
SELECT COUNT(*) FROM sales
WHERE price < 0 OR price > 100000;

SELECT DISTINCT region FROM sales
WHERE region NOT IN ('北部', '东部', '南部', '西部');
```

## 数据转换

### 数据透视

将宽数据转换为长数据：

```javascript
// 从宽数据到长数据
[
  {
    "日期": "2024-01-01",
    "北部_销售额": 120,
    "东部_销售额": 95
  }
]
```

### 数据逆透视

将长数据转换为宽数据：

```javascript
// 从长数据到宽数据
[
  {
    "日期": "2024-01-01",
    "地区": "北部",
    "销售额": 120
  },
  {
    "日期": "2024-01-01",
    "地区": "东部",
    "销售额": 95
  }
]
```

### 计算字段

创建派生指标：

```javascript
// 添加计算列
利润率 = (销售额 - 成本) / 成本 * 100
毛利率 = (销售额 - 成本) / 销售额 * 100
年增长率 = (今年销售额 - 去年销售额) / 去年销售额 * 100
```

### 数据分箱

将连续值分组为区间：

```javascript
// 销售额分箱
CASE
  WHEN sales < 100 THEN '低'
  WHEN sales < 500 THEN '中'
  WHEN sales < 1000 THEN '高'
  ELSE '极高'
END AS 销售等级
```

### 数据聚合

汇总数据以获取洞察：

```javascript
// 按地区聚合
SELECT
  地区,
  SUM(销售额) as 总销售额,
  AVG(销售额) as 平均销售额,
  COUNT(*) as 订单数
FROM sales
GROUP BY 地区;

// 按时间聚合
SELECT
  DATE_TRUNC('month', 日期) as 月份,
  SUM(销售额) as 月销售额,
  AVG(销售额) as 日均销售额
FROM sales
GROUP BY DATE_TRUNC('month', 日期);
```

## 数据验证

### 业务规则

应用业务规则验证数据：

```javascript
// 示例验证
-- 销售额不能为负
CHECK (销售额 >= 0)

-- 数量必须是整数
CHECK (QUANTITY % 1 = 0)

-- 日期不能是未来
CHECK (日期 <= CURRENT_DATE)
```

### 参照完整性

确保数据一致性：

```sql
-- 主键唯一
ALTER TABLE orders ADD CONSTRAINT pk_orders PRIMARY KEY (id);

-- 外键约束
ALTER TABLE order_items
ADD CONSTRAINT fk_order
FOREIGN KEY (order_id) REFERENCES orders(id);

-- 唯一约束
ALTER TABLE customers
ADD CONSTRAINT uq_email UNIQUE (email);
```

## 高级转换

### JSON 展开

展开嵌套的 JSON 数据：

```javascript
// 示例：展开产品属性
SELECT
  id,
  name,
  properties->>'颜色' as 颜色,
  properties->>'尺寸' as 尺寸
FROM products;
```

### 数组展开

将数组元素拆分为单独的行：

```javascript
// 示例：展开标签数组
SELECT
  id,
  name,
  UNNEST(tags) as 标签
FROM products;
```

### 地理编码

将地址转换为地理坐标：

```javascript
// 示例：地理编码
SELECT
  地址,
  纬度,
  经度
FROM locations
WHERE 纬度 IS NULL;

// 批量地理编码
UPDATE locations
SET (纬度, 经度) = (
  SELECT 纬度, 经度
  FROM geo_cache
  WHERE geo_cache.地址 = locations.地址
  LIMIT 1
)
WHERE 纬度 IS NULL;
```

## 数据采样

对于大型数据集，使用采样：

**简单随机采样**
```javascript
// 随机选择 10% 的数据
SELECT * FROM large_dataset
ORDER BY RANDOM()
LIMIT 1000;
```

**分层采样**
```javascript
// 按地区分层采样
SELECT * FROM large_dataset
WHERE 地区 IN ('北部', '东部', '南部', '西部')
ORDER BY RANDOM()
LIMIT 500;
```

**时间窗口采样**
```javascript
// 每个类别选择 N 条记录
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY 类别 ORDER BY date DESC) as rn
  FROM data
) ranked
WHERE rn <= 10;
```

## 数据导入最佳实践

### 预处理检查

在导入前检查：

- [ ] 文件编码为 UTF-8
- [ ] 符合要求的格式
- [ ] 没有特殊字符导致解析错误
- [ ] 列标题清晰且一致
- [ ] 数据量在限制内

### 增量导入

对于大型数据集使用增量导入：

1. **分批导入**：每次导入 1000-10000 行
2. **错误处理**：记录错误但继续处理
3. **进度跟踪**：显示导入进度
4. **验证**：导入后验证数据完整性

### 导入后验证

验证导入的数据：

```sql
-- 检查行数
SELECT COUNT(*) AS imported_rows FROM imported_data;

-- 检查唯一值
SELECT COUNT(DISTINCT id) AS unique_ids FROM imported_data;

-- 检查空值
SELECT
  COUNT(*) - COUNT(column_name) AS null_count
FROM imported_data;

-- 数据范围检查
SELECT
  MIN(date) AS min_date,
  MAX(date) AS max_date,
  MIN(value) AS min_value,
  MAX(value) AS max_value
FROM imported_data;
```

## 清洗自动化

### 定期清理脚本

定期执行数据清理：

```sql
-- 删除重复数据
DELETE FROM table
WHERE id NOT IN (
  SELECT MIN(id) FROM table GROUP BY duplicate_key
);

-- 归档旧数据
CREATE TABLE archive AS SELECT * FROM old_data;
DELETE FROM old_data;

-- 清理临时文件
DELETE FROM temp_tables WHERE created_at < DATE_SUB(NOW(), INTERVAL 7 DAY);
```

### 数据监控

监控数据质量：

```javascript
// 质量指标
const dataQuality = {
  completeness: 0.95,    // 完整性 95%
  accuracy: 0.98,         // 准确率 98%
  consistency: 0.97,       // 一致性 97%
  timeliness: 0.99,        // 及时性 99%
  uniqueness: 0.94         // 唯一性 94%
};

// 质量监控
function checkDataQuality(dataset) {
  // 执行质量检查
  // 生成报告
  // 触发警报
}
```

## 常见问题

### 导入失败

**文件编码问题**
- 保存为 UTF-8 编码
- 检查 BOM 标记
- 使用文本编辑器验证编码

**格式问题**
- 验证 JSON 格式
- 检查 CSV 分隔符
- 确保 Excel 文件未损坏
- 使用架构验证工具

**性能问题**
- 使用分批导入
- 禁用索引加载期间
- 使用事务确保数据完整性

### 数据质量问题

**缺失值**
```javascript
// 分析缺失值模式
SELECT
  column_name,
  COUNT(*) - COUNT(column_name) as missing_count,
  COUNT(*) / NULLIF(COUNT(*), 0) as missing_percentage
FROM table;
```

**异常值检测**
```javascript
// 使用统计方法检测异常
SELECT
  value,
  value - AVG(value) OVER () as diff,
  ABS(value - AVG(value) OVER ()) / STDEV(value) OVER () as z_score
FROM data
WHERE ABS(value - AVG(value) OVER ()) / STDEV(value) OVER ()) > 3;
```

## 下一步

数据准备完成后：

1. **[创建可视化](/es/create-visualizations/)** - 构建图表和图形
2. **[分析数据](/es/analyze-data/)** - 发现洞察和模式
3. **[刷新数据](/es/get-data/refresh-data)** - 更新数据源

---

数据准备好开始分析了吗？[开始创建可视化 →](/es/create-visualizations/)

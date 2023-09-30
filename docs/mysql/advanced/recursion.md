# MySQL 8.0+ 递归查询

[[TOC]]

## 1. CTE 递归查询

使用 CTE（公共表达式）查询：

```sql
WITH RECURSIVE cte_count(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM cte_count WHERE n < 10
)
SELECT n FROM cte_count;
```

其中 `(n)` 为查询列，不写为初始查询的字段。

第一个查询为初始查询，`UNION ALL` 为查询关系，第二个查询为递归过程。

递归的限制：
- `cte_max_recursion_depth`：参数默认值为 `1000`，限制 CTE 递归深度，超过阈值，将被强制终止
- `max_execution_time`：参数限制查询的最大执行时间，超过该时间，也将被强制终止

查看当前最大递归深度：

```sql
SELECT @@cte_max_recursion_depth;
```

## 2. 使用示例

### 2.1 斐波那契数列

```sql
WITH RECURSIVE factorial(n, fact) AS (
    SELECT 0, 1
    UNION ALL
    SELECT n + 1, fact * (n + 1) FROM factorial WHERE n < 20
)
SELECT * from factorial;
```

### 2.2 递归向下查询

```sql
WITH RECURSIVE rec AS (
    SELECT A.* FROM m_catalogue AS A WHERE A.`name` = '抱枕'
    UNION ALL
    SELECT B.* FROM m_catalogue AS B, rec WHERE B.father_id = rec.id
)

SELECT * FROM rec;
```

### 2.3 递归向上查询

```sql
WITH RECURSIVE rec AS (
    SELECT A.* FROM m_catalogue AS A WHERE A.`name` = '方形小抱枕'
    UNION ALL
    SELECT B.* FROM m_catalogue AS B, rec WHERE B.id = rec.father_id
)

SELECT * FROM rec;
```

这个时候如果需要不包含递归的初始查询就比较麻烦，MySQL 不支持差集（MINUS）操作，使用左连接来模拟：

```sql
WITH RECURSIVE rec AS (
    SELECT A.* FROM m_catalogue AS A WHERE A.`name` = '抱枕'
    UNION ALL
    SELECT B.* FROM m_catalogue AS B, rec WHERE B.father_id = rec.id
) 
SELECT * FROM (
    SELECT * FROM rec
) AS A
LEFT JOIN (
    SELECT * FROM rec
) AS B ON A.id = B.id AND B.`name` = '抱枕'
WHERE B.id IS NULL;
```

还是在逻辑层面去除比较好，数据库就不引入复杂的逻辑了。

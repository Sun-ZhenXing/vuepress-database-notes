---
title: MySQL 进阶
description: 进阶 MySQL
---

本文是 MySQL 的高阶教程，讲解关于 MySQL 高阶和底层的知识。本文的章节没有特别的联系，可以参考阅读。

1. [UUID 相关函数](./uuid.md)

# 1. MySQL 实例

# 2. MySQL 函数

## 2.1 MySQL 字符串函数

## 2.2 MySQL 时间日期函数

## 2.3 MySQL 聚合函数

## 2.4 MySQL 控制流功能

## 2.5 MySQL 常见数学函数

## 2.6 MySQL 窗口函数

::: warning 支持性警告

MySQL 8.0 新增功能，请确保你的 MySQL 或其他 SQL 环境支持窗口函数。

:::

### 2.6.1 窗口函数简介

从版本 8.0 开始，MySQL 支持窗口函数。窗口函数允许您以新的，更简单的方式解决查询问题，并具有更好的性能。

假设我们有一个 `sales` 表，按员工和财政年度存储销售额，如下所示：

```sql
CREATE TABLE sales (
    sales_employee VARCHAR(50) NOT NULL,
    fiscal_year INT NOT NULL,
    sale DECIMAL(14, 2) NOT NULL,
    PRIMARY KEY(sales_employee, fiscal_year)
);

INSERT INTO sales (sales_employee, fiscal_year, sale)
VALUES('Bob', 2016, 100),
      ('Bob', 2017, 150),
      ('Bob', 2018, 200),
      ('Alice', 2016, 150),
      ('Alice', 2017, 100),
      ('Alice', 2018, 200),
      ('John', 2016, 200),
      ('John', 2017, 150),
      ('John', 2018, 250);
```

我们查看表的内容：

```sql
SELECT * FROM sales;
```

查询结果为：

```text
+----------------+-------------+--------+
| sales_employee | fiscal_year | sale   |
+----------------+-------------+--------+
| Alice          |        2016 | 150.00 |
| Alice          |        2017 | 100.00 |
| Alice          |        2018 | 200.00 |
| Bob            |        2016 | 100.00 |
| Bob            |        2017 | 150.00 |
| Bob            |        2018 | 200.00 |
| John           |        2016 | 200.00 |
| John           |        2017 | 150.00 |
| John           |        2018 | 250.00 |
+----------------+-------------+--------+
```

理解窗口函数可能更容易从聚合函数开始：

聚合函数 `SUM()` 可以汇集多行的结果到单行中：

```sql
SELECT SUM(sale) FROM sales;
```

而 `GROUP BY` 可以将聚合函数用于行的子集：

```sql
SELECT fiscal_year, SUM(sale) FROM sales
GROUP BY fiscal_year;
```

与带有 `GROUP BY` 子句的聚合函数一样，窗口函数也对行的子集进行操作，但它们不会减少查询返回的行数。

例如，以下查询返回每个员工的销售额，以及按会计年度计算的员工总销售额：

```sql
SELECT
    fiscal_year,
    sales_employee,
    sale,
    SUM(sale) OVER (PARTITION BY fiscal_year) total_sales
FROM
    sales;
```

查询结果为：

```text
+-------------+----------------+--------+-------------+
| fiscal_year | sales_employee | sale   | total_sales |
+-------------+----------------+--------+-------------+
|        2016 | Alice          | 150.00 |      450.00 |
|        2016 | Bob            | 100.00 |      450.00 |
|        2016 | John           | 200.00 |      450.00 |
|        2017 | Alice          | 100.00 |      400.00 |
|        2017 | Bob            | 150.00 |      400.00 |
|        2017 | John           | 150.00 |      400.00 |
|        2018 | Alice          | 200.00 |      650.00 |
|        2018 | Bob            | 200.00 |      650.00 |
|        2018 | John           | 250.00 |      650.00 |
+-------------+----------------+--------+-------------+
```

在此示例中，`SUM()` 函数用作窗口函数，函数对由 `OVER` 子句内容定义的一组行进行操作。`SUM()` 应用函数的一组行称为窗口。

调用窗口函数的一般语法如下：

```sql
window_function_name(expression) 
    OVER (
        [partition_defintion]
        [order_definition]
        [frame_definition]
    ) 
```

### 2.6.2 排序和排名

`DENSE_RANK()` 是一个窗口函数，它为分区或结果集中的每一行分配排名，而排名值没有间隙。

也就是说，对于相同的分数排名结果相同，而排名是连续的。

`DENSE_RANK()` 函数的语法如下：

```sql
DENSE_RANK() OVER (
    PARTITION BY <expression>[{,<expression>...}]
    ORDER BY <expression> [ASC|DESC], [{,<expression>...}]
)
```

::: tip

[LeetCode：178. 分数排名](https://leetcode.cn/problems/rank-scores/)

此题可使用窗口函数 `DENSE_RANK()`，参考代码：

```sql
select score, dense_rank() over(order by score desc) as 'rank'
from Scores;
```

:::

## 2.7 MySQL 其他函数

# 3. MySQL 管理

# 4. MySQL 视图和触发器

# 5. MySQL 索引

## 5.1 索引简介

## 5.2 索引分类

## 5.3 全文索引

# 6. MySQL 储存过程

# 7. MySQL 8.0 新特征

# 参考

[1] MySQL 教程，begtut，<https://www.begtut.com/mysql/mysql-tutorial.html>

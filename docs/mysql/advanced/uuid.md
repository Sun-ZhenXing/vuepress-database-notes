# UUID

[[TOC]]

## 1. UUID 函数

`UUID()` 返回一个 UUID 字符串：

```sql
SELECT UUID();
```

`UUID_SHORT()` 返回一个 `short`（2 字节）整数 UUID：

```sql
SELECT UUID_SHORT();
```

## 2. MySQL 8.0 新特性

MySQL 8.0 支持新的函数：

- `UUID_TO_BIN()`
- `BIN_TO_UUID()`
- `IS_UUID()`

将 UUID 转换为二进制数据：

```sql
SELECT UUID_TO_BIN(UUID());
```

例如 `m_user` 表的主键是二进制的 UUID，查询二进制存储的 UUID：

```sql
SELECT BIN_TO_UUID(id) AS ID, `username` FROM `m_user`;
```

检测字符串是否满足 UUID：

```sql
SELECT IS_UUID('{12345678-1234-5678-1234-567812345678}') AS A,
       IS_UUID('12345678123456781234567812345678') AS B,
       IS_UUID('12345678-1234-5678-1234-567812345678') AS C;
```

结果：

```console
+------+------+------+
| A    | B    | C    |
+------+------+------+
|    1 |    1 |    1 |
+------+------+------+
```

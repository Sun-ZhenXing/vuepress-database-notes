# 重置 MySQL 密码

::: info 版本帮助

本文会整理各种不同版本的 MySQL 的重置密码方法，如果这里不包含你的系统，请到仓库中提交 PR/Issue 来完善。

:::

[[TOC]]

## 【方法 1】以安全模式重启

### 1.1 关闭 MySQL 服务

使用系统上的管理员权限执行下面的命令：

::: tabs#bash

@tab Windows

```bash
# 对于 MySQL 5.x
net stop mysql

# 对于 MySQL 8.0
net stop mysql80
```

@tab Linux

```bash
service mysql stop
# 或者是
systemctl stop mysqld.service
```

@tab Mac

```bash
mysql.server stop
```

:::

### 1.2 以安全模式启动 MySQL

```bash
mysqld_safe --skip-grant-tables &
# 或者是
mysqld --skip-grant-tables &
```

### 1.3 执行 SQL 语句

下面的部分是 MySQL 交互命令的内容（不同版本命令有区别）：

::: tabs#mysql

@tab MySQL 5.1-5.6

```sql
FLUSH PRIVILEGES;
UPDATE `mysql`.`user` SET `password`=PASSWORD('新密码') WHERE `user`='root';
FLUSH PRIVILEGES;
EXIT;
```

@tab MySQL 5.7

```sql
FLUSH PRIVILEGES;
UPDATE `mysql`.`user` SET `authentication_string`=PASSWORD('新密码') WHERE `user`='root';
FLUSH PRIVILEGES;
EXIT;
```

@tab MySQL 8.0

```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
FLUSH PRIVILEGES;
EXIT;
```

:::

### 1.4 启动 MySQL 服务

使用系统上的管理员权限执行下面的命令：

::: tabs#bash

@tab Windows

```bash
# 对于 MySQL 5.x
net start mysql

# 对于 MySQL 8.0
net start mysql80
```

@tab Linux

```bash
service mysql start
# 或者是
systemctl start mysqld.service
```

@tab Mac

```bash
mysql.server start
```

:::

## 【方法 2】修改配置文件

### 2.1 修改配置文件

修改前关闭 MySQL 服务，可参考 [上一节](#11-关闭-mysql-服务)。

修改 `my.cnf`（可能是 `/etc/my.cnf` 或 `/etc/mysql/my.cnf`），在 `[mysqld]` 后添加 `skip-grant-tables`。

如果没有选项 `[mysqld]`，添加 `[mysqld]` 到配置文件中，并保存。

### 2.2 重启 MySQL 服务

::: tabs#bash

@tab Windows

```bash
# 对于 MySQL 5.x
net stop mysql
net start mysql

# 对于 MySQL 8.0
net stop mysql80
net start mysql80
```

@tab Linux

```bash
service mysql restart
# 或者是
systemctl restart mysqld.service
```

@tab Mac

```bash
mysql.server restart
```

:::

### 2.3 进入 MySQL 执行 SQL 语句

现在可以不用密码进入服务器：

```sql
mysql -u root
```

下面跳转到 [执行 SQL 语句](#13-执行-sql-语句)，执行上述 SQL。

### 2.4 修改回原配置

删除上述配置，然后重启 MySQL 服务。

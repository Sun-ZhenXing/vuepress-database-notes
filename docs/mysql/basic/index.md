---
title: MySQL 学习笔记
date: 2022-05-23 20:46:43
categories:
  - [数据库, MySQL]
tags:
  - 数据库
  - SQL
  - MySQL
---

本文是 [*狂神说 Java：MySQL 最新教程通俗易懂*](https://www.bilibili.com/video/BV1NJ411J79W) 的课程笔记。本文的 MySQL 学习是业务层面的 MySQL，运维级别的 MySQL 可以参考更多更深入的资料。

<!-- more -->

::: tip

作者的文档可以在微信公众号查看，[作者的文档](http://mp.weixin.qq.com/mp/homepage?__biz=Mzg2NTAzMTExNg==&hid=4&sn=044c8767bd3c1825a329c2b98fff2ffe) 也可以参考。

:::

# 1. MySQL 基本操作

在 Windows 上启动和关闭 MySQL 服务（需要管理员）：

```bat
net stop mysql
net start mysql
```

登录 `root` 用户：

```bash
mysql -u root -p
```

查询 MySQL 版本：

```sql
SELECT VERSION();
```

刷新权限：

```sql
FLUSH PRIVILEGES;
```

修改密码：

```sql
UPDATE mysql.`user` SET
    authentication_string=PASSWORD('123456')
WHERE
    user = 'root' AND host = 'localhost';
```

查看数据库：

```sql
SHOW DATABASES;
```

使用数据库：

```sql
USE world;
```

查看数据库中的表的信息：

```sql
SHOW TABLES;
```

显示表的详细信息：

```sql
DESCRIBE city;
```

结束 MySQL 连接：

```sql
exit
```

MySQL 关键字不分大小写。

注释：

```sql
-- 单行注释
/*
    这是多行注释
*/
# MyQL 也支持使用 '#' 注释
```

创建数据表常规配置：
- 引擎：`InnoDB`
- 字符集：`utf8`
- 排序：`utf8_general_ci`

# 2. 操作数据库的语句

## 2.1 操作数据库

MySQL 的数据库语言分为四大类：
- DDL：数据定义语言
- DML：数据操作语言
- DQL：数据查询语言
- DCL：数据控制语言

::: warning

注意：下面的讲解中出现的 `[ ... ]` 表示可选内容，而 `{ ... }` 表示必选内容。

:::

创建一个数据库，如果不存在的话：

```sql
CREATE DATABASE IF NOT EXISTS `mydata`;
```

删除数据库：

```sql
DROP DATABASE IF EXISTS `mydata`;
```

使用数据库：

```sql
USE `mydata`;
```

查看数据库：

```sql
SHOW DATABASES;
```

## 2.2 数据库的列类型

下面举例常见的类型：

| 数值类型    | 大小（字节） |
| ----------- | ------------ |
| `tinyint`   | 1            |
| `smallint`  | 2            |
| `mediumint` | 3            |
| `int`       | 4            |
| `bigint`    | 8            |
| `float`     | 4            |
| `double`    | 8            |
| `decimal`   | 字符串形式   |

| 字符类型   | 说明                     |
| ---------- | ------------------------ |
| `char`     | 定长字符串，范围 0-255   |
| `varchar`  | 变长字符串，范围 0-65535 |
| `tinytext` | 小文本，范围到 2^8-1     |
| `text`     | 文本串，范围到 2^16-1    |

| 日期        | 说明                                   |
| ----------- | -------------------------------------- |
| `date`      | 日期，格式为 `YYYY-MM-DD`              |
| `time`      | 时间，格式为 `HH:mm:ss`                |
| `datetime`  | 时间日期，格式为 `YYYY-MM-DD HH:mm:ss` |
| `timestamp` | 时间戳                                 |
| `year`      | 年                                     |

`NULL` 类型为空值，如果需要比较请使用 `IS NULL` 而不是 `= NULL`，`NULL` 参与的运算结果也为 `NULL`。

## 2.3 数据库的字段属性

| 字段属性         | 含义       |
| ---------------- | ---------- |
| `UNSIGNED`       | 无符号的   |
| `ZEROFILL`       | 零填充位数 |
| `AUTO_INCREMENT` | 自增的     |
| `NOT NULL`       | 是否可空   |
| `DEFAULT`        | 默认值     |
| `COMMENT`        | 注释，可选 |

PS：一个业务型数据库必须存在的一些字段。

| 字段         | 说明       |
| ------------ | ---------- |
| `id`         | 一般是主键 |
| `version`    | 乐观锁     |
| `is_delete`  | 伪删除     |
| `gmt_create` | 创建时间   |
| `gmt_update` | 修改时间   |

## 2.4 创建数据库表

建表语法：

```sql
CREATE TABLE [IF NOT EXISTS] `表名` (
    `字段名` 列类型 [属性] [索引] [注释],
    ...
) [引擎] [字符集] [注释];
```

下面是实例：

```sql
CREATE TABLE IF NOT EXISTS `student` (
    `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
    `name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
    `pwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT '密码',
    `sex` VARCHAR(2) NOT NULL DEFAULT '女' COMMENT '性别',
    `birthday` DATETIME DEFAULT NULL COMMENT '出生日期',
    `address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
    `email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;
```

规则：
1. 表的名称和字段名尽量使用反引号括起来
2. 字符串尽量只使用单引号
3. 每一行加上一个逗号（`,`），最后一行可以不加
4. 一个表只有唯一的主键，可以写在语句最后
5. 数据库不使用驼峰命名，一般是小写字母和下划线分割，首字母可以大写

如果需要查看表的具体结构，可以使用：

```sql
-- 查看表的结构
DESC student;
-- 或者使用
DESCRIBE student;

-- 查看创建数据库的语句
SHOW CREATE DATABASE school;
-- 查看建表语句
SHOW CREATE TABLE student;
```

如果字符集有问题，可以设置默认字符集，在 `my.ini` 文件中修改：

```ini
character-set-server=utf8
```

## 2.5 数据库引擎

常用的有：
- InnoDB
- MyISAM

| 特点       | MyISAM | InnoDB             |
| ---------- | ------ | ------------------ |
| 事务支持   | 不支持 | 支持               |
| 数据行锁定 | 不支持 | 支持               |
| 外键约束   | 不支持 | 支持               |
| 全文索引   | 支持   | 不支持             |
| 表空间大小 | 较小   | 约为 InnoDB 的两倍 |

::: tip

最新版的 MyISAM 也支持事务。

:::

比较特点：
- InnoDB：安全性高，事务处理，多表多用户操作
- MyISAM：节约空间，速度较快

MySQL 的数据库信息储存在 `data` 目录下，本质还是文件存储。

数据库引擎在物理文件上的区别：
- InnoDB：表结构文件 `*.frm` 和上一级的 `ibdata*` 文件
- MyISAM：表结构文件 `*.frm` 和数据文件 `*.MYD`、`*.MYI` 索引文件

## 2.6 修改和删除数据表

修改表的名称：

```sql
ALTER TABLE student RENAME student1;
```

增加表的字段：

```sql
ALTER TABLE student ADD age INT(11);
```

修改表的字段约束：

```sql
ALTER TABLE student MODIFY age VARCHAR(10);
```

修改表的字段名：

```sql
ALTER TABLE student CHANGE age age1 INT(1);
```

> `MODIFY` 和 `CHANGE` 的区别：
> - `MODIFY` 不能来重命名，只能修改字段类型和约束
> - `CHANGE` 可以用来重命名字段，但是不能修改字段类型和约束

删除表的字段：

```sql
ALTER TABLE student DROP age1;
```

删除表，如果表存在的话：

```sql
DROP TABLE IF EXISTS student;
```

> 创建的删除操作尽量加上 `IF EXISTS` 防止报错。

# 3. MySQL 的数据管理

## 3.1 外键

> 删除有外键的表，必须要先删除引用的表。

我们可以让我们的学生表加入年级 `gradeid` 字段，然后年级字段引用年级表的 `gradeid` 字段，我们的年级表定义如下：

```sql
CREATE TABLE `grade` (
    `gradeid` INT(10) NOT NULL AUTO_INCREMENT COMMENT '年级ID',
    `gradename` VARCHAR(50) NOT NULL COMMENT '年级名称',
    PRIMARY KEY(`gradeid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;
```

下面我们给学生表增加约束，简单起见，我们重新建表：

```sql
CREATE TABLE IF NOT EXISTS `student` (
    `id` INT(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
    `name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
    `pwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT '密码',
    `sex` VARCHAR(2) NOT NULL DEFAULT '女' COMMENT '性别',
    `birthday` DATETIME DEFAULT NULL COMMENT '出生日期',
    `gradeid` INT(10) NOT NULL COMMENT '年级ID',
    `address` VARCHAR(100) DEFAULT NULL COMMENT '家庭住址',
    `email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (`id`),
    KEY `FK_gradeid` (`gradeid`),
    CONSTRAINT `FK_gradeid` FOREIGN KEY (`gradeid`) REFERENCES `grade`(`gradeid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;
```

这是一种方式，给表手动加上约束。

或者通过修改的方式给表增加外键：

```sql
ALTER TABLE `student`
    ADD CONSTRAINT `FK_gradeid` FOREIGN KEY(`gradeid`)
    REFERENCES `grade`(`gradeid`);
```

::: warning

以上的外键都是数据库级别的外键，不建议使用。（避免数据库过多造成困扰）最佳实践是将数据库视为单纯的表，只用来储存数据，而外键使用程序实现。

:::

## 3.2 DML 语言

数据库的意义：数据存储，数据管理。

DML 语言：数据操作语言。分别对应下面几个方法：
- `INSERT`
- `UPDATE`
- `DELETE`

```sql
INSERT INTO `grade` (`gradename`) VALUES ('大四');
```

如果不写表的字段，那么将会一一匹配：

```sql
INSERT INTO `grade` VALUES (2, '大一');
```

插入多个值：

```sql
INSERT INTO `grade` (`gradename`) VALUES
    ('大二'),
    ('大三');
```

更新值：

```sql
UPDATE `student` SET `name` = '鸭梨' WHERE `id` = 1;
```

可以修改多个属性：

```sql
UPDATE `student` SET
    `name` = '鸭梨',
    `email` = 'alex@alexsun.top'
    WHERE `id` = 1;
```

| 操作符                | 含义       |
| --------------------- | ---------- |
| `=`                   | 等于       |
| `<>` 或 `!=`          | 等于       |
| `BETWEEN ... AND ...` | 在范围内   |
| `>`、`<`、`>=`、`<=`  | 大于小于…… |
| `AND`                 | 且         |
| `OR`                  | 或         |
| `NOT`                 | 否定       |

删除数据：

```sql
DELETE FROM `student` WHERE `id` = 1;
```

清空一张表，但保留结构：

```sql
TRUNCATE TABLE `student`
```

区别：
- `TRUNCATE` 会将计数器清零
- `TRUNCATE` 不会影响事务的执行

`DELETE` 问题，当重启数据库时：
- 对于 InnoDB，自增会从 1 开始，因为这个值存在内存中
- 对于 MyISAM，自增不变，这个值存在于磁盘中

# 4. DQL 查询数据

DQL（Data Query Language），即数据查询语言：
- 数据库最核心的语言
- 所以的查询都使用 `SELECT` 来查询
- 简单和复杂的查询都能写
- 是使用频率最高的语句

下面是本节使用的数据和表：

```sql
create database if not exists `school`;
use `school`;

-- 创建学生表
drop table if exists `student`;
create table `student`(
    `studentno` int(4) not null comment '学号',
    `loginpwd` varchar(20) default null,
    `studentname` varchar(20) default null comment '学生姓名',
    `sex` tinyint(1) default null comment '性别，0或1',
    `gradeid` int(11) default null comment '年级编号',
    `phone` varchar(50) not null comment '联系电话，允许为空',
    `address` varchar(255) not null comment '地址，允许为空',
    `borndate` datetime default null comment '出生时间',
    `email` varchar (50) not null comment '邮箱账号允许为空',
    `identitycard` varchar(18) default null comment '身份证号',
    primary key (`studentno`),
    unique key `identitycard`(`identitycard`),
    key `email` (`email`)
) engine=myisam default charset=utf8;

-- 创建年级表
drop table if exists `grade`;
create table `grade`(
    `gradeid` int(11) not null auto_increment comment '年级编号',
    `gradename` varchar(50) not null comment '年级名称',
    primary key (`gradeid`)
) engine=innodb auto_increment = 6 default charset = utf8;

-- 创建科目表
drop table if exists `subject`;
create table `subject`(
    `subjectno`int(11) not null auto_increment comment '课程编号',
    `subjectname` varchar(50) default null comment '课程名称',
    `classhour` int(4) default null comment '学时',
    `gradeid` int(4) default null comment '年级编号',
    primary key (`subjectno`)
) engine = innodb auto_increment = 19 default charset = utf8;

-- 创建成绩表
drop table if exists `result`;
create table `result`(
    `studentno` int(4) not null comment '学号',
    `subjectno` int(4) not null comment '课程编号',
    `examdate` datetime not null comment '考试日期',
    `studentresult` int (4) not null comment '考试成绩',
    key `subjectno`(`subjectno`)
) engine = innodb default charset = utf8;

-- 插入学生数据
insert into `student` (`studentno`, `loginpwd`, `studentname`, `sex`, `gradeid`, `phone`, `address`, `borndate`, `email`, `identitycard`) values
    (1000, '123456', '张伟', 0, 2, '13800001234', '北京朝阳', '1980-1-1', 'text123@qq.com', '123456198001011234'),
    (1001, '123456', '赵强', 1, 3, '13800002222', '广东深圳', '1990-1-1', 'text111@qq.com', '123456199001011233');

-- 插入成绩数据
insert into `result`(`studentno`, `subjectno`, `examdate`, `studentresult`) values
    (1000, 1, '2013-11-11 16:00:00', 85),
    (1000, 2, '2013-11-12 16:00:00', 70),
    (1000, 3, '2013-11-11 09:00:00', 68),
    (1000, 4, '2013-11-13 16:00:00', 98),
    (1000, 5, '2013-11-14 16:00:00', 58);

-- 插入年级数据
insert into `grade` (`gradeid`, `gradename`) values
    (1, '大一'), (2, '大二'), (3, '大三'), (4, '大四'), (5, '预科班');

-- 插入科目数据
insert into `subject`(`subjectno`, `subjectname`, `classhour`, `gradeid`) values
    (1, '高等数学-1', 110, 1),
    (2, '高等数学-2', 110, 2),
    (3, '高等数学-3', 100, 3),
    (4, '高等数学-4', 130, 4),
    (5, 'C语言-1', 110, 1),
    (6, 'C语言-2', 110, 2),
    (7, 'C语言-3', 100, 3),
    (8, 'C语言-4', 130, 4),
    (9, 'Java程序设计-1', 110, 1),
    (10, 'Java程序设计-2', 110, 2),
    (11, 'Java程序设计-3', 100, 3),
    (12, 'Java程序设计-4', 130, 4),
    (13, '数据库结构-1', 110, 1),
    (14, '数据库结构-2', 110, 2),
    (15, '数据库结构-3', 100, 3),
    (16, '数据库结构-4', 130, 4),
    (17, 'C#基础', 130, 1);
```

上面的数据仅为示例，可以根据实际情况生成或者 Mock。

## 4.1 基本查询

查询所有字段：

```sql
SELECT * FROM student;
```

查询指定字段，并使用别名（别名可以加引号，也可以不加）：

```sql
SELECT studentno as '学号', studentname as '学生姓名' FROM student;
```

查询被连接的字符串：

```sql
SELECT CONCAT('姓名：', studentname) AS 新名字 FROM student;
```

| 新名字     |
| ---------- |
| 姓名：张伟 |
| 姓名：赵强 |

## 4.2 去重

对结果去重：

```sql
SELECT DISTINCT studentno FROM result;
```

SQL 也可以直接查询表达式：

```sql
SELECT 100 * 3 AS RES
```

| RES |
| --- |
| 300 |

查询自增的步长：

```sql
SELECT @@auto_increment_increment;
```

`SELECT` 可以选择的表达式包括：
- 文本
- 列
- `NULL`
- 函数
- 计算表达式
- 系统遍历

## 4.3 Where 条件子句

查询成绩在 95~100 分的人：

```sql
SELECT * FROM result WHERE studentresult BETWEEN 95 AND 100;
```

查询不是 1000 号学生的成绩：

```sql
SELECT * FROM result WHERE NOT studentno = 1000;
```

## 4.4 模糊查询

| 运算符        | 描述     |
| ------------- | -------- |
| `IS NULL`     | 为空     |
| `IS NOT NULL` | 非空     |
| `LIKE`        | 匹配     |
| `IN`          | 在集合内 |

模糊查询中的 `%` 相当于任意字符，相当于通配符 `*`，`_` 匹配一个字符，相当于通配符 `?`。

查询张姓同学：

```sql
SELECT studentno, studentname FROM student
    WHERE studentname LIKE '张%';
```

查询学号在指定范围内的学生：

```sql
SELECT studentno, studentname FROM student
    WHERE studentno IN (1000, 1023, 1345);
```

## 4.5 联表查询

查询参见了考试的同学（学号，姓名，科目，分数）

```sql
SELECT s.studentno, studentname, subjectno, studentresult
    FROM student AS s 
    INNER JOIN result AS r
    ON s.studentno = r.studentno;
```

| 操作         | 描述                                 |
| ------------ | ------------------------------------ |
| `inner join` | 如果有一个匹配就返回行               |
| `left join`  | 从左表返回所有的值，即使右表没有匹配 |
| `right join` | 从右表返回所有的值，即使左表没有匹配 |

查询缺考的同学：

```sql
SELECT s.studentno, studentname, subjectno, studentresult
    FROM student AS s
    LEFT JOIN result AS r
    ON s.studentno = r.studentno
    WHERE studentresult IS NULL;
```

查询参加考试的同学的信息（学号，学生姓名，科目，分数）：

```sql
SELECT s.studentno, studentname, subjectname, studentresult
    FROM student AS s
    RIGHT JOIN result AS r
    ON r.studentno = s.studentno
    INNER JOIN `subject` AS sub
    ON r.subjectno = sub.subjectno
```

分析思路：
1. 分析需求，分析查询的字段来自哪些表
    - 从哪些表查询数据
    - 如果存在多张表的查询，先从两张表的查询开始
2. 确定使用哪种连接查询
    - 判断交叉点（是 7 种中的哪一种）
    - 判断条件

查询学生所属的年级：

```sql
SELECT studentno, studentname, gradename
    FROM student
    INNER JOIN grade
    ON student.gradeid = grade.gradeid;
```

查询科目所属的年级：

```sql
SELECT subjectno, subjectname, gradename
    FROM `subject`
    INNER JOIN grade
    ON grade.gradeid = `subject`.gradeid;
```

查询参加了 “高等数学-4” 考试的同学信息（学号，学生姓名，科目名，分数）：

```sql
SELECT s.studentno, studentname, subjectname, studentresult
    FROM student AS s
    INNER JOIN `result` AS r
    ON s.studentno = r.studentno
    INNER JOIN `subject` AS sub
    ON r.subjectno = sub.subjectno
    WHERE subjectname = '数据库结构-1';
```

## 4.6 自连接

自连接即自己的表的自己的表连接，逻辑上将一张表拆为两张一样的表。

```sql
CREATE TABLE category (
    `categoryid` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主题ID',
    `pid` INT(10) NOT NULL COMMENT '父ID',
    `categoryName` VARCHAR(50) NOT NULL COMMENT '主题名字',
    PRIMARY KEY(`categoryid`)
) ENGINE=INNODB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

INSERT INTO `category` (`categoryid`, `pid`, `categoryName`) 
VALUES  (2, 1, '信息技术'),
        (3, 1, '软件开发'),
        (4, 3, '数据库'),
        (5, 1, '美术设计'),
        (6, 3, 'web开发'),
        (7, 5, 'ps技术'),
        (8, 2, '办公信息');
```

我们将上面的表分割为上面的两张表：

| `categoryid` | `categoryName` |
| ------------ | -------------- |
| 2            | 信息技术       |
| 3            | 软件开发       |
| 5            | 美术设计       |

| `pid` | `categoryid` | `categoryName` |
| ----- | ------------ | -------------- |
| 3     | 4            | 数据库         |
| 2     | 8            | 办公信息       |
| 3     | 6            | web开发        |
| 5     | 7            | 美术设计       |

查询预期：

| 父栏目   | 子栏目   |
| -------- | -------- |
| 软件开发 | 数据库   |
| 软件开发 | web开发  |
| 美术设计 | ps技术   |
| 信息技术 | 办公信息 |

```sql
SELECT a.categoryName AS '父栏目', b.categoryName AS '子栏目'
    FROM category AS a, category AS b
    WHERE a.categoryid = b.pid;
```

::: tip

[LeetCode：181. 超过经理收入的员工](https://leetcode.cn/problems/employees-earning-more-than-their-managers/)

此题可以使用自连接实现，参考代码：

```sql
select E1.name as Employee from Employee as E1
left join Employee as E2
on E1.managerId = E2.id
where E1.salary > E2.salary;
```

:::

## 4.7 分页和排序

SQL `SELECT` 完整语法如下，其中各个子句的位置不能调换：

```sql
select [all|distinct]
{*|table.*|[table.]field[as alias],...}
from table[as table_alias], ...
    [left|right|inner join table2]
    [where ...]
    [group by ...]
    [having ...]
    [order by ...]
    [limit ]
```

排序：

```sql
SELECT studentno, studentresult
    FROM result
    ORDER BY studentresult DESC;
```

升序使用 `ASC`，降序使用 `DESC`，可以支持多个键进行排序。

查询 “高等数学-1” 课程成绩排名前十的学生，并且分数大于 80 分的学生信息（学号，姓名，课程名称，分数）：

```sql
SELECT s.studentno, s.studentname, sub.subjectname, r.studentresult
    FROM student AS s
    INNER JOIN result AS r
    ON r.studentno = s.studentno
    INNER JOIN `subject` AS sub
    ON sub.subjectno = r.subjectno
    WHERE sub.subjectname = '高等数学-1'
    LIMIT 10;
```

## 4.8 子查询

查询 “高等数学-4” 的所有考试结果（学科，科目编号，成绩），降序排列。

【方式一】使用连接查询

```sql
SELECT studentno, r.subjectno, studentresult
    FROM result AS r
    INNER JOIN `subject` AS sub
    ON r.subjectno = sub.subjectno
    WHERE subjectname = '高等数学-4'
    ORDER BY studentresult DESC;
```

【方式二】使用子查询

```sql
SELECT studentno, subjectno, studentresult
FROM result
WHERE subjectno = (
    SELECT subjectno FROM `subject`
    WHERE subjectname = '高等数学-4'
)
ORDER BY studentresult DESC;
```

查询课程为 “高等数学-2” 且分数不小于 80 分的学生的学号和姓名：

【方法一】使用连接查询

```sql
SELECT s.studentno,studentname
FROM student s
INNER JOIN result r
ON s.`StudentNo` = r.`StudentNo`
INNER JOIN `subject` sub
ON sub.`SubjectNo` = r.`SubjectNo`
WHERE subjectname = '高等数学-2' AND StudentResult >= 80;
```

【方法二】使用连接查询 + 子查询

```sql
SELECT r.studentno,studentname FROM student s
INNER JOIN result r ON s.`StudentNo`=r.`StudentNo`
WHERE StudentResult>=80;

-- 在上面 SQL 基础上，添加需求：课程为 高等数学-2
SELECT r.studentno,studentname FROM student s
INNER JOIN result r ON s.`StudentNo`=r.`StudentNo`
WHERE StudentResult >=80 AND subjectno=(
    SELECT subjectno FROM `subject`
    WHERE subjectname = '高等数学-2'
);
```

【方法三】使用子查询

```sql
SELECT studentno,studentname FROM student WHERE studentno IN (
    SELECT studentno FROM result WHERE StudentResult >=80 AND subjectno = (
        SELECT subjectno FROM `subject` WHERE subjectname = '高等数学-2'
    )
)
```

::: tip

[LeetCode：176. 第二高的薪水](https://leetcode.cn/problems/second-highest-salary/)

此题可以使用子查询，参考代码：

```sql
select max(salary) as SecondHighestSalary from Employee
where salary < (select max(salary) from Employee);
```

:::

# 5. MySQL 常用函数

::: tip

参考文档：<https://dev.mysql.com/doc/refman/8.0/en/built-in-function-reference.html>

:::

## 5.1 常用函数

几乎各种语言常用的数学运算都存在：
- `ABS(X)`
- `RAND()`
- `SIN(X)`
- `CEIL(X)`

还有字符串函数：
- `CHAR_LENGTH('123')` 获得字符串的长度
- `CONCAT(s1, s2)` 拼接字符串
- `INSERT(str, pos, len, newstr)` 插入字符串
- `UPPER('1231wqwerqwe')` 转换为大写
- `REPLACE('123456','34','abc')` 替换字符串

时间日期的函数：
- `CURRENT_DATE()` 当前日期
- `CURDATE()` 和上面的函数一样
- `LOCALTIME()` 本地时间日期
- `NOW()` 当前时间日期
- `SYSDATE()` 系统时间

查询当前的日期信息：

```sql
SELECT YEAR(NOW());
SELECT MONTH(NOW());
SELECT DAY(NOW());
SELECT HOUR(NOW());
SELECT MINUTE(NOW());
SELECT SECOND(NOW());
```

MySQL 支持签名算法：
- `MD5(str)`
- `SHA(str)`

系统函数：
- `USER()` 当前用户
- `SYSTEM_USER()` 用户名，和上面结果一致
- `VERSION()` MySQL 版本

## 5.2 聚合函数

| 函数名    | 描述   |
| --------- | ------ |
| `COUNT()` | 计数   |
| `SUM()`   | 求和   |
| `AVG()`   | 平均数 |
| `MIN()`   | 最小值 |
| `MAX()`   | 最大值 |

查询一共有多少学生：

```sql
-- 指定列，会忽略 null
SELECT COUNT(studentno) FROM student;
-- 每一条记录
SELECT COUNT(*) FROM student;
-- 
SELECT COUNT(1) FROM student;
```

查询平均分大于 80 分的课程的平均分、最高分、最低分：

```sql
SELECT subjectname, AVG(studentresult), MAX(studentresult), MIN(studentresult)
FROM result AS r
INNER JOIN `subject` sub
ON r.subjectno = sub.subjectno
GROUP BY r.subjectno
HAVING AVG(studentresult) > 80;
```

`HAVING` 用于过滤分组信息。

# 6. 事务

事务：批量的操作，要么都成功，要么都失败。

事务原则：ACID 原则
- 原子性
- 一致性
- 隔离性
- 持久性

隔离性的问题：
- 脏读：一个事务提交了，但另一个没有提交
- 不可重复读：同一个事务内，重复读取表中的数据，表数据发生了改变
- 虚读（幻读）：在一个事务中读到了别人插入的数据，导致前后结果不一致

```sql
-- 关闭自动提交
SET autocommit = 0;
-- 开始事务
START TRANSACTION;

INSERT INTO result VALUES (1001, 1, NOW(), 90);

-- 可以记录保存点
SAVEPOINT 保存点;

INSERT INTO result VALUES (1001, 2, NOW(), 95);

-- 提交事务
COMMIT;
-- 开启自动提交
SET autocommit = 1;
```

回滚到指定保存点语法：

```sql
ROLLBACK TO SAVEPOINT 保存点名称;
```

删除一个保存点：

```sql
RELEASE SAVEPOINT 保存点名;
```

下面创建一个数据库模拟转账问题：

```sql
CREATE DATABASE shop CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE `account` (
    `id` INT(3) NOT NULL auto_increment,
    `name` VARCHAR(30) NOT NULL,
    `money` DECIMAL(9, 2) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;
INSERT INTO account (`name`, `money`) VALUES
    ('A', 2000.00),
    ('B', 10000.00);
```

下面模拟转账事务：

```sql
SET autocommit = 0;
START TRANSACTION;

UPDATE account SET money=money-500 WHERE `name` = 'A';
UPDATE account SET money=money+500 WHERE `name` = 'B';

COMMIT;
SET autocommit = 1;
```

# 7. 索引

> 索引是帮助 MySQL 高效获取数据的数据结构。

## 7.1 索引的分类

下面列举一些常见的索引：
- 主键索引（Primary Key）
    - 唯一标识
    - 主键只有一个
- 唯一索引（Unique Key）
    - 避免重复的列出现
    - 可以有多个列加入唯一索引
- 常规索引（Key / Index）
    - 默认的
- 全文索引（FullText）
    - 在特定的数据库引擎下才有

## 7.2 索引的使用

索引使用步骤：
1. 创建表时给字段增加索引
2. 创建完毕后增加索引

显示所有的索引信息：

```sql
SHOW INDEX FROM student;
```

添加一个索引：

```sql
ALTER TABLE student
ADD FULLTEXT INDEX `studentname`(`studentname`);
```

不使用全文索引，检查 SQL 语句：

```sql
EXPLAIN SELECT * FROM student;
```

使用全文索引，检查 SQL 执行：

```sql
EXPLAIN SELECT * FROM student
WHERE MATCH(studentname) AGAINST('张');
```

## 7.3 测试索引性能

创建下面的表：

```sql
CREATE TABLE `app_user` (
    `id` BIGINT ( 20 ) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR ( 50 ) DEFAULT '' COMMENT '用户昵称',
    `email` VARCHAR ( 50 ) NOT NULL COMMENT '用户邮箱',
    `phone` VARCHAR ( 20 ) DEFAULT '' COMMENT '手机号',
    `gender` TINYINT ( 4 ) UNSIGNED DEFAULT '0' COMMENT '性别（0:男；1：女）',
    `password` VARCHAR ( 100 ) NOT NULL COMMENT '密码',
    `age` TINYINT ( 4 ) DEFAULT '0' COMMENT '年龄',
    `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
    `update_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY ( `id` ) 
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COMMENT = 'app用户表';
```

然后插入 1,000,000 条 数据：

```sql
-- 开启函数权限（重启后会失效）
set global log_bin_trust_function_creators = 1;
-- 创建 mock_data() 函数
DROP FUNCTION IF EXISTS mock_data;
DELIMITER $$
CREATE FUNCTION mock_data () RETURNS INT
BEGIN
    DECLARE num INT DEFAULT 1000000;
    DECLARE i INT DEFAULT 0;
    WHILE i < num DO
        INSERT INTO `app_user`(`name`, `email`, `phone`, `gender`, `password`, `age`)
        VALUES (CONCAT('用户', i), '24736743@qq.com', CONCAT('18', FLOOR(RAND()*(999999999-100000000)+ 100000000)), FLOOR(RAND()* 2), UUID(), FLOOR(RAND()* 100));
        SET i = i + 1;
    END WHILE;
    RETURN i;
END;
-- 执行操作
SELECT mock_data();
```

首先我们查询这个数据：

```sql
SELECT * FROM app_user WHERE `name` = '用户9999';
```

执行用时达到了 1 秒。

我们解释上面的 SQL 执行：

```sql
EXPLAIN SELECT * FROM app_user WHERE `name` = '用户9999';
```

其 `row` 列数字达到了 992357，也就是说数据库查找了 992357 条数据才找到我们的数据。

添加索引：

```sql
CREATE INDEX id_app_user ON app_user(`name`);
```

再去执行刚才的索引，速度提升明显。

索引在小数据量的时候，用处不大，但是在大数据量时区别明显。

## 7.4 索引原则

基本原则：
- 索引不是越多越好
- 不要对经常变动的数据加索引
- 小数据量的表不需要加索引
- 索引一般作用在常用来查询的字段上

不同索引类型的区别：
- Hash 索引：查询单条快，范围查询慢
- BTree 索引：B+ 树，层数越多，数据量指数级增长

InnoDB 默认的索引类型是 BTree。

不同的存储引擎支持的索引类型也不一样：
- InnoDB 支持事务，支持行级别锁定，支持 B-tree、Full-text 等索引，不支持 Hash 索引
- MyISAM 不支持事务，支持表级别锁定，支持 B-tree、Full-text 等索引，不支持 Hash 索引
- Memory 不支持事务，支持表级别锁定，支持 B-tree、Hash 等索引，不支持 Full-text 索引
- NDB 支持事务，支持行级别锁定，支持 Hash 索引，不支持 B-tree、Full-text 等索引
- Archive 不支持事务，支持表级别锁定，不支持 B-tree、Hash、Full-text 等索引

::: tip

推荐阅读：[MySQL 索引原理](http://blog.codinglabs.org/articles/theory-of-mysql-index.html)。

:::

# 8. 权限管理和数据库备份

## 8.1 用户管理

推荐使用数据库管理软件进行可视化管理，因为用户管理很少需要被使用，而且需要严格的操作。

```sql
-- 创建用户并设定密码
CREATE USER Alex IDENTIFIED BY '123456';

-- 修改当前用户密码
SET PASSWORD = PASSWORD('123456');

-- 修改指定用户的密码
SET PASSWORD FOR Alex = PASSWORD('abcdefg');

-- 重命名用户
RENAME USER Alex TO Bob;

-- 用户授权，授予全部权限给每个表，格式为 库.表
GRANT ALL PRIVILEGES ON *.* TO Alex;
```

如果我们给一个用户授权的内容是 `ALL PRIVILEGES`，那么这个用户拥有除了 `GRANT` 以外的全部权限，如果需要等同于 `root` 的权限，可以使用下面的 SQL：

```sql
GRANT ALL PRIVILEGES ON *.* TO Alex WITH GRANT OPTION;
```

查询权限：

```sql
SHOW GRANTS FOR admin@localhost;
```

如果后面不加域，默认查询 `user@%` 用户。

撤销权限：

```sql
REVOKE ALL PRIVILEGES ON *.* FROM Alex;
```

删除用户：

```sql
DROP USER Alex;
```

## 8.2 数据库备份

为什么要备份？
- 保证重要的数据不丢失
- 数据转移

MySQL 数据库备份 的方式：
- 拷贝物理文件
- 可视化工具中导出
- 使用命令行

```bash
mysqldump -hlocalhost -uroot -pxxxx school student > dump.sql
```

如果需要备份多张表，用空格分隔多张表。

导入数据，先登录，然后在命令控制台输入：

```sql
USE school;
SOURCE dump.sql;
```

或者使用命令行：

```bash
mysql -uroot -pxxxx school < dump.sql
```

# 9. 规范数据库设计

## 9.1 为什么设计数据库

当数据库比较复杂的时候，我们需要对数据库进行设计。

糟糕的数据库设计：
- 数据冗余，浪费空间
- 数据插入、删除都会麻烦（不使用物理外键）
- 程序性能差

良好的数据库设计：
- 节省内存空间
- 保证数据的完整性
- 方便开发系统

软件开发中，数据库设计
- 分析需求：分析业务需求和需要处理的数据库的需求
- 概要设计：设计关系图、E-R 图

设计数据库的步骤（个人博客）：
- 收集信息，分析需求
    - 用户表（用户登录，个人信息，写博客，创建分类）
    - 分类表（文章分类，创建者）
    - 文章表（文章的信息）
    - 友链表（友链信息）
    - 自定义表（系统信息，某个关键字，或者一些主字段）
- 标识实体
- 标识实体之间的关系
    - 多个实体之间的关系
    - 没有关联的表

场景举例：粉丝查询
- 查询粉丝的数量
- 查询粉丝的具体用户 ID

建立中间表 `user_follow`：

| 字段        | 类型 | 注释     |
| ----------- | ---- | -------- |
| `id`        | int  | 主键     |
| `user_id`   | int  | 被关注者 |
| `follow_id` | int  | 关注者   |

PS：可以使用一些前端框架，整合数据库和后端：
- Ant Design Pro
- ElementUI

## 9.2 三大范式

为什么需要数据规范化？
- 信息重复
- 更新异常
- 插入异常
    - 无法正常显示信息
- 删除异常
    - 丢失有效信息

三大范式：
- 第一范式（1NF）：每一列都是原子项（字段不可再分）
- 第二范式（2NF）：在第一范式的基础上消除非主属性对主码的部分函数依赖（每张表只做一件事情）
- 第三范式（3NF）：在第二范式基础上消除传递依赖（数据表中的每一列数据都和主键直接相关）

规范不是越高越好：
- 成本和用户体验问题，性能往往更重要
- 阿里规范：关联查询不得超过三张表
- 故意给一些表增加冗余字段（可以避免多表查询）

# 10. JDBC

## 10.1 数据库驱动

Sun 公司为了简化数据库的开发操作，提供了一个 Java 操作数据库的规范，称为 JDBC，这些规范由具体的数据局厂商去实现。

对于开发人员来说，我们只需要掌握 JDBC 接口操作即可。

除了需要 JDBC 的包，我们还需要 MySQL 数据库驱动包：`mysql-connector-java-5.1.47.jar`。

## 10.2 第一个 JDBC 程序

我们首先创建一个数据库：

```sql
CREATE DATABASE JDBCStudy CHARACTER SET utf8 COLLATE utf8_general_ci;

USE jdbcstudy;

CREATE TABLE users (
    `id` INT PRIMARY KEY,
    `name` VARCHAR(40),
    `password` VARCHAR(40),
    `email` VARCHAR(60),
    `birthday` DATE
);

INSERT INTO users VALUES
    (1, 'zhangsan', '123456', 'zs@sina.com', '1980-12-04'),
    (2, 'lisi', '12345123126', 'ls@sina.com', '1982-12-04'),
    (3, 'kkww', '1ed23456', 'kw@sina.com', '1999-12-04');
```

按照如下的步骤创建 JDBC 项目：
1. 创建一个 Java 项目
2. 复制数据库驱动 `.jar` 包到 `@/lib/` 文件夹下，然后导入到库
3. 编写代码测试

```java
import java.sql.*;

public class Test {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        // 1. 加载驱动
        Class.forName("com.mysql.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/jdbcstudy?useUnicode=true&characterEncoding=utf-8&useSSL=true";
        String user = "root";
        String password = "xxxxxx";
        // 2. 获取连接
        Connection conn = DriverManager.getConnection(url, user, password);
        // 3. 创建语句
        Statement stmt = conn.createStatement();
        String sql = "select * from users";
        // 4. 执行 SQL 语句
        ResultSet rs = stmt.executeQuery(sql);
        // 5. 循环判断是否有下一行
        while (rs.next()) {
            System.out.println("--------------------");
            System.out.println(rs.getObject("id"));
            System.out.println(rs.getObject("name"));
            System.out.println(rs.getObject("password"));
            System.out.println(rs.getObject("email"));
            System.out.println(rs.getObject("birthday"));
        }
        // 6. 关闭资源
        rs.close();
        stmt.close();
        conn.close();
    }
}
```

`DriverManager` 原始的写法如下，但是使用反射可以直接注册，如果再写下面的语句相当于被注册了两次。

```java
DriverManager.registerDriver(new com.mysql.jdbc.Driver());
```

数据库的基本设置可以使用连接对象设置：

```java
conn.rollback();
conn.commit();
conn.setAutoCommit(false);
```

语句对象：

| 方法                   | 功能                                     |
| ---------------------- | ---------------------------------------- |
| `stmt.execute()`       | 执行任何 SQL                             |
| `stmt.executeQuery()`  | 执行查询操作                             |
| `stmt.executeUpdate()` | 更新、插入或删除操作，返回受到影响的行数 |
| `stmt.executeBatch()`  | 执行多个 SQL                             |


结果集对象：

| 方法             |
| ---------------- |
| `rs.next()`      |
| `rs.getObject()` |
| `rs.getInt()`    |
| `rs.getFloat()`  |
| `rs.getDate()`   |
| `rs.getString()` |

## 10.3 封装 JDBC 连接

新建 `db.properties` 文件：

```properties
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/jdbcstudy?useUnicode=true&characterEncoding=utf-8&useSSL=true
username=root
password=xxxxx
```

新建类 `JdbcUtils.java` 然后编写：

```java
import java.sql.*;

public class JdbcUtils {

    private static String driver = null;
    private static String url = null;
    private static String username = null;
    private static String password = null;

    static {
        try {
            InputStream in = JdbcUtils.class.getClassLoader().getResourceAsStream("db.properties");
            Properties props = new Properties();
            props.load(in);

            driver = props.getProperty("driver");
            url = props.getProperty("url");
            username = props.getProperty("username");
            password = props.getProperty("password");

            Class.forName(driver);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(url, username, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void release(Connection conn, Statement st, ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (st != null) {
            try {
                st.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

更新数据：

```java
import java.sql.*;

public class Test {
    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            conn = JdbcUtils.getConnection();
            stmt = conn.createStatement();
            String sql = "insert into users values (4, 'Alex', '123', 'yali@alexsun.top', '2002-06-05')";
            int i = stmt.executeUpdate(sql);
            if (i > 0) {
                System.out.println("插入成功");
            } else {
                System.out.println("插入失败");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JdbcUtils.release(conn, stmt, rs);
        }
    }
}
```

## 10.4 解决 SQL 注入问题

`PreparedStatement` 可以防止 SQL 注入，并且拥有更高的效率。

```java
import java.sql.*;

public class Test {
    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = JdbcUtils.getConnection();
            pstmt = conn.prepareStatement("insert into users values (?,?,?,?,?)");
            st.setInt(1, 5);
            st.setString(2, "1");
            st.setString(3, "1");
            st.setString(4, "1");
            st.setDate(5, new Date(new java.util.Date().getTime()));
            int i = st.executeUpdate();
            if (i > 0) {
                System.out.println("插入成功");
            } else {
                System.out.println("插入失败");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JdbcUtils.release(conn, pstmt, rs);
        }
    }
}
```

## 10.5 JDBC 事务

JDBC 实现事务：

```java
import java.sql.*;

public class Test {
    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = JdbcUtils.getConnection();
            conn.setAutoCommit(false);
            String sql1 = "UPDATE account SET money=money-500 WHERE `name` = 'A'";
            String sql2 = "UPDATE account SET money=money+500 WHERE `name` = 'B'";
            pstmt1 = conn.prepareStatement(sql1);
            pstmt2 = conn.prepareStatement(sql2);
            pstmt1.executeUpdate();
            pstmt2.executeUpdate();
            conn.commit();
        } catch (SQLException e) {
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();
            }
        } finally {
            JdbcUtils.release(conn, pstmt, rs);
        }
    }
}
```

如果不写 `conn.rollback();` 事务也会被回滚。

## 10.6 数据库连接池

原始的数据库连接过程：
1. 建立数据库连接
2. 执行完毕
3. 释放

连接 —— 释放过程十分浪费时间。池化技术是准备一些预先的资源，过来就连接预先准备好的。

几个常用值：
- 常用连接数
- 最小连接数
- 最大连接数
- 超时时间

如果超过了最大连接数就只能排队等待，如果一个连接超时就会抛出错误并结束连接。

如果需要编写连接池，需要实现 `DataSource` 接口。

常见的开源数据源实现：
- DBCP
- C3P0
- Druid

使用了数据库连接池之后，我们就不需要编写连接数据库的代码。

## 10.7 DBCP 连接池

需要下面的 `.jar` 包支持：
- `commons-dbcp-1.4.jar`
- `commons-pool-1.6.jar`

```java
import org.apache.commons.dbcp.BasicDataSourceFactory;
import java.sql.*;

public class JdbcUtilsDBCP {

    private static DataSource dataSource = null;

    static {
        try {
            InputStream in = JdbcUtilsDBCP.class.getClassLoader().getResourceAsStream("db_dbcp.properties");
            Properties props = new Properties();
            props.load(in);
            dataSource = BasicDataSourceFactory.createDataSource(props);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() {
        return dataSource.getConnection();
    }

    public static void release() {
        dataSource.destroy();
    }
}
```

C3P0 类似，可以参考文档进行实现。

后续可以学习：
- Druid
- Apache 项目的其他软件

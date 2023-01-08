---
title: 数据库系统概论笔记
description: 数据库系统概论笔记
---

本文是 [*拯救者：数据库系统概论速成*](https://www.bilibili.com/video/BV1jf4y147jz/) 课程笔记，另外文末还包含实验题的 SQL，测试试卷和答案。

# 1. 绪论

1. 了解数据库的四个基本概念
2. 了解数据库的发展阶段
3. 了解常见的数据库的数据模型
4. 了解数据库系统的组成

## 1.1 基本概念

**数据**：是描述事物的符号记录。

**数据库**：永久储存、有组织、可共享三个基本特点。

严格来讲，数据库是长期储存在计算机内、有组织、可共享的大量数据的集合。数据库中的数据按一定的数据模型组织、描述和储存，具有较小的冗余度、较高的数据独立性和易扩展性，并可为各种用户共享。

**数据库管理系统**：是位于用户和操作系统之间的一层数据管理软件。

功能：
1. 数据定义
2. 数据组织、存储和管理
3. 数据操纵
4. 数据库的事务管理和运行管理
5. 数据库的建立和维护功能
6. 其他功能
    - 通信
    - 数据转换
    - 互访、互操作

**数据库系统**：是由数据库、数据库管理系统（及其应用开发工具）、应用程序和数据库管理员（DBA）组成的储存、管理、处理和维护数据的系统。

```mermaid
graph TB
    User1(["用户"]) & User2(["用户"]) & User3(["用户"]) --> 应用系统
    应用系统 --- 应用开发工具 --- 数据库管理系统 --- 操作系统
    操作系统 --- DB[("数据库")]
    数据库管理员 --> 数据库管理系统 & DB
```

## 1.2 数据库发展阶段

1. 人工阶段
    - 数据不保存
    - 不共享
    - 不具有独立性
2. 文件系统阶段
    - 可保存
    - 共享性差
    - 冗余度差
    - 独立性差
3. 数据库管理系统
    - 共享性高
    - 冗余度低
    - 易扩展
    - 独立性高
        - 物理的独立性：用户的应用程序与数据库中的数据的物理储存相互独立
        - 逻辑的独立性：用户的应用程序与数据库的逻辑结构是相互独立的

数据库管理系统的出现使信息系统从以 **加工数据为中心** 转向围绕 **共享的数据库** 为中心的新阶段。

## 1.3 数据模型

数据模型：
1. 概念模型
    - 也称为 **信息模型**，它是按用户观点来对数据和信息建模，主要用于数据库的设计
    - 概念模型的一种表示方法是：**实体 - 联系方法**，用 E-R 图来描述现实世界的概念模型，E-R 方法也称为 E-R 模型
    - 基本概念：
        - **实体**：即对象
        - **属性**：对象的特征
        - **码**：具有唯一识别的属性
        - **实体型**：即类
        - **实体集**：同一类实体的集合
        - **联系**：通常指的是不同实体集之间的联系
2. 逻辑模型
    - 是按计算机系统的观点对数据建模，主要用于数据库管理系统的实现
    - 包括：
        1. 层次模型
        2. 网状模型
        3. 关系模型
        3. 物理模型
    - 是对数据最底层的抽象，它描述数据在系统内部的表示方法和存取方法，或在磁盘或磁带上的储存方式和存取方法，是面向计算机系统的

联系：
   - 实体之间的联系通常是指不同实体集之间的联系。实体之间的联系有一对一、一对多和多对多等
   - 实体内部的联系通常是指实体各属性之间的联系

## 1.4 E-R 图

::: warning

本文使用的 E-R 图是乌鸦脚画法，而教科书上一般使用经典的 Chen 方法，可以相互转换。

:::

```mermaid
erDiagram
    Student ||--|{ Grade: own
    Student {
        int sid
        string name
        string grade
        string class
    }
    Grade {
        int gid
        int sid
        float score
    }
```

作为主键的属性下面加上下划线。

E-R 图分为实体、属性、关系三个核心部分：
- 实体是长方形
- 属性是椭圆形
- 关系为菱形

## 1.5 常用的数据模型

模型：
- 层次模型
- 网状模型
- 关系模型
- 面向对象模型
- 对象关系模型
- 半结构化数据模型

**层次模型**：
1. 有且只有一个根结点
2. 根以外的其他结点都只有一个父结点

- 根结点
    - R2
        - R4
        - R5
    - R3

**网络模型**：
1. 允许多个没有父结点的结点
2. 一个结点可以有多个父结点

**关系模型** 就是一张表：

学生记录表：

|    学号 |  姓名  | 年龄  | 性别  |  系名  | 年级  |
| ------: | :----: | :---: | :---: | :----: | :---: |
| 2013004 | 王小明 |  19   |  男   | 社会学 | 2013  |
| 2013006 | 张文斌 |  20   |  女   |  法律  | 2013  |

表的一些概念：
- **关系**：一个关系对应一张表
- **元组**：表的一行
- **属性**：表的一列
- **码**：也称 **码键**，表的某个属性组
- **域**：一组具有相同数据类型的值的集合
- **分量**：元组中的一个属性

## 1.6 数据库系统的结构

结构是模式数据库中全体数据的逻辑结构和特征的描述，它仅仅涉及型的描述，不涉及具体的值。其一个具体值称为模式的一个实例。

模式是相对稳定的，实例是相对变动的。

三级模式结构：
- **外模式**
    - 也称为 **子模式** 或 **用户模式** 它是数据库用户（包括程序员和最终用户）能够看见和使用的局部数据的逻辑结构和特征的描述，是数据库用户的数据视图，是与某一应用有关的数据的逻辑表示
- **模式**
    - 也称为 **逻辑模式**，是数据库中全体数据的逻辑结构和特征的描述，是所有用户的公共数据视图
- **内模式**
    - 也称 **存储模式**，一个数据库只有一个内模式，它是数据物理结构和存储方式的描述，是数据在数据库内部的组织方式

二级映像：
- 外模式 / 模式映像：当模式改变时，由数据库管理员对各个外模式 / 模式映像作相应更改，可以使外模式保持不变，应用程序不必修改，保证了数据与程序的逻辑独立性
- 内模式 / 模式映像：当数据库的储存结构更改时，由数据库管理员对模式 / 内模式作相应更改，可以使模式保持不变，从而应用程序也不必修改，保证了数据与程序的物理独立性

```mermaid
graph TB
    A["应用 A"]
    B["应用 B"]
    C["应用 C"]
    D["应用 D"]
    E["应用 E"]
    F["应用 F"]
    PATT_1["外模式 1"]
    PATT_2["外模式 2"]
    PATT_3["外模式 3"]
    PATT["模式"]
    IPAT["内模式"]
    A & B & C --- PATT_1
    D --- PATT_2
    E & F --- PATT_3
    PATT_1 & PATT_2 & PATT_3 --- PATT --- IPAT
```

数据与程序直接的独立性使得数据的定义和描述可以从应用程序中分离出去，另外，由于数据的存取由数据库管理系统管理，从而简化了应用程序的编制，大大减少了应用程序的维护和修改。

## 1.7 数据库系统的组成

包括：
1. 硬件平台及数据库：足够大的内存、磁盘或磁盘阵列等设备，较高的通道能力以提高数据的传送率
2. 软件：数据库管理系统，支持数据库管理系统运行的操作系统，具有与数据库接口的高级语言及其编译系统，以数据库管理系统为核心的应用开发工具，为特定应用环境开发的数据库应用系统
3. 人员：开发、管理和使用数据库的人员主要包括数据库管理员、系统分析员和数据库设计人员、应用程序员和最终用户

数据库管理员职责：决定数据库中的信息内容和结构、决定数据库的存储结构和存取策略、定义数据的安全性要求和完整性约束条件、监控数据库的使用和运行、数据库的改进和重组、重构。

# 2. 关系型数据库

1. 关系模式
2. 关系操作
3. 关系语言的分类
4. 关系的代数语言
5. 关系的完整性

## 2.1 概念

什么是关系？

关系是一张表。

关系有哪些需要描述？
- 关系中的属性
- 这些属性来自于哪些域
- 属性与域之间的映射关系

关系可以表示为

$$
R\left(U,\, D,\, \mathrm{DOM},\, F\right)
$$

- $R$ ：关系名
- $U$ ：所有属性名
- $D$ ：属性来自哪些域
- $\mathrm{DOM}$ ：属性和域的映射
- $F$ ：属性间的依赖关系

关系数据库：关系数据库也有关系数据库模式。

## 2.2 关系操作

关系操作：
- 插入
- 查询
- 删除
- 修改

查询操作
- 选择
- 投影
- 连接
- 除法
- 并
- 差
- 交
- 笛卡尔积

查询操作的基本操作有
- 选择
- 投影
- 并
- 差
- 笛卡尔积

## 2.3 关系语言的分类

分类：
- 关系代数语言
- 关系演算语言
- SQL 语言

**关系代数语言** 是一种抽象的查询语言，它用对关系的运算来表达查询。

三大要素：
- 运算对象（关系）
- 运算符（集合运算符和专门的关系运算符）
- 运算结果（关系）

关系代数的运算符：

|  运算符  |   含义   |       类别       |
| :------: | :------: | :--------------: |
|  $\cup$  |    并    |    集合运算符    |
|   $-$    |    差    |    集合运算符    |
|  $\cap$  |    交    |    集合运算符    |
| $\times$ | 笛卡尔积 |    集合运算符    |
| $\sigma$ |   选择   | 专门的关系运算符 |
|  $\Pi$   |   投影   | 专门的关系运算符 |
| $\Join$  |   连接   | 专门的关系运算符 |
|  $\div$  |    除    | 专门的关系运算符 |

关系代数运算中的基本运算：
- 交 $A \cap B$
- 并 $A \cup B$
- 差 $A - B$
- 笛卡尔积 $A \times B$
- 选择 $\sigma$，使用条件表达式
- 投影 $\Pi$
- 连接
    - 自然连接
    - 外连接
    - 左连接
    - 右连接

条件表达式中的运算符：

| 运算符类型 |  运算符  |
| :--------: | :------: |
| 比较运算符 |   $>$    |
| 比较运算符 |  $\ge$   |
| 比较运算符 |   $<$    |
| 比较运算符 |  $\le$   |
| 比较运算符 |   $=$    |
| 比较运算符 |  $\neq$  |
| 逻辑运算符 |  $\neg$  |
| 逻辑运算符 |  $\vee$  |
| 逻辑运算符 | $\wedge$ |

|       Sno | Sname | Ssex  | Sage  | Sdept |
| --------: | :---: | :---: | :---: | :---: |
| 201215125 | 张立  |  男   |  19   |  IS   |

查询表达式

$$
\sigma_{\mathrm{Sdept}=\text{‘Is’}}(\text{Student})
$$

查找学生的年龄和姓名

$$
\Pi_{\mathrm{Sname,\,Sage}}(\text{Student})
$$

查找学号为 `201215125` 的学生的年龄和姓名

$$
\Pi_{\mathrm{Sname,\,Sage}}\left(
    \sigma_{\mathrm{Sno}=\text{201215125}}(\text{Student})
\right)
$$

**自然连接**，选取公共属性

$R=$

| A   | B   | C   | D   |
| --- | --- | --- | --- |
| m   | 1   | n   | a   |
| n   | 4   | m   | b   |
| p   | 1   | p   | a   |
| q   | 2   | q   | b   |

$S=$

| B   | D   | E   |
| --- | --- | --- |
| 1   | a   | d   |
| 3   | a   | f   |
| 1   | a   | g   |
| 2   | b   | h   |
| 3   | b   | j   |

$R \Join S =$

| A   | B   | C   | D   | E   |
| --- | --- | --- | --- | --- |
| m   | 1   | n   | a   | d   |
| m   | 1   | n   | a   | g   |
| p   | 1   | p   | a   | d   |
| p   | 1   | p   | a   | g   |
| q   | 2   | q   | b   | h   |

**悬浮元素**：关系 $R$ 与 关系 $S$ 在作自然连接时，关系 $R$ 中某些元组有可能不存在公共属性上值相等的元组，从而造成 $R$ 中这些元组在操作时被舍弃了，这些被舍弃的元组称为悬浮元组。

外连接：
- **外连接**：把悬浮元组也保存在关系中，其他属性上填空值 `NULL`
- **左连接**：保留关系 $R$ 中的悬浮元组
- **右连接**：保留关系 $S$ 中的悬浮元组

**除**：保留 $R$ 中满足 $S$ 的，$R$ 中的列去掉 $S$ 的列。

$R=$

| 姓名  | 选修课程 |
| :---: | :------: |
| 张三  |  计算机  |
| 张三  |  数据库  |
| 张三  |   网络   |
| 李四  |   网络   |
| 李四  |  计算机  |
| 王五  |  数据库  |
| 王五  |   网络   |

$S=$

| 选修课程 |
| :------: |
|  数据库  |
|   网络   |

$R \div S =$

| 姓名  |
| :---: |
| 张三  |
| 王五  |

## 2.4 关系的完整性

1. 实体完整性
    - 主码唯一且非空
2. 参照完整性
    - 外码要么为空，要么对应另一个表的主码
3. 用户定义完整性
    - 自定义的完整性

# 3. SQL 语言

1. SQL 概念
2. SQL 语法

## 3.1 基本概念

**结构化数据查询语言**（SQL, Structured Query Language）是一种在数据库管理系统中查询或对数据库里面的数据进行更改的语言。

数据库管理系统主要有：
- 关系型
    - MySQL
    - Oracle
    - PostgreSQL
    - SQL Server
- 非关系型
    - Redis
    - MongoDB

不同的数据库管理系统的 SQL 略有不同。

## 3.2 SQL 语言功能

SQL **数据定义语言**（DDL, Data Definition Language）主要用来定义逻辑结构，包括定义基表，视图和索引。

数据定义语言：
- 删除表
- 定义表
- 修改表

SQL **数据查询语言**（DQL, Data Query Language）对数据库各种数据进行查询。

SQL **数据操纵语言**（DML, Data Manipulation Language）改变数据库中的数据，包括插入，删除，修改。

SQL **数据控制语言**（DCL, Data Control Language）对表和视图授权，完整性规则的描述以及事务开始和结束等控制语句。

## 3.3 SQL 语言的特点

特点：
1. 综合统一，即独立完成数据库生命周期全部活动
    - 定义关系模式
    - 录入数据
    - 建立数据库
    - 查询
    - 更新
    - 维护
    - 重构
2. 高度非过程化
    - 用户只需要写做什么
    - 不需要写怎么做
3. 面向集合的操作方式
    - SQL 采用集合操作的方式
4. 以同一种语法结构提供两种使用方式
    - SQL 是自含式语言
    - SQL 也是嵌入式语言，可以嵌入到高级程序语言中
5. 语言简单，易学易用
    - 语法简单
    - 接近英语口语

## 3.4 SQL 语法（上）

数据类型

| 数据类型                         | 含义                                  |
| :------------------------------- | :------------------------------------ |
| `char(n) character(n)`           | 定长字符串                            |
| `varchar(n) charactervarying(n)` | 最大长度为 $n$ 的变长字符串           |
| `clob`                           | 长字符串                              |
| `blob`                           | 二进制大对象                          |
| `int, integer`                   | 整数（4 字节）                        |
| `smallint`                       | 短整数（2 字节）                      |
| `bigint`                         | 大整数（8 字节）                      |
| `numeric(p, d)`                  | 定点数，$p$ 位数字，小数点后有 $d$ 位 |
| `dec(p, d) decimal(p, d)`        | 定点数，同 `numeric`                  |
| `real`                           | 单精度                                |
| `double`                         | 双精度                                |
| `float(n)`                       | 精度至少 $n$ 位数字的浮点数           |
| `boolean`                        | 逻辑变量                              |
| `time`                           | HH:MM:SS                              |
| `date`                           | YYYY-MM-DD                            |
| `timestamp`                      | 时间戳类型                            |
| `interval`                       | 时间间隔                              |

模式的定义和删除：

```sql
create schema <name> authorization <user>;
```

参数：
- `<name>` 模式名
- `<user>` 用户名

例如，为用户 WANG 定义一个学生 - 课程模式 S-T：

```sql
create schema 'S-T' authorization WANG;
```

模式定义 + 视图：

```sql
create schema <name> authorization <user>
[<表定义子句>|<视图定义子句>|<授权定义子句>];
```

例如：

```sql
create schema 'Learn' authorization alex create table user(
    id int primary key,
    age int,
    name varchar(255)
);
```

模式删除：

```sql
drop schema <name> cascade|restrict;
```

`cascade` 与 `restrict` 必须二选一：
- `cascade` 级联，把该模式下的数据库也删除
- `restrict` 限制模式，如果该模式下有下属对象，比如表视图，就就拒绝这个语句执行

创建表：

```sql
create table <表名称>(
    <字段名> <类型> <字段约束>, ...
);
```

比如：

```sql
create table user(
    name varchar(20),
    age int,
    sex char(1)
);
```

删除表：

```sql
drop table <表名> [cascade|restrict];
```

如果是 `cascade`，那么表有外键、视图、触发器也会被删除。

修改表：

```sql
alter table <表名>
    [add [column] <新列名><数据类型>[完整性约束]]
    [add <表级完整性约束>];
```

当数据量比较大的时候，查询耗时间长，建立索引可以有效减少时间消耗，索引可以建立在一列或多列上。

索引的建立和修改：

```sql
create [unique] [cluster] index <索引名> on <表名>(
    <列名> [<次序>], ...
);
```

含义：
- `cluster` 聚簇索引，物理顺序与索引的逻辑顺序相同
- `unique` 唯一索引

修改索引：

```sql
alter index <旧索引名> rename to <新索引名>;
```

删除索引：

```sql
alter table <table> drop index <索引名>;
```

## 3.5 SQL 语法（中）

选择语句，选择所有：

```sql
select * from <表名>;
```

列或表起别名：

```sql
select title as 课程 from course as ec;
```

结果去重：

```sql
select distinct title as 课程 from course;
```

`distinct` 通常效率较低。它不适合用来展示去重后具体的值，一般与 `count` 配合用来计算条数，例如：

```sql
select count(distinct task_id) task_num from Task;
```

`distinct` 使用中，放在 `select` 后边，对后面所有的字段的值统一进行去重。比如 `distinct` 后面有两个字段，那么 `1,1` 和 `1,2` 这两条记录不是重复值。

查询条件：

| 条件类型 |                         谓词                          |
| :------: | :---------------------------------------------------: |
|   比较   | `= > < >= <= != <> !> !<` 或 `not` 加上前面的比较符号 |
|   范围   |    `between ... and ..., not between ... and ...`     |
| 确定集合 |                     `in, not in`                      |
| 字符匹配 |                   `like, not like`                    |
|   空值   |                `is null, is not null`                 |
| 多重条件 |                    `and, or, not`                     |

条件子句：

```sql
select title from course
    where price > 2;
```

`like` 子句中，`'%'` 可以代替多个字符，而 `'_'` 只能代替一个，例如 `like 'test%'`。

聚集函数：

|              函数              |         功能         |
| :----------------------------: | :------------------: |
|           `count(*)`           |      元组的个数      |
| `count([distinct│all] <列名>)` | 列中值的个数，可去重 |
|  `sum([distinct│all] <列名>)`  |         求和         |
|  `avg([distinct│all] <列名>)`  |        平均数        |
|  `max([distinct│all] <列名>)`  |        最大值        |
|  `min([distinct│all] <列名>)`  |        最小值        |

```sql
select count(distinct teacher_id) from course;
```

分组查询：

```sql
select teacher_id from course
    group by teacher_id
    having teacher_id = 1;
```

可以使用 `having` 关键字进行筛选。

连接，相当于笛卡尔积：

```sql
select * from m_blog, m_user
    where m_blog.user_id = m_user.id;
```

自身连接：

```sql
select * from m_blog as m1, m_blog as m2
    where m1.id = m2.id;
```

外连接：

```sql
select * from m_ques mq
    left join m_user mu on mq.id = mu.id
    limit 100;
```

```sql
select * from m_ques mq
    right join m_user mu on mq.`index` = mu.id
    where mq.index < 5;
```

多表查询和子查询：

```sql
select * from m_ques as mq
    where mq.id in (
        select id from m_user);
```

带有 `any all some` 的子查询：

```sql
select * from m_ques as mq
    where mq.id <all (
        select id from m_user where id > 20);
```

任意比较符号可以加上 `any` 或 `or`。

`exists` 可以检查子查询是否有可返回的值，返回布尔值。

并集：

```sql
select * from m_ques
    where m_ques.`index` = 1
union
select * from m_ques
    where m_ques.line = 2
```

> 将 `union` 换为 `intersect` 即可变为交集，换为 `excpt` 即为差集。MySQL 不支持交集 `intersect` 和差集 `excpt`。

## 3.6 SQL 语法（下）

插入数据：

```sql
insert into <表名> [(cols...)]
    values(values...);
```

批量插入数据：

```sql
insert into <表名> values
    (cols...),
    ...;
```

修改：

```sql
update <表名> set col1 = val1, ...
    [where <条件>];
```

删除：

```sql
delete from <表名>
    [where <条件>];
```

## 3.7 创建视图

什么是视图？

**视图** 也称为 **虚表**，是一组数据的逻辑表示，其本质是对应一条 `select` 语句，结果集被赋予一个名字，即视图的名字。

视图本身不包含任何数据，它只包含映射到基表的一个查询语句，当基表数据发生变化时，视图也随之变化。

目的：方便、简化数据操作。当我们业务需求要查多张表的数据，这时我们可能会关联多张表的查询处理。如果这个查询 SQL 复杂的话也影响了查询效率。

这个时候我们可以创建视图，查询的时候只需要

```sql
select * from view;
```

即可。

创建语法：

```sql
create view <视图名> [cols...]
    as <子查询>
    [with check option];
```

`with check option` 将保证更新、插入、删除操作时被操作的行满足视图中的条件。

删除视图：

```sql
drop view <视图名> [cascade];
```

`cascade` 将定义为级联删除，由此视图产生的视图也会被删除。

更新视图语句：

```sql
update <视图名> set col1 = val1, ... [where <条件>];
```

将映射为实际对表的操作。

# 4. 数据库的安全性

1. 权限控制
2. 角色
3. 其他安全机制

## 4.1 数据库安全性控制

不安全因素：
1. 非授权对数据库的恶意存取和破坏
2. 数据库中重要的数据泄露
3. 安全环境的脆弱性

自主存取控制方法：

```sql
-- grant
grant <权限> on table <表名> to <用户>;

-- revoke
revoke <权限> on table <表名> from <用户>;
```

数据库安全控制：
1. 用户身份鉴别
    - 静态口令鉴别
    - 动态口令鉴别
    - 生物特征识别
    - 智能卡识别
2. 存取控制
3. 自主存取控制方法
    - 即自定义和分配其他用户的权限
        - `grant` 授予权限
        - `revoke` 撤回权限
    - 构成元素有 **数据库对象** 和 **操作权限**

|  对象类型  |     对象     | 操作类型                                                     |
| :--------: | :----------: | :----------------------------------------------------------- |
| 数据库模式 |     模式     | `create schema`                                              |
| 数据库模式 |    基本表    | `create table, alter table`                                  |
| 数据库模式 |     视图     | `create view`                                                |
| 数据库模式 |     索引     | `create index`                                               |
|    数据    | 基本表和视图 | `select, insert, update, delete, references, all privileges` |
|    数据    |    属性列    | `select, insert, update, references, all privileges`         |

授予用户对一个表的查询权限：

```sql
grant select on student to user1 with grant option;
```

`with grant option` 可以使这个用户将自己的权限授予给其他用户。

回收权限:

```sql
revoke select on student from user1 cascade;
```

`cascade` 级联将撤销其他相关用户的权限，如果其他用户的权限来自这个用户。

## 4.2 数据库的角色

角色指的是一类人，比如 CEO、总监、普通职员，可以给一类人授权。

创建角色：

```sql
create role <角色名>;
```

角色权限：

```sql
grant <权限> on [<对象类型>] <对象名> to <角色1>...;
```

```sql
create role CEO;

grant select on Student to CEO;
```

将角色赋给用户或角色：

```sql
grant CEO to user1 with admin option;
```

`with admin option` 意味着这个用户可以将权限赋给别的用户。

收回角色权限：

```sql
revoke select on Student from CEO;
```

使用视图提供保护机制：

```sql
create view CS_Student as
    select * from Student
        where sdept = 'IS'
    with check option;

grant select on CS_Student to user1;

grant all privileges on CS_Student to user1;
```

## 4.3 其他安全机制

**审计**：将数据库所有操作记录到审计日志中，然后可以通过日志查看非法行为。

对修改 `'SC'` 的操作进行审计：

```sql
audit update on SC;
```

取消对 `'SC'` 表的审计：

```sql
noaudit update on SC;
```

**数据加密**：通过一些加密算法，把明文变成密文，这样别人无法查看。

# 5. 数据库的完整性

1. 数据库的安全性
2. 数据库的完整性
3. 掌握断言和触发器的使用

## 5.1 完整性要求

数据库的完整性：
- 正确性：符合现实世界描述
- 相容性：同一对象在不同表里面是符合逻辑的
- 维护完整性
    1. 提供完整性约束条件的机制
    2. 提供完整性的检查方法
    3. 进行违约处理
- 三大完整性
    1. 实体完整性：主码唯一且非空
    2. 参照完整性：外码要么没有，要么只有一个
    3. 用户定义完整性
        - 非空 `not null`
        - 列值唯一 `unique`
        - 条件表达式 `check in ('男', '女')`

比如下面这个表：

```mermaid
erDiagram
    m_user {
        int id
        string username
        string avatar
        string email
        string password
        int status
        datetime created
        datetime last_login
    }
```

```sql
create table `m_user`  (
  `id` bigint not null auto_increment,
  `username` varchar(64),
  `avatar` varchar(255),
  `email` varchar(64),
  `password` varchar(64),
  `status` int not null,
  `created` datetime,
  `last_login` datetime,
  primary key (`id`) using BTree,
  index `uk_username`(`username` asc) using BTree
) engine = InnoDB;
```

## 5.2 断言

断言的建立：

```sql
create assertion <断言名>
    check <子句>;
```

例如，限制每一门课程最多 60 名学生选修：

```sql
create assertion ASSE_SC_CNUM
    check (60 >= all (
        select count(*) from sc
           group by cno
    ));
```

删除断言：

```sql
drop assertion <断言名>;
```

## 5.3 触发器

触发器是 **事件 -> 条件 -> 动作** 的规则。

当对一个表增、删、改的时候，对触发器里面的条件进行执行，如果成立则执行触发器的动作。

触发器的建立：

```sql
create trigger <触发器名>
    before|after <触发事件> on <表名>
    [referencing
        old as <变量>,
        new as <变量>]
    for each row|statement
        [when <触发条件>]
        <触发动作>;
```

`row` 是每改变一行触发一次，`statement` 是每个语句触发一次。

如果修改表的属性，那么将此操作记录到另一个表：

```sql
create trigger SC_T
    after UPDATE_OF_GRADE on SC
    referencing
        oldrow as oldtuple,
        newrow as newtuple
    for each row
        when (newtuple.grade >= 1.1 * oldtuple.grade)
            insert into SC_U (sno, cno, oldgrade, newgrade)
            values (oldtuple.sno, oldtuple.cno,
                    oldtuple.grade, newtuple.grade);
```

语句触发器：

```sql
create trigger Student_Count
    after insert on Student
    referencing
        new table as delta
    for each statement
        insert into StudentInsertCount(numbers)
            select count(*) from delta;
```

# 6. 关系数据理论

1. 数据库的安全性概述
2. 依赖候选码
3. 如何求最小依赖候选码
4. 数据库三大范式和 BCNF 概念
5. 公理系统
6. 如何求最小函数依赖集
7. 求模式分解

## 6.1 范式

为什么引入范式？因为数据库存在下面的异常
1. 数据冗余
2. 更新异常
3. 插入异常
4. 删除异常

设计关系数据库时，遵从不同的规范要求，这些不同的规范要求被称为不同的 **范式**，范式越高，冗余越小。

六种常见范式：
- 第一范式（1NF）
- 第二范式（2NF）
- 第三范式（3NF）
- 巴斯 - 科德范式（BCNF）
- 第四范式（4NF）
- 第五范式（5NF），又称为 **完美范式**

一般来说，数据库只需要满足第三范式（3NF）即可。

## 6.2 依赖

若 $X \to Y$ 但 $Y \nsubseteq X$，则称 $X \to Y$ 是 **非平凡的函数依赖**。

若 $X \to Y$ 但 $Y \subseteq X$，则称 $X \to Y$ 是 **平凡的函数依赖**。

在 $R(U)$ 中，如果 $X \to Y$，并且对于 $X$ 的任何一个真子集 $X'$，都有 $X' \nrightarrow Y$，则称 $Y$ 对 $X$ **完全函数依赖**，记作

$$
X \mathop{\to}\limits^{F} Y
$$

若 $X \to Y$，但 $Y$ 不完全函数依赖于 $X$，则称 $Y$ 对 $X$ **部分函数依赖**，记作

$$
X \mathop{\to}\limits^{P} Y
$$

## 6.3 候选码和超码

**候选码**：可以推导出所有属性的最小集。

如何选出候选码？
- 只出现在左边的一定是候选码
- 只出现在右边则一定不是候选码
- 左右都出现的不一定
- 左右都不出现的一定是候选码

然后确定的候选码的闭包，如果能推导出全部则是候选码。否则逐个尝试求闭包。

比如

$$
R\text{<} U,\, F \text{>},\,
U(A,\,B,\,C,\,D,\,E,\,G)
$$

$$
F = \left\{
    AB \to C,\,
    CD \to E,\,
    E \to A,\,
    A \to G
\right\}
$$

求候选码？
1. $B$ 只在左边，一定是候选码
2. $G$ 只在右边，一定不是候选码
3. $D$ 只在左边，一定是候选码
4. 每一个求闭包
    - $BDA$ 可以推得全部
    - $BDC$ 可以推得全部
    - $BDE$ 可以推得全部
5. 最终可能是 $\{(BDA),\,(BDC),\,(BDE)\}$

**超码**：能表示所有属性的集合。

比如：

$$
(BDA),\,(BDC),\,(BDE),\,(BDCA),\,(BDEA),\,(ABCDE)
$$

候选码是最小的超码。

概念：
- **主码**：候选码中的任意一个
- **主属性**：包含所有候选码的属性，如 $ABCDE$
- **非主属性**：不包含在候选码中的属性，如 $G$
- **全码**：所有的属性都是主码

## 6.4 第一范式：1NF

1NF是对属性的原子性约束，要求属性具有原子性，不可再分解。

数据库表的每一列（也称为属性）都是不可分割的原子数据项，不能是集合，数组，记录等非原子数据项。实体中的某个属性有多个值时，必须拆分为不同的属性。

在符合第一范式（1NF）表中的每个域值只能是实体的一个属性或一个属性的一部分。简而言之，第一范式就是无重复的域。

用户信息表：

| 编号 |  姓名  | 性别  | 年龄  |   联系电话    | 省份  | 城市  |      详细地址       |
| ---: | :----: | :---: | :---: | :-----------: | :---: | :---: | :-----------------: |
|    1 | 张洪新 |  男   |  26   | 0378-23459876 | 河南  | 开封  | 朝阳区新华路 23 号  |
|    2 | 李四平 |  女   |  32   | 0751-65432584 | 广州  | 广东  | 白云区天明路 148 号 |

比如，某些数据库系统需要地址这个属性，那么需要合并 **省份、城市、详细地址** 这三个属性。如果我们仅仅将 **地址** 作为属性的话，那么它不满足第一范式。

## 6.5 第二范式：2NF

在满足第一范式（1NF）的基础上，每一个非码属性（不在主键中的列）都必须完全函数依赖于候选码。

2NF 是对记录的惟一性约束，要求记录有惟一标识，即实体的惟一性，更通俗的说法就是一个表必须有主键 ID。

## 6.6 第三范式：3NF

在满足第二范式的基础上，每个非主属性不依赖于其它非主属性，即在 2NF 基础上，消除非码属性对候选码的传递函数依赖。

3NF 是对字段冗余性的约束，即任何字段不能由其他字段派生出来，它要求字段没有冗余。

也就是说，任何非主属性都直接依赖于主属性，不能传递依赖于主属性。即表中的每一列只与主键直接相关，而不是间接相关（表中的每一列只能依赖于主键）。每一个非码属性既不部分依赖于码，也不传递依赖于码。

## 6.7 巴斯-科德范式：BCNF

某些特殊情况下，即使关系模式符合 3NF 的要求，仍然存在着插入异常，修改异常与删除异常的问题。BCNF 由 Boyce 与 Codd 提出，通常被认为是修正的第三范式。

**巴斯-科德范式**（BCNF，Boyce-Codd Normal Form）即在满足第三范式基础上，任何非主属性不能对主键子集依赖（即在 3NF 基础上，消除主属性对候选码的部分函数依赖和传递函数依赖）。

巴斯-科德范式既检查非主属性，又检查主属性。当只检查非主属性时，就成了第三范式。满足巴斯-科德范式的关系都必然满足第三范式。或者还可以换一种说法：若一个关系达到了第三范式，并且它只有一个候选码，或者它的每个候选码都是单属性，则该关系符号巴斯-科德范式。

一般来说，一个数据库设计符合 3NF 或 BCNF 就可以了。

## 6.8 第四范式：4NF

多值依赖的概念：多值依赖即属性之间的一对多关系，记为 $K \twoheadrightarrow A$。

函数依赖事实上是单值依赖，所以不能表达属性值之间的一对多关系。

平凡的多值依赖：全集 $U=K+A$，一个 $K$ 可以对应于多个 $A$，即 $K \twoheadrightarrow A$。此时整个表就是一组一对多关系。

非平凡的多值依赖：全集 $U=K+A+B$，一个 $K$ 可以对应于多个 $A$，也可以对应于多个 $B$，$A$ 与 $B$ 互相独立，即 $K \twoheadrightarrow A$，$K \twoheadrightarrow B$。整个表有多组一对多关系，且有：“一” 部分是相同的属性集合，“多” 部分是互相独立的属性集合。

第四范式即在满足巴斯-科德范式（BCNF）的基础上，消除非平凡且非函数依赖的多值依赖（即把同一表内的多对多关系删除）。

## 6.9 第五范式：5NF

即在满足第四范式（4NF）的基础上，消除不是由候选码所蕴含的连接依赖。如果关系模式 $R$ 中的每一个连接依赖均由 $R$ 的候选码所隐含，则称此关系模式符合第五范式。

函数依赖是多值依赖的一种特殊的情况，而多值依赖实际上是连接依赖的一种特殊情况。但连接依赖不像函数依赖和多值依赖可以由语义直接导出，而是在关系连接运算时才反映出来。存在连接依赖的关系模式仍可能遇到数据冗余及插入、修改、删除异常等问题。

## 6.10 公理系统

**Armstrong 公理系统**（Armstrong’s axiom）：设 $U$ 为属性集总体，$F$ 是 $U$ 上的一组函数依赖，于是有关系模式 $R\text{<}U,\,F\text{>}$，对 $R\text{<}U,\,F\text{>}$ 来说有以下的推理规则：
1. **自反律**：若 $Y \subseteq X \subseteq U$，则 $X \to Y$ 为 $F$ 所蕴含
2. **增广律**：若 $X \to Y$ 为 $F$ 所蕴含，且 $Z \subseteq U$，则 $XZ \to YZ$ 为 $F$ 所蕴含
3. **传递律**：若 $X \to Y$ 及 $Y \to Z$ 为 $F$ 所蕴含，则 $X \to Z$ 为 $F$ 所蕴含

根据这三条推理规则得：
1. **合并规则**：由 $X \to Y,\,X \to Z$，有 $X \to YZ$
2. **伪传递规则**：由 $X \to Y,\,WY \to Z$，有 $XW \to Z$
3. **分解规则**：由 $X \to Y,\,Z \subseteq Y$，有 $X \to Z$

## 6.11 求函数最小依赖

什么是 **依赖**？

依赖是指关系中一个或一组属性的值可以决定其他属性的值，比如 $A \to B$ 就是一个依赖。

如何求最小依赖集？
1. 拆右边为多个元素的依赖关系
    - 比如 $A \to BC$ 拆分为 $A \to B,\,A \to C$
2. 去除当前元素，然后求闭包
    - 如果可以推出全部则去除
    - 重复上面的步骤直到不能操作为止
3. 左边最小化
    - 将左边的一个去除求闭包，如果可以推出全部则去除
    - 重复上面的步骤

例如，已知关系 $R\text{<}U,\,F\text{>}$，$U\{A,\,B,\,C,\,D,\,E,\,F,\,G\}$，且

$$
F = \{
    BCD \to A,\,
    BC \to E,\,
    A \to F,\,
    F \to G,\,
    C \to D,\,
    A \to G
\}
$$

最终答案为

$$
\{
    BC \to E,\,
    BC \to A,\,
    A \to F,\,
    F \to G,\,
    C \to D
\}
$$

## 6.12 模式分解

准则：
- 无损连接
    - 无损就是分解后再次连接，和分解之前一样
- 保持函数依赖
    - 即函数依赖不变

已知

$$
R(ABCDEGH),\,
F = \{
    A \to D,\,
    E \to D,\,
    D \to B,\,
    BC \to D,\,
    DC \to A
\}
$$

求保持函数依赖的 3NF 的分解。

步骤：
1. 求最小函数依赖集
2. 把不在 $F$ 里面的属性都找出来，单独分一类，并去除
3. 把每一个依赖左边相同的分成一类，没有一样的，就把 $A \to D$ 改为 $\{AD\}$，如果一样 $\{A \to B,\, A \to C\}$ 就改为 $\{ABC\}$
4. 如果候选码没有出现在分离里面，把任意一个候选码作为一类

过程：
-  函数最小依赖集为  
    $$
    F_{\min} = \{A \to D,\,E \to D,\,D \to B,\,BC \to D,\,DC \to A\}
    $$
-  $GH$ 没有在 $F$ 里面，单独分类 $\{GH\}$
-  候选码 $CE$
-  结果  
    $$
    \{AD\}\{ED\}\{DB\}\{BCD\}\{DCA\}\{CE\}\{GH\}
    $$

# 7. 数据库的设计

1. 数据库设计的基本步骤
2. E-R 图的构建
3. E-R 图转换为关系模型

## 7.1 数据库谁的基本步骤

步骤：
1. 需求分析
2. 概念结构设计
    - E-R 图
    - 设计数据字典
3. 逻辑结构设计
    - 把 E-R 图转换为逻辑模型
4. 物理结构设计
    - 把逻辑模型转换为物理模型
5. 数据库实施
    - 写 SQL 代码
6. 数据库运行维护
    - 性能检测

## 7.2 E-R 图

特点：
- 实体是矩形
- 属性是椭圆形
- 关系为菱形

关系：
- 一对一： $1:1$
- 一对多： $1:n$
- 多对多： $m:n$

```mermaid
graph LR
    A -- m --- R{R} -- n --- B
```

# 8. 数据库编程

1. 了解嵌入式 SQL
2. 嵌入式 SQL 的处理过程
3. SQL 与主语言的通信

## 8.1 嵌入式 SQL

本节简单阐述概念，如果想深入了解可以阅读相关语言、框架的文档。

**嵌入式 SQL**：把 SQL 语句嵌入到其他程序里面，如 Java / C++。

嵌入式 SQL 的处理过程：
1. 预编译转换为函数调用
2. 主语言编译
3. 变成主语言所编译的类型

SQL 与主语言通信：
1. SQL 给主语言传递状态
2. 主语言给 SQL 提供参数
3. SQL 把查询结果交给主语言处理
    - 游标
    - 主变量实现

# 9. 关系查询处理和优化

1. 查询过程
2. 查询优化的四个阶段
3. 代数优化

## 9.1 查询过程

![](./images/query-process.svg)

查询优化的四个阶段：
1. 查询分析
2. 查询检查
3. 查询优化
    - 代数优化
    - 物理优化
4. 查询执行

代数优化原则：
- 选择运算尽量先做
- 把投影运算和选择运算同时执行
- 把投影同它前后的双目运算符连接起来

查询树：
- `project(Sname)`
- `select(SC.Cno='2')`
- `join(Student.Sno=SC.Sno)`
    - `Student`
    - `SC`

关系代数语法图：
- $\Pi_{\text{Sname}}$
- $\sigma_{\text{SC.Cno=‘2’}}$
- $\sigma_{\text{Student.Sno=SC.Sno}}$
    - $\text{Student}$
    - $\text{SC}$

优化后的查询树：
- $\Pi_{\text{Sname}}$
- $\Join$ ： $\text{Student.Sno=SC.Sno}$
    - $\text{Student}$
    - $\sigma_{\text{SC.Cno=‘2’}}$
        - $\text{SC}$

# 10. 数据恢复技术

1. 事务特性
2. 故障及恢复

## 10.1 事务

事务的四大特性（ACID）：
1. A：**原子性**（autom）：要么全做、要么全不做
2. C：**一致性**（consistent）：与原子性相关，数据必须是一致的，比如银行汇款
3. I：**隔离性**（isolate）：一个事务的执行不能被其他事务打扰
4. D：**持久性**（duration）：数据库的改变是永久的，比如写入磁盘

## 10.2 故障

故障的种类：
- 事务内部故障
    - 采取 REDO 和 UNDO 技术（重做和撤销）
- 系统故障
    - DBMS 所运行的机器停转或宕机，需要重启
- 介质故障
    - 硬件设备损坏
- 计算机病毒

恢复方式：
- 数据转储
    - 对失败的事务重新执行
- 日志文件
    - 记录事务对数据的更新操作

恢复策略：
- 事务故障
    - 事务异常终止，撤销之前的操作，回滚操作
- 系统故障
    - 没有执行完的事务 UNDO
    - 丢失的事务 REDO
- 介质故障
    - 重装数据库
    - 重做事务

![](./images/error-recovery.svg)

# 11. 并发控制

1. 什么是并发
2. 并发带来的问题
3. 三级锁协议
4. 可串行性

## 11.1 概念

数据库的 **并发**：多个数据同时写入。

并发带来的问题：
1. 丢失修改
    - 修改没有生效
2. 读脏数据
    - 读取时恰好别的用户在修改它，读取了正在被修改的数据
3. 不可重复读
    - 连续两次读取的数据不同

丢失修改：

| $T_1$         | $T_2$         |
| ------------- | ------------- |
| $\rm R(A)=16$ |               |
|               | $\rm R(A)=16$ |
| $\rm A=A-1$   |               |
| $\rm W(A)=15$ |               |
|               | $\rm A=A-1$   |
|               | $\rm W(A)=15$ |

读脏数据：

| $T_1$          | $T_2$          |
| -------------- | -------------- |
| $\rm R(C)=100$ |                |
| $\rm C=C*2$    |                |
| $\rm W(C)=200$ |                |
|                | $\rm R(C)=200$ |
| $\rm ROLLBACK$ |                |
|                | $\rm W(A)=15$  |


不可重复读：

| $T_1$                 | $T_2$          |
| --------------------- | -------------- |
| $\rm R(A)=16$         |                |
| $\rm R(B)=100$        |                |
| 此时 $A+B=150$        |                |
|                       | $\rm R(B)=100$ |
|                       | $\rm B=B*2$    |
|                       | $\rm W(B)=200$ |
| $\rm R(A)=50$         |                |
| $\rm R(B)=200$        |                |
| 此时 $C$ 恢复为 $100$ |                |

## 11.2 锁

有两种锁：
1. 排它锁，也叫写锁 X 锁
2. 共享锁，也叫读锁 S 锁

封锁协议：
1. 一级封锁协议
    - 修改时，必须加上 X 锁，直到结束
    - 解决 **丢失修改** 问题
2. 二级封锁协议
    - 读的时候，加上 S 锁，用完就释放
    - 解决 **读脏数据** 问题
3. 三级封锁协议
    - 读的时候加上 S 锁，直到结束
    - 解决 **不可重复读** 问题

|      |            X | 锁           |            S | 锁           |         一 |     致     | 性       |
| ---- | -----------: | :----------- | -----------: | :----------- | ---------: | :--------: | :------- |
| 特点 | 事务结束释放 | 操作结束释放 | 事务结束释放 | 操作结束释放 | 不丢失修改 | 不读脏数据 | 可重复读 |
| 一级 |            🟢 |              |              |              |          🟢 |            |          |
| 二级 |            🟢 |              |              | 🟢            |          🟢 |     🟢      |          |
| 三级 |            🟢 |              |            🟢 |              |          🟢 |     🟢      | 🟢        |

## 11.3 可串行性

**可串行性** 意味着多种情况都可以，并发后结果是任意一个就可以。

例如：
- 事务 $T_1: A = B + 1$
- 事务 $T_2: B = A + 1$
- 先 $T_1$ 后 $T_2$ ： $A = 4,\,B = 3$
- 先 $T_2$ 后 $T_1$ ： $A = 3,\,B = 4$

如果这两种结果都是可接受的，那么它就是可串行的。

# 附录 A：实验 SQL

## 实验一

创建一个名为 `StuDB` 的数据库，在该数据库下根据下列表格给出的内容创建四个表 `S`（学生）、`C`（课程表）、`SC`（选课关系表）、`Dept`（系部表）。

`S` 表：

| 字段名称 | 数据类型 | 主码  |    可空    | 默认值 |
| :------: | :------: | :---: | :--------: | :----: |
|  `Sno`   |  长整型  |   *   | `NOT NULL` |        |
| `Sname`  |   文本   |       |   `NULL`   |        |
|  `Sex`   |   文本   |       |   `NULL`   | `'男'` |
|  `Age`   |  长整型  |       |   `NULL`   |        |
| `Deptno` |  长整型  |       | `NOT NULL` |        |

`C` 表：

| 字段名称 | 数据类型 | 主码  |    可空    | 默认值 |
| :------: | :------: | :---: | :--------: | :----: |
|  `Cno`   |  长整型  |   *   | `NOT NULL` |        |
| `Cname`  |   文本   |       |   `NULL`   |        |
|  `Cpno`  |  长整型  |       |   `NULL`   |        |
| `Credit` |  单精度  |       |   `NULL`   |        |

`SC` 表：

| 字段名称 | 数据类型 | 主码  |    可空    | 默认值 |
| :------: | :------: | :---: | :--------: | :----: |
|  `Sno`   |  长整型  |   *   | `NOT NULL` |        |
|  `Cno`   |  长整型  |   *   | `NOT NULL` |        |
| `Grade`  |  单精度  |       |   `NULL`   |        |

`Dept` 表：

|   字段名称   | 数据类型 | 主码  |    可空    | 默认值 |
| :----------: | :------: | :---: | :--------: | :----: |
|   `Deptno`   |  长整型  |   *   | `NOT NULL` |        |
|  `Deptname`  |   文本   |       |   `NULL`   |        |
| `Mastername` |   文本   |       |   `NULL`   |        |

```sql
-- 按照顺序创建下面四个表
CREATE TABLE Dept (
    Deptno BIGINT NOT NULL,
    Deptname VARCHAR(30),
    Mastername VARCHAR(30),
    PRIMARY KEY (Deptno),
);
CREATE TABLE S (
    Sno BIGINT PRIMARY KEY,
    Sname VARCHAR(30),
    Sex VARCHAR(2) DEFAULT '男',
    Age BIGINT,
    Deptno BIGINT NOT NULL,
    FOREIGN KEY (Deptno) REFERENCES Dept(Deptno)
);
CREATE TABLE C (
    Cno BIGINT PRIMARY KEY,
    Cname VARCHAR(30),
    Cpno BIGINT,
    Credit FLOAT,
    FOREIGN KEY (Cpno) REFERENCES C(Cno)
);
CREATE TABLE SC (
    Sno BIGINT NOT NULL,
    Cno BIGINT NOT NULL,
    Grade FLOAT,
    PRIMARY KEY (Sno, Cno),
    FOREIGN KEY (Sno) REFERENCES S(Sno),
    FOREIGN KEY (Cno) REFERENCES C(Cno)
);
```

数据内容（`S` 表）：

| `Sno`  | `Sname` | `Sex` | `Age` | `Deptno` |
| ------ | ------- | ----- | ----- | -------- |
| 991401 | 何丽    | 女    | 18    | 6        |
| 992401 | 胡涛    | 男    | 20    | 5        |
| 993401 | 马华    | 女    | 21    | 4        |
| 993402 | 马吉    | 男    | 22    | 4        |
| 994423 | 何小波  | 男    | 22    | 3        |
| 994424 | 路敏    | 女    | 20    | 3        |
| 995401 | 朱华    | 女    | 19    | 2        |
| 995402 | 张立    | 女    | 18    | 2        |
| 996401 | 李明    | 男    | 19    | 1        |
| 996402 | 刘晨    | 男    | 22    | 1        |
| 996403 | 张征    | 男    | 21    | 1        |

数据内容（`SC` 表）：

| `Sno`  | `Cno` | `Grade` |
| ------ | ----- | ------- |
| 991401 | 7     | 60      |
| 992401 | 3     | 85      |
| 992401 | 7     | 88      |
| 993401 | 7     | 85      |
| 993402 | 7     | 90      |
| 994423 | 6     |         |
| 994423 | 7     | 75      |
| 994424 | 6     | 70      |
| 994424 | 7     | 60      |
| 995401 | 1     | 70      |
| 995401 | 7     | 80      |
| 995402 | 7     |         |
| 996401 | 1     | 80      |
| 996401 | 2     | 95      |
| 996401 | 7     | 85      |
| 996402 | 1     | 75      |
| 996402 | 2     | 60      |
| 996402 | 7     | 80      |
| 996403 | 1     | 70      |
| 996403 | 7     | 80      |

数据内容（`C` 表）：

| `Cno` | `Cname`      | `Cpno` | `Credit` |
| ----- | ------------ | ------ | -------- |
| 1     | 数据库原理   | 4      | 4        |
| 2     | 计算数学     |        | 3        |
| 3     | 管理信息系统 | 1      | 3        |
| 4     | 数据结构     | 6      | 4        |
| 5     | 操作系统     | 7      | 4        |
| 6     | C语言        | 7      | 5        |
| 7     | 计算机基础   |        | 3        |

数据内容（`Dept` 表）：

| `Deptno` | `Deptname` | `Mastername` |
| -------- | ---------- | ------------ |
| 1        | 计算机系   | 刘红         |
| 2        | 信息系     | 李兰         |
| 3        | 数学系     | 张华         |
| 4        | 质量系     | 李兰         |
| 5        | 经管系     | 李辉         |
| 6        | 电气系     | 刘卫国       |
| 7        | 语文系     | 许卫国       |

## 实验二

1.  用 SQL 语句创建一个新表 `S1`（表的结构与学生表 `S` 一致），要包含主键、外键（参照 `Dept` 表）和默认值的定义
2.  使用 SQL 语句删除表 `S1`
3.  将一个新学生记录 `(997401, '张小玉', '女', 20, 7)` 插入到学生表 `S` 中
4.  往成绩表中增加一条记录 `(991401, 8, 100)`，发现什么问题，如何解决？
5.  插入一条无成绩的选课记录 `(997401, 7)`
6.  将学生 `997401` 的年龄改为 `22` 岁
7.  将所有男学生的年龄增加一岁
8.  删除学号为 `997401` 的学生记录
9.  删除课程编号为 `7` 的课程记录
10. 查询每门课程先修课的课程名（查询结果包括课程号，先修课课程号，先修课课程名）
11. 查询年龄在 `19` 岁（含 `19` 岁）以上的学生记录
12. 查询考试成绩为 `80`（含 `80` 分）分以上的成绩信息
13. 查询全体女生的详细信息
14. 查询 `1` 号系学生的选课信息
15. 删除系部编号为 `1` 的系部信息，发现什么问题，如何解决？

```sql
-- 创建表 S1
CREATE TABLE S1 (
    Sno BIGINT PRIMARY KEY,
    Sname VARCHAR(30),
    Sex VARCHAR(2) DEFAULT '男',
    Age BIGINT,
    Deptno BIGINT NOT NULL,
    FOREIGN KEY (Deptno) REFERENCES Dept(Deptno)
);

-- 删除表 S1
DROP TABLE S1;

-- 插入数据
INSERT INTO S VALUES (997401, '张小玉', '女', 20, 7);

-- 8 不在 SC 中
INSERT INTO SC VALUES (991401, 8, 100);
-- 解决方法：将 8 替换为 6
INSERT INTO SC VALUES (991401, 6, 100);
-- 或者插入一条到 C 表
INSERT INTO C VALUES (8, '新课程', NULL, 3);

-- 无成绩的记录
INSERT INTO SC (Sno, Cno) VALUES (997401, 7);

-- 更新
UPDATE S SET Age = 22 WHERE Sno = 997401;

-- 更新全部年龄
UPDATE S SET Age = Age - 1;

-- 删除学生记录
DELETE FROM SC WHERE Sno = 997401;
-- 去除约束
DELETE FROM S WHERE Sno = 997401;

-- 删除课程号
UPDATE C SET Cpno = NULL WHERE Cpno = 7;
DELETE FROM SC WHERE Cno = 7;
-- 去除约束
DELETE FROM C WHERE Cno = 7;

-- 查询先修课程
SELECT C.Cno, C.Cpno, (SELECT Cname FROM C as _C WHERE _C.Cno = C.Cpno) as CPName FROM C;

-- 年龄查询
SELECT * FROM S WHERE Age >= 19;

-- 成绩查询
SELECT * FROM SC WHERE Grade >= 80;

-- 查询女生
SELECT * FROM S WHERE Sex = '女';

-- 1 号系学生选课信息
SELECT S.Sno, SC.Cno FROM S, SC
    WHERE S.Sno = SC.Sno and S.Deptno = 1;
-- 或者
SELECT S.Sno, SC.Cno FROM S
    INNER JOIN SC ON S.Sno = SC.Sno
    WHERE S.Deptno = 1;

-- 与 S 约束冲突
DELETE FROM Dept WHERE Deptno = 1;
-- 解决办法：删除冲突的记录
DELETE FROM SC WHERE Sno IN (SELECT Sno FROM S WHERE Deptno = 1);
DELETE FROM S WHERE Deptno = 1;
```

## 实验三

1.  查询 “计算机系” 学生的学号与姓名
2.  查询年龄大于 `20` 岁的所有学生的信息
3.  查询成绩小于 `80` 分的学生学号、姓名、课程名、成绩，并按学号升序、成绩将序排列
4.  查询所有没有成绩的学生的学号
5.  查询选修各门课程的学生的人数、平均成绩、最高分、最低分和总分
6.  查询至少选修了两门以上课程的学生学号
7.  查询所有姓 “张” 的学生的详细情况
8.  查询每一门课程的先修课的先修课
9.  查询选修 “数据库原理” 且成绩在 `70` 分以上的学生学号、姓名（分别用多表连接和嵌套查询完成）
10. 查询计算机系没有选修 `7` 号课程的学生的学号和姓名
11. 查询被所有学生都选修的课程名称
12. 查询至少选修了学生 “张征” 选修的全部课程的学生的学号和姓名
13. 查询学分大于 `4` 或等于 `3` 的课程的名称和学分（用 `union` 操作）
14. 查询 “计算机系” 中比 “质量系” 所有学生年龄都小的学生姓名和年龄
15. 查询 “计算机系” 选修 “数据库原理” 课程的学生姓名和成绩

```sql
-- 1
SELECT Sno, Sname FROM S WHERE Deptno = (SELECT Deptno FROM Dept WHERE Deptname = '计算机系');

-- 2
SELECT * FROM S WHERE Age > 20;

-- 3
SELECT S.Sno, S.Sname, (
    SELECT C.Cname FROM C WHERE C.Cno = SC.Cno)
    AS Cname, SC.Grade
FROM S, SC
    WHERE SC.Grade < 80 AND S.Sno = SC.Sno
    ORDER BY S.Sno ASC, SC.Grade DESC;

-- 4
SELECT DISTINCT Sno FROM SC WHERE Grade IS NULL;

-- 5
SELECT Cno, COUNT(Cno) AS NUMs, AVG(Grade) AS AVGs,
    MAX(Grade) AS MAXs, MIN(Grade) AS MINs
FROM SC
    GROUP BY Cno;

-- 6
SELECT Sno, COUNT(Sno) AS NUMs FROM SC
    GROUP BY Sno HAVING COUNT(Sno) >= 2;

-- 7
SELECT * FROM S WHERE Sname LIKE '张%';

-- 8
SELECT Cno, Cpno, (
    SELECT _C.Cpno FROM C AS _C WHERE _C.Cno = C.Cpno) AS Ppno FROM C;

-- 9 嵌套查询
SELECT Sno, (
    SELECT Sname FROM S WHERE Sno = SC.Sno) AS Sname
FROM SC
    WHERE Grade > 70 AND Cno = (
        SELECT Cno FROM C WHERE Cname = '数据库原理'
        );
-- 9 多表连接
SELECT S.Sno, S.Sname FROM S, SC
    WHERE S.Sno = SC.Sno AND
        SC.Grade > 70 AND
        SC.Cno = (
            SELECT Cno FROM C WHERE Cname = '数据库原理'
        );

-- 10
SELECT Sno, Sname FROM S
    WHERE Deptno = (SELECT Deptno FROM Dept WHERE Deptname = '计算机系') AND Sno NOT IN (
        SELECT DISTINCT Sno FROM SC WHERE Cno = 7
    );

-- 11
SELECT C.Cno, C.Cname FROM C WHERE C.Cno IN (
    SELECT DISTINCT SC.Cno FROM SC GROUP BY SC.Cno
    HAVING COUNT(*) = (
        SELECT COUNT(*) FROM S
    )
);

-- 12
-- 解释为不存在一个课程 B，使得 “张征” 选择了而同学 A 没有选择
SELECT DISTINCT Sno FROM SC AS A_SC
WHERE NOT EXISTS (
    SELECT * FROM SC AS B_SC WHERE B_SC.Sno = (
        SELECT S.Sno FROM S WHERE S.Sname = '张征'
    ) AND NOT EXISTS (
        SELECT * FROM SC AS C_SC
        WHERE C_SC.Cno = B_SC.Cno AND C_SC.Sno = A_SC.Sno
    )
);

-- 13
SELECT Cname, Credit FROM C WHERE Credit = 3 UNION
    SELECT Cname, Credit FROM C WHERE Credit > 4;

-- 14
SELECT Sname, Age FROM S
WHERE S.Deptno = (
    SELECT Deptno FROM Dept
    WHERE Deptname = '计算机系'
) AND S.Age < ALL (
    SELECT Age FROM S
    WHERE Deptno = (
        SELECT Deptno FROM Dept
        WHERE Deptname = '质量系'
    )
);

-- 15
SELECT Sname, Grade FROM S, SC
WHERE S.Sno = SC.Sno AND S.Deptno = (
    SELECT Deptno FROM Dept
    WHERE Deptname = '计算机系'
) AND SC.Cno = (
    SELECT Cno FROM C
    WHERE Cname = '数据库原理'
);
```

## 实验四

1. 以 `SA` 身份登陆系统，创建数据库用户 `User1`，使用 `User1` 用户登录到数据库
2. 使用超级用户登录到数据库，对 `User1` 用户进行授权，允许 `User1` 访问 `Student` 表，允许 `User1` 修改 `C` 表中 `Cname` 属性列。然后再使用 `User1` 用户登录到数据库，观察其访问权限
3. 使用 SQL 语句完成一下操作：定义一新的登录帐号 `Hu`、数据库用户 `Hu`，并授予其访问学生表 `S` 的 `SELECT` 权限，授予其修改 `Sname` 的权限，使用 `Hu` 登录数据库，分别查询修改 `S` 表，观察执行结果。使用 `REVOKE` 命令回收 `Hu` 的相应权限，再次使用 `Hu` 登录数据库，分别查询修改 `S` 表，观察执行结果

```sql
-- 安全性
-- 1. 以 SA 身份登陆系统，创建数据库用户 User1，使用 User1 用户登录到数据库
CREATE DATABASE Stu20030839;
CREATE LOGIN User1 WITH PASSWORD = '123456',
    DEFAULT_DATABASE = Stu20030839;
CREATE USER User1 FOR LOGIN User1;

--2. 对 User1 用户进行授权
--（1）允许 User1 访问 Student 表
GRANT SELECT ON S TO User1;

--（2）允许 User1 修改 C 表中 CNAME 属性列
GRANT UPDATE ON C(Cname) TO User1;

--（3）查看User1权限
EXEC SP_HELPROTECT @USERNAME = 'User1';

--查看所有用户
EXEC SP_HELPUSER;

--3. 使用 SQL 语句完成以下操作
--（1）定义一新的登录帐号Hu
CREATE LOGIN Hu WITH PASSWORD = '123456',
    DEFAULT_DATABASE = Stu20030839;

--（2）数据库用户 Hu
CREATE USER Hu FOR LOGIN Hu;
-- 可以加入 WITH DEFAULT_SCHEMA=dbo

--（3）授予其访问学生表 S 的 Select 权限，授予其修改 Sname 的权限
GRANT UPDATE(Sname), SELECT ON S TO Hu WITH GRANT OPTION;
--检验：
SELECT * FROM S WHERE Sno=992401
    UPDATE S SET Sname='李明' FROM S WHERE Sno=996401;
SELECT * FROM S;

--（4）使用 REVOKE 命令回收 Hu 的相应权限
REVOKE UPDATE(Sname), SELECT ON S FROM Hu CASCADE;

--（5）查看 Hu 的权限
EXEC SP_HELPROTECT @USERNAME = 'Hu';

--完整性
--1. 建立新表 S1
CREATE TABLE S1 (
    Sno BIGINT PRIMARY KEY NOT NULL,
    Sname CHAR(10),
    Sex CHAR(2) DEFAULT '男' CHECK(Sex IN ('男', '女')),
    Age BIGINT CHECK(Age>18 AND Age < 60),
    Deptno BIGINT NOT NULL FOREIGN KEY REFERENCES Dept(Deptno)
);

--2. 使用 SQL 语句分别往表 S1 中插入两条记录
-- 其中一条记录年龄为 0 岁，另一条记录系部编号为 100，观察提示信息，并进行分析。
INSERT INTO S1(Sno, Sname, Sex, Age, Deptno) VALUES (1, '张三', '男', 0, 1);
INSERT INTO S1(Sno, Sname, Sex,Age,Deptno) VALUES (2, '李四', '男', 20, 100);

-- 3. 如何向表 SC 中插入一条记录 (996409, 10, 80)
INSERT INTO S(Sno,Deptno) VALUES(996409,1);
INSERT INTO C(Cno) VALUES(10);
INSERT INTO SC VALUES(996409,10,80);
```

# 附录 B：数据库复习试卷

## 1. 简答题

### 1.1 数据完整性约束

举例说明数据完整性约束规则中的实体完整性约束，并说明在数据更新中的有关实体完整性约束的注意事项。

::: warning

**实体完整性约束**：主码是唯一的且其属性不存在空值。实体完整性约束要求表的每一行是唯一实体。

:::

例如：选修（<u>学号，课程号</u>，成绩）

“学号，课程号” 为主码，“学号” 和 “课程号” 两个属性都不能取空值且元组不能重复。

数据更新时：
1. 主码必须唯一，如果和已有主码冲突会拒接修改
2. 主码中的所有属性都不能存在空值
3. 如果其他表含有外键引用到主码也要一并修改

### 1.2 三级模式结构

试述数据库系统的三级模式结构，并说明其优点。

三级结构：
1. 外模式：也称子模式或用户模式，一个数据库可以有多个外模式，但是一个应用程序只能使用一个外模式。它是数据库用户能够看见和使用的局部数据的逻辑结构和特征的描述，是数据库用户的数据视图，是与某一应用有关的数据的逻辑表示。外模式是保证数据库安全性的一个有力措施，因为每个用户只能看见和访问所对应的外模式中的数据，数据库中的其余数据是不可见的。数据库管理系统提供外模式数据定义语言（外模式 DDL）来严格地定义模式
2. 模式：也称逻辑模式，是数据库中全体数据的逻辑结构和特征的描述，是所有用户的公共数据视图。一个数据库只有一个模式，数据库管理系统提供模式数据定义语言（模式 DDL）来严格地定义模式
3. 内模式：也称存储模式，一个数据库只有一个内模式。它是数据物理结构和存放方式的描述，是数据在数据库内部的组织方式

优点：
- 保证数据的独立性
- 简化了用户接口
- 有利于数据共享
- 有利于数据的安全保密

> 数据库系统的三级模式是数据的三个抽象级别，它把数据的具体组织留给数据库系统管理，使用户能逻辑地、抽象地处理数据，而不必关心数据在计算机中的具体表现方式与存储方式。

### 1.3 数据库恢复技术

数据库恢复的基本技术有哪些？

数据库恢复技术有：
1. 数据转储，即 DBA 定期将整个数据库复制到磁带或另一个磁盘上保存起来的过程
2. 登记日志文件，日志文件是用来记录事务对数据库的更新操作的文件，设立日志文件可以进行事务故障恢复、系统故障恢复、协助后备副本进行介质故障恢复

### 1.4 数据库范式

写出两个关系模式分别满足下面的要求，并说明理由：
1. 是 3NF 的关系模式
2. 是 3NF，也是 BCNF 的关系模式

答案略，按照范式规则任意构造即可，例如：

- 学生（<u>学号</u>，姓名，年龄）
- 课程（<u>课程号</u>，课程名）
- 选修（<u>学号，课程号</u>，成绩）

非主属性对键码不存在部分依赖和传递依赖，是 3NF 主属性对键码不存在部分依赖和传递依赖，主属性对非主属性不存在函数依赖是 BCNF。

### 1.5 数据库并发

举例说明并发操作中的读脏数据的问题。

> 当两个事务 $T_1,\,T_2$ 并发时，事务 $T_1$ 修改某一数据，并将其写回磁盘，事务 $T_2$ 读取同一数据后，$T_1$ 由于某种原因回滚，这时 $T_1$ 已修改过的数据恢复原值，$T_2$ 读到的数据就与数据库中的数据不一致，则 $T_2$ 读到的数据就为 “脏” 数据。

| $T_1$                 | $T_2$       |
| --------------------- | ----------- |
| $R(X) = 10$           |             |
| $X:=X*2=20,\,W(X)=20$ |             |
|                       | $R(X) = 20$ |
| $\text{rollback}$     |             |

## 2. 设计与计算题

### 2.1 关系模型

设计一个学生选课系统，其中学生可以选多门课程，一门课程可以由多位学生选修，一门课程只能由一位教师开设，一位教师可以开设多门课程
1. 试画出 E-R 图  
    ```mermaid
    erDiagram
        Student }|--|{ Course: select
        Teacher ||--|{ Course: open
        Student {
            int sno
            string sname
        }
        Teacher {
            int tno
            string tname
        }
        Course {
            int cno
            string cname
        }
    ```
2. 转换成关系模型并标注主码、外码  
    - $\rm Student(\underline{sno},\,sname)$
    - $\rm Teacher(\underline{tno},\,tname)$
    - $\rm Course(\underline{cno},\,cname)$
    - $\rm SC(\underline{sno^*,\,{cno}}^*)$
    - $\rm TC(\underline{tno^*,\,{cno}}^*)$

    其中 $*$ 表示外键，下划线表示主键。

### 2.2 关系代数

设有关系 $R$ 与 $S$，其中

$R:$

| A   | B   | C   |
| --- | --- | --- |
| 1   | 4   | 7   |
| 2   | 5   | 8   |

$S:$

| B   | D   |
| --- | --- |
| 6   | 7   |
| 4   | 8   |

计算：
1.  $\rm \sigma_{B=4}(S)$  
    | B   | D   |
    | --- | --- |
    | 4   | 8   |
2.  $\rm \Pi_{B,C}(R)$  
    | B   | C   |
    | --- | --- |
    | 4   | 7   |
    | 5   | 8   |
3.  $\rm \Pi_{B}(R)-\Pi_{B}(S)$  
    | B   |
    | --- |
    | 5   |
4.  $\rm R \Join S$  
    | A   | B   | C   | D   |
    | --- | --- | --- | --- |
    | 1   | 4   | 7   | 8   |
5.  $\rm \Pi_{B}(R) \cap \Pi_{B}(S)$  
    | B   |
    | --- |
    | 4   |

## 3. 综合题

### 3.1 关系代数和 SQL

给定下面关系：
- 学生：`student(sno, sname, sex, sage, deptno)`
- 课程：`course(cno, cname, cpno, ccredit)`
- 选课：`sc(sno, cno, grade)`
- 系：`dept(deptno, deptname)`

1-3 题使用关系代数查询，其余使用 SQL：
1.  查询性别 `sex` 为 `'男'`，并且年龄 `sage` 大于 $20$ 岁的学生信息  
    $$
    \rm \sigma_{sex=\text{`男'} \land age > 20}(student)
    $$
2.  查询选修了课程名 `cname` 为 `'数据库'` 的学生号 `sno`，成绩 `grade`  
    $$
    \rm \Pi_{sno,\,grade}(\sigma_{
        cname=\text{`数据库'}}(course \Join grade))
    $$
3.  查询学号 `sno` 为 `'180101'` 学生没有选修的课程号 `cno`  
    $$
    \rm \Pi_{cno}(course) - \Pi_{cno}(\sigma_{sno=180101}(sc))
    $$
4.  建立本题目中的 `course` 表，其中 `cno` 为 `char(10)` 类型，`cname` 为 `char(20)` 类型，`cpno` 为 `char(10)` 类型，`ccredit` 为 `int` 类型，主码为 `(sno)`，外码为 `cpno` 参照 `course` 表的 `cno`  
    ```sql
    CREATE TABLE course(
        cno CHAR(10) PRIMARY KEY,
        cname CHAR(20),
        cpno CHAR(10),
        ccredit INT,
        FOREIGN KEY(cpno) REFERENCES course(cno)
    );
    ```
5.  在 `course` 表中插入 `cno` 为 `'C3'`，`cname` 为 `'数据科学'`，`cpno` 为 `'C1'`，`ccredit` 为 $2$ 的数据  
    ```sql
    INSERT INTO course VALUES ('C3', '数据科学', 'C1', 2);
    ```
6.  查询姓张的学生的学号 `sno` 和姓名 `sname`
    ```sql
    SELECT sno, sname FROM student WHERE sname like '张%';
    ```
7.  查询所有课程的信息，要求按学分 `ccredit` 降序排列  
    ```sql
    SELECT * FROM course ORDER BY ccredit DESC;
    ```
8.  查询课程编号 `cno`，及每门课程的选课人数  
    ```sql
    SELECT cno, COUNT(sno) FROM sc GROUP BY cno;
    ```
9.  查询所有学生都选修了的课程编号 `cno` 和课程名 `cname`  
    ```sql
    SELECT cno, cname FROM course WHERE NOT EXISTS (
        SELECT * FROM student WHERE NOT EXISTS (
            SELECT * FROM sc
            WHERE sc.sno = student.sno and sc.cno = course.cno
        )
    );
    ```
10. 将 `course` 表中 `cno` 为 `'C3'` 的 `credit` 改为 $3$  
    ```sql
    UPDATE course SET ccredit = 3 WHERE cno = 'C3';
    ```

### 3.2 候选码

关系模式 $R(U,\,F)$，其中 $U = (ABCDE),\,F = \{A \to B,\,C \to E\}$
1. 求 $(AC)_F^+$
2. 求候选码，说明步骤和判断理由

解答：

(1)

$$
(AC)_F^+ = \{A,\,C,\,B,\,E\}
$$

(2)

首先将关系模式分类：
- L 类：$A,\,C$
- R 类：$B,\,E$
- N 类：$D$
- LR 类：$\{\}$

那么候选码就是 $\{(ACD)\}$。

### 3.3 事务

设 $T_1,\,T_2$ 是如下两个事务，其中 $A,\,B$ 为数据库中两个数据项，设 $A$ 的初值为 $10$，$B$ 的初值为 $10$

$$
\begin{aligned}
    T_1:\quad A: & = B + 10 \\
    T_2:\quad B: & = A * B
\end{aligned}
$$

若允许这两个事务并行执行，试给出下列调度：
1. 遵循两段锁协议且可串行化调度  
    | $T_1$           | $T_2$            |
    | --------------- | ---------------- |
    | $\rm Slock\;A$  |                  |
    | $\rm R(A)=10$   |                  |
    | $\rm Xlock\;B$  |                  |
    |                 | $\rm Slock\;B$   |
    | $\rm B=A*B=100$ | $\rm wait$       |
    | $\rm W(B)=100$  | $\rm wait$       |
    | $\rm commit$    | $\rm wait$       |
    | $\rm unlock\;B$ | $\rm wait$       |
    | $\rm unlock\;A$ | $\rm wait$       |
    |                 | $\rm R(B)=100$   |
    |                 | $\rm Xlock\;A$   |
    |                 | $\rm A=B+10=110$ |
    |                 | $\rm W(A)=110$   |
2. 遵循两段锁协议但发生死锁调度
    | $T_1$          | $T_2$          |
    | -------------- | -------------- |
    | $\rm Slock\;A$ |                |
    | $\rm R(A)=10$  |                |
    |                | $\rm Slock\;B$ |
    |                | $\rm R(B)=10$  |
    | $\rm Xlock\;B$ |                |
    | $\rm wait$     | $\rm Xlock\;A$ |
    | $\cdots$       | $\rm wait$     |

# 附录 C：数据库题库

## 1. 简答题

1.  请简述数据库，并说明数据库管理系统的功能
    - **数据库** 是长期储存在计算机内、有组织、可共享的大量数据的集合。数据库中的数据按一定的数据模型组织、描述和储存，具有较小的冗余度、较高的数据独立性和易扩展性，并可为各种用户共享
    - **数据库管理系统**：是位于用户和操作系统之间的一层数据管理软件
2.  请说明数据库系统的三级模式与数据独立性
    - 数据库系统的三级模式结构由外模式、模式和内模式组成
    - 数据独立性包括数据的物理独立性和数据的逻辑独立性
    - **外模式**
        - 也称为 **子模式** 或 **用户模式** 它是数据库用户（包括程序员和最终用户）能够看见和使用的局部数据的逻辑结构和特征的描述，是数据库用户的数据视图，是与某一应用有关的数据的逻辑表示
    - **模式**
        - 也称为 **逻辑模式**，是数据库中全体数据的逻辑结构和特征的描述，是所有用户的公共数据视图
    - **内模式**
        - 也称 **存储模式**，一个数据库只有一个内模式，它是数据物理结构和存储方式的描述，是数据在数据库内部的组织方式
3.  请简述数据完整性约束，并举例说明
    - 三大完整性：
        1. 实体完整性：主码唯一且非空
        2. 参照完整性：外码要么没有，要么只有一个
        3. 用户定义完整性
            - 非空 `not null`
            - 列值唯一 `unique`
            - 条件表达式 `check in ('男', '女')`
    - 举例略
4.  请简述函数依赖，并举例说明完全函数依赖，部分函数依赖，传递函数依赖
    - 某个属性集决定另一个属性集时，称另一属性集依赖于该属性集
    - 举例：
        1. 完全依赖：通过 `{学生学号，选修课程名}` 可以得到 `{该生本门选修课程的成绩}`，而通过单独的 `{学生学号}` 或者单独的 `{选修课程名}` 都无法得到该成绩，则说明 `{该生本门选修课程的成绩}` 完全依赖于 `{学生学号，选修课程名}`
        2. 部分函数依赖：通过 `{学生学号，课程号}` 可以得到 `{该生姓名}`，而通过单独的 `{学生学号}` 已经能够得到 `{该生姓名}`，则说明 `{该生姓名}` 部分依赖于 `{学生学号，课程号}`
        3. 传递函数依赖：在关系 `R(学号，宿舍，费用)`中，通过 `{学号}` 可以得到 `{宿舍}`，通过 `{宿舍}` 可以得到 `{费用}`，而反之都不成立，则存在传递依赖 `{学号} -> {费用}`
5.  请说明 1NF，2NF，3NF，BCNF 概念，并举例说明
    - 请参考上面的知识点
6.  请说明视图的作用
     - 视图能够简化用户的操作
     - 视图使用户能以多种角度看待同一数据
     - 视图对重构数据库提供了一定程度的逻辑独立性
     - 视图能够对机密数据提供安全保护
     - 适度利用视图可以更清晰的表达查询
7.  请说明数据库设计的步骤及任务
    1. 需求分析：分析用户的需求，包括数据、功能和性能需求
    2. 概念结构设计：主要采用 E-R 模型进行设计，包括画 E-R 图
    3. 逻辑结构设计：通过将 E-R 图转换成表，实现从 E-R 模型到关系模型的转换
    4. 物理结构设计：主要是为所设计的数据库选择合适的存储结构和存取路径
    5. 数据库实施：包括编程、测试和试运行
    6. 数据库运行和维护：系统的运行与数据库的日常维护
8.  请说明在数据库设计过程中将 E-R 模型转换为关系数据模型的转换原则
    - E-R 图中的每个实体，对应一个关系，该关系具有属性为实体的全部属性，关键字为实体的关键字
9.  请说明针对不同故障恢复的策略
    1. 事务故障的恢复就是利用日志文件撤销此事务已对数据库进行的修改
    2. 系统故障的恢复就是要撤销故障发生时未完成的事务，重写已完成的事务
    3. 介质故障的恢复就是重装数据库，然后重写已完成的事务
10. 请举例说明丢失修改的调度序列，并将其修改为可串行化调度
    - 略，参见上面的知识点

## 2. 计算题

### 2.1 关系代数计算

$R:$

| A   | B   |
| --- | --- |
| 1   | 5   |
| 2   | 6   |
| 3   | 7   |

$S:$

| A   | C   | D   |
| --- | --- | --- |
| 5   | 5   | 1   |
| 2   | 6   | 2   |
| 6   | 7   | 3   |

1.  $\rm \Pi_{A,C}$
2.  $\rm R \Join S$
3.  $\rm \sigma_{A=1}$

### 2.2 概念模型

学校中有若干系，每个系有若干班级和教研室，每个教研室有若干教员，其中有的教授和副教授每人各带若干研究生，每个班有若干学生，每门课可由若干学生选修。请用 E-R 图画出该学校的概念模型，并转换为关系模型，表明主外码。

```mermaid
erDiagram
    Dept ||--|{ Class: have
    Dept ||--|{ ResearchRoom: have
    ResearchRoom ||--|{ Researcher: have
    Professor ||--|{ Researcher: lead
    Class ||--|{ Student: have
    Student }|--|{ Course: select
    Dept {
        int deptno
        string deptname
    }
    Class {
        int classid
        string classname
    }
    ResearchRoom {
        int roomid
        string roomname
    }
    Professor {
        int proid
        string proname
        bool is_associate
    }
    Researcher {
        int reid
        string rename
    }
    Student {
        int sid
        string sname
        int age
    }
    Course {
        int cid
        string cname
    }
```

## 3. 应用题

### 3.1 关系代数和 SQL 编写

有关系模式四个：
- 供应商关系：`S(Sno , Sname, Saddr)`
- 零件关系：`P(Pno,  Pname, Color, Weight)`
- 工程关系：`J(Jno, Jname, Jcity, Balance)`
- 供应关系：`SPJ(Sno, Pno, Jno, Price, Qty)`

用关系代数（1-3）和 SQL（4-10）完成如下查询：
1.  检索没有发生任何供应关系的零件编号  
    $$
    \rm \Pi_{Pno}(P) - \Pi_{Pno}(SPJ)
    $$
2.  检索使用了编号为 `P3` 或 `P5` 零件的工程编号 `Jno`  
    $$
    \rm \Pi_{Jno}(\sigma_{Pno=\text{`P3'}\lor Pno=\text{`P5'}}(SPJ))
    $$
3.  检索使用了红色零件的工程号 `Jno` 和工程名 `Jname`  
    $$
    \rm \Pi_{Jno,\,Jname}(\sigma_{Color=\text{`红色'}}(P \Join SPJ \Join J))
    $$
4.  定义表 `SPJ`，主码：`(Sno, Pno, Jno)`，外码 `Sno`、`Pno`，`Jno`  
    ```sql
    CREATE TABLE SPJ (
        Sno CHAR(4),
        Pno CHAR(4),
        Jno CHAR(8),
        Price DECIMAL(6, 1),
        Qty DECIMAL(8, 2),
        PRIMARY KEY (Sno, Pno, Jno),
        FOREIGN KEY (Sno) REFERENCES S(Sno),
        FOREIGN KEY (Pno) REFERENCES P(Pno),
        FOREIGN KEY (Jno) REFERENCES J(Jno)
    );
    ```
5.  定义使用红色零件的供应商名称和地址的视图  
    ```sql
    CREATE VIEW S_1 AS
    SELECT Sname, Saddr FROM SPJ, P, S
    WHERE SPJ.Sno = S.Sno AND SPJ.Pno = P.Pno AND Color = '红色';
    ```
6.  将供应商 `S5` 提供的零件 `P4` 的价格提高 `6%`  
    ```sql
    UPDATE SPJ SET Price = Price * 1.06 WHERE Sno = 'S5' AND Pno = 'P4';
    ```
7.  删除供应商号为 `S4` 的所有供应商记录  
    ```sql
    DELETE FROM SPJ WHERE Sno = 'S4';
    DELETE FROM S WHERE Sno = 'S4';
    ```
8.  检索不使用编号为 `P3` 零件的工程编号 `Jno` 和工程名称 `Jname`  
    ```sql
    SELECT Jno, Jname FROM J WHERE Jno NOT IN (
        SELECT Jno FROM SPJ WHERE Pno = 'P3'
    );
    ```
9.  检索至少使用了编号为 `P3` 和 `P5` 零件的工程编号 `Jno`  
    ```sql
    SELECT Jno FROM SPJ WHERE Pno = 'P3' AND Jno IN (
        SELECT Jno FROM SPJ WHERE Pno = 'P5'
    );
    ```
10. 检索使用了全部零件的工程名称 `Jname`  
    ```sql
    SELECT Jname FROM J WHERE NOT EXISTS (
        SELECT * FROM P WHERE NOT EXISTS (
            SELECT * FROM SPJ WHERE SPJ.Pno = P.Pno AND SPJ.Jno = J.Jno
        )
    );
    ```

### 3.2 关系的函数依赖和范式

关系模式：销售（时间，顾客编号，顾客名，商品编号，商品名，数量，单价）。语义：任何时间，对于任何顾客，同一商品的单价相同。
1. 列出函数依赖
2. 请判断该关系模式最高为第几范式，并说明理由
3. 请把上面的关系模式转化为 3NF，说明原因并指明主码

解答：

(1)

$$
\begin{aligned}
    F &= \{ \\
    & \text{顾客编号} \to \text{顾客名}, \\
    & \text{商品编号} \to \text{商品名}, \\
    & \text{商品编号} \to \text{单价}, \\
    & \text{(时间, 顾客编号, 商品编号)} \to \text{数量} \\
    \}
\end{aligned}
$$

(2)

最高为 1NF，由于上述函数依赖集为：
- L 类：时间，顾客编号，商品编号
- R 类：顾客名，商品名，单价，数量
- N 类：$\{\}$
- LR 类：$\{\}$

所以

$$
\begin{aligned}
    & (\text{时间},\,\text{顾客编号},\,\text{商品编号})_F^+ \\
    & = (
        \text{时间},\,
        \text{顾客编号},\,
        \text{商品编号},\,
        \text{顾客名},\,
        \text{商品名},\,
        \text{单价},\,
        \text{数量}
    ) \\
    & = U
\end{aligned}
$$

那么关系模式的码为：（时间，顾客编号，商品编号），由于非主属性顾客名对码是部分函数依赖，所以不符合 2NF。

(3)

- 顾客（<u>顾客编号</u>，顾客名）
- 商品（<u>商品编号</u>，商品名，单价）
- 销售（<u>时间，顾客编号，商品编号</u>，数量）

非主属性顾客名对码不存在部分函数依赖，也不存在传递函数依赖，所以是 3NF。

## 4. 其他相关题目

### 4.1 填空题

1.  数据模型通常由 <u>数据结构，数据操作，完整性约束</u> 三个要素组成
2.  有了 <u>外模式/模式</u> 可以保证数据和应用程序之间的逻辑独立性；有了 <u>内模式/模式</u>，可以保证数据和应用程序之间的物理独立性
3.  $\rm\sigma_{F_1}(\sigma_{F_2}(E))$ 等价于 $\rm\underline{\sigma_{F_1 \land F_2}(E)}$
4.  关系模式进行投影运算后属性数 <u>小于或等于</u> 原属性数
5.  SQL 的数据定义语句包括：<u>定义表，定义视图，定义索引</u> 等
6.  在 SQL 查询时，如果要去掉查询结果中的重复元组，需使用 <u> `distinct` </u>
7.  关系完备的系统支持 <u>关系数据结构</u>，和所有 <u>关系代数</u> 操作
8.  事务具有 <u>原子性、一致性、隔离性、持续性</u> 的特性
9.  在数据库系统中，定义存取权限称为 <u>授权</u>
10. 关系数据库规范化要解决的问题是插入异常，<u>删除异常，更新异常</u>

### 4.2 关系模型

有一课程管理系统：一个系可开设多门课程，学生可选修多门课程，一名教师只教一门课程，但一门课程可有几名教师开设。
1.  试画出 E-R 图并标注属性  
    ```mermaid
    erDiagram
        Dept ||--|{ Student: manage
        Dept ||--|{ Course: set
        Dept ||--|{ Teacher: hire
        Teacher }|--|| Course: teach
        Student }|--|{ Course: select
    ```
2.  转换成关系模型  
    - `Dept(Deptno, Deptname, Dmanger)`
    - `Student(Sno, Sname, Sage, Deptno)`
    - `Teacher(Tno, Tname, Deptno, Cno)`
    - `Course(Cno, Cname, Credit, Deptno)`
    - `SC(Sno, Cno, Grade)`

### 4.3 关系模式

写出3个关系模式分别满足：
1. 是 1NF，不是 2NF
2. 是 2NF，不是 3NF
3. 是 3NF，也是 BCNF

并说明所写的关系模式是前者，不是（或也是）后者。

答：
1. 学生选课（学号，姓名，课程号，成绩）
    - 属性不可分，是 1NF；存在非主属性对键码的部分依赖，不是 2NF
2. 学生（学号，姓名，系别，系主任）
    - 码为单属性，不存在部分依赖，是 2NF，存在非主属性对键码的传递依赖，不是 3NF
3. 学生（学号，姓名，年龄）；选修（学号，课程号，成绩）
    - 非主属性对键码不存在部分依赖和传递依赖，是 3NF，主属性对键码不存在部分依赖和传递依赖，主属性对非主属性不存在函数依赖是 BCNF

### 4.4 并发和故障恢复

试述系统故障的恢复的策略和方法。

策略：要撤销故障发生时未完成的事务，重做已完成的事务。

步骤：
1. 正向扫描日志文件，找出在故障发生前已经提交的事务记录，将其事务标识记入重做队列。同时找出故障发生时尚未完成的事务，将其事务标识记入撤销队列
2. 对撤销队列中的各个事务进行撤销处理
3. 对重做队列中的各个事务进行重做处理

并发操作可能导致哪几种数据不一致的现象？采用什么协议解决这几种数据不一致现象？

并发操作可能导致
1. 修改丢失
2. 读 “脏” 数据
3. 不可重复读

3 种数据不一致现象。采用一级封锁协议可解决丢失修改的问题，二级封锁协议既可解决丢失修改的问题，也可解决读 “脏” 数据的问题，而三级封锁协议可解决上述 3 种数据不一致现象。

### 4.5 候选码和最小依赖集

设关系模式 $R(ABCD)$ 上 FD 集为 $F$，$F = \{AB \to C,\, A\to B,\,B \to A\}$。
1. 试求 $R$ 的候选码
2. 试求 $F_m$

解答：

(1)

- L 类：$\{\}$
- R 类：$C$
- N 类：$D$
- LR 类：$A,\,B$

$R$ 的候选码为 $\{(BD),\,(AD)\}$。

(2)

$$
F_m = \{
    B \to C,\,
    A \to B\,\,
    B \to A
\}
$$

### 4.6 事务调度

设 $T_1,\,T_2$ 是如下两个事务，其中 $A$、$B$ 为数据库中某个数据项，设 $A$ 的初值为 $50$，$B$ 的初值为 $20$。

$$
\begin{aligned}
    T_1 &: A := B * 10 \\
    T_2 &: B := A + 10
\end{aligned}
$$

若允许这二个事务并行执行，试给出：
1. 不可串行化的调度
2. 以及一个遵守两段锁协议的调度

解答：

串行结果：
- $T_1 T_2:A=200,\,B=210$
- $T_2 T_1:A=600,\,B=60$

（1）不可串行化的调度

| $T_1$               | $T_2$          |
| ------------------- | -------------- |
| $\rm read(B)$       |                |
|                     | $\rm read(A)$  |
| $\rm A=B \times 10$ |                |
| $\rm write(A)$      |                |
|                     | $\rm B=A+10$   |
|                     | $\rm write(B)$ |

（2）遵守两段锁协议的调度

| $T_1$               | $T_2$           |
| ------------------- | --------------- |
| $\rm Slock(B)$      |                 |
| $\rm read(B)$       |                 |
| $\rm Xlock(A)$      |                 |
|                     | $\rm Slock(A)$  |
| $\rm A=B \times 10$ | $\rm wait$      |
| $\rm write(A)$      | $\rm wait$      |
| $\rm commit$        | $\rm wait$      |
| $\rm unlock(B)$     | $\rm wait$      |
| $\rm unlock(A)$     | $\rm wait$      |
|                     | $\rm read(A)$   |
|                     | $\rm Xlock(B)$  |
|                     | $\rm B=A+10$    |
|                     | $\rm write(B)$  |
|                     | $\rm commit$    |
|                     | $\rm unlock(B)$ |
|                     | $\rm unlock(A)$ |

（3）遵守两段锁协议但发生死锁的调度

| $T_1$          | $T_2$          |
| -------------- | -------------- |
| $\rm Slock(B)$ |                |
| $\rm read(B)$  |                |
|                | $\rm Slock(A)$ |
|                | $\rm read(A)$  |
| $\rm Xlock(A)$ |                |
| $\rm wait$     | $\rm Xlock(B)$ |
|                | $\rm wait$     |

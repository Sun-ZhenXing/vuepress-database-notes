# 附录 B：数据库复习试卷

<!-- markdownlint-disable MD033 -->

[[TOC]]

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

1. $\rm \sigma_{B=4}(S)$  
    | B   | D   |
    | --- | --- |
    | 4   | 8   |
2. $\rm \Pi_{B,C}(R)$  
    | B   | C   |
    | --- | --- |
    | 4   | 7   |
    | 5   | 8   |
3. $\rm \Pi_{B}(R)-\Pi_{B}(S)$  
    | B   |
    | --- |
    | 5   |
4. $\rm R \Join S$  
    | A   | B   | C   | D   |
    | --- | --- | --- | --- |
    | 1   | 4   | 7   | 8   |
5. $\rm \Pi_{B}(R) \cap \Pi_{B}(S)$  
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

1. 查询性别 `sex` 为 `'男'`，并且年龄 `sage` 大于 $20$ 岁的学生信息  
    $$
    \rm \sigma_{sex=\text{`男'} \land age > 20}(student)
    $$
2. 查询选修了课程名 `cname` 为 `'数据库'` 的学生号 `sno`，成绩 `grade`  
    $$
    \rm \Pi_{sno,\,grade}(\sigma_{
        cname=\text{`数据库'}}(course \Join grade))
    $$
3. 查询学号 `sno` 为 `'180101'` 学生没有选修的课程号 `cno`  
    $$
    \rm \Pi_{cno}(course) - \Pi_{cno}(\sigma_{sno=180101}(sc))
    $$
4. 建立本题目中的 `course` 表，其中 `cno` 为 `char(10)` 类型，`cname` 为 `char(20)` 类型，`cpno` 为 `char(10)` 类型，`ccredit` 为 `int` 类型，主码为 `(sno)`，外码为 `cpno` 参照 `course` 表的 `cno`  

    ```sql
    CREATE TABLE course(
        cno CHAR(10) PRIMARY KEY,
        cname CHAR(20),
        cpno CHAR(10),
        ccredit INT,
        FOREIGN KEY(cpno) REFERENCES course(cno)
    );
    ```

5. 在 `course` 表中插入 `cno` 为 `'C3'`，`cname` 为 `'数据科学'`，`cpno` 为 `'C1'`，`ccredit` 为 $2$ 的数据  

    ```sql
    INSERT INTO course VALUES ('C3', '数据科学', 'C1', 2);
    ```

6. 查询姓张的学生的学号 `sno` 和姓名 `sname`

    ```sql
    SELECT sno, sname FROM student WHERE sname like '张%';
    ```

7. 查询所有课程的信息，要求按学分 `ccredit` 降序排列  

    ```sql
    SELECT * FROM course ORDER BY ccredit DESC;
    ```

8. 查询课程编号 `cno`，及每门课程的选课人数  

    ```sql
    SELECT cno, COUNT(sno) FROM sc GROUP BY cno;
    ```

9. 查询所有学生都选修了的课程编号 `cno` 和课程名 `cname`  

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

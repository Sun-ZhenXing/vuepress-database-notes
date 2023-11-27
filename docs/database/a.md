# 附录 A：实验 SQL

[[TOC]]

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

1. 用 SQL 语句创建一个新表 `S1`（表的结构与学生表 `S` 一致），要包含主键、外键（参照 `Dept` 表）和默认值的定义
2. 使用 SQL 语句删除表 `S1`
3. 将一个新学生记录 `(997401, '张小玉', '女', 20, 7)` 插入到学生表 `S` 中
4. 往成绩表中增加一条记录 `(991401, 8, 100)`，发现什么问题，如何解决？
5. 插入一条无成绩的选课记录 `(997401, 7)`
6. 将学生 `997401` 的年龄改为 `22` 岁
7. 将所有男学生的年龄增加一岁
8. 删除学号为 `997401` 的学生记录
9. 删除课程编号为 `7` 的课程记录
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

1. 查询 “计算机系” 学生的学号与姓名
2. 查询年龄大于 `20` 岁的所有学生的信息
3. 查询成绩小于 `80` 分的学生学号、姓名、课程名、成绩，并按学号升序、成绩将序排列
4. 查询所有没有成绩的学生的学号
5. 查询选修各门课程的学生的人数、平均成绩、最高分、最低分和总分
6. 查询至少选修了两门以上课程的学生学号
7. 查询所有姓 “张” 的学生的详细情况
8. 查询每一门课程的先修课的先修课
9. 查询选修 “数据库原理” 且成绩在 `70` 分以上的学生学号、姓名（分别用多表连接和嵌套查询完成）
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

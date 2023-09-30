# Q3C 环境搭建和基本使用

本文介绍 Q3C 环境搭建和基本使用。

[[TOC]]

## 1. Q3C 是什么

::: info GIS 和空间数据库相关教程

建议参考 [《空间数据库》课程整理汇总](https://malagis.com/the-spatial-database-course-summary.html) 获得有关 GIS 和空间数据库的相关内容。

:::

[Q3C](https://github.com/segasai/q3c) 是由 Sergey Koposov 开发的 PostgreSQL 插件，用于创建空间数据库索引。

PostGIS 可能是 PostgreSQL 生态下最好的空间数据库插件，而 Q3C 则是一个小众的空间数据库，主要由 C 语言编写，提供了基本的创建空间索引和空间查询函数。

为了使用 Q3C，你需要安装一个 PostgreSQL（9.1 或更高）。Q3C 1.4.x 支持 PostgreSQL 9.1 以前的版本，如果需要旧版本支持请使用 1.4.x。

## 2. 安装 Q3C

::: details 本文所使用的 Dockerfile

```dockerfile
FROM postgres:14.7-bullseye
WORKDIR /app

RUN echo "deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib" > /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/debian-security/ bullseye-security main" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib" >> /etc/apt/sources.list \
    && apt update \
    && apt install apt-transport-https ca-certificates -y \
    && apt install git -y \
    && apt install build-essential postgresql-server-dev-14 liblz4-dev libreadline-dev zlib1g-dev -y \
    && git clone https://github.com/segasai/q3c.git \
    && cd q3c \
    && make \
    && make install \
    && cd .. \
    && rm -rf q3c \
    && apt remove build-essential postgresql-server-dev-14 liblz4-dev libreadline-dev zlib1g-dev -y \
    && apt autoremove -y \
    && apt clean

EXPOSE 5432
CMD [ "postgres" ]
```

测试：

```bash
docker build -t q3c:v1 .
docker run -itd \
    --name pg_q3c \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_USER=postgres \
    q3c:v1
```

:::

下面我们以 PostgreSQL 14.7 示例，我们使用 Docker 创建 PostgreSQL 14.7 环境，如果你已经安装可以跳过 Docker 部分。

```bash
docker pull postgres:14.7-bullseye
docker run -itd \
    --name pg_q3c \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_USER=postgres \
    postgres:14.7-bullseye

docker exec -it pg_q3c bash
```

安装基本工具，确保 `apt` 可用 HTTPS 通信，如果这一步更新失败或较慢可用更换源：

```bash
apt update
apt install apt-transport-https ca-certificates -y
```

*@note:可选* 更换源（Debian 11 bullseye，阿里云）：

```bash
mv /etc/apt/sources.list /etc/apt/sources.list-bak
echo '
deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb http://mirrors.aliyun.com/debian-security/ bullseye-security main
deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
' > /etc/apt/sources.list

apt update
```

下载源代码，并安装编译依赖：

```bash
apt install git
git clone https://github.com/segasai/q3c.git
apt install build-essential postgresql-server-dev-14 liblz4-dev libreadline-dev zlib1g-dev -y
```

编译：

```bash
cd q3c
make
make install
```

这一步如果没有出错安装就完成了。

现在我们检查一下安装效果：

```bash
su postgres
cd
psql
```

然后在 PostgreSQL 提供的命令行界面种操作，创建数据库。

在指定数据库中使用下面的 SQL 来创建插件：

```sql
CREATE EXTENSION q3c;
```

Q3C 常见操作：

```sql
-- 在指定数据库中使用 Q3C 插件
CREATE EXTENSION q3c;

-- 查看当前 Q3C 版本
SELECT q3c_version();

-- 修改当前数据库使用的 Q3C 版本
ALTER EXTENSION q3c UPDATE TO 'A.B.C';

-- 查看系统中安装了哪些 Q3C 版本
SELECT * FROM pg_available_extension_versions WHERE name ='q3c';
```

## 3. 开始使用

为了开始使用 Q3C 进行搜索和交叉匹配，你应该在你的表中创建索引。

在这个演示中，我们假设你有一个名为 `"mytable"` 的表，其中有 `"ra"` 和 `"dec"` 列（使用度数表示的赤经和赤纬）。

首先，你将需要创建空间索引，使用命令。

```sql
CREATE INDEX ON mytable (q3c_ang2ipix(ra, dec));
```

下一个过程是可选的，但强烈建议：使用新创建的索引对表进行聚簇。聚簇过程是根据 Q3C 空间索引值对磁盘上的数据进行排序的过程，如果你的表非常大，这将确保更快的查询。

如果数据已经以有序的方式摄入数据库（即沿着球形区域），聚簇步骤可以省略（尽管仍然推荐）。如果你的数据集很大，聚簇步骤可能需要一段时间（几个小时）。

```sql
CLUSTER mytable_q3c_ang2ipix_idx ON mytable;
```

另外，你也可以不使用 `CLUSTER`，而是在建立索引之前自己对表进行重新排序（可能更快）：

```sql
CREATE TABLE mytable1 AS SELECT * FROM mytable ORDER BY q3c_ang2ipix(ra, dec);
```

最后一步是分析你的表：

```sql
ANALYZE mytable;
```

现在你应该能够使用 Q3C 查询了。

## 4. 可用函数

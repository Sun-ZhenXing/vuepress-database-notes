# PostGIS 入门

[[TOC]]

## 1. 安装 PostGIS

安装 PostgreSQL 14 + PostGIS 3.3 的 Docker 版本，可用查看 [其他可用 tags](https://registry.hub.docker.com/r/postgis/postgis/tags)。

```bash
docker pull postgis/postgis:14-3.3-alpine
```

测试 PostgreSQL 安装的 PostGIS 插件版本：

```sql
SELECT postgis_full_version();
```

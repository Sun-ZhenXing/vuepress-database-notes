# 2. 安装 MongoDB

本文目前只介绍 MongoDB 的 Docker 安装方式，其他安装方式请参考官方文档。

[[TOC]]

## 2.1 使用 Docker 安装

MongoDB 的 Docker 镜像包含几个不同的版本，其中 `mongo` 是最常用的开源版本，社区版本的服务器是 `mongodb/mongodb-community-server`，企业版的服务器是 `mongodb/mongodb-enterprise-server`。

我们直接使用 `mongo` 镜像：

```bash
docker pull mongo
```

常见的启动命令：

```bash
docker run -d \
    --name mongodb \
    -p 27017:27017 \
    mongo
```

如果本地安装了 MongoDB 客户端，可以通过 `mongosh` 命令连接：

```bash
mongosh --port 27017
```

如果没有安装客户端，可以通过容器内的客户端连接：

```bash
docker exec -it mongodb mongosh
```

执行测试：

```js
db.runCommand(
   {
      hello: 1
   }
)
```

输出：

```js
{
  isWritablePrimary: true,
  topologyVersion: {
    processId: ObjectId("6517b60b54690f603399e62b"),
    counter: Long("0")
  },
  maxBsonObjectSize: 16777216,
  maxMessageSizeBytes: 48000000,
  maxWriteBatchSize: 100000,
  localTime: ISODate("2023-09-30T13:21:24.616Z"),
  logicalSessionTimeoutMinutes: 30,
  connectionId: 11,
  minWireVersion: 0,
  maxWireVersion: 21,
  readOnly: false,
  ok: 1
}
```

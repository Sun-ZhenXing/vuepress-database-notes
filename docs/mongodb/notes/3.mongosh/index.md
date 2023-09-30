# 3. MongoDB Shell 的使用

::: warning 弃用警告

传统的 `mongo` 命令在 MongoDB 5.0 中被弃用，并在 MongoDB 6.0 中被删除，因此本文不使用旧的命令。新 Shell 改进了：

- 与 MongoDB Node.js 驱动程序兼容
- 语法突出显示
- 命令历史
- Logging

在 `mongosh` 中，一些遗留方法不可用或已被更新的方法替换。

:::

[[TOC]]

## 3.1 安装 MongoDB Shell

MongoDB Shell 是 MongoDB 的交互式 JavaScript 接口。MongoDB Shell 可以查询和更新数据以及执行管理操作。

MongoDB Shell 作为 MongoDB Server 安装的一部分包含在内，如果你使用 Docker 安装，并且想要在主机内安装，也可以 [独立安装](https://www.mongodb.com/try/download/shell)。

## 3.2 连接到 MongoDB

直接使用 `mongosh` 命令即可连接到 MongoDB：

```bash
mongosh
```

这相当于直接指定 URL：

```bash
mongosh "mongodb://localhost:27017"
```

或者使用 `--port` 指定端口，并使用 `--host` 指定主机：

```bash
mongosh --host mongodb0.example.com --port 28015
```

要连接到需要身份验证的 MongoDB，使用 `--username` 和 `--authenticationDatabase` 选项。`mongosh` 会提示输入密码。

例如，要在 `admin` 数据库上以用户 `alice` 身份进行身份验证，请运行以下命令：

```bash
mongosh "mongodb://mongodb0.example.com:28015" --username alice --authenticationDatabase admin
```

要在连接命令中提供口令而不是使用提示符，请使用 `--password` 选项。此选项用于以编程方式使用 `mongosh`，如驱动程序。

更多的选项参考请参见 [官方文档：MongoDB Shell 选项](https://www.mongodb.com/docs/mongodb-shell/reference/options/)。

## 3.3 连接到副本集

*@def* **副本集**（Replica Set）是 MongoDB 的核心高可用特性之一，它基于主节点的 oplog 日志持续传送到辅助节点，并重放得以实现主从节点一致。再结合心跳机制，当感知到主节点不可访问或宕机的情形下，辅助节点通过选举机制来从剩余的辅助节点中推选一个新的主节点从而实现自动切换，这个特性与 MySQL MHA 实现原理一致。[^1]

[^1]: MongoDB 复制集（Replica Set），<https://cloud.tencent.com/developer/article/1181009>

MongoDB 从 3.6 开始，就支持 Mongo + SRV 的 DNS seed 列表的连接方式，这种方式可以连接到副本集、分片集群和单节点中。

对客户端来说它可以隐藏后端 Mongo 服务节点的变化，其显而易见的好处就是后端 Mongo 节点的变化无需修改客户端连接参数，也就无需进行应用的重新部署。

::: tip Mongo + SRV 工作原理

其工作原理主要是利用 DNS 对 SRV/TXT 记录的支持，因此为了使用 `mongo+srv`，我们需要一个 DNS 服务器并在其中设置指向 MongoDB 后端节点的 SRV 记录。SRV 记录指出组成副本集的一个或者多个成员的服务器。TXT 记录定义了副本集的选项， 尤其是用于认证的数据库以及副本集名字

:::

连接到副本集的方式如下：

```bash
mongosh "mongodb+srv://server.example.com/"
```

::: info TLS 行为

当使用 `+srv` 连接字符串修饰符时，MongoDB 自动将 `--tls` 连接选项设置为 `true`。要覆盖此行为，请将 `--tls` 设置为 `false`。

:::

可以在连接字符串中指定单个副本集成员。

例如，要连接到名为 `replA` 的三成员副本集，运行以下命令：

```bash
mongosh "mongodb://mongodb0.example.com.local:27017,mongodb1.example.com.local:27017,mongodb2.example.com.local:27017/?replicaSet=replA"
```

若要验证当前的数据库连接，请使用 `db.getMongo()` 方法。这将返回当前连接的连接字符串 URI。

要从服务退出连接并退出 `mongosh`，请执行以下操作之一以下操作：

- 输入 `.exit`、`exit` 或 `exit()`
- 输入 `quit` 或 `quit()`
- 按 `Ctrl + D` 组合键
- 按 `Ctrl + C` 键两次

::: tip 小技巧

- 使用 `help` 和 `.help` 查看帮助
- 使用 `cls` 清空屏幕

:::

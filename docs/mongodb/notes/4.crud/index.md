# 4. MongoDB 增删改查操作

[[TOC]]

## 4.1 插入操作

`db.collection.insertOne()` 将单个文档插入集合中。

```js
db.inventory.insertOne(
    { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
)
```

`insertOne()` 返回一个文档，其中包含新插入的文档的 `_id` 字段值。

`db.collection.insertMany()` 将多个文档插入集合中。

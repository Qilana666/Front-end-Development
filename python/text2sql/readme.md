# AIGC时代如何搞数据库
- sql?
    CRUD
- AIGC sql 自然语义数据库操作

## sqlite3
- 简单，好用的文本关系数据库
-微信
    本地数据库，Mysql不适合？
- 操作sqlite 带来本地存储

- 链接一下
    数据库独立于后端业务（http web）
    - 独立的数据库实体
    sqlite3.connect('test.db')
    - sql?
    sql 数据库能理解的语法
    llm改变
    自然语言去操作数据库，生成sql
    - cursor 游标 句柄
    - aql ececute
# Symbol 何为？

- 独一无二的值
- 数据类型？
  undefined、null、Boolean、String、Number、Object

  - 简单数据类型

    - 传统(es5)

      - 数值 number
      - 布尔 boolean
      - 字符串 string
      - 空值 null
      - 未定义 undefined

    - es6
      - bigint 大数
      - symbol 符号

  - 复杂数据类型
    object 对象

- js 总共有 8 种数据类型(除了 object 都是简单数据类型)
  七上八下
  number 和 bigint 统称为 numeric

## Symbol

- 申明方式
  Symbol()函数声明，却是简单数据类型
  参数 label 可选，描述符号的字符串

- Symbol 可作为对象的唯一 key 用于多人协作，避免命名冲突
  - 对象动态的
  - Symbol key 不会被覆盖的
  - for key in 不可以被枚举
  - Object.getOwnPropertySymbols() 可以获取到对象的所有 Symbol key

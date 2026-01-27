# 受控组件和非受控组件

- 受控组件和非受控组件面向的对象是 表单元素（如 input、textarea 等）
  - 区别在于其值是由 React 的 state（受控）还是 DOM 自身（非受控）来管理。
- 怎么拿到表单的值？
  - 表单元素
    value 双向的 需要value, 又能输入改变value
  - 状态 单向数据绑定， 控制表单元素的值
    input value = {value}
    数据状态驱动页面， 状态不能出问题的 受控组件
    - 收集用户的输入， onChange 改变value状态
  - useRef + ref
    .current.value

## 区别

- 非受控组件适合一次性读取， 性能敏感， 文件上传等
- 受控组件适合表单校验， 联动 、实时展示 表单的及时验证

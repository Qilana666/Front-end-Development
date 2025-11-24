# js 怎么监听事件

- 事件怎么发生？
  - Dom 树 事件冒泡机制
  - 页面是画出来的（平面）
    - 捕获阶段 capture window->document->html->body->...->parent->child
      - document 开始，一层层缩小范围
        parent 节点上添加了 click 事件的监听
    - 目标阶段 event.target child 节点
    - 冒泡阶段 bubble
      - 从目标元素开始，一层层扩大范围
      - 直到 document 结束

## 事件机制

- js 核心特征事件机制
- js 事件是异步的
  - 先注册
    DOM 0 DOM 2 不同的阶段的标准
    - 别的注册方案 DOM 0 级事件 模块化不好，不推荐
    - dom 节点上 addEventListener('click') DOM 2 级事件
  - 触发时才执行，异步
- addEventListener(event_type,callback,useCapture) 方法

  - 第一个参数是**事件类型**，比如'click'、'mouseover'等。
  - 第二个参数是**事件处理函数**，当事件触发时会调用这个函数。
  - 第三个参数是一个**可选的布尔值**，用于指定是否在捕获阶段监听事件。
    如果设置为 true，事件会在捕获阶段触发
    如果设置为 false（或者不写，默认就是 false），事件会在冒泡阶段触发。

- 事件监听不可以在集合上
  一定得是单个 dom 节点上添加事件监听
- 事件监听内存开销很大
- event.target 事件触发的元素

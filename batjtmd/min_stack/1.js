//es5 构造函数
const MinStack = function () {
  this.stack = [];//数组
}
MinStack.prototype.push = function (x) {
  this.stack.push(x);
}

MinStack.prototype.pop= function () {
  return this.stack.pop();
}

MinStack.prototype.pop = function () {
  if (!this.stack || this.stack.length) {
    return
  }
}

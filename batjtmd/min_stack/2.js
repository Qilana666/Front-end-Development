//辅助栈
var MinStack = function () {
  // 存储所有数据
  this.data = [];
  // 存储对应位置的最小值（与 data 长度始终一致）
  this.minArr = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.data.push(val);
  // 若最小值数组为空，或当前值 <= 上一个最小值，则存入当前值
  if (this.minArr.length === 0 || val <= this.minArr[this.minArr.length - 1]) {
    this.minArr.push(val);
  } else {
    // 否则存入上一个最小值（保持长度一致）
    this.minArr.push(this.minArr[this.minArr.length - 1]);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  // 同时弹出两个数组的最后一个元素
  this.data.pop();
  this.minArr.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  // 返回数据数组的最后一个元素
  return this.data[this.data.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  // 返回最小值数组的最后一个元素
  return this.minArr[this.minArr.length - 1];
};


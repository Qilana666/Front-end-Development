/**
 * @func EditInPlace 就地编辑
 * @params {string} value 初始值
 * @params {element} parentElement 挂载点
 * @params {string} id  自身ID
 */
function EditInPlace(id, value, parentElement) {
  // {} 空对象 this指向它
  this.id = id;
  this.value = value || '这个家伙很懒，什么都没有留下';
  this.parentElement = parentElement;
  this.containerElement = null; // 空对象
  this.saveButton = null; // 保存
  this.cancelButton = null; // 取消
  this.fieldElement = null; // input
  this.staticElement = null; //span

  // 代码比较多，按功能分模块 拆函数
  this.createElement(); // DOM 对象创建
  this.attachEvent(); // 事件添加
}
EditInPlace.prototype = {
  // 封装了DOM操作
  createElement: function() {
    // DOM 内存 
    this.containerElement = document.createElement('div');
    // console.log(this.containerElement, 
    //   // this绑定
    //   Object.prototype.toString.apply(this.containerElement)
    // );
    this.containerElement.id = this.id;

    // 值
    this.staticElement = document.createElement('span');
    this.staticElement.innerHTML = this.value;
    this.containerElement.appendChild(this.staticElement);

    // 输入框
    this.fieldElement = document.createElement('input');
    this.fieldElement.type = 'text';
    this.fieldElement.value = this.value;
    this.containerElement.appendChild(this.fieldElement);
    this.parentElement.appendChild(this.containerElement);

    // 按钮
    this.saveButton = document.createElement('input');
    this.saveButton.type = 'button';
    this.saveButton.value = '保存';
    this.containerElement.appendChild(this.saveButton);

    // 取消按钮
    this.cancelButton = document.createElement('input');
    this.cancelButton.type = 'button';
    this.cancelButton.value = '取消';
    this.containerElement.appendChild(this.cancelButton);

    // 切换到文本显示状态
    this.convertToText(); 
  },
  // 切换到文本显示状态
  convertToText: function() {
    this.fieldElement.style.display = 'none'; // 隐藏
    this.saveButton.style.display = 'none'; // 隐藏
    this.cancelButton.style.display = 'none'; // 隐藏
    this.staticElement.style.display = 'inline'; // 可见
  },
  // 切换到输入框显示状态
  convertToField: function() {
    this.staticElement.style.display = 'none'; // 隐藏
    this.fieldElement.value = this.value; 
    this.fieldElement.style.display = 'inline'; // 可见
    this.saveButton.style.display = 'inline'; // 可见
    this.cancelButton.style.display = 'inline'; // 可见
  },
  // 事件添加
  attachEvent: function () {
    //事件监听
    // 点击文本切换到输入框显示状态
    this.staticElement.addEventListener('click', 
      () => {
        this.convertToField(); 
      }
    );
    // 点击保存按钮切换到文本显示状态
    this.saveButton.addEventListener('click', 
      () => {
        this.save();
      }
    );
    // 点击取消按钮切换到文本显示状态
    this.cancelButton.addEventListener('click', 
      () => {
        this.cancel();
      }
    );
  },
  // 保存
  save: function() {
    var value = this.fieldElement.value;
    // fetch 后端存储
    this.value = value;
    this.staticElement.innerHTML = value;
    this.convertToText();
  },
  cancel: function() {
    this.convertToText();
  }
}
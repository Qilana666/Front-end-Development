// 页面的最底部，在静态页面出现之后再执行
// document 整个文档 添加了一个事件监听
// 首要渲染界面, html + css, 不需要js 参与
// DOMContentLoaded html 文档加载完后在执行
// DOM 文档结构
// script阻塞html 的下载
document.addEventListener('DOMContentLoaded', function () {
  // 页面加载完成后执行的代码
  // 可以获取页面元素、添加事件监听器等

  function playSound(event) {
    //事件监听对象，在事件发生的时候会给回调函数
    // keyCode 按下的键的编码
    console.log(event.keyCode, '/////////');
    let keyCode = event.keyCode;
    let element = document.querySelector('.key[data-key="' + keyCode + '"]');
    console.log(element);
  //动态DOM编程
    element.classList.add('playing');
  }
  

//事件监听
  window.addEventListener('keydown', playSound);
});
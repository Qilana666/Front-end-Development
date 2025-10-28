// document 文档对象 顶级的 dom树
// dom事件监听
const panels = document.querySelectorAll('.panel');
//数组是对象的一种特殊情况
//对象的一个子类
// console.log(panels,
//   panels[0],
//   typeof panels[0],//object
//   // [object HTMLDivElement],
//   Object.prototype.toString.call(panels[0])
// );
panels.forEach(function (panel) {
  // console.log(panel);
  //事件监听需要在具体元素上
  panel.addEventListener('click', function () {
    //点击当前项添加active类名 
    const cur = document.querySelector('.active');
    if (cur) {
      cur.classList.remove('active');
    }
    panel.classList.add('active');
  })
})

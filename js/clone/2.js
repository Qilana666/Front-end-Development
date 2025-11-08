var users;//变量的类型由值决定  undefined  在栈内存里面分配
var data;//undefined  在栈内存里面分配
//json数组 在堆内存中，独立于users,data之外
//users，data,对json数组的引用
users =[
  {
    id: 1,
    name: "王聪明",
    hometown: "永丰",
  },
  {
    id: 2,
    name: "杜仙女",
    hometown: "抚州",
  },
  {
    id: 3,
    name: "王机灵",
    hometown: "进贤",
  }
]//堆内存中   存的地址  （不会因为赋值跑到栈内存中）
//如何真正的去拷贝一个对象呢？
//相对内存申请一个新空间，存储拷贝后的数据
// var data = users;
var data = JSON.parse(JSON.stringify(users))
data[0].hobbies = ["唱歌", "打羽毛球"];
console.log(data, users);//data 是users的拷贝，互不影响
// [
//   { id: 1, name: '王聪明', hometown: '永丰', hobbies: [ '唱歌', '打羽毛球' ] },
//   { id: 2, name: '杜仙女', hometown: '抚州' },
//   { id: 3, name: '王机灵', hometown: '进贤' }
// ] [
//   { id: 1, name: '王聪明', hometown: '永丰' },
//   { id: 2, name: '杜仙女', hometown: '抚州' },
//   { id: 3, name: '王机灵', hometown: '进贤' }
// ]


//序列化
// console.log(JSON.stringify(users), typeof JSON.stringify(users));
//打印结果[{"id":1,"name":"王聪明","hometown":"永丰"},{"id":2,"name":"杜仙女","hometown":"抚州"},{"id":3,"name":"王机灵","hometown":"进贤"}] string
// console.log(JSON.parse(JSON.stringify(users)));//反序列化

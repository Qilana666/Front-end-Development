//堆内存，动态性
//内存需求 弹性
const users = [
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
]

//js语言是动态的
users.push({
  id: 4,
  name: "张美女",
  hometown: "南昌"
})

//栈内存 简单 高效  变量的读写操作，不会影响空间大小
//连续存储的简单变量，方便管理，快速访问
//程序，申请一个连续空间
let a = 1;
let b = 2;
let c = 3;
let d = a;//值拷贝，复印
//赋值操作没有完成值的拷贝
const data = users;//引用式拷贝 堆内存开销大
data[0].hobbies = ["唱歌", "打羽毛球"];
console.log(data, users);
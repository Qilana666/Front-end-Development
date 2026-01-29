let a: number = 1;
let b: string = 'hello';
let c: boolean = true;
let d: null = null;
let e: undefined = undefined;
// let arr:number[]=[1,2,3,'4']  // 不能将字符串赋值给数字数组
let user: [number, string] = [1, '张三'];
//泛型  类型的传参  T
let arr2: Array<string> = ['a', 'b', 'c'];

// ts 借鉴java 微软
// 枚举类型
enum Status{
  Pending, //0
  Success, //1
  Failed, //2
}
// 枚举类型
let s: Status = Status.Pending; 
s = Status.Success;
// 类型的推导
//ts 初学  any救命
let aa: any = 1;  // 任意类型 救命稻草  放弃类型约束
aa = "11"
aa = {}
 
let bb: unknown = 1;  //未知类型  更安全一些
bb = 'b'; //使用前类型检测
// bb.hello();  //对象  未知类型 可以接受任何类型 直接调用方法不可以

let user2: {name:string,age:number,hometown:string} = {
  name:'张三',
  age: 18,
  hometown: '北京',
}

// 接口 约定对象  哪些属性和方法
interface User{
  name: string;
  age: number;
  readonly id: number;
  // 可选属性
  hobby?: string;
}

const u: User = {  
  name:'张三',
  age: 18,
  id: 1001,
}

u.name = '李四';
// u.id = 1002;  //无法为“id”赋值，因为它是只读属性。

type ID = string | number;   //自定义类型
let num: ID = "111";

type UserType = {
  name: string;
  age: number;
  hobby?: string;
}

const f: UserType = {
  name: '张三',
  age: 111,
}

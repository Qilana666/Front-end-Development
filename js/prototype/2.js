function Person(name,age) {
  this.name = name;
  this.age = age;
}
Person.prototype.speci = '人';
const person1 = new Person('张三', 18);
console.log(person1.name,person1.speci);
const person2 = new Person('李四', 19);
console.log(person2.name,person2.speci);
console.log(person1.__proto__,'/////');
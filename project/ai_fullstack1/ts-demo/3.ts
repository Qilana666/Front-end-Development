// ts 是js 超级 ，把ts当js来写
function getArea(width: number, height: number): number {
  let area: number=width * height;
  return area;
}
const area = getArea(10, 5);
console.log(area);
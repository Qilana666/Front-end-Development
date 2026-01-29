// T 类型参数， 类型参数
// getStorage 函数， 读取本地存储的值
export function getStorage<T>(key: string, defaultValue: T): T {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}
// setStorage 函数， 写入本地存储的值
export function setStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
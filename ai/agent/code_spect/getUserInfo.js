/**
 * 获取用户信息函数
 * 功能：返回一个包含用户基本信息的对象
 * @returns {Object} 用户信息对象
 */
function getUserInfo() {
  // 创建用户信息对象
  let user = {
    name: 'ai', // 用户名
    age: 18     // 用户年龄
  };
  
  // 返回用户信息
  return user;
}

// 调用获取用户信息函数
getUserInfo();
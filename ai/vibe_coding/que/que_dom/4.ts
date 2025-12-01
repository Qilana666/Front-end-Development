type User = {
  Id: string; // 用户ID
  name: string; // 用户名
  email: string;  // 用户邮箱
  status: 'ACTIVE' | 'INACTIVE' // 用户状态
}

async function getUserById(id: string, users:User[]) {
  const user = await users.find(user => user.Id === id);
  if (!user) {
    throw new Error('User  not found')
  }
  return user;
}
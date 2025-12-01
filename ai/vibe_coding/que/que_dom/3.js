// 不要去动手去改那个它里面这个逻辑业务了，我只要把上面这个注释改一下
/*
*@func 查找所有非活跃用户
*@params users 用户列表
*@return 非活跃用户列表
*/
async function getInactiveUsers(users) {
  const inactiveUsers = await users.filter(
    user => user.status === 'INACTIVE'
  )
  return inactiveUsers
}

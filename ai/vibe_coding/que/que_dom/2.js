const users = [
  {
    id: 1,
    username:'王老板'
  },
  {
    id: 2,
    username:'王经理'
  },
  {
    id: 3,
    username:'王帅哥'
  },
]
//return ture/false
users.find(user => user.id === 2)
console.log(
  users.find(user=>user.id===2)
)
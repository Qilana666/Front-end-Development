import { useContext } from 'react';
import {
  UserContext
} from '../App'
export default function UserInfo() {
  // console.log(UserContext);
  const user = useContext(UserContext); //从上下文里找取数据
  console.log(user);
  return (
    <div>
      {user.name}
    </div>
  )
}
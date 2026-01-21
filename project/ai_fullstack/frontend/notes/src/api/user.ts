import axios from 'axios'; 
import type {Credential} from '@/types';

// export const doLogin = (data:{name:string,password:string}) => {
export const doLogin = (data:Credential) => {
  return axios.post('/auth/login', data);
}
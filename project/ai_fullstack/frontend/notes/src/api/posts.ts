import axios from './config';
import type { Post } from '@/types';

export const fetchPosts = async (page:number = 1, 
  limit:number=10) => {
  try {
      console.log('/////')
    const response = await axios.get('/api/posts', {
      
        params: {
          page,
          limit
        }
    })
    console.log('/|||||||')
      console.log(response);
      return response;
    } catch(err) {

    }
}
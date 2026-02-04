import React from 'react';
import {
  useParams //读取 URL 中的“动态参数”
} from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams();
  console.log(id, "-------")
  return (
    <>
      PostDetail
    </>
  )
} 

export default PostDetail;
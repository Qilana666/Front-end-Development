import {
  useRef
} from 'react';

export default function CommentBox() {
  // UnControlled
  const textareaRef = useRef(null);
  const handleSubmit = () => {
    const comment = textareaRef.current.value;
    if (!comment) return alert('请输入评论');
    console.log(comment);
  }
  return (
    <div>
      <textarea 
        ref={textareaRef} 
        placeholder="输入评论...">  
      </textarea>
      <button onClick={handleSubmit}>提交</button>
    </div>
  )
}
import {
  useEffect
} from 'react';
import Header from '@/components/Header';

export default function Chat() {

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <Header title="DeepSeek Chat" showBackBtn={true}/>
    </div>
  )
}
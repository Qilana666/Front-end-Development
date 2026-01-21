import {
  useState,
  // useEffect
} from 'react';
import {
  useUserStore
} from '@/store/useUserStore';
import {
  Button
} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import type { Credential } from '@/types';

export default function Login() {
  const { login } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Credential>({
    name: "",    
    password: ""
  })
  const handleChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:value
    }));
  }
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
    } catch (error) {
      console.error("登录失败", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center 
    justify-center p-6 bg-white">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">登录</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              {/* *无障碍访问* for+id  for 关键字 ，react htmlFor*/}
              <Label htmlFor="name">用户名</Label>
              <Input id="name" placeholder="请输入用户名" value={formData.name} onChange={handleChange} />
              <Label htmlFor="password">密码</Label>
              <Input id="password" placeholder="请输入密码" value={formData.password} onChange={handleChange} />
            </div>
            <Button>
              
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
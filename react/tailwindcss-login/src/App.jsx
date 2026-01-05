// esm React 代表默认引入 
// useState hooks 引入 部分引入
// esm cjs 优秀的地方 懒加载
import {
  useState
} from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff
} from 'lucide-react';

export default function App() {
  // 数据业务
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  // 抽象的事件处理函数
  // input type="text|password|checkbox"
  // name email|password|rememberMe
  // value  数据状态 ｜ 
  // checked 选中状态 
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target; //input
    // 传函数特别合适，业务逻辑
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }
  // 密码显示隐藏
  const [showPassword, setShowPassword] = useState(false);
  // 登录 api 等待状态 
  const [isLoading, setIsLoading] = useState(false);
  // 表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <div 
    className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center
           w-12 h-12 rounded-xl bg-indigo-600 text-white mb-4 shadow-lg 
           shadow-indigo-200">
            <Lock size={24}/>
          </div>  
          <h1 className="text-2xl font-bold text-slate-900">欢迎回来</h1>
          <p className="text-slate-500 mt-2">请登录您的账号</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* 邮箱输入框 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Email:</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 
              flex items-center pointer-events-none
              text-slate-400 group-focus-within:text-indigo-600 transition-colors
              "
              >
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                name="email" 
                required
                value={formData.email}
                onChange={handleChange}
                placeholder='name@company.com'
                className="block w-full pl-11 pr-4 py-3 bg-slate-50
                border border-slate-200 rounded-xl text-slate-900
                placeholder:text-slate-400 focus:outline-none 
                focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600
                transition-all
                "
              />
            </div>
          </div>
          {/* 密码输入框 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-700">密码</label>
              <a href="" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">忘记密码</a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 
              flex items-center pointer-events-none
              text-slate-400 group-focus-within:text-indigo-600 transition-colors
              "
              >
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder='********'
                className="block w-full pl-11 pr-12 bg-slate-50 border
                border-slate-200 rounded-xl text-slate-900
                placeholder:text-slate-400 focus:outline-none 
                focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600
                transition-all
                "
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                { showPassword ? <EyeOff size={18} /> : <Eye size={18} /> }
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}
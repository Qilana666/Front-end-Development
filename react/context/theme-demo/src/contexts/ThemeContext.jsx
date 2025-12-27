import {
  createContext,
  useState,
  useEffect
} from 'react';

export const ThemeContext = createContext(null);   //容器
export default function ThemeProvider({ children }) {
  const [theme,setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((t)=>t==='light'?'dark':'light');
  }
  useEffect(() => {
    //监听theme的变化，变化时，更新body的class
    //document.documentElement 表示html元素
    //setAttribute('data-theme',theme)  给html元素添加一个属性data-theme，值为theme
    document.documentElement.setAttribute('data-theme',theme);
  },[theme])
  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
    {children}
    </ThemeContext.Provider>
  )
}

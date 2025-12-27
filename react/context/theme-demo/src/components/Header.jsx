import {
  useContext
} from 'react';
import { ThemeContext } from '../contexts/ThemeContext.jsx';
export default function Header() {
  const {theme,toggleTheme} = useContext(ThemeContext);
  return (
    <div style={{marginBottom:24}}>
      <h2>当前主题：{theme}</h2>
      <button className="button" onClick={toggleTheme}>切换主题</button>
    </div>
  )
}
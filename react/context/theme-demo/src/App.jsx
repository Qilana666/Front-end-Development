import ThemeProvider from './contexts/ThemeContext.jsx';
import Page from './pages/Page';
export default function App() {
  return (
    <>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </>
  )
}
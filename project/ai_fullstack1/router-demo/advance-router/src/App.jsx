import {
  BrowserRouter as Router, //html5 history
  // HashRouter, // hash history  不用就不要引入，有开销
} from 'react-router-dom'

import Navigation from './components/Navigation'
import RouterConfig from './router'
export default function App() {
  return (
    <Router>
      <Navigation />
      <RouterConfig/>
    </Router>
  );
}
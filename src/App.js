import './App.css';
import Home from './pages/Home.js';
import Setting from './pages/Setting.js';
import Friends from './pages/Friends.js';
import Alarms from './pages/Alarms.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import{
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Counter from './pages/test';


function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/setting" component={Setting} />
      <Route exact path="/friends" component={Friends} />
      <Route exact path="/alarms" component={Alarms} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/test" component={Counter} />
    </Router>
  );
}

export default App;
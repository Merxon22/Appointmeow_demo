import './App.css';
import Home from './pages/Home.js';
import Setting from './pages/Setting.js';
import Friends from './pages/Friends.js';
import Alarms from './pages/Alarms.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Test from './pages/test.js';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import React, { useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState(0);

  useEffect(() => {
    fetch('/api').then(res => res.json()).then(data => {
      setData(data["userName"]);
    });
  }, []);

  return(
    <div>
      {data}
    </div>
  )

  // return (
  //   <Router>
  //     <Route exact path="/" component={Home} />
  //     <Route exact path="/setting" component={Setting} />
  //     <Route exact path="/friends" component={Friends} />
  //     <Route exact path="/alarms" component={Alarms} />
  //     <Route exact path="/register" component={Register} />
  //     <Route exact path="/login" component={Login} />
  //     <Route exact path="/test" component={Test} />
  //   </Router>
  // );
}

export default App;
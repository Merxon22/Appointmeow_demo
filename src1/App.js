import './App.css';
import { Form } from "./form/form.js"
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
import { message } from 'antd';

function App() {
  const [data, setData] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch('/api').then(res => res.json()).then(data => {
      setData(data["userName"]);
    });
  }, []);

  const handleFormChange =(inputValue)=> {
    setUserName(inputValue)
  }

  const handleFormSubmit =()=> {
    fetch('/api/createuser', {
      method: 'POST',
      body: JSON.stringify({
        content: userName
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json()).then(message => console.log(message))
  }

  return(
    <div>
      {data}
      <br/>
      <Form userInput={userName} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>
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
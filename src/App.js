import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignIn from './components/Login/SignIn';
import Blog from './components/Blog/Blog';
import SignUp from './components/Register/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/signin" component={SignIn}/>
        <Route path="/blog" component={Blog}/>
        <Route path="/signup" component={SignUp}/>
      </div>
    </Router>
  );
}

export default App;

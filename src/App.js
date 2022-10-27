import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes'; // where we are going to specify our routes
export default class App extends React.Component{
  render(){
    return(
    <div className="App">
      <Router>
        <Routes/>
      </Router>
    </div>
  );
  }
}

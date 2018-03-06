import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import NoteTaking from './NoteTaking';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <Route exact path="/" component={Home} />
          <Route path="/v/:id" component={NoteTaking} />

          {/* <NoteTaking /> */}
          {/* <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p> */}
        </div>
      </Router>
    )
  };
}

export default App;

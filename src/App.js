import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HashRouter as Router, Route } from 'react-router-dom'

import './App.css';

import NoteTaking from './NoteTaking';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/v/:id" component={NoteTaking} />
        </div>
      </Router>
    )
  };
}

export default App;

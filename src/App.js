import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HashRouter as Router, Route } from 'react-router-dom'

import NoteTaker from './NoteTaker';
import Home from './Home';
import NotesView from './NotesView';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/v/:id" component={NoteTaker} />
          <Route path="/n/:id" component={NotesView} />
        </div>
      </Router>
    )
  };
}

export default App;

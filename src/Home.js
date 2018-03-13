import React from 'react';
import { Link } from 'react-router-dom'

import logo from './logo.svg';

class Home extends React.Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Link to="/v/YE7VzlLtp-4">need a url </Link>
            </div>
        )
    };
}

export default Home;
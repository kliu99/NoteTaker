import React from 'react';
import { Link } from 'react-router-dom'

import logo from './logo.svg';

class Home extends React.Component {

    componentWillMount() {
        let docs = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("v/")) {
                docs.push(key);
            }
        }

        this.setState( {docs} );
    }


    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                <Link to="/v/YE7VzlLtp-4">need a url </Link>

                <h2>Library</h2>
                
                <ul>
                {this.state.docs.map(doc => {
                    return (
                        <li>
                            <Link to={doc}>{doc}</Link>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    };
}

export default Home;
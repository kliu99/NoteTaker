import React from 'react';
import { Link } from 'react-router-dom'

import logo from './logo.svg';
import Duration from './components/Duration';

class Home extends React.Component {

    componentWillMount() {
        let videos = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("meta/")) {
                videos.push(JSON.parse(localStorage.getItem(key)));
            }
        }

        this.setState({ videos });
    }


    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                <button>Load Note</button>
                
                <Link to="/v/YE7VzlLtp-4">need a url to start</Link>

                <h2>Library</h2>

                <ul>
                    {this.state.videos.map(meta => {
                        return (
                            <li>
                                <img src={`https://img.youtube.com/vi/${meta.video_id}/hqdefault.jpg`}/>
                                <Link to={`v/${meta.video_id}`}>{meta.title} by {meta.author}</Link>
                                <Duration seconds={meta.duration} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    };
}

export default Home;
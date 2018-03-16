import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image, Icon } from 'semantic-ui-react'

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

                <Card.Group centered itemsPerRow={3} stackable>
                    {this.state.videos.map(meta => {
                        return (
                            <Link to={`v/${meta.video_id}`}>
                                <Card raised link>
                                    <Image src={`https://img.youtube.com/vi/${meta.video_id}/hqdefault.jpg`} />
                                    <Card.Content>
                                    <Card.Header>
                                        {meta.title}
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        {/* <Duration className='date' seconds={meta.duration} /> */}
                                        <span className='date'>
                                            <Icon name='user' /> {meta.author} <Duration seconds={meta.duration} />
                                        </span>
                                    </Card.Meta>
                                    {/* <Card.Description>
                                        Matthew is a musician living in Nashville.
                                    </Card.Description> */}
                                    </Card.Content>
                                </Card>
                            </Link>
                        )
                    })}
                </Card.Group>
            </div>
        )
    };
}

export default Home;
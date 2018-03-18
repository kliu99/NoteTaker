import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image, Icon } from 'semantic-ui-react'

import logo from './logo.svg';
import Duration from './components/Duration';
import db from './db';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { videos: [] };
    }

    componentWillMount() {
        db.meta.toArray().then(videos => {
            this.setState({ videos });
        })
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
                            <Link to={`v/${meta.videoId}`}>
                                <Card raised link>
                                    <Image src={`https://img.youtube.com/vi/${meta.videoId}/hqdefault.jpg`} />
                                    <Card.Content>
                                        <Card.Header>
                                            {meta.title}
                                        </Card.Header>
                                        <Card.Meta textAlign='center'>
                                            <span className='date'>
                                                <Icon name='user' /> {meta.author} <Duration seconds={meta.duration} icon={true} />
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
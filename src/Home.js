import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Card, Image, Icon, Input } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

import logo from './logo.svg';
import Duration from './components/Duration';
import db from './db';
import './Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { videos: [] };
    }

    componentWillMount() {
        this.readVideos();
    }

    readVideos = () => {
        db.meta.toArray().then(videos => {
            this.setState({ videos });
        });
    }

    importNotes = (files) => {
        db.meta.clear();
        db.notes.clear();

        let promises = [];
        files.forEach(blb => {
            let reader = new FileReader();
            reader.addEventListener("loadend", (e) => {
                const json = JSON.parse(e.srcElement.result);
                db.meta.put(json.meta).then(() => {
                    db.notes.bulkPut(json.notes).then(() => {
                        this.readVideos();
                    })  
                });
                
            });
            reader.readAsText(blb);
        });
    }

    render() {
        return (
            <Container>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                <Dropzone onDrop={this.importNotes} accept="application/json" className="dropzone">
                    <Icon name="upload" /> <p>Dropping note files here, or click to select files to upload.</p>
                </Dropzone>


                search bar.



                <Input iconPosition='left' placeholder='Email'>
                    <Icon name='linkify' />
                    <input />
                </Input>

                <Link to="/v/YE7VzlLtp-4">need a url to start</Link>

                <h2>Library</h2>

                <Card.Group centered itemsPerRow={3} stackable>
                    {this.state.videos.map(meta => {
                        return (
                            <Link to={`v/${meta.videoId}`} key={meta.videoId}>
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
            </Container>
        )
    };
}

export default Home;
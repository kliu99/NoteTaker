import React from 'react';
import { Link } from 'react-router-dom'
import { List, Header, Container, Card, Image, Icon, Form, Button } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

import Duration from './components/Duration';
import db from './db';
import './Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { videos: [], urlInput: '' };
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

    // Handle form submit
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    
    handleSubmit = () => {
        console.log(this.state.urlInput)
        // extra video id from url

        // go to link
        // use react-router nav?

    }

    render() {
        return (
            <Container>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='sticky note outline' circular />
                    <Header.Content>
                    Note Taker
                    </Header.Content>
                </Header>

                <Dropzone onDrop={this.importNotes} accept="application/json" className="dropzone">
                    <Icon name="upload" /> <p>Dropping note files here, or click to select files to upload.</p>
                </Dropzone>

                <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                <Form.Input placeholder='Youtube video link' width={16} 
                name='urlInput' value={this.state.urlInput} onChange={this.handleChange} required />
                <Button type='submit'> OK </Button>    
                </Form.Group>
                
                </Form>

                <Link to="/v/YE7VzlLtp-4">need a url to start</Link>

                <h2>Library</h2>

                <Card.Group centered itemsPerRow={3} stackable>
                    {this.state.videos.map(meta => {
                        return (
                            <Link to={`v/${meta.videoId}`} key={meta.videoId}>
                                <Card raised link>
                                    <Image src={`https://img.youtube.com/vi/${meta.videoId}/hqdefault.jpg`} />
                                    <Card.Content>
                                        <Card.Header textAlign='center'>
                                            {meta.title}
                                        </Card.Header>
                                        <Card.Meta textAlign='center'>
                                            <List horizontal>
                                                <List.Item>
                                                    <Icon name='user' />
                                                    <List.Content>
                                                        {meta.author}
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <Icon name='time' />
                                                    <List.Content>
                                                        <Duration seconds={meta.duration} icon={false} />
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                <Icon name='share alternate' />
                                                    <List.Content>
                                                        <Link to={`n/${meta.videoId}`}>Share</Link>
                                                    </List.Content>
                                                </List.Item> 
                                            </List>

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
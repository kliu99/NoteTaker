import React from 'react';
import { Link } from 'react-router-dom';
import { List, Header, Container, Card, Image, Icon, Form, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Dexie from 'dexie';

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
        // db.meta.clear();
        // db.notes.clear();

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
        const id = this.YouTubeGetID(this.state.urlInput);
        window.location.href = `${window.location}v/${id}`;
    }

    YouTubeGetID(url) {
        url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return undefined !== url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }

    deleteNotes = (id, e) => {
        e.preventDefault();

        db.transaction('rw', db.meta, db.notes, () => {
            // Delete notes
            return db.notes.where("[videoId+time]")
                .between([id, Dexie.minKey], [id, Dexie.maxKey])
                .delete().then(count => {
                    // Delete meta
                    return db.meta.delete(id);
                });
        }).then(() => {
            this.readVideos();
        });
    }

    render() {
        return (
            <Container>
                <br/>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='sticky note outline' circular />
                    <Header.Content>
                        Note Taker
                    </Header.Content>
                </Header>

                <Dropzone onDrop={this.importNotes} accept="application/json" className="dropzone">
                    <Icon name="upload" /> <p>Dropping note files here, or click to select files to upload.</p>
                </Dropzone>

                <br />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input placeholder='Youtube video link' width={16}
                            name='urlInput' value={this.state.urlInput} onChange={this.handleChange} required />
                        <Button type='submit' icon labelPosition='right' basic> 
                            <Icon name='video play'/> Play 
                        </Button>
                    </Form.Group>
                </Form>

                {/* <Link to="/v/YE7VzlLtp-4">need a url to start</Link> */}

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
                                            </List>
                                            <List horizontal>
                                                <List.Item>
                                                    <Icon name='share alternate' />
                                                    <List.Content>
                                                        <Link to={`n/${meta.videoId}`}>Share</Link>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item as='a' onClick={(e) => this.deleteNotes(meta.videoId, e)}>
                                                    <Icon name='trash' />
                                                    <List.Content>
                                                        Delete
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
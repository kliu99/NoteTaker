import React from 'react';
import { Item, Icon, Label, Container, Header } from 'semantic-ui-react';
import Dexie from 'dexie';

import logo from './logo.svg';
import Duration from './components/Duration';
import RichText from './components/RichText';
import db from './db';

class NotesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meta: null,
            notes: [],
            id: this.props.match.params.id
        };
    }

    componentWillMount() {
        db.meta.where("videoId")
            .equals(this.state.id)
            .first()
            .then(meta => {
                this.setState({ meta });
                console.log(meta);
            }).catch(e => {
                console.log(e);
            })

        db.notes.where("[videoId+time]")
            .between([this.state.id, Dexie.minKey], [this.state.id, Dexie.maxKey])
            .toArray()
            .then(notes => {
                this.setState({ notes });
            });
    }

    render() {
        return (
            <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <Container text>
                {this.state.meta && (
                    <Header as='h2' textAlign='center'>
                        <Header.Content>
                        {this.state.meta.title}
                        <Header.Subheader>
                            {this.state.meta.author}
                        </Header.Subheader>
                        </Header.Content>
                    </Header>
                    )
                }
                

                <Item.Group divided>
                    {this.state.notes.map(note => {
                        return (
                            <Item>
                                <Item.Image 
                                src={`https://img.youtube.com/vi/${note.videoId}/hqdefault.jpg`} 
                                label={{color: 'teal', floating: true, content: <Duration seconds={note.time} icon={false} />}}
                                />
                                <Item.Content>
                                    <Item.Description>
                                        <RichText
                                            readOnly={true}
                                            value={note.content} />
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        )
                    })}
                </Item.Group>
            </Container>
            </div>
        )
    }

}

export default NotesView;
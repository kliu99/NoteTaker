import React, { Component } from 'react';
import { Header, Dimmer, Card, List, Icon } from 'semantic-ui-react';

import NoteEntry from './NoteEntry';
import { debounce } from './components/utils';

class NewNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            player: null,
            time: 0,
            content: null,
            isEdit: false,
            note: {},
            storageKey: `unsaved-${this.props.id}`
        }
    }

    componentWillMount() {
        this.props.glEventHub.on('set-player', this.setPlayer);
        this.props.glEventHub.on('edit-note', this.editNote);

        // Load unsaved notes from localStorage
        const unsaved = localStorage.getItem(this.state.storageKey);
        if (unsaved) {
            const note = JSON.parse(unsaved);
            this.setState({
                isEdit: true,
                time: note.time,
                content: note.content,
                note
            });
        }
    }

    componentWillUnmount() {
        this.props.glEventHub.off('set-player', this.setPlayer);
        this.props.glEventHub.off('edit-note', this.editNote);
    }

    setPlayer = (player) => {
        this.setState({ player: player });
    }

    newNote = () => {
        // Update state
        this.setState({
            time: this.state.player.getCurrentTime(),
            isEdit: true
        }, this.onNoteChange);

        // Pause video
        this.state.player.pauseVideo();
        // this.props.glEventHub.emit('set-playing', false);
    }

    editNote = (note) => {
        this.setState({
            time: note.time,
            content: note.content,
            isEdit: true
        }, () => {
            // Update localStorage
            localStorage.setItem(this.state.storageKey, JSON.stringify(note));
            // Jump to video location
            this.state.player.seekTo(this.state.time);
            // Pause video
            this.state.player.pauseVideo();
        })
    }

    getPlayerTime = () => {
        this.setState({ time: this.state.player.getCurrentTime() });
    }

    addNote = () => {
        // Publish event to all the panels
        const note = localStorage.getItem(this.state.storageKey);
        this.props.glEventHub.emit('add-note', JSON.parse(note));
        this.reset();
    }

    reset = () => {
        // Reset state
        localStorage.removeItem(this.state.storageKey);
        this.setState({
            isEdit: false,
            time: 0,
            content: undefined,
            note: {}
        }, () => {
            // Play video
            this.state.player.playVideo();
        });
    }

    onNoteChange = (content) => {
        const note = {
            "time": this.state.time,
            "content": content
        };

        localStorage.setItem(this.state.storageKey, JSON.stringify(note));
        // this.setState({ content });
    }

    render() {
        if (!this.state.player) {
            return (<div>Waiting for Player to load</div>)
        }

        // if (!this.state.isEdit) {
        //     return (
        //         <Button onClick={this.newNote} size='massive'>
        //             <Icon name='plus' />
        //             New Note
        //         </Button>
        //     )
        // }

        const eventHub = this.props.glEventHub;
        const extra = (
            <List horizontal>
                <List.Item as='a' onClick={this.reset}>
                    <Icon name='x' inverted color='red' />
                </List.Item>
                }
                <List.Item as='a' onClick={this.addNote}>
                    <Icon name='check' inverted color='green' />
                </List.Item>
            </List>
        )

        return (
                <Dimmer.Dimmable dimmed={!this.state.isEdit}>
                    <Dimmer active={!this.state.isEdit} onClickOutside={this.newNote} onClick={this.newNote}>
                        <Header as='h2' icon inverted>
                            <Icon name='plus' />
                            New Note
                        </Header>
                    </Dimmer>

                    <div className="notelist">
                        <Card.Group itemsPerRow={1}>
                            <NoteEntry ref="noteEditor"
                                readOnly={false}
                                time={this.state.time}
                                content={this.state.content}
                                onChange={debounce(this.onNoteChange, 250)}
                                player={this.state.player}
                                glEventHub={eventHub}
                                extra={extra}
                            />
                        </Card.Group>
                    </div>
                </Dimmer.Dimmable>
        )
    }

}

export default NewNote
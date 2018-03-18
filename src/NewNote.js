import React, { Component } from 'react';
import { Header, Dimmer, Card, List, Icon } from 'semantic-ui-react';

import NoteEntry from './NoteEntry';
import { debounce } from './components/utils';

class NewNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: 0,
            content: null,
            isEdit: false,
            isPlaying: true,
            note: {},
            storageKey: `unsaved-${this.props.id}`
        }
    }

    componentWillMount() {
        this.props.glEventHub.on('set-time', this.setTime);
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
        this.props.glEventHub.off('set-time', this.setTime);
        this.props.glEventHub.off('edit-note', this.editNote);
    }

    // Set player time
    setTime = (time) => {
        if (!this.state.isEdit) {
            this.setState({ time })
        }
    }

    setPlaying = () => {
        this.setState(prevState => ({
            isPlaying: !prevState.isPlaying
        }), () => {
            this.props.glEventHub.emit('set-playing', this.state.isPlaying);
        })
    }

    newNote = () => {
        // Update state
        this.setState({
            isEdit: true
        });

        this.onNoteChange();
        // Pause video
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
            this.props.glEventHub.emit('seek-to', this.state.time);
            // Pause video
            // this.props.glEventHub.emit('set-playing', false);
        })
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
            isPlaying: true,
            note: {}
        }, () => {
            // Play video
            this.props.glEventHub.emit('set-playing', true);
        });
    }

    onNoteChange = (content) => {
        const note = {
            "videoId": this.props.id,
            "time": this.state.time,
            "content": content
        };

        localStorage.setItem(this.state.storageKey, JSON.stringify(note));
    }

    render() {
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
                <List.Item as='a' onClick={this.setPlaying}>
                    <Icon name={!this.state.isPlaying ? 'play' : 'pause'} inverted color='grey' />
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
                            glEventHub={eventHub}
                            extra={extra}
                            isPlaying={this.state.isPlaying}
                        />
                    </Card.Group>
                </div>
            </Dimmer.Dimmable>
        )
    }

}

export default NewNote
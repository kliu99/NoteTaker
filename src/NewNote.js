import React, { Component } from 'react';

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
        this.props.glEventHub.emit('set-playing', false);
    }

    getPlayerTime = () => {
        this.setState({ time: this.state.player.getCurrentTime() });
    }

    addNote = () => {
        // Publish event to all the panels
        this.props.glEventHub.emit('add-note', {
            "time": this.state.time,
            "content": this.state.content
        })

        this.reset();
    }

    reset = () => {
        // Reset state
        localStorage.removeItem(this.state.storageKey);
        this.setState({ 
            isEdit: false,
            time: 0,
            content: null,
            note: {}
        });
        // Resume video
        this.props.glEventHub.emit('set-playing', true);
    }

    onNoteChange = (content) => {
        const note = {
            "time": this.state.time,
            "content": content
        };

        localStorage.setItem(this.state.storageKey, JSON.stringify(note));
        this.setState({ content });
    }

    render() {

        if (!this.state.player) {
            return (<div>Waiting for Player to load</div>)
        }

        if (!this.state.isEdit) {
            return (
                <button onClick={this.newNote}>New Note</button>
            )
        }

        const eventHub = this.props.glEventHub;
        return (
            <div className="notelist">
                <NoteEntry ref="noteEditor"
                    readOnly={false}
                    time={this.state.time}
                    content={this.state.content}
                    onChange={debounce(this.onNoteChange, 250)}
                    player={this.state.player}
                    glEventHub={eventHub}
                />

                <button onClick={this.addNote}>Add Note</button>
                <button onClick={this.reset}>Cancel</button>
                <button onClick={this.emptyStorage}>Empty Storage</button>
            </div>
        )
    }

}

export default NewNote
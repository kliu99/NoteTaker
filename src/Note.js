import React, { Component } from 'react';

import './Note.css';
import NoteEntry from './NoteEntry';
import { debounce } from './components/utils';

class Note extends Component {

    constructor(props) {
        super(props);

        const storageKey = `v/${this.props.id}`;

        let notes = localStorage.getItem(storageKey);
        if (notes) {
            notes = JSON.parse(notes);
        } else {
            notes = [];
        }

        this.state = {
            playerTime: 0,
            player: null,
            notes: notes,
            newIdx: notes.length,
            storageKey: storageKey
        }

        this.addNote = this.addNote.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
    }

    componentWillMount() {
        this.props.glEventHub.on('set-player', this.setPlayer);
    }

    componentWillUnmount() {
        this.props.glEventHub.off('set-player', this.setPlayer);
    }

    setPlayer = (player) => {
        console.log("here");
        this.setState( { player: player } );
    }

    getPlayerTime = () => {
        this.setState( {playerTime: this.state.player.getCurrentTime()} )
    }

    addNote() {
        console.log('addNote')
        console.log(this.refs.noteEditor)
    }

    onNoteChange(content) {
        this.state.notes[this.state.newIdx] = {
            "time": this.state.playerTime,
            "content": content
        }

        localStorage.setItem(this.state.storageKey, JSON.stringify(this.state.notes))
    }

    emptyStorage = () => {
        localStorage.removeItem(this.state.storageKey);
    }

    render() {
        if (!this.state || !this.state.player) {
            return (<div>Waiting for Player to load</div>)
        }

        const eventHub = this.props.glEventHub;
        return (
            <div className="panel">
                <div className="notelist">
                    {this.state.notes.map((note, id) => {
                        return <NoteEntry
                            key={id}
                            readOnly={true}
                            time={note.time}
                            content={note.content}
                            player={this.state.player}
                            glEventHub={eventHub} />
                    })}
                </div>

                <div className="notelist">
                    <NoteEntry ref="noteEditor" readOnly={false} time={this.state.playerTime} onChange={debounce(this.onNoteChange, 250)}/>
                    <button onClick={this.getPlayerTime}>Get Time</button>
                    <button onClick={this.addNote}>Add Note</button>
                    <button onClick={this.emptyStorage}>Empty Storage</button>
                </div>
                {/* <div className="card">
                    <div className="container">
                        <div className="note-toolbar">
                            <Duration className="time" seconds={this.state.playerTime} />
                        </div>
                        <RichText readOnly={false} />
                    </div>
                </div> */}

                
            </div>
        )
    }
}

export default Note;
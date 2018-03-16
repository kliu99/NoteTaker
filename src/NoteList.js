import React, { Component } from 'react';

import './NoteList.css';
import NoteEntry from './NoteEntry';

class NoteList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerTime: 0,
            player: null,
            notes: [],
            storageKey: `v/${this.props.id}`
        }
    }

    componentWillMount() {
        this.props.glEventHub.on('set-player', this.setPlayer);
        this.props.glEventHub.on('add-note', this.addNote);
        // Retrieve notes from localStorage
        let notes = localStorage.getItem(this.state.storageKey);
        if (notes) {
            notes = JSON.parse(notes).sort(this.sortByTime);
            this.setState({ notes });
        }
    }

    componentWillUnmount() {
        this.props.glEventHub.off('set-player', this.setPlayer);
        this.props.glEventHub.off('add-note', this.addNote);
    }

    // Set video player
    setPlayer = (player) => {
        this.setState({ player: player });
    }

    // Add Note to NoteList
    addNote = (note) => {
        this.setState(prevState => ({
            notes: prevState.notes.concat(note).sort(this.sortByTime)
        }), () => {
            // Save notes to localStorage
            localStorage.setItem(this.state.storageKey, JSON.stringify(this.state.notes));
        });
    }

    // Remove note
    removeNote = (time) => {
        this.setState(prevState => ({ 
            notes: prevState.notes.filter(note => note.time !== time) }
        ), () => {
            localStorage.setItem(this.state.storageKey, JSON.stringify(this.state.notes));
        });

    }
    // 

    // Sort By Time
    sortByTime = (a, b) => a.time - b.time;

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
                            key={note.time}
                            readOnly={true}
                            time={note.time}
                            content={note.content}
                            player={this.state.player}
                            glEventHub={eventHub}
                            onDel={this.removeNote} />
                    })}
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

export default NoteList;
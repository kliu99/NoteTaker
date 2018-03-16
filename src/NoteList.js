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
            this.setState( { notes: JSON.parse(notes) } );
        }
    }

    componentWillUnmount() {
        this.props.glEventHub.off('set-player', this.setPlayer);
        this.props.glEventHub.off('add-note', this.addNote);
    }

    // Set video player
    setPlayer = (player) => {
        this.setState( { player: player } );
    }

    addNote = (note) => {
        this.setState(prevState => ({
            notes: prevState.notes.concat(note)
        }), () => {
            // Save notes to localStorage
            localStorage.setItem(this.state.storageKey, JSON.stringify(this.state.notes));    
        });
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
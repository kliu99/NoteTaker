import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import Dexie from 'dexie';

import './NoteList.css';
import NoteEntry from './NoteEntry';
import db from './db';

class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = { notes: [] }
    }

    componentWillMount() {
        this.props.glEventHub.on('add-note', this.addOrUpdateNote);
        // Retrieve notes from indexedDb
        this.getNotes();
    }

    componentWillUnmount() {
        this.props.glEventHub.off('add-note', this.addOrUpdateNote);
    }

    // Get notes from indexedDb
    getNotes = () => {
        db.notes.where('[videoId+time]')
            .between([this.props.id, Dexie.minKey], [this.props.id, Dexie.maxKey])
            .toArray()
            .then(notes => {
                this.setState({ notes });
            });
    }

    // Add or Update NoteList
    addOrUpdateNote = (note) => {
        db.notes.put(note)
            .then(() => this.getNotes());
    }

    // Remove note
    removeNote = (time) => {
        db.notes.delete([this.props.id, time])
            .then(() => this.getNotes());
    }

    render() {
        const eventHub = this.props.glEventHub;
        return (
            <div className="panel">
                <div className="notelist">

                    <Card.Group itemsPerRow={1}>
                        {this.state.notes.map(note => {
                            return <NoteEntry
                                key={note.time}
                                readOnly={true}
                                time={note.time}
                                content={note.content}
                                glEventHub={eventHub}
                                onDel={this.removeNote} />
                        })}
                    </Card.Group>
                </div>
            </div>
        )
    }
}

export default NoteList;
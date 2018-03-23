import React, { Component } from 'react';
import { Card, Segment, Menu, Icon } from 'semantic-ui-react'
import Dexie from 'dexie';
import FileSaver from "file-saver";

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

    // Download JSON
    onDownload = () => {
        // export both notes and meta
        // this.state.notes.

        db.meta.where('videoId').equals(this.props.id).first().then(meta => {
            // Prepare document
            const content = {
                meta,
                notes: this.state.notes
            };
            // Download JSON
            const blob = new Blob([JSON.stringify(content)], {type: 'application/json;charset=utf-8'});
            FileSaver(blob, `${content.meta.title}.json`);
        });
    }

    // Stiky menu
    handleContextRef = contextRef => this.setState({ contextRef })

    render() {
        const eventHub = this.props.glEventHub;
        return (
            <div className="panel">
            <Menu inverted text color='black' attached='top'>
                    <Menu.Item header>Note Taker</Menu.Item>
                    <Menu.Item
                        name="library"
                        href='/'
                    >
                        <Icon name='grid layout' /> Library
                    </Menu.Item>

                    <Menu.Item
                        as='a'
                        name='download'
                        onClick={this.onDownload}
                    >
                        <Icon name='download' /> Download
                    </Menu.Item>

                    <Menu.Item
                        name='share'
                        href={`/#/n/${this.props.id}`}
                        target='_blank'
                    >
                        <Icon name='share alternate' /> Share
                    </Menu.Item>
                </Menu>
                <Segment inverted className="notelist" basic attached>
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
                </Segment>
            </div>
        )
    }
}

export default NoteList;
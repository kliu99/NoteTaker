import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'

import './Note.css';
import NoteEntry from './NoteEntry';
import RichText from './components/RichText';

class Note extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerTime: "00:00",
            player: null,
            notes: [{
                time: "00:01",
                content: {
                    "document": {
                        "nodes": [
                            {
                                "object": "block",
                                "type": "paragraph",
                                "nodes": [
                                    {
                                        "object": "text",
                                        "leaves": [
                                            {
                                                "text":
                                                    "The editor gives you full control over the logic you can add. For example, it's fairly common to want to add markdown-like shortcuts to editors. So that, when you start a line with \"> \" you get a blockquote that looks like this:"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }, {
                time: "00:04",
                content: {
                    "document": {
                        "nodes": [
                            {
                                "object": "block",
                                "type": "block-quote",
                                "nodes": [
                                    {
                                        "object": "text",
                                        "leaves": [
                                            {
                                                "text": "A wise quote."
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }]
        }
    }

    componentWillMount() {
        this.props.glEventHub.on('set-player', this.setPlayer);
    }

    componentWillUnmount() {
        this.props.glEventHub.off('set-player', this.setPlayer);
    }

    setPlayer = (player) => {
        console.log('set player recieved: ', player)
        if (!this.state.player) {
            console.log(this.state);
            console.log('player set');
            this.setState( { player: player } );
            console.log(this.state);
        }
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
                            value={note}
                            glEventHub={eventHub} />
                    })}
                </div>

                <div className="card">
                    <div className="container">
                        <div className="time">{this.state.playerTime}</div>
                        <RichText readOnly={false} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Note;
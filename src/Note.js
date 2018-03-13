import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'

import './Note.css';
import NoteEntry from './NoteEntry';
import RichText from './components/RichText';
import MarkdownPreview from './components/MarkdownPreview';

class Note extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerTime: "00:00",
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

        this.setPlayer = this.setPlayer.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
    }

    componentWillMount() {
        this.props.glEventHub.on('player-mount', this.setPlayer);
    }

    componentWillUnmount() {
        this.props.glEventHub.off('player-mount', this.setPlayer);
    }

    setPlayer(player) {
        this.setState( { player: player } );
        console.log(this.state);
    }

    updateTimer() {
        console.log("hihi");
        this.setState( { playerTime: this.state.player.getCurrentTime()} );
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
                    <div class="container">
                        <div className="time">{this.state.playerTime}</div>
                        <RichText readOnly={false} onClick={this.updateTimer} />
                        {/* <MarkdownPreview /> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Note;
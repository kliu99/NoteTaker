import React, { Component } from 'react';

import './Note.css';
import NoteEntry from './NoteEntry';

class Note extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerTime: 0,
            player: null,
            notes: [{
                time: 12,
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
                time: 98,
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
        console.log("here");
        // this.state.player = player;
        // this.setState( { player: player } );
    }

    getPlayerTime = () => {
        this.setState( {playerTime: this.state.player.getCurrentTime()} )
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

                    <NoteEntry readOnly={false} time={this.state.playerTime} />
                </div>

                {/* <div className="card">
                    <div className="container">
                        <div className="note-toolbar">
                            <Duration className="time" seconds={this.state.playerTime} />
                        </div>
                        <RichText readOnly={false} />
                    </div>
                </div> */}

                <button onClick={this.getPlayerTime}>Get Time</button>
            </div>
        )
    }
}

export default Note;
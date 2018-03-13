import React, { Component } from 'react';

import RichText from './components/RichText';

class NoteEntry extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.data;
        // This binding is necessary to make `this` work in the callback
        this.selectNote = this.selectNote.bind(this);
    }

    selectNote() {
        console.log(this.state);
        this.props.glEventHub.emit('note-entry-select', this.state);
    }

    render() {
        return (
            <div className="card">
                <div className="container">
                    <div className="time">{this.props.value.time}</div>
                    <RichText
                        key={this.props.key}
                        readOnly={true}
                        value={this.props.value.content}
                        glEventHub={this.props.glEventHub} />
                </div>
            </div>
        );
    }
}

export default NoteEntry;
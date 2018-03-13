import React, { Component } from 'react';

class NoteEntry extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.data;
        // This binding is necessary to make `this` work in the callback
        this.selectNote = this.selectNote.bind(this);
    }
    
    selectNote() {
        console.log(this.state);
        this.props.glEventHub.emit( 'note-entry-select', this.state );
    }

    render() {
        return (
            <li onClick={this.selectNote}>{this.state.time}: {this.state.content}</li>
        );
    }
}

export default NoteEntry;
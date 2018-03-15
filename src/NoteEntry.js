import React, { Component } from 'react';

import RichText from './components/RichText';
import Duration from './components/Duration';

class NoteEntry extends Component {
    
    seekTo = () => {
        if (this.props.time) {
            this.props.player.seekTo(this.props.time);
        }
    }

    render() {
        return (
            <div className="card">
                <div className="container">
                    <div className="note-toolbar">
                        D |
                        E | 
                        <Duration className="time cursor-pointer" seconds={this.props.time} onClick={this.seekTo}/>
                    </div>
                    <RichText
                        key={this.props.key}
                        readOnly={this.props.readOnly}
                        value={this.props.content}
                        glEventHub={this.props.glEventHub}
                        onChange={this.props.onChange} />
                </div>
            </div>
        );
    }
}

export default NoteEntry;
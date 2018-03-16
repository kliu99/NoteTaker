import React, { Component } from 'react';

import RichText from './components/RichText';
import Duration from './components/Duration';

class NoteEntry extends Component {
    
    seekTo = () => {
        if (this.props.time) {
            this.props.player.seekTo(this.props.time);
        }
    }

    onDel = () => {
        this.props.onDel(this.props.time);
    }

    onEdit = () => {
        this.props.glEventHub.emit('edit-note', {
            time: this.props.time, 
            content: this.props.content
        });
    }

    render() {
        return (
            <div className="card">
                <div className="container">
                    <div className="note-toolbar">
                        {this.props.readOnly && 
                            <button onClick={this.onDel}>D</button>
                        }
                        {this.props.readOnly && 
                            <button onClick={this.onEdit}>E</button>
                        }
                        <Duration className="time cursor-pointer" seconds={this.props.time} onClick={this.seekTo}/>
                    </div>
                    <RichText
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
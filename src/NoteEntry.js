import React, { Component } from 'react';
import { Card, Icon, List } from 'semantic-ui-react';

import RichText from './components/RichText';
import Duration from './components/Duration';

class NoteEntry extends Component {

    seekTo = () => {
        if (this.props.time) {
            this.props.glEventHub.emit('seek-to', this.props.time);
            this.props.glEventHub.emit('set-playing', false);
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
            <Card raised>
                <Card.Content>
                    <Card.Meta textAlign='right'>
                        <List horizontal>
                            {this.props.readOnly &&
                                <List.Item as='a' onClick={this.onEdit}>
                                    <Icon name='edit' inverted color='grey' />
                                    Edit
                                </List.Item>
                            }
                            {this.props.readOnly &&
                                <List.Item as='a' onClick={this.onDel}>
                                    <Icon name='trash' inverted color='grey' />
                                    Delete
                            </List.Item>
                            }
                            <List.Item as='a'>
                                <Duration className="time cursor-pointer" seconds={this.props.time} onClick={this.seekTo} inverted={true} color='grey' icon={true} />
                            </List.Item>
                        </List>
                    </Card.Meta>
                    <Card.Description>
                        <RichText
                            readOnly={this.props.readOnly}
                            value={this.props.content}
                            glEventHub={this.props.glEventHub}
                            onChange={this.props.onChange} />
                    </Card.Description>
                </Card.Content>
                {this.props.extra &&
                    <Card.Content extra textAlign="right">
                        {this.props.extra}
                    </Card.Content>
                }
            </Card>
        );
    }
}

export default NoteEntry;
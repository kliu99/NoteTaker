import React, { Component } from 'react';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.userData;
        // This binding is necessary to make `this` work in the callback
        this.selectUser = this.selectUser.bind(this);
        this.changeVideo = this.changeVideo.bind(this);
    }
    
    componentWillMount() {
        this.props.glEventHub.on( 'video-changed', this.changeVideo );
    }

    componentWillUnmount() {
        this.props.glEventHub.off( 'video-changed', this.changeVideo );
    }

    changeVideo(vid) {
        this.state.vid = vid;
        console.log(this.state.vid);
    }

    selectUser() {
        this.props.glEventHub.emit( 'user-select', this.state );
    }

    render() {
        return (
            <li onClick={this.selectUser}>{this.state.name}</li>
        );
    }
}

export default User;
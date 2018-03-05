import React, { Component } from 'react';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.userData;
        // This binding is necessary to make `this` work in the callback
        this.selectUser = this.selectUser.bind(this);
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
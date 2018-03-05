import React, { Component } from 'react';

class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.setUser = this.setUser.bind(this);
    }

    componentWillMount() {
        this.props.glEventHub.on( 'user-select', this.setUser );
    }

    componentWillUnmount() {
        this.props.glEventHub.off( 'user-select', this.setUser );
    }

    setUser( userData ) {
        this.setState( userData );
    }

    render() {
        if ( this.state ) {
            var imgUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/152047/' + this.state.img;
            return (
                <div className="userdetails">
                <img src={imgUrl} width="100" height="100" />
                <h2>{this.state.name}</h2>
                <p>{this.state.street}</p>
                </div>
            )
        } else {
            return (<div className="userdetails">No user selected</div>)
        }
    }
}

export default UserDetail;
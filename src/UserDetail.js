import React, { Component } from 'react';

class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.setUser = this.setUser.bind(this);
        this.setPlayer = this.setPlayer.bind(this);
    }    
      
    componentWillMount() {
        console.log("will mount");
        this.props.glEventHub.on( 'user-select', this.setUser );
        this.props.glEventHub.on( 'player-mount', this.setPlayer );
    }

    componentWillUnmount() {
        this.props.glEventHub.off( 'user-select', this.setUser );
        this.props.glEventHub.off( 'player-mount', this.setPlayer );
    }

    setUser( userData ) {
        this.setState( { user: userData } );
    }

    setPlayer( player ) {
        this.setState( { player: player } );
        console.log(this.state);
    }

    render() {
        if ( this.state && this.state.player ) {
            return (
                <div>
                    {this.state.player.getCurrentTime()}
                </div>
            )
        } else {
            return (<div>Player not loaded</div>)
        }
        

        // if ( this.state && this.state.user ) {
        //     var imgUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/152047/' + this.state.user.img;
        //     return (
        //         <div className="userdetails">
        //         <img src={imgUrl} width="100" height="100" />
        //         <h2>{this.state.user.name}</h2>
        //         <p>{this.state.user.street}</p>
        //         </div>
        //     )
        // } else {
        //     return (<div className="userdetails">No user selected</div>)
        // }
    }
}

export default UserDetail;
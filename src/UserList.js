import React, { Component } from 'react';
import Player from 'react-player'

import User from './User'

class UserList extends Component {

    constructor(props) {
        super(props)
        // Initial state
        this.state = {
            users: [
                { name: 'Jackson Turner', street: '217 Tawny End', img: 'men_1.jpg' },
                { name: 'Megan Perry', street: '77 Burning Ramp', img: 'women_1.jpg' },
                { name: 'Ryan Harris', street: '12 Hazy Apple Route', img: 'men_2.jpg' },
                { name: 'Jennifer Edwards', street: '33 Maple Drive', img: 'women_2.jpg' },
                { name: 'Noah Jenkins', street: '423 Indian Pond Cape', img: 'men_3.jpg' }
            ],
            url: null,
            playing: true,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false
        };

        this.videoChanged = this.videoChanged.bind(this);
    }

    componentWillMount() {
        this.props.glEventHub.on('video-changed', this.videoChanged);
    }

    componentWillUnmount() {
        this.props.glEventHub.off('video-changed', this.videoChanged);
    }

    videoChanged(vid) {
        this.load(`https://www.youtube.com/watch?v=${vid}`)
    }

    load(src) {
        this.setState({
            url: src
        }, () => {
            this.setState({ playing: true })
        })
    }

    render() {
        var eventHub = this.props.glEventHub;
        return (
            <div>
                <ul className="userlist">
                    {this.state.users.map(function (user) {
                        return <User
                            key={user.name}
                            userData={user}
                            glEventHub={eventHub} />
                    })}
                </ul>

                <p>The video url is: {this.state.url}</p>

                <Player
                    ref="player"
                    // width='100%'
                    // height='100%'
                    url={this.state.url}
                    playing={this.state.playing}
                    loop={this.state.loop}
                    playbackRate={this.state.playbackRate}
                    volume={this.state.volume}
                    muted={this.state.muted}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.onEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.onProgress}
                    onDuration={this.onDuration}
                />

            </div>
        );
    }
}

export default UserList;
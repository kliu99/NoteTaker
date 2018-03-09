import React, { Component } from 'react';
import Player from 'react-player'

import './Video.css'
import User from './User'
import Duration from './Duration'

class Video extends Component {

    constructor(props) {
        super(props)
        // Initial state
        this.state = {
            url: null,
            playing: true,
            loop: false,
            controls: true,
            volume: 0.8,
            muted: false,
            playbackRate: 1.0,
            played: 0,
            loaded: 0,
            duration: 0,
            config: {
                youtube: {
                    playerVars: { showinfo: 0 }
                }
            }
        };

        this.videoChanged = this.videoChanged.bind(this);
    }

    componentWillMount() {
        this.props.glEventHub.on('video-changed', this.videoChanged);
    }

    componentWillUnmount() {
        this.props.glEventHub.off('video-changed', this.videoChanged);
    }

    playerMounted() {
        this.props.glEventHub.emit('player-mount', this.player);
    }

    videoChanged(vid) {
        this.load(`https://www.youtube.com/watch?v=${vid}`)
    }

    load(src) {
        this.setState({
            url: src,
            played: 0,
            loaded: 0
        })
    }

    playPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    stop = () => {
        this.setState({ url: null, playing: false })
    }

    onPlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    onPause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    onDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    onProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    render() {
        const eventHub = this.props.glEventHub;
        const { url, playing, loop, controls, volume, muted, playbackRate, played, loaded, duration, config } = this.state

        return (
            <div>
                {/* <ul className="userlist">
                    {this.state.users.map(function (user) {
                        return <User
                            key={user.name}
                            userData={user}
                            glEventHub={eventHub} />
                    })}
                </ul> */}


                <Player
                    ref={player => (this.player = player)}
                    // width='100%'
                    // height='100%'
                    url={url}
                    playing={playing}
                    controls={controls}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    config={config}
                    onReady={() => {
                        console.log('onReady');
                        this.playerMounted();
                    }}
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

                <h2>State</h2>

                <table><tbody>
                    <tr>
                        <th>url</th>
                        <td className={!url ? 'faded' : ''}>
                            {(url instanceof Array ? 'Multiple' : url) || 'null'}
                        </td>
                    </tr>
                    <tr>
                        <th>playing</th>
                        <td>{playing ? 'true' : 'false'}</td>
                    </tr>
                    <tr>
                        <th>volume</th>
                        <td>{volume.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <th>played</th>
                        <td>{played.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <th>loaded</th>
                        <td>{loaded.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <th>duration</th>
                        <td><Duration seconds={duration} /></td>
                    </tr>
                    <tr>
                        <th>elapsed</th>
                        <td><Duration seconds={duration * played} /></td>
                    </tr>
                    <tr>
                        <th>remaining</th>
                        <td><Duration seconds={duration * (1 - played)} /></td>
                    </tr>
                </tbody></table>

            </div>
        );
    }
}

export default Video;
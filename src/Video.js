import React, { Component } from 'react';
import Player from 'react-player'

import './Video.css'


class Video extends Component {

    constructor(props) {
        super(props)

        // Initial state
        this.state = {
            url: null,
            playing: true,
            config: {
                youtube: {
                    playerVars: {
                        controls: 1,
                        showinfo: 0,
                        rel: 0,
                        modestbranding: 0,
                        autoplay: 1
                    }
                }
            },
            storageKey: `meta/${this.props.id}`
        };
        this.videoChanged = this.videoChanged.bind(this);

        this.onReady = this.onReady.bind(this);
    }

    componentWillMount() {
        this.props.glEventHub.on('video-changed', this.videoChanged);
        this.props.glEventHub.on('set-playing', this.setPlaying);
    }

    componentWillUnmount() {
        this.props.glEventHub.off('video-changed', this.videoChanged);
        this.props.glEventHub.off('set-playing', this.setPlaying);
    }

    videoChanged(vid) {
        this.setState( {url: `https://www.youtube.com/watch?v=${vid}`} )
    }

    setPlaying = (playing) => {
        this.setState( { playing } );
    }

    stop = () => {
        this.setState({ url: null, playing: false })
    }

    onReady() {
        // Push player instance to all windows
        this.props.glEventHub.emit('set-player', this.player.getInternalPlayer());
        // Save video metadata
        const meta = this.player.getInternalPlayer().getVideoData();
        localStorage.setItem(this.state.storageKey, JSON.stringify({
            video_id: meta.video_id,
            author: meta.author,
            title: meta.title,
            duration: this.player.getDuration()
        }));
    }

    onPlay = () => {
        console.log('onPlay')
    }

    onPause = () => {
        console.log('onPause')
    }

    onDuration = (duration) => {
        console.log('onDuration', duration)
    }

    onProgress = state => {
        // if (!this.state.seeking) {
        //     this.setState(state)
        // }
    }

    ref = (player) => {
        this.player = player;
    }

    render() {
        return (
            <div className="panel">
                <div className="wrapper">

                {/* iframe reload after layout changed */}
                {/* https://github.com/WolframHempel/golden-layout/issues/154 */}
                <Player
                    ref={this.ref}
                    width='100%'
                    height='100%'
                    url={this.state.url}
                    playing={this.state.playing}
                    config={this.state.config}
                    onReady={this.onReady}
                    onStart={() => console.log('onStart')}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.onEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.onProgress}
                    onDuration={this.onDuration}
                    className="player"
                />
                </div>
            </div>
        );
    }

    // render() {
    //     const { url, playing, loop, controls, volume, muted, playbackRate, played, loaded, duration, config } = this.state

    //     return (
    //         <div className="panel">
    //             <div className="wrapper">

    //             {/* iframe reload after layout changed */}
    //             {/* https://github.com/WolframHempel/golden-layout/issues/154 */}
    //             <Player
    //                 ref={this.ref}
    //                 width='100%'
    //                 height='100%'
    //                 url={url}
    //                 playing={playing}
    //                 controls={controls}
    //                 loop={loop}
    //                 playbackRate={playbackRate}
    //                 volume={volume}
    //                 muted={muted}
    //                 config={config}
    //                 onReady={this.onReady}
    //                 onStart={() => console.log('onStart')}
    //                 onPlay={this.onPlay}
    //                 onPause={this.onPause}
    //                 onBuffer={() => console.log('onBuffer')}
    //                 onSeek={e => console.log('onSeek', e)}
    //                 onEnded={this.onEnded}
    //                 onError={e => console.log('onError', e)}
    //                 onProgress={this.onProgress}
    //                 onDuration={this.onDuration}
    //                 className="player"
    //             />
    //             </div>

    //             <br/>
    //             <table><tbody>
    //                 <tr>
    //                     <th>url</th>
    //                     <td className={!url ? 'faded' : ''}>
    //                         {(url instanceof Array ? 'Multiple' : url) || 'null'}
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                     <th>playing</th>
    //                     <td>{playing ? 'true' : 'false'}</td>
    //                 </tr>
    //                 <tr>
    //                     <th>volume</th>
    //                     <td>{volume.toFixed(3)}</td>
    //                 </tr>
    //                 <tr>
    //                     <th>played</th>
    //                     <td>{played.toFixed(3)}</td>
    //                 </tr>
    //                 <tr>
    //                     <th>loaded</th>
    //                     <td>{loaded.toFixed(3)}</td>
    //                 </tr>
    //                 <tr>
    //                     <th>duration</th>
    //                     <td><Duration seconds={duration} /></td>
    //                 </tr>
    //                 <tr>
    //                     <th>elapsed</th>
    //                     <td><Duration seconds={duration * played} /></td>
    //                 </tr>
    //                 <tr>
    //                     <th>remaining</th>
    //                     <td><Duration seconds={duration * (1 - played)} /></td>
    //                 </tr>
    //             </tbody></table>
    //         </div>
    //     );
    // }
}

export default Video;
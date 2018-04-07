import React, { Component } from 'react';
import Player from 'react-player';

import './Video.css';
import db from './db';
import captureVideoFrame from 'capture-video-frame';

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
                },
                file: { 
                    attributes: {
                        crossorigin: 'anonymous'
                    }
                }
            },
            storageKey: `meta/${this.props.id}`,
            screenshot: null
        };
        this.videoChanged = this.videoChanged.bind(this);

        this.onReady = this.onReady.bind(this);
    }

    componentWillMount() {
        this.props.glEventHub.on('video-changed', this.videoChanged);
        this.props.glEventHub.on('set-playing', this.setPlaying);
        this.props.glEventHub.on('seek-to', this.seekTo);
        this.props.glEventHub.on('get-time', this.getTime);
    }

    componentWillUnmount() {
        this.props.glEventHub.off('video-changed', this.videoChanged);
        this.props.glEventHub.off('set-playing', this.setPlaying);
        this.props.glEventHub.off('seek-to', this.seekTo);
        this.props.glEventHub.off('get-time', this.getTime);
    }

    videoChanged(vid) {
        this.setState( {url: `https://www.youtube.com/watch?v=${vid}`} )
    }

    setPlaying = (playing) => {
        this.setState( { playing } );
    }

    seekTo = (time) => {
        this.player.seekTo(time);
    }

    getTime = () => {
        this.props.glEventHub.emit('set-time', this.player.getCurrentTime());
    }

    stop = () => {
        this.setState({ url: null, playing: false })
    }

    captureFrame() {
        this.setPlaying(false);
        
        const frame = captureVideoFrame(this.player.getInternalPlayer())
        console.log('captured frame', frame)
        this.setState({ screenshot: frame.dataUri })

        this.setPlaying(true);
    }

    onReady() {
        // Save video metadata
        const meta = this.player.getInternalPlayer().getVideoData();
        db.meta.put({
            videoId: meta.video_id,
            author: meta.author,
            title: meta.title,
            duration: this.player.getDuration()
        });
    }

    onProgress = () => {
        this.props.glEventHub.emit('set-time', this.player.getCurrentTime());
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
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onError={e => console.log('onError', e)}
                    onProgress={this.onProgress}
                    className="player"
                />
                </div>

                {/* <button onClick={this.captureFrame.bind(this)}>Capture Frame</button>
                <br />
                {this.state.screenshot &&
                    <img src={this.state.screenshot} width='320px' />
                } */}

            </div>
        );
    }
}

export default Video;
import React, { Component } from 'react';

import GoldenLayout from 'golden-layout'
import Video from './Video';
import UserDetail from './UserDetail';

class NoteTaking extends Component {

  componentDidMount() {
    const config = {
      content: [{
        type: 'row',
        content: [{
          title: 'Video',
          type: 'react-component',
          component: 'video'
        }, {
          title: 'Note',
          type: 'react-component',
          component: 'user-detail'
        }]
      }]
    }

    // https://github.com/WolframHempel/golden-layout/pull/348
    setTimeout(() => {
      const layout = new GoldenLayout(config);

      layout.registerComponent('video', Video);
      layout.registerComponent('user-detail', UserDetail);

      //Once all components are registered, call
      layout.init();

      // Emit event to all the components
      layout.eventHub.emit("video-changed", this.props.match.params.id)
    }, 0);
  }

  render() {
    return <div />;
  }
}

export default NoteTaking;

import React, { Component } from 'react';

import GoldenLayout from 'golden-layout'
import Video from './Video';
import Note from './Note';
import './NoteTaking.css';
import defaultConfig from './components/defaultLayoutConfig.json'

class NoteTaking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layoutConfig: JSON.stringify(defaultConfig)
    }
  }

  componentDidMount() {
    // https://github.com/WolframHempel/golden-layout/pull/348
    setTimeout(() => {
      const layout = new GoldenLayout(JSON.parse(this.state.layoutConfig));

      layout.registerComponent('video', Video);
      layout.registerComponent('note', Note);

      //Once all components are registered, call
      layout.init();

      // Emit event to all the components
      layout.eventHub.emit("video-changed", this.props.match.params.id)

      // Save layout to local storage
      // layout.on('stateChanged', (e) => {

      //   var layoutConfig = JSON.stringify(layout.toConfig());
      //   if (layoutConfig != this.state.layoutConfig) {
      //     // console.log("StateChanged", e);
      //     console.log(layoutConfig);
      //     console.log(this.state.layoutConfig);

      //     this.setState({ layoutConfig: layoutConfig });
      //     localStorage.setItem( 'savedState', layoutConfig );
      //   }
      // }, this)

      layout.on('itemDestroyed', (e) => {
        // Bug in GL: stack overflow when component has complex object.
        if (e.config.type === "component" && e.config.component === "note") {
          e.container.extendState({player: null})
        }
      })

    }, 0);
  }

  render() {
    return <div />;
  }
}

export default NoteTaking;

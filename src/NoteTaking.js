import React, { Component } from 'react';
import GoldenLayout from 'golden-layout'

import Video from './Video';
import Note from './Note';
import './NoteTaking.css';

class NoteTaking extends Component {

  constructor(props) {
    super(props);

    // let layoutConfig = localStorage.getItem(`v/${this.props.match.params.id}`);
  }

  componentDidMount() {
    const layoutConfig = {
      "settings": {
        "showCloseIcon": false
      },
      "content": [
        {
          "type": "row",
          "content": [
            {
              "title": "Video",
              "type": "react-component",
              "component": "video",
              "isClosable": false,
              "props": {
                "id": this.props.match.params.id
              }
            },
            {
              "title": "Note",
              "type": "react-component",
              "component": "note",
              "isClosable": false,
              "props": {
                "id": this.props.match.params.id
              }
            }
          ]
        }
      ]
    }


    // https://github.com/WolframHempel/golden-layout/pull/348
    setTimeout(() => {
      const layout = new GoldenLayout(layoutConfig);
      this.setState({ layout: layout })

      layout.registerComponent('video', Video);
      layout.registerComponent('note', Note);

      //Once all components are registered, call
      layout.init();

      // Emit event to all the components
      layout.eventHub.emit("video-changed", this.props.match.params.id)

      // Save layout to local storage
      // layout.on('stateChanged', debounce(this.stateChanged, 200));
      // layout.on('stateChanged', debounce(this.stateChanged, 0));

      // When item is destroyed
      layout.on('itemDestroyed', (e) => {
        // Bug in GL: stack overflow when component has complex object.
        if (e.config.type === "component" && e.config.component === "note") {
          e.container.extendState({ player: null })
        }
      })
    }, 0);
  }

  // stateChanged(e) {
  //   console.log(e);
  //   console.log("stateChanged");

  //   try {
  //     const layoutConfig = JSON.stringify(this.state.layout.toConfig(), (key, value) => {
  //       if (key == "player")
  //         return null;
  //       else
  //         return value;
  //     })

  //     console.log(JSON.parse(layoutConfig));
  //     localStorage.setItem(`v/${this.props.match.params.id}`, layoutConfig);

  //     console.log(JSON.parse(layoutConfig));
  //     console.log(JSON.parse(localStorage.getItem(`v/${this.props.match.params.id}`)))

  //   } catch (error) {
  //     console.log(error);
  //     // retry in a second
  //     setTimeout(this.stateChanged, 1000);
  //   }

  //   // if(!this.state.layout.isInitialised || !(this.state.layout.openPopouts.every((popout) => popout.isInitialised))) { 
  //   //   console.log("returned");
  //   //   return;
  //   // }    
  // }

  render() {
    return <div />;
  }
}

export default NoteTaking;

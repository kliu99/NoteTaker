import React, { Component } from 'react';
import GoldenLayout from 'golden-layout'

import './NoteTaker.css';
import Video from './Video';
import NoteList from './NoteList';
import NewNote from './NewNote';
import Menu from './Menu';

class NoteTaker extends Component {

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
              "type": "column",
              "content": [
                {
                  "title": "Note List",
                  "type": "react-component",
                  "component": "note-list",
                  "isClosable": false,
                  "props": {
                    "id": this.props.match.params.id
                  }
                },
                {
                  "title": "New Note",
                  "type": "react-component",
                  "component": "new-note",
                  "isClosable": false,
                  "props": {
                    "id": this.props.match.params.id
                  }
                }
              ]
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
      layout.registerComponent('note-list', NoteList);
      layout.registerComponent('new-note', NewNote);

      //Once all components are registered, call
      layout.init();

      // Emit event to all the components
      layout.eventHub.emit("video-changed", this.props.match.params.id)

      // Save layout to local storage
      // layout.on('stateChanged', debounce(this.stateChanged, 200));
      // layout.on('stateChanged', debounce(this.stateChanged, 0));

      // When item is created
      layout.on('windowOpened', (e) => {
        console.log(e);
      })

      // When item is destroyed
      layout.on('itemDestroyed', (e) => {
        // Bug in GL: stack overflow when component has complex object.
        if (e.config.type === "component" &&
          (e.config.component === "note-list" || e.config.component === "new-note")) {
          e.container.extendState({ player: null })
        }
      })
    }, 0);
  }

  componentWillUnmount() {
    this.state.layout.destroy()
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
    return (
      <div>
        <Menu />
        <div id="container"/>
      </div>
    );
  }
}

export default NoteTaker;

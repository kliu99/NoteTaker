import React, { Component } from 'react';
import GoldenLayout from 'golden-layout'

import './NoteTaker.css';
import Video from './Video';
import NoteList from './NoteList';
import NewNote from './NewNote';

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
    }, 0);
  }

  componentWillUnmount() {
    this.state.layout.destroy()
  }

  render() {
    return (
      <div />
      // <div>
      //   <Menu />
      //   <div id="container"/>
      // </div>
    );
  }
}

export default NoteTaker;

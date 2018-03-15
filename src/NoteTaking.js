import React, { Component } from 'react';
import GoldenLayout from 'golden-layout'

import Video from './Video';
import Note from './Note';
import './NoteTaking.css';
import defaultConfig from './components/defaultLayoutConfig.json'



// function debounce(fn, delay) {
//   var timer = null;
//   return function () {
//     var context = this, args = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//       fn.apply(context, args);
//     }, delay);
//   };
// }

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


class NoteTaking extends Component {

  constructor(props) {
    super(props);

    let layoutConfig = localStorage.getItem(`v/${this.props.match.params.id}`);
    if (!layoutConfig) {
      layoutConfig = JSON.stringify(defaultConfig);
    }

    this.state = {
      layoutConfig: layoutConfig
    }
  }

  componentDidMount() {
    window.addEventListener('storage', (e) => {  
      console.log('storage', e);
    });


    // https://github.com/WolframHempel/golden-layout/pull/348
    setTimeout(() => {
      const layout = new GoldenLayout(JSON.parse(this.state.layoutConfig));
      this.setState({ layout: layout })

      layout.registerComponent('video', Video);
      layout.registerComponent('note', Note);

      //Once all components are registered, call
      layout.init();

      // Emit event to all the components
      layout.eventHub.emit("video-changed", this.props.match.params.id)

      // Save layout to local storage
      // layout.on('stateChanged', debounce(this.stateChanged, 200));
      layout.on('stateChanged', debounce(this.stateChanged, 2000));

      layout.on('itemDestroyed', (e) => {
        // Bug in GL: stack overflow when component has complex object.
        if (e.config.type === "component" && e.config.component === "note") {
          e.container.extendState({ player: null })
        }
      })
    }, 0);
  }

  stateChanged = (e) => {
    console.log(e);
    console.log("stateChanged");

    try {
      const layoutConfig = JSON.stringify(this.state.layout.toConfig(), (key, value) => {
        if (key == "player")
          return null;
        else
          return value;
      })
  
      console.log(JSON.parse(layoutConfig));
      localStorage.setItem(`v/${this.props.match.params.id}`, layoutConfig);
      console.log(JSON.parse(localStorage.getItem(`v/${this.props.match.params.id}`)))

    } catch (error) {
      console.log(error);
    }

    // if(!this.state.layout.isInitialised || !(this.state.layout.openPopouts.every((popout) => popout.isInitialised))) { 
    //   console.log("returned");
    //   return;
    // }

    

    
  }

  render() {
    return <div />;
  }
}

export default NoteTaking;

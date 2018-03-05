import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TestComponent from './TestComponent'
import GoldenLayout from 'golden-layout'

class NoteTaking extends Component {

  componentDidMount() {

    let container = this.domNode;
    const config = {
      content: [{
        type: 'row',
        content:[{
          type:'react-component',
          component: 'test-component',
          props: { label: 'A' }
        },{
          type: 'column',
          content:[{
            type:'react-component',
            component: 'test-component',
            props: { label: 'B' }
          },{
            type:'react-component',
            component: 'test-component',
            props: { label: 'C' }
          }]
        }]
      }]
    };

    setTimeout(() => {
      const layout = new GoldenLayout(config, container);    
      layout.registerComponent( 'test-component', TestComponent );
      //Once all components are registered, call
      layout.init();
    }, 0);
  }


  render() {
    return <div ref={ref => (this.domNode = ref)} />
  }
}

export default NoteTaking;

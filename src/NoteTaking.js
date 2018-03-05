import React, { Component } from 'react';


import TestComponent from './TestComponent'
import GoldenLayout from 'golden-layout'
import UserList from './UserList';
import UserDetail from './UserDetail';

class NoteTaking extends Component {

  componentDidMount() {

    // const config = {
    //   content: [{
    //     type: 'row',
    //     content:[{
    //       type:'react-component',
    //       component: 'test-component',
    //       props: { label: 'A' }
    //     },{
    //       type: 'column',
    //       content:[{
    //         type:'react-component',
    //         component: 'test-component',
    //         props: { label: 'B' }
    //       },{
    //         type:'react-component',
    //         component: 'test-component',
    //         props: { label: 'C' }
    //       }]
    //     }]
    //   }]
    // };

    const config = {
      content: [{
        type: 'row',
        content: [{
          title: 'Users',
          type:'react-component',
          component: 'user-list'
        },{
          title: 'User Detail',
          type:'react-component',
          component: 'user-detail'
        }]
      }]
    }

    const layout = new GoldenLayout(config);    
    
    layout.registerComponent('user-list', UserList);
    layout.registerComponent('user-detail', UserDetail);
    
    // layout.registerComponent( 'test-component', TestComponent );


    //Once all components are registered, call
    layout.init();
  }

  render() {
    return <div ref={ref => (this.domNode = ref)} />
  }
}

export default NoteTaking;

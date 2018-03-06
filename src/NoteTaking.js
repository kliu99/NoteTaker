import React, { Component } from 'react';

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

    // https://github.com/WolframHempel/golden-layout/pull/348
    setTimeout(() => {
      const layout = new GoldenLayout(config);    
    
      layout.registerComponent('user-list', UserList);
      layout.registerComponent('user-detail', UserDetail);
    
      //Once all components are registered, call
      layout.init();

      // Emit event to all the components
      layout.eventHub.emit( "video-changed", this.props.match.params.id )
    }, 0);
  }

  render() {
    return <div ref={ref => (this.domNode = ref)} />;
  }
}

export default NoteTaking;

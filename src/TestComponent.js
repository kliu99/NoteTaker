import React, { Component } from 'react';

class TestComponent extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.label}</h1>
            </div>
        );
    }
}

export default TestComponent;
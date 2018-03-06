import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Link to="/v/123">need a url </Link>
            </div>
        )
    };
}

export default Home;
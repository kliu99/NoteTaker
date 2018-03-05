import React, { Component } from 'react';
import User from './User'

class UserList extends Component {

    constructor(props) {
        super(props)
        // Initial state
        this.state = { users: [
            { name: 'Jackson Turner', street: '217 Tawny End', img: 'men_1.jpg' },
            { name: 'Megan Perry', street: '77 Burning Ramp', img: 'women_1.jpg' },
            { name: 'Ryan Harris', street: '12 Hazy Apple Route', img: 'men_2.jpg' },
            { name: 'Jennifer Edwards', street: '33 Maple Drive', img: 'women_2.jpg' },
            { name: 'Noah Jenkins', street: '423 Indian Pond Cape', img: 'men_3.jpg' }
        ]};
    }

    render() {
        var eventHub = this.props.glEventHub;
        return (
            <ul className="userlist">
				{this.state.users.map(function( user ){
					return <User
						key={user.name}
						userData={user}
						glEventHub={eventHub} />
				})}
			</ul>
        );
    }
}

export default UserList;
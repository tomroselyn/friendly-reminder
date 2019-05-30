import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllFriends extends Component {
    render() {
        return (
            <div>
                <button onClick={()=> console.log('hello')}>add new friend</button>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Last Contacted</th>
                            <th>Due Date</th>
                            <th>Frequency</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
                <button onClick={() => console.log('hello')}>back to dashboard</button>
                <button onClick={() => this.props.dispatch({ type: 'GET_FRIENDS' })}>GET</button>
            </div>
        )
    }
}

export default connect()(AllFriends);
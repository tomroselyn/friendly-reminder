import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllFriends extends Component {

    handleDelete = (idToDelete) => {
        this.props.dispatch({type: 'DELETE_FRIEND', payload: idToDelete})
    }

    render() {

        let eachFriendRow = this.props.redux.friend.map(friend => {
            return <tr key={friend.id}>
                <td>{friend.first_name}</td>
                <td>{friend.last_name}</td>
                <td>{friend.last_date}</td>
                <td>{friend.due_date}</td>
                <td>{friend.frequency}</td>
                <td><button onClick={()=> this.handleDelete(friend.id)}>delete</button></td>
            </tr>
        })

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
                    <tbody>
                        {eachFriendRow}
                    </tbody>
                </table>
                <button onClick={() => console.log('hello')}>back to dashboard</button>
                <button onClick={() => this.props.dispatch({ type: 'GET_FRIENDS' })}>GET</button>
            </div>
        )
    }
}

const mapRedux = (redux) => {
    return {redux}
}

export default connect(mapRedux)(AllFriends);
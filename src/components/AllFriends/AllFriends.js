import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllFriends extends Component {

    handleDelete = (idToDelete) => {
        this.props.dispatch({type: 'DELETE_FRIEND', payload: idToDelete})
    }

    handleEdit = (friendToEdit) => {
        this.props.dispatch({type: 'SET_EDIT_FRIEND', payload: friendToEdit});
        this.props.history.push('/add-edit-friend');
    }

    handleExtraDay = (friendToUpdate) => {
        console.log('adding extra day to due date')
    }

    handleEmail = (friendToEmail) => {
        console.log('sending an email')
    }

    handleSMS = (friendToEmail) => {
        console.log('sending an SMS')
    }

    handleUrl = (friendToEmail) => {
        console.log('going to URL')
    }

    render() {

        let eachFriendRow = this.props.redux.friend.map(friend => {
            return <tr key={friend.id}>
                <td>{friend.first_name}</td>
                <td>{friend.last_name}</td>
                <td>{friend.last_date}</td>
                <td>{friend.due_date}</td>
                <td>{friend.frequency}</td>
                <td>
                    <button onClick={() => this.handleExtraDay(friend)}>+1</button>
                    <button onClick={() => this.handleEmail(friend)}>email</button>
                    <button onClick={() => this.handleSMS(friend)}>sms</button>
                    <button onClick={() => this.handleUrl(friend)}>url</button>
                    <button onClick={()=> this.handleEdit(friend)}>edit</button>
                    <button onClick={()=> this.handleDelete(friend.id)}>delete</button>
                </td>
            </tr>
        })

        return (
            <div>
                <button onClick={()=> this.props.history.push('/add-edit-friend')}>add new friend</button>
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
                <button onClick={() => this.props.history.push('/dashboard')}>back to dashboard</button>
            </div>
        )
    }
}

const mapRedux = (redux) => {
    return {redux}
}

export default connect(mapRedux)(AllFriends);
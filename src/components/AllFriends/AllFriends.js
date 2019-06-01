import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import './AllFriends.css';

class AllFriends extends Component {

    handleAddClick = (event) => {
        this.props.dispatch({ type: 'CLEAR_EDIT_FRIEND' });
        this.props.history.push('/add-edit-friend');
    }

    handleDelete = (idToDelete) => {
        this.props.dispatch({type: 'DELETE_FRIEND', payload: idToDelete})
    }

    handleEdit = (friendToEdit) => {
        this.props.dispatch({type: 'SET_EDIT_FRIEND', payload: friendToEdit});
        this.props.history.push('/add-edit-friend');
    }

    handleExtraDay = (idToUpdate) => {
        console.log('adding extra day to due date');
        this.props.dispatch({type: 'EXTRA_DAY', payload: idToUpdate});
    }

    handleEmail = (friend) => {
        window.open(`mailto:${friend.email}`);
    }

    handleSMS = (friend) => {
        console.log('sending an SMS')
    }

    handleUrl = (friend) => {
        window.open(friend.url);
    }

    render() {

        let eachFriendRow = this.props.redux.friend.map(friend => {
            return <TableRow key={friend.id}>
                <TableCell>{friend.first_name}</TableCell>
                <TableCell>{friend.last_name}</TableCell>
                <TableCell>{friend.last_date}</TableCell>
                <TableCell>{friend.due_date}</TableCell>
                <TableCell>{friend.frequency}</TableCell>
                <TableCell>
                    <button onClick={() => this.handleExtraDay(friend.id)}>+1</button>
                    <button onClick={() => this.handleEmail(friend)}>email</button>
                    <button onClick={() => this.handleSMS(friend)}>sms</button>
                    <button onClick={() => this.handleUrl(friend)}>url</button>
                    <button onClick={()=> this.handleEdit(friend)}>edit</button>
                    <button onClick={()=> this.handleDelete(friend.id)}>delete</button>
                </TableCell>
            </TableRow>
        })

        return (
            <div id="allFriendsContainer">
                    <button onClick={this.handleAddClick}>add new friend</button>
                    <Table className="allFriendsTable">
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Last Contacted</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Frequency</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eachFriendRow}
                        </TableBody>
                    </Table>
            </div>
        )
    }
}

const mapRedux = (redux) => {
    return {redux}
}

export default connect(mapRedux)(AllFriends);
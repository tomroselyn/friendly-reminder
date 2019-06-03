import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton} from '@material-ui/core';
import {AddAlert, Bookmark, Delete, Edit, Email, Sms} from '@material-ui/icons';
import swal from 'sweetalert';
import './AllFriends.css';

class AllFriends extends Component {

    handleAddClick = (event) => {
        this.props.dispatch({ type: 'CLEAR_EDIT_FRIEND' });
        this.props.history.push('/add-edit-friend');
    }

    handleDelete = (friendToDelete) => {
        //sweet alert requiring confirmation
        swal({
            title: `are you sure about this?`,
            text: `deleting: ${friendToDelete.first_name} ${friendToDelete.last_name}`,
            icon: "warning",
            buttons: ["no, don't!", "go ahead"],
            dangerMode: true
        })
            .then((willConfirm) => {
                if (willConfirm) {
                    swal("friendship over!", "", "success");
                    this.props.dispatch({ type: 'DELETE_FRIEND', payload: friendToDelete.id });
                }
            });
        
    }

    handleEdit = (friendToEdit) => {
        this.props.dispatch({type: 'SET_EDIT_FRIEND', payload: friendToEdit});
        this.props.history.push('/add-edit-friend');
    }

    handleExtraDay = (idToUpdate) => {
        console.log('adding extra day to due date');
        this.props.dispatch({type: 'EXTRA_DAY', payload: idToUpdate});
        swal("due date extended!", "", "success");
    }

    handleEmail = (friendToEmail) => {
        this.props.dispatch({ type: 'SET_EDIT_FRIEND', payload: friendToEmail });
        this.props.history.push('/send-email');
    }

    handleSMS = (friend) => {
        //sweet alert requiring confirmation
        swal({
            title: `did you text ${friend.first_name}?`,
            text: `send sms to: ${friend.sms || '(no number listed)'}`,
            icon: "warning",
            buttons: ["oops, no I didn't", "yep, text sent!"]
        })
            .then((willConfirm) => {
                if (willConfirm) {
                    swal("contact complete!", "", "success");
                    this.props.dispatch({ type: 'MARK_CONTACTED', payload: friend, contact_type: 'sms' });
                }
            });
    }

    handleUrl = (friend) => {
        //go to link
        window.open(friend.url);
        //sweet alert requiring confirmation
        swal({
            title: `did you contact ${friend.first_name}?`,
            text: `visit: ${friend.url || '(no website listed)'}`,
            icon: "warning",
            buttons: ["oops, no I didn't", "yep, made contact!"]
        })
            .then((willConfirm) => {
                if (willConfirm) {
                    swal("contact complete!", "", "success");
                    this.props.dispatch({ type: 'MARK_CONTACTED', payload: friend, contact_type: 'url' });
                }
            });
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
                    <IconButton onClick={() => this.handleExtraDay(friend.id)}>
                        <AddAlert />
                    </IconButton>
                    <IconButton onClick={() => this.handleEmail(friend)}>
                        <Email />
                    </IconButton>
                    <IconButton onClick={() => this.handleSMS(friend)}>
                        <Sms />
                    </IconButton>
                    <IconButton onClick={() => this.handleUrl(friend)}>
                        <Bookmark />
                    </IconButton>
                    <IconButton onClick={() => this.handleEdit(friend)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => this.handleDelete(friend)}>
                        <Delete />
                    </IconButton>
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
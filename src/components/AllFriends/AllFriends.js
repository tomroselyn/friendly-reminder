import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import EmailButton from '../Buttons/EmailButton';
import ExtraDayButton from '../Buttons/ExtraDayButton';
import SmsButton from '../Buttons/SmsButton';
import UrlButton from '../Buttons/UrlButton';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';
import './AllFriends.css';

class AllFriends extends Component {

    // //clears out editFriend reducer and sends user to add friend form
    // handleAddClick = (event) => {
    //     this.props.dispatch({ type: 'CLEAR_EDIT_FRIEND' });
    //     this.props.history.push('/add-edit-friend');
    // }

    render() {

        //setting up table rows by mapping friend reducer data
        let eachFriendRow = this.props.redux.friend.map(friend => {
            return <TableRow key={friend.id}>
                <TableCell>{friend.first_name}</TableCell>
                <TableCell>{friend.last_name}</TableCell>
                <TableCell>{friend.last_date.substr(0, 10)}</TableCell>
                <TableCell>{friend.due_date.substr(0, 10)}</TableCell>
                <TableCell>{friend.frequency}</TableCell>
                <TableCell>
                    {friend.email && <EmailButton friend={friend} />}
                    {friend.sms && <SmsButton friend={friend} />}
                    {friend.url && <UrlButton friend={friend} />}
                    <ExtraDayButton friend={friend} />
                    <EditButton friend={friend} />
                    <DeleteButton friend={friend} />
                </TableCell>
            </TableRow>
        })

        return (
            <div id="allFriendsContainer">
                <h2>all friends</h2>
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
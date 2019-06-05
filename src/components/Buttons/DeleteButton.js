import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

class DeleteButton extends Component {

    handleDelete = (friend) => {
        //sweet alert requiring confirmation
        swal({
            title: `are you sure about this?`,
            text: `deleting: ${friend.first_name} ${friend.last_name}`,
            icon: "warning",
            buttons: ["no, don't!", "go ahead"],
            dangerMode: true
        })
            .then((willConfirm) => {
                if (willConfirm) {
                    swal("friendship over!", "", "success");
                    this.props.dispatch({ type: 'DELETE_FRIEND', payload: friend.id });
                }
            });

    }

    render() {
        return (
            <IconButton onClick={() => this.handleDelete(this.props.friend)}>
                <Delete />
            </IconButton>
        )
    }
}

export default withRouter(connect()(DeleteButton));
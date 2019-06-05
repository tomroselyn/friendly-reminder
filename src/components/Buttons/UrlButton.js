import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Bookmark } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

class UrlButton extends Component {

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
        return (
            <IconButton onClick={() => this.handleUrl(this.props.friend)}>
                <Bookmark />
            </IconButton>
        )
    }
}

export default withRouter(connect()(UrlButton));
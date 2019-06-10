import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip, IconButton } from '@material-ui/core';
import { Sms } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

class SmsButton extends Component {

    handleSms = (friend) => {
        // this.props.dispatch({ type: 'SET_EDIT_FRIEND', payload: friend });
        // this.props.history.push('/send-sms');
        // sweet alert requiring confirmation
        swal({
            title: `did you text ${friend.first_name}?`,
            text: `sms: ${friend.sms || '(no number listed)'}`,
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

    render() {
        return (
            <Tooltip title="send sms">
                <IconButton onClick={() => this.handleSms(this.props.friend)}>
                    <Sms />
                </IconButton>
            </Tooltip>
        )
    }
}

export default withRouter(connect()(SmsButton));
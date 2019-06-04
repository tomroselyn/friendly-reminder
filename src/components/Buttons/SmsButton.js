import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Sms } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

class SmsButton extends Component {

    handleSms = (friendToText) => {
        //sweet alert requiring confirmation
        swal({
            title: `did you text ${friendToText.first_name}?`,
            text: `send sms to: ${friendToText.sms || '(no number listed)'}`,
            icon: "warning",
            buttons: ["oops, no I didn't", "yep, text sent!"]
        })
            .then((willConfirm) => {
                if (willConfirm) {
                    swal("contact complete!", "", "success");
                    this.props.dispatch({ type: 'MARK_CONTACTED', payload: friendToText, contact_type: 'sms' });
                }
            });
    }

    render() {
        return (
            <IconButton onClick={() => this.handleSms(this.props.friendToText)}>
                <Sms />
            </IconButton>
        )
    }
}

export default withRouter(connect()(SmsButton));
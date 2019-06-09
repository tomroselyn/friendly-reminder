import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip, IconButton } from '@material-ui/core';
import { Sms } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

class SmsButton extends Component {

    handleSms = (friend) => {
        this.props.dispatch({ type: 'SET_EDIT_FRIEND', payload: friend });
        this.props.history.push('/send-sms');
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
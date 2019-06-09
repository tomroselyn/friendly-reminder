import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip, IconButton } from '@material-ui/core';
import { Email } from '@material-ui/icons';
import {withRouter} from 'react-router-dom';

class EmailButton extends Component {

    handleEmail = (friend) => {
        this.props.dispatch({ type: 'SET_EDIT_FRIEND', payload: friend });
        this.props.history.push('/send-email');
    }

    render() {
        return (
            <Tooltip title="send email">
                <IconButton onClick={() => this.handleEmail(this.props.friend)}>
                    <Email />
                </IconButton>
            </Tooltip>
        )
    }
}

export default withRouter(connect()(EmailButton));
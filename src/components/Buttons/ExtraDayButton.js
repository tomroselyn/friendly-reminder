import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

class ExtraDayButton extends Component {

    handleExtraDay = (friend) => {
        console.log('adding extra day to due date');
        this.props.dispatch({ type: 'EXTRA_DAY', payload: friend.id });
        swal("due date extended!", "", "success");
    }

    render() {
        return (
            <Tooltip title="extra day">
                <IconButton onClick={() => this.handleExtraDay(this.props.friend)}>
                    <AddCircle />
                </IconButton>
            </Tooltip>
        )
    }
}

export default withRouter(connect()(ExtraDayButton));
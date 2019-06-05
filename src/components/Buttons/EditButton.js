import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

class EditButton extends Component {

    handleEdit = (friend) => {
        this.props.dispatch({ type: 'SET_EDIT_FRIEND', payload: friend });
        this.props.history.push('/add-edit-friend');
    }

    render() {
        return (
            <IconButton onClick={() => this.handleEdit(this.props.friend)}>
                <Edit />
            </IconButton>
        )
    }
}

export default withRouter(connect()(EditButton));
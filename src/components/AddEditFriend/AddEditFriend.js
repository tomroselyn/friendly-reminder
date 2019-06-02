import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TextField, MenuItem, InputAdornment, Button, Grid} from '@material-ui/core';
import './AddEditFriend.css';

class AddEditFriend extends Component {

    state = {
        first_name: this.props.redux.editFriend.first_name || '',
        last_name: this.props.redux.editFriend.last_name || '',
        email: this.props.redux.editFriend.email || '',
        sms: this.props.redux.editFriend.sms || '',
        url: this.props.redux.editFriend.url || '',
        pref: this.props.redux.editFriend.pref || '',
        frequency: this.props.redux.editFriend.frequency || '',
        last_type: this.props.redux.editFriend.last_type || '',
        last_date: this.props.redux.editFriend.last_date || 
            new Date().toISOString().substr(0,10)
    } //end state

    handleInputChangeFor = propertyName => event => {
        this.setState({
            [propertyName]: event.target.value,
        });
    } //end handleInputChangeFor

    handleSubmit = event => {
        event.preventDefault();
        if (this.props.redux.editFriend.id) {
            this.props.dispatch({type: 'UPDATE_FRIEND', payload: this.state, id: this.props.redux.editFriend.id});
        } else {
            this.props.dispatch({ type: 'ADD_FRIEND', payload: this.state });
        }
        this.props.dispatch({ type: 'CLEAR_EDIT_FRIEND' });
        this.props.history.push('/all-friends');
    } //end handleSubmit

    render() {

        // console.log(this.state.frequency);

        let submitButton;

        if (this.props.redux.editFriend.id) {
            submitButton = <Button type="submit" variant="contained" color="primary">update friend</Button>
        } else {
            submitButton = <Button type="submit" variant="contained" color="primary">add friend</Button>
        }

        return (
            <form id="addEditFriendForm" onSubmit={this.handleSubmit}>
                <div>
                    <h3>add / edit friend</h3>
                </div>
                <Grid container id="nameInputs" spacing={2}>
                    <Grid item xs={12}>
                        <h4>What is your friend's name?</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className="textField"
                            value={this.state.first_name}
                            type="text"
                            label="first name"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('first_name')} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className="textField"
                            value={this.state.last_name}
                            type="text"
                            label="last name"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('last_name')} />
                    </Grid>
                </Grid>
                <Grid container id="addressInputs" spacing={2}>
                    <Grid item xs={12}>
                        <h4>How will you contact them?</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className="textField"
                            value={this.state.email}
                            type="text"
                            label="email address"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('email')} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className="textField"
                            value={this.state.sms}
                            type="text"
                            label="sms number"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('sms')} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className="textField"
                            value={this.state.url}
                            type="text"
                            label="url"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('url')} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            className="textField"
                            value={this.state.pref}
                            label="preferred contact method"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('pref')} >
                            <MenuItem value="email">email</MenuItem>
                            <MenuItem value="sms">sms</MenuItem>
                            <MenuItem value="url">url</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container id="timingInputs" spacing={2}>
                    <Grid item xs={12}>
                        <h4>When and how did you last contact them?</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className="textField"
                            value={this.state.last_date}
                            type="date"
                            label="last date of contact"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('last_date')} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            className="textField"
                            value={this.state.last_type}
                            label="last contact method"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('last_type')} >
                            <MenuItem value="email">email</MenuItem>
                            <MenuItem value="sms">sms</MenuItem>
                            <MenuItem value="url">url</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>How often would you like to contact them?</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            className="textField"
                            value={this.state.frequency}
                            type="number"
                            label="frequency"
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">days</InputAdornment>,
                            }}
                            onChange={this.handleInputChangeFor('frequency')} />
                    </Grid>
                </Grid>
                <div id="buttonArea">
                    {submitButton}
                </div>
            </form>
        )
    } //end render
}

const mapRedux = (redux) => {
    return {redux}
}

export default connect(mapRedux)(AddEditFriend);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TextField, MenuItem, InputAdornment, Button} from '@material-ui/core';

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

    handleClear = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'CLEAR_EDIT_FRIEND'});
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            sms: '',
            url: '',
            pref: '',
            frequency: '',
            last_type: '',
            last_date: ''
        })
    }

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

        // console.log(this.state);

        let submitButton;

        if (this.props.redux.editFriend.id) {
            submitButton = <Button type="submit" variant="contained" color="primary">update friend</Button>
        } else {
            submitButton = <Button type="submit" variant="contained" color="primary">add friend</Button>
        }

        return (
            <div>
                {/* <h3>add / edit friend</h3>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.first_name} type="text" placeholder="first name" onChange={this.handleInputChangeFor('first_name')} />
                    <input value={this.state.last_name} type="text" placeholder="last name" onChange={this.handleInputChangeFor('last_name')} />
                    <input value={this.state.email} type="text" placeholder="email address" onChange={this.handleInputChangeFor('email')} />
                    <input value={this.state.sms} type="text" placeholder="sms number" onChange={this.handleInputChangeFor('sms')} />
                    <input value={this.state.url} type="text" placeholder="url" onChange={this.handleInputChangeFor('url')} />
                    <select value={this.state.pref} onChange={this.handleInputChangeFor('pref')}>
                        <option value="email">email</option>
                        <option value="sms">sms</option>
                        <option value="url">url</option>
                    </select>
                    <select value={this.state.frequency} onChange={this.handleInputChangeFor('frequency')}>
                        <option value={1}>weekly</option>
                        <option value={2}>bi-weekly</option>
                    </select>
                    <input value={this.state.last_date} type="date" placeholder="last date of contact" onChange={this.handleInputChangeFor('last_date')} />
                    <select value={this.state.last_type} onChange={this.handleInputChangeFor('last_type')}>
                        <option value="email">email</option>
                        <option value="sms">sms</option>
                        <option value="url">url</option>
                    </select>
                    <br />
                    {submitButton}
                    <button onClick={this.handleClear}>clear form</button>
                </form> */}

                <form id="addEditFriendForm" onSubmit={this.handleSubmit}>
                    <div>
                        <h3>add / edit friend</h3>
                    </div>
                    <div id="nameInputs">
                        <TextField 
                            value={this.state.first_name} 
                            type="text" 
                            label="first name" 
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('first_name')} />
                        <TextField 
                            value={this.state.last_name} 
                            type="text" 
                            label="last name" 
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('last_name')} />
                    </div>
                    <div id="addressInputs">
                        <TextField 
                            value={this.state.email} 
                            type="text" 
                            label="email address" 
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('email')} />
                        <TextField 
                            value={this.state.sms} 
                            type="text" 
                            label="sms number" 
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('sms')} />
                        <TextField 
                            value={this.state.url} 
                            type="text" 
                            label="url" 
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('url')} />
                        <TextField 
                            select
                            value={this.state.pref} 
                            label="preferred contact method"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('pref')} >
                                <MenuItem value="email">email</MenuItem>
                                <MenuItem value="sms">sms</MenuItem>
                                <MenuItem value="url">url</MenuItem>
                        </TextField>
                    </div>
                    <div id="timingInputs">
                        <TextField 
                            value={this.state.frequency} 
                            type="number"
                            label="frequency"
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">days</InputAdornment>,
                            }}
                            onChange={this.handleInputChangeFor('frequency')} />
                        <TextField 
                            value={this.state.last_date} 
                            type="date" 
                            label="last date of contact" 
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('last_date')} />
                        <TextField 
                            select
                            value={this.state.last_type} 
                            label="last contact method"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('last_type')} >
                                <MenuItem value="email">email</MenuItem>
                                <MenuItem value="sms">sms</MenuItem>
                                <MenuItem value="url">url</MenuItem>
                        </TextField>
                    </div>
                    <div id="buttonArea">
                        {submitButton}
                    </div>
                </form>

            </div>
        )
    }
}

const mapRedux = (redux) => {
    return {redux}
}

export default connect(mapRedux)(AddEditFriend);
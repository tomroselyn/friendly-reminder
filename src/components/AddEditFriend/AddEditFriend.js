import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        last_date: this.props.redux.editFriend.last_date || ''
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
            submitButton = <button type="submit">update friend</button>
        } else {
            submitButton = <button type="submit">add friend</button>
        }

        return (
            <div>
                <h3>add / edit friend</h3>
                <form id="addEditForm" onSubmit={this.handleSubmit}>
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
                </form>
            </div>
        )
    }
}

const mapRedux = (redux) => {
    return {
        redux
    }
}

export default connect(mapRedux)(AddEditFriend);
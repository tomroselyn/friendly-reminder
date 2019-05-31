import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddEditFriend extends Component {

    state = {
        first_name: this.props.redux.editId | '',
        last_name: '',
        email: '',
        sms: '',
        url: '',
        pref: '',
        frequency: '',
        last_type: '',
        last_date: ''
    } //end state

    handleInputChangeFor = propertyName => event => {
        this.setState({
            [propertyName]: event.target.value,
        });
    } //end handleInputChangeFor

    handleSubmit = event => {
        event.preventDefault();
        if (this.props.redux.editId) {
            this.props.dispatch({type: 'UPDATE_FRIEND', payload: this.state, id: this.props.redux.editId});
        } else {
            this.props.dispatch({ type: 'ADD_FRIEND', payload: this.state });
        }
        this.props.dispatch({ type: 'CLEAR_EDIT_ID' });
        this.props.history.push('/dashboard');
    } //end handleSubmit

    render() {

        let editFriend;
        for (let friend of this.props.redux.friend) {
            if (friend.id === this.props.redux.editId) {
                editFriend = friend;
            }
        }
        console.log('edit friend:', editFriend);

        let submitButton;

        if (this.props.redux.editId) {
            submitButton = <button type="submit">update friend</button>
        } else {
            submitButton = <button type="submit">add friend</button>
        }

        return (
            <div>
                <h3>add / edit friend</h3>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.first_name} type="text" placeholder="first name" onChange={this.handleInputChangeFor('first_name')} />
                    <input type="text" placeholder="last name" onChange={this.handleInputChangeFor('last_name')} />
                    <input type="text" placeholder="email address" onChange={this.handleInputChangeFor('email')} />
                    <input type="text" placeholder="sms number" onChange={this.handleInputChangeFor('sms')} />
                    <input type="text" placeholder="url" onChange={this.handleInputChangeFor('url')} />
                    <select onChange={this.handleInputChangeFor('pref')}>
                        <option value="email">email</option>
                        <option value="sms">sms</option>
                        <option value="url">url</option>
                    </select>
                    <select onChange={this.handleInputChangeFor('frequency')}>
                        <option value={1}>weekly</option>
                        <option value={2}>bi-weekly</option>
                    </select>
                    <input type="date" placeholder="last date of contact" onChange={this.handleInputChangeFor('last_date')} />
                    <select onChange={this.handleInputChangeFor('last_type')}>
                        <option value="email">email</option>
                        <option value="sms">sms</option>
                        <option value="url">url</option>
                    </select>
                    <br />
                    {submitButton}
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
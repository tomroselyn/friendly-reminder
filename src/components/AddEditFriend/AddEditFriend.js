import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddEditFriend extends Component {

    state = {
        first_name: '',
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
        this.props.dispatch({type: 'ADD_FRIEND', payload: this.state})
    } //end handleSubmit

    render() {

        return (
            <div>
                <h3>add / edit friend</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="first name" onChange={this.handleInputChangeFor('first_name')} />
                    <input type="text" placeholder="last name" onChange={this.handleInputChangeFor('last_name')} />
                    <input type="text" placeholder="email address" onChange={this.handleInputChangeFor('email')} />
                    <input type="text" placeholder="phone number" onChange={this.handleInputChangeFor('sms')} />
                    <input type="text" placeholder="facebook profile url" onChange={this.handleInputChangeFor('facebook')} />
                    <select onChange={this.handleInputChangeFor('pref')}>
                        <option value="email">email</option>
                        <option value="sms">sms</option>
                        <option value="facebook">facebook</option>
                    </select>
                    <select onChange={this.handleInputChangeFor('frequency')}>
                        <option value="1">weekly</option>
                    </select>
                    <input type="date" placeholder="last date of contact" onChange={this.handleInputChangeFor('last_date')} />
                    <select onChange={this.handleInputChangeFor('last_type')}>
                        <option value="email">email</option>
                        <option value="sms">sms</option>
                        <option value="facebook">facebook</option>
                    </select>
                    <br />
                    <button type="submit">add to contacts</button>
                </form>
            </div>
        )
    }
}

export default connect()(AddEditFriend);
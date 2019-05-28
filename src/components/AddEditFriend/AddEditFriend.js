import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddEditFriend extends Component {

    state = {
        first_name: '',
        last_name: '',
        email_address: '',
        phone_number: '',
        facebook_url: '',
        preferred_contact_type: '',
        contact_frequency: '',
        last_contact_type: '',
        last_contact_date: '',
        user_id: 'this should be the id of the logged in user'
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
                    <input type="text" placeholder="email address" onChange={this.handleInputChangeFor('email_address')} />
                    <input type="text" placeholder="phone number" onChange={this.handleInputChangeFor('phone_number')} />
                    <input type="text" placeholder="facebook profile url" onChange={this.handleInputChangeFor('facebook_url')} />
                    <select onChange={this.handleInputChangeFor('preferred_contact_type')}>
                        <option>preferred contact method</option>
                    </select>
                    <select onChange={this.handleInputChangeFor('contact_frequency')}>
                        <option>contact frequency</option>
                    </select>
                    <input type="date" placeholder="last date of contact" onChange={this.handleInputChangeFor('last_contact_date')} />
                    <select onChange={this.handleInputChangeFor('last_contact_type')}>
                        <option>last contact method</option>
                    </select>
                    <br />
                    <button type="submit">add to contacts</button>
                </form>
            </div>
        )
    }
}

export default connect()(AddEditFriend);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Grid } from '@material-ui/core';
import swal from 'sweetalert';

class SmsForm extends Component {

    state = {
        message: '',
        friend: this.props.redux.editFriend || {}
    } //end state

    componentWillUnmount = () => {
        this.props.dispatch({ type: 'CLEAR_EDIT_FRIEND' });
    }

    handleInputChangeFor = propertyName => event => {
        this.setState({
            [propertyName]: event.target.value,
        });
    } //end handleInputChangeFor

    handleSubmit = event => {
        event.preventDefault();

        //sweet alert requiring confirmation
        swal({
            title: `ready to send?`,
            text: `sending sms to: ${this.props.redux.editFriend.sms || '(no phone number)'}`,
            icon: "warning",
            buttons: ["oops, not yet", "yep, send it!"]
        })
            .then((willConfirm) => {
                if (willConfirm) {
                    this.props.dispatch({type: 'SEND_SMS', payload: this.state});
                    this.props.history.push('dashboard');
                }
            });
    } //end handleSubmit

    render() {

        // console.log('current friend:', this.state.friend);

        return (
            <form id="smsForm" onSubmit={this.handleSubmit}>
                <div>
                    <h2>send a text message</h2>
                </div>
                <Grid container id="addressInfo" spacing={2}>
                    <Grid item xs={12}>
                        <h4>To: {this.state.friend.first_name} {this.state.friend.last_name} ({this.state.friend.sms})</h4>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            className="textField"
                            value={this.state.message}
                            type="text"
                            label="message"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleInputChangeFor('message')} />
                    </Grid>
                </Grid>
                <div id="buttonArea">
                    <Button className="form-button" type="submit" variant="contained" color="primary">send</Button>
                </div>
            </form>
        )
    } //end render
}

const mapRedux = (redux) => {
    return { redux }
}

export default connect(mapRedux)(SmsForm);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { TextField, Button, Grid } from '@material-ui/core';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: ''
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.first_name && this.state.last_name) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name
        }
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>

        {/* error messages */}
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}

        {/* registration form */}
        <form onSubmit={this.registerUser}>
          <h1>register</h1>

          <TextField
            required
            autoFocus
            className="textField"
            value={this.state.first_name}
            type="text"
            label="first name"
            variant="outlined"
            margin="normal"
            onChange={this.handleInputChangeFor('first_name')} />

          <TextField
            required
            className="textField"
            value={this.state.last_name}
            type="text"
            label="last name"
            variant="outlined"
            margin="normal"
            onChange={this.handleInputChangeFor('last_name')} />

          <TextField
            required
            className="textField"
            value={this.state.username}
            type="text"
            label="email address"
            variant="outlined"
            margin="normal"
            onChange={this.handleInputChangeFor('username')} />

          <TextField
            required
            className="textField"
            value={this.state.password}
            type="password"
            label="password"
            variant="outlined"
            margin="normal"
            onChange={this.handleInputChangeFor('password')} />

          <Button className="register" type="submit" variant="contained" color="primary">
            register
          </Button>

        </form>
        
        <center>
          <Button
            color="primary"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }} >
            or, log in
          </Button>
        </center>

      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);


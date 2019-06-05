import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Grid } from '@material-ui/core';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>

        {/* error messages */}
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}

          {/* log in form */}
        <form onSubmit={this.login}>
          <h1>log in</h1>

          <TextField
            required
            autoFocus
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

          <Button type="submit" variant="contained" color="primary">
            log in
          </Button>

        </form>

        <center>
          <Button
            color="primary"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}} >
            or, register as new user
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

export default connect(mapStateToProps)(LoginPage);

import React from 'react';
import { connect } from 'react-redux';

const AccountInfo = (props) => (
    <div id="account-page">
        <h2>account info</h2>
        <p>Hello, {props.user.first_name} {props.user.last_name}!</p>
        <p>Your email address is: {props.user.username}</p>
        <p>Your user ID is: {props.user.id}</p>
    </div>
);

//user info
const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(AccountInfo);

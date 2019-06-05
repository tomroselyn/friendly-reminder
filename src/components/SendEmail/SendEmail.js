import React, { Component } from 'react';
import { connect } from 'react-redux';

//component no longer used...

class SendEmail extends Component {
    render() {
        return (
            <div>
                <h3>send email</h3>
                <form>
                    <p>from: yourname@example.com</p>
                    <p>to: theirname@example.com</p>
                    <input type="text" placeholder="subject line" />
                    <input type="text" placeholder="message" />
                    <br />
                    <button onClick={() => console.log('hello')}>send</button>
                </form>
            </div>
        )
    }
}

export default connect()(SendEmail);
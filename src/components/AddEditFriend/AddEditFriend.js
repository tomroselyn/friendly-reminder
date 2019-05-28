import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddEditFriend extends Component {
    render() {
        return (
            <div>
                <h3>add / edit friend</h3>
                <form>
                    <input type="text" placeholder="first name"/>
                    <input type="text" placeholder="last name" />
                    <input type="text" placeholder="email address" />
                    <input type="text" placeholder="phone number" />
                    <input type="text" placeholder="facebook profile url" />
                    <select>
                        <option>preferred contact method</option>
                    </select>
                    <select>
                        <option>contact frequency</option>
                    </select>
                    <input type="date" placeholder="last date of contact" />
                    <select>
                        <option>last contact method</option>
                    </select>
                    <br />
                    <button onClick={() => console.log('hello')}>add to contacts</button>
                </form>
            </div>
        )
    }
}

export default connect()(AddEditFriend);
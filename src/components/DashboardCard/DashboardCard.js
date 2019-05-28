import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardCard extends Component {
    render() {
        return (
            <div>
                <p>CONTACT NAME</p>
                <p>DUE IN 2 DAYS</p>
                <p>SEND EMAIL</p>
                <p>MARK COMPLETE</p>
                <p>EXTRA DAY</p>
            </div>
        )
    }
}

export default connect()(DashboardCard);
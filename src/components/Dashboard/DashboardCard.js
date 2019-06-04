import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardCard extends Component {
    render() {
        return (
            <div>
                <p>{this.props.info.first_name}</p>
            </div>
        )
    }
}

export default connect()(DashboardCard);
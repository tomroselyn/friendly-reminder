import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardStats extends Component {
    render() {
        return (
            <div>
                <div>
                    <p>VISUALIZATION AREA</p>
                </div>
                <div>
                    <p>STATS BREAKDOWN AREA</p>
                </div>
            </div>
        )
    }
}

export default connect()(DashboardStats);
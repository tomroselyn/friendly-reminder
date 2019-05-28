import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardCard from '../DashboardCard/DashboardCard';

class DashboardCarousel extends Component {
    render() {
        return (
            <div>
                <DashboardCard />
            </div>
        )
    }
}

export default connect()(DashboardCarousel);
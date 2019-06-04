import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardStats from './DashboardStats';
import DashboardCardList from './DashboardCardList';
import './Dashboard.css';

class Dashboard extends Component {

    render() {

        return (
            <div className="dashboardContainer">
                <DashboardStats />
                <DashboardCardList />
            </div>
        )
    }
}

const mapRedux = redux => {
    return {redux}
}

export default connect(mapRedux)(Dashboard);
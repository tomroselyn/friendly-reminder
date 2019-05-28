import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardStats from '../DashboardStats/DashboardStats';
import DashboardCarousel from '../DashboardCarousel/DashboardCarousel';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div>
                    <h3>overview</h3>
                    <DashboardStats />
                </div>
                <div>
                    <h3>due for contact</h3>
                    <DashboardCarousel />
                </div>
                <button onClick={()=> console.log('hello')}>view all friends</button>
            </div>
        )
    }
}

export default connect()(Dashboard);
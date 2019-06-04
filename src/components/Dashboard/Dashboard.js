import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardStats from '../DashboardStats/DashboardStats';
import DashboardCarousel from '../DashboardCarousel/DashboardCarousel';

class Dashboard extends Component {

    render() {

        console.log('dashboard render:', this.props.redux.friend);

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
                <button onClick={() => this.props.history.push('/all-friends')}>view all friends</button>
            </div>
        )
    }
}

const mapRedux = redux => {
    return {redux}
}

export default connect(mapRedux)(Dashboard);
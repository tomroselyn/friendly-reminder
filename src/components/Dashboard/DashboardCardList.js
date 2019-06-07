import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardCard from './DashboardCard';
import {Grid} from '@material-ui/core';
import './Dashboard.css';

class DashboardCardList extends Component {
    render() {

        //set up cards for friends due today
        const dueNow = this.props.redux.dueNow.map(friend => {
            return <DashboardCard key={friend.id} friend={friend} due="now"/>
        })

        //set up cards for friends overdue
        const overdue = this.props.redux.overdue.map(friend => {
            return <DashboardCard key={friend.id} friend={friend} due="over" />
        })

        return (
            <div>
                <h2 className="card-header">due today</h2>
                <h4 className="dashboard-message">these friends are scheduled for contact today</h4>
                {this.props.redux.dueNow.length ? <Grid container spacing={4} className="cardContainer">
                    {dueNow}
                </Grid> : <p>(...nobody here!)</p>}
                <h2 className="card-header">overdue</h2>
                <h4 className="dashboard-message">uh oh! these friends are overdue for contact ... better take action</h4>
                {this.props.redux.overdue.length ? <Grid container spacing={4} className="cardContainer">
                    {overdue}
                </Grid> : <p>(...nobody here!)</p>}
            </div>
        )
    }
}

const mapRedux = redux => {
    return {redux}
}

export default connect(mapRedux)(DashboardCardList);
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
                <Grid container spacing={4} className="cardContainer">
                    {dueNow}
                </Grid>
                <h2 className="card-header">overdue</h2>
                <Grid container spacing={4} className="cardContainer">
                    {overdue}
                </Grid>
            </div>
        )
    }
}

const mapRedux = redux => {
    return {redux}
}

export default connect(mapRedux)(DashboardCardList);
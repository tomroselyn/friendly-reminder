import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieChart from 'react-minimal-pie-chart';
import {Grid} from '@material-ui/core';
import './Dashboard.css';

class DashboardStats extends Component {
            
    render() {
        //pie chart shows number of friends in each category: on time, due now, and overdue
        //stats contains a breakdown of relevant information
        let pieChart = <p>(pie chart)</p>;
        let stats = <p>(stats breakdown)</p>
        
        //only render these if there are friends in redux to display info about
        if (this.props.redux.friend.length) {

            //set up data variables for convenience
            let upToDate = (this.props.redux.friend.length - (this.props.redux.dueNow.length + this.props.redux.overdue.length));
            let dueToday = this.props.redux.dueNow.length;
            let overDue = this.props.redux.overdue.length;
            let upToDatePct = Math.ceil(100 * (this.props.redux.friend.length - this.props.redux.overdue.length) / this.props.redux.friend.length);

            //set up conditionally rendered success message
            let successMessage = 'keep up the good work!';
            if (upToDatePct === 100) {
                successMessage = 'OMG awesome!';
            } else if (upToDatePct >= 80) {
                successMessage = 'way to go!';
            }

            //set up pie chart
            pieChart = <PieChart
                data={[
                    { title: 'on time', value: upToDate, color: 'darkgreen' },
                    { title: 'due now', value: dueToday, color: 'darkorange' },
                    { title: 'overdue', value: overDue, color: 'darkred' },
                ]}
                style={{ height: '333px' }}
                lineWidth={66}
                paddingAngle={15}
                animate
                animationDuration={2000}
                startAngle={22}
                label
                labelPosition={66}
                labelStyle={{
                    fill: 'white',
                    fontSize: '5px',
                    fontWeight: 'bold'
                }}
            />

            //set up stats
            stats = (
                <div className="statsContainer">
                    <h4>{upToDatePct}% on time ... {successMessage}</h4>
                    <p>up to date: {upToDate}</p>
                    <p>due today: {dueToday}</p>
                    <p>overdue: {overDue}</p>
                </div>
            );

        } //end conditionals

        return (
            <div>
                <h2>overview</h2>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {pieChart}
                    </Grid>
                    <Grid item xs={6}>
                        {stats}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapRedux = redux => {
    return {redux}
}

export default connect(mapRedux)(DashboardStats);
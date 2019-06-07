import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieChart from 'react-minimal-pie-chart';
import {Grid} from '@material-ui/core';
import './Dashboard.css';

class DashboardStats extends Component {
            
    render() {
        //pie chart shows number of friends in each category: on time, due now, and overdue
        //stats contains a breakdown of relevant information
        let intro = <p>(you are doing great!)</p>
        let bigPieChart = <p>(pie chart)</p>;
        let stats = <p>(stats breakdown)</p>;
        // let successMessage = <p>(success message)</p>;
        
        //only render these if there are friends in redux to display info about
        if (this.props.redux.friend.length) {

            //set up data variables for convenience
            let upToDate = (this.props.redux.friend.length - (this.props.redux.dueNow.length + this.props.redux.overdue.length));
            let dueToday = this.props.redux.dueNow.length;
            let overDue = this.props.redux.overdue.length;
            let upToDatePct = Math.ceil(100 * (this.props.redux.friend.length - this.props.redux.overdue.length) / this.props.redux.friend.length);

            //set up conditionally rendered success message
            let successMessage = 'keep it up!';
            if (upToDatePct === 100) {
                successMessage = 'truly awesome!';
            } else if (upToDatePct >= 80) {
                successMessage = 'way to go!';
            }

            //set up pie chart
            bigPieChart = <PieChart
                data={[
                    { title: 'on time', value: upToDate, color: '#2e7d32' },
                    { title: 'due today', value: dueToday, color: '#0277bd' },
                    { title: 'overdue', value: overDue, color: '#8e0000' },
                ]}
                style={{ height: '380px' }}
                lineWidth={66}
                paddingAngle={15}
                animate
                animationDuration={5000}
                startAngle={22}
            />

            //set up pie chart for up to date contacts
            let pieChartUpToDate = <PieChart
                data={[
                    { title: 'on time', value: upToDate, color: '#2e7d32' }
                ]}
                style={{ height: '100px' }}
                lineWidth={33}
                animate
                animationDuration={4000}
                startAngle={44}
                label
                labelPosition={0}
                labelStyle={{
                    fill: 'black',
                    fontSize: '18px',
                    fontWeight: 'bold'}}
            />

            //set up pie chart for contacts due today
            let pieChartDueToday = <PieChart
                data={[
                    { title: 'due today', value: dueToday, color: '#0277bd' }
                ]}
                style={{ height: '100px' }}
                lineWidth={33}
                animate
                animationDuration={3000}
                startAngle={44}
                label
                labelPosition={0}
                labelStyle={{
                    fill: 'black',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }}
            />

            //set up pie chart for up to date contacts
            let pieChartOverDue = <PieChart
                data={[
                    { title: 'overdue', value: overDue, color: '#8e0000' }
                ]}
                style={{ height: '100px' }}
                lineWidth={33}
                animate
                animationDuration={2000}
                startAngle={44}
                label
                labelPosition={0}
                labelStyle={{
                    fill: 'black',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }}
            />

            //set up stats
            stats = (
                <Grid container className="statsContainer" spacing={2}>
                    <Grid item xs={12}>up to date</Grid>
                    <Grid item xs={12}>{pieChartUpToDate}</Grid>
                    <Grid item xs={6}>due today</Grid>
                    <Grid item xs={6}>overdue</Grid>
                    <Grid item xs={6}>{pieChartDueToday}</Grid>
                    <Grid item xs={6}>{pieChartOverDue}</Grid>
                </Grid>
            );

            //set up success message
            intro = (
                <Grid container className="successContainer" spacing={2}>
                    <Grid item xs={12}>
                        <h4 id="success-message">{upToDatePct}% of contacts made on time or due today ...  {successMessage}</h4>
                    </Grid>
                </Grid>
            );

        } //end conditionals

        return (
            <div>
                <h2>overview</h2>
                <Grid container spacing={2}>
                    <Grid item xs={12}>{intro}</Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3}>{bigPieChart}</Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>{stats}</Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </div>
        )
    }
}

const mapRedux = redux => {
    return {redux}
}

export default connect(mapRedux)(DashboardStats);
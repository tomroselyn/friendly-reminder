import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieChart from 'react-minimal-pie-chart';
import {Grid} from '@material-ui/core';
import './Dashboard.css';

class DashboardStats extends Component {
            
    render() {


        //pie chart shows number of friends in each category: on time, due now, and overdue
        //stats contains a breakdown of relevant information
        let pieChart = <p>pie chart</p>;
        let stats = <p>stats breakdown</p>
        
        //only render it if there are friends in redux to display info about
        if (this.props.redux.friend.length) {
            pieChart = <PieChart
                data={[
                    { title: 'on time', value: (this.props.redux.friend.length - (this.props.redux.dueNow.length + this.props.redux.overdue.length)), color: 'darkgreen' },
                    { title: 'due now', value: this.props.redux.dueNow.length, color: 'darkorange' },
                    { title: 'overdue', value: this.props.redux.overdue.length, color: 'darkred' },
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
            stats = (
                <div className="statsContainer">
                    {/* calculate percent of friends on time */}
                    <h4>{Math.ceil(100 * (this.props.redux.friend.length - this.props.redux.overdue.length) / this.props.redux.friend.length)}% on time ... way to go!</h4>
                    <p>up to date: {this.props.redux.friend.length - (this.props.redux.dueNow.length + this.props.redux.overdue.length)}</p>
                    <p>due today: {this.props.redux.dueNow.length}</p>
                    <p>overdue: {this.props.redux.overdue.length}</p>
                </div>
            );
        }



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
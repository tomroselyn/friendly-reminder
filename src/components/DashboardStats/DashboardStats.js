import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieChart from 'react-minimal-pie-chart';
import {Grid} from '@material-ui/core';

class DashboardStats extends Component {

    state = {
        onTime: this.props.redux.friend.length - (this.props.redux.dueNow.length + this.props.redux.overdue.length),
        dueNow: this.props.redux.dueNow.length,
        overDue: this.props.redux.overdue.length
    }
            
    render() {

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {/* pie chart shows number of friends in each category: on time, due now, and overdue */}
                        <PieChart
                            data={[
                                { title: 'on time', value: this.state.onTime, color: 'darkgreen' },
                                { title: 'due now', value: this.state.dueNow, color: 'darkorange' },
                                { title: 'overdue', value: this.state.overDue, color: 'darkred' },
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
                    </Grid>
                    <Grid item xs={6}>
                        <h4>75% up-to-date ... way to go!</h4>
                        <p>Hello world</p>
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
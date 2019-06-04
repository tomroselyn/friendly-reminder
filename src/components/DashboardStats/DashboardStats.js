import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieChart from 'react-minimal-pie-chart';
import {Grid} from '@material-ui/core';

class DashboardStats extends Component {
            
    render() {

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <PieChart
                            data={[
                                { title: 'on time', value: 15, color: 'darkgreen' },
                                { title: 'due now', value: 3, color: 'darkorange' },
                                { title: 'overdue', value: 2, color: 'darkred' },
                            ]}
                            style={{ height: '400px' }}
                            lineWidth={66}
                            paddingAngle={15}
                            animate
                            animationDuration={2000}
                            startAngle={22}
                            label
                            labelPosition={66}
                            labelStyle={{ color: 'white' }}
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
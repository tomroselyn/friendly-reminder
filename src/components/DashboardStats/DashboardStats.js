import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieChart from 'react-minimal-pie-chart';
import {Grid} from '@material-ui/core';

class DashboardStats extends Component {

    state = {
        onTime: 8,
        dueNow: 3,
        overDue: 1
    }

    // componentDidMount = () => {
    //     for (let friend of this.props.redux.friend) {
    //         let friendDueDate = new Date(friend.due_date)
    //         // console.log(friendDueDate);
    //         if (friendDueDate.getTime() > this.state.today.getTime()) {
    //             this.setState({
    //                 ...this.state,
    //                 onTime: this.state.dueNow + 1
    //             })
    //         } else if (friendDueDate.getTime() === this.state.today.getTime()) {
    //             this.setState({
    //                 ...this.state,
    //                 dueNow: this.state.dueNow + 1
    //             })
    //         } else if (friendDueDate.getTime() > this.state.today.getTime()) {
    //             this.setState({
    //                 ...this.state,
    //                 overDue: this.state.dueNow + 1
    //             })
    //         }
    //     } //end for loop
    // }
            
    render() {

        // console.log(this.props.redux.friend);
        // console.log(this.state)

        // let testData = [
        //     { title: 'on time', value: 0, color: 'darkgreen' },
        //     { title: 'due now', value: 0, color: 'darkorange' },
        //     { title: 'overdue', value: 0, color: 'darkred' }
        // ];

        // this.props.redux.friend.map(friend => {
        //     let friendDueDate = new Date(friend.due_date);
        //     if (friendDueDate > this.state.today) {
        //         testData[0].value++;
        //     }
        //     return friend;
        // })

        // console.log('testData:', testData);

        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <PieChart
                            data={[
                                { title: 'on time', value: this.state.onTime, color: 'darkgreen' },
                                { title: 'due now', value: this.state.dueNow, color: 'darkorange' },
                                { title: 'overdue', value: this.state.overDue, color: 'darkred' },
                            ]}
                            style={{ height: '400px' }}
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
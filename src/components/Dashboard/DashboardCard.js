import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Card, CardContent, CardActions} from '@material-ui/core';
import { AccessTime, Warning } from '@material-ui/icons';
import EmailButton from '../Buttons/EmailButton';
import SmsButton from '../Buttons/SmsButton';
import UrlButton from '../Buttons/UrlButton';
import ExtraDayButton from '../Buttons/ExtraDayButton';
import './Dashboard.css';

class DashboardCard extends Component {
    render() {
        return (
            <Grid item xs={3}>
                <Card className="dashboardCard">
                    <CardContent>
                        <h4>{this.props.friend.first_name} {this.props.friend.last_name}</h4>
                        <div className={`${this.props.due}Box`}>
                            {this.props.due === 'now' && <AccessTime className="cardIcon" />}
                            {this.props.due === 'over' && <Warning className="cardIcon" />}
                            <br />due<br /><span className="card-date">{this.props.friend.due_date.substr(0, 10)}</span>
                        </div>
                        <div>
                            last contacted <br />
                            <span className="card-date">{this.props.friend.last_date.substr(0, 10)}</span>
                            <br />via {this.props.friend.last_type}
                        </div>
                    </CardContent>
                    <CardActions className="cardActions" alignItems="center">
                        {this.props.friend.pref === 'email' && <EmailButton friend={this.props.friend} />}
                        {this.props.friend.pref === 'sms' && <SmsButton friend={this.props.friend} />}
                        {this.props.friend.pref === 'url' && <UrlButton friend={this.props.friend} />}
                        <ExtraDayButton friend={this.props.friend} />
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default connect()(DashboardCard);
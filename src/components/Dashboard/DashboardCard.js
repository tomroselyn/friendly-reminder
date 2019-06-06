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
                        <div>
                            {this.props.friend.first_name} {this.props.friend.last_name}
                        </div>
                        <div className={`${this.props.due}Box`}>
                            {this.props.due === 'now' && <AccessTime className="cardIcon" />}
                            {this.props.due === 'over' && <Warning className="cardIcon" />}
                            <br />due {this.props.friend.due_date.substr(0, 10)}
                        </div>
                        <div>
                            last contacted <br />{this.props.friend.last_date.substr(0,10)}
                            <br />via {this.props.friend.last_type}
                        </div>
                    </CardContent>
                    <CardActions className="cardActions">
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
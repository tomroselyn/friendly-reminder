import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Card, CardContent, CardActions, Typography} from '@material-ui/core';
import EmailButton from '../Buttons/EmailButton';
import SmsButton from '../Buttons/SmsButton';
import UrlButton from '../Buttons/UrlButton';
import ExtraDayButton from '../Buttons/ExtraDayButton';
import './Dashboard.css';

class DashboardCard extends Component {
    render() {
        return (
            <Grid item xs={3}>
                <Card className={`${this.props.due}Card`}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {this.props.friend.first_name} {this.props.friend.last_name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            last contacted <br />{this.props.friend.last_date.substr(0,10)}
                        </Typography>
                        <Typography color="textSecondary">
                            via {this.props.friend.last_type}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <EmailButton friend={this.props.friend} />
                        <SmsButton friend={this.props.friend} />
                        <UrlButton friend={this.props.friend} />
                        <ExtraDayButton friend={this.props.friend} />
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default connect()(DashboardCard);
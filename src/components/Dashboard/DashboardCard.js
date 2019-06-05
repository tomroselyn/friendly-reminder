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
                            {this.props.info.first_name} {this.props.info.last_name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            last contacted <br />{this.props.info.last_date.substr(0,10)}
                        </Typography>
                        <Typography color="textSecondary">
                            via {this.props.info.last_type}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <EmailButton friendToEmail={this.props.info} />
                        <SmsButton friendToText={this.props.info} />
                        <UrlButton friendToContact={this.props.info} />
                        <ExtraDayButton friendToDelay={this.props.info} />
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default connect()(DashboardCard);
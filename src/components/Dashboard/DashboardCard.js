import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Card, CardContent, CardActions, Button, Typography} from '@material-ui/core';

class DashboardCard extends Component {
    render() {
        return (
            <Grid item xs={3}>
                <Card>
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
                        <Button size="small">Do something</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default connect()(DashboardCard);
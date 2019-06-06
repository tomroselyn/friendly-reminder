import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton} from '@material-ui/core/';
import {Input, Dashboard, People, PersonAdd, Settings, RemoveCircle, Info, Menu} from '@material-ui/icons/';
import './Nav.css';

const useStyles = makeStyles({
  list: {
    width: 333,
  }
});

const NavMenu = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      {/* list of navigation menu items */}
      <List>
        {/* if user is logged in, render dashboard
        otherwise, render login / register */}
        <ListItem button onClick={() => props.history.push('/dashboard')}>
          <ListItemIcon>{props.user.id ? <Dashboard /> : <Input /> }</ListItemIcon>
          <ListItemText primary={props.user.id ? 'dashboard' : 'login / register'} />
        </ListItem>
        {/* only show these if the user is logged in */}
        {props.user.id && (
          <>
            <ListItem button onClick={() => props.history.push('/all-friends')}>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="all friends" />
            </ListItem>
            <ListItem button onClick={() => props.history.push('/add-edit-friend')}>
              <ListItemIcon><PersonAdd /></ListItemIcon>
              <ListItemText primary="add new friend" />
            </ListItem>
            <ListItem button onClick={() => props.history.push('/account')}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary="account" />
            </ListItem>
            <ListItem button onClick={() => props.dispatch({ type: 'LOGOUT' })}>
              <ListItemIcon><RemoveCircle /></ListItemIcon>
              <ListItemText primary="log out" />
            </ListItem>
          </>
        )}
        {/* always show a link to the about page */}
        <ListItem button onClick={() => props.history.push('/about')}>
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary="about" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton className="nav-menu-button" onClick={toggleDrawer('left', true)}>
        <Menu className="nav-menu-icon" />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

const mapRedux = redux => ({
  user: redux.user,
});

export default withRouter(connect(mapRedux)(NavMenu));
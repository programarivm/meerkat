import { AppBar, Button, ButtonGroup, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Can from '../Can';
import { Link, NavLink, Route } from 'react-router-dom';
import MyAccountMenu from './MyAccountMenu';
import React from 'react';
import Restaurants from './Restaurants';
import Reviews from '../common/Reviews';
import SignOut from './SignOut';
import Users from './Users';
import logo from '../../../images/logo.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuOption: {
    marginRight: theme.spacing(5),
    color: '#fff',
    '&:hover': {
       color: '#fff',
    },
  },
  menuOptionActive: {
    fontWeight: 'bold',
  },
  buttonGroup: {
    backgroundColor: '#fff',
    marginLeft: 'auto',
  },
});

class MainNav extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <img src={logo} alt="Warthog logo" className={classes.menuOption} />
            <NavLink
              tag={NavLink}
              to="/reviews"
              className={classes.menuOption}
              activeClassName={classes.menuOptionActive}
            >
              Reviews
            </NavLink>
            <Can I="index" a="User">
              <NavLink
                tag={NavLink}
                to="/users"
                className={classes.menuOption}
                activeClassName={classes.menuOptionActive}
              >
                Users
              </NavLink>
            </Can>
            <Can I="update" a="Restaurant">
              <NavLink
                tag={NavLink}
                to="/restaurants"
                className={classes.menuOption}
                activeClassName={classes.menuOptionActive}
              >
                Restaurants
              </NavLink>
            </Can>
            <ButtonGroup size="small" aria-label="small outlined button group" className={classes.buttonGroup}>
              <MyAccountMenu />
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        <Route
          path="/reviews"
          render={(props) => <Reviews {...props} />}
        />
        <Route
          path="/users"
          render={(props) => <Users {...props} />}
        />
        <Route
          path="/restaurants"
          render={(props) => <Restaurants {...props} />}
        />
        <Route
          path="/logout"
          render={(props) => <SignOut {...props} />}
        />
      </div>
    );
  }
}

export default withStyles(styles)(MainNav);

import { AppBar, Button, ButtonGroup, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Home } from './Home';
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Reviews from '../common/Reviews';
import SignIn from './SignIn';
import logo from '../../../images/logo.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuOption: {
    textDecoration: 'none',
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
            <NavLink
              tag={Link}
              to="/home"
              className={classes.menuOption}
            >
              <img src={logo} alt="Warthog logo" />
            </NavLink>
            <NavLink
              tag={Link}
              to="/home"
              className={classes.menuOption}
              activeClassName={classes.menuOptionActive}
            >
              Home
            </NavLink>
            <NavLink
              tag={Link}
              to="/reviews"
              className={classes.menuOption}
              activeClassName={classes.menuOptionActive}
            >
              Reviews
            </NavLink>
            <ButtonGroup
              size="small"
              aria-label="small outlined button group"
              className={classes.buttonGroup}
            >
              <Button>
                <NavLink tag={Link} to="/login">
                  Sign in
                </NavLink>
              </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
        <Route
          path="/home"
          render={(props) => <Home {...props} />}
        />
        <Route
          path="/reviews"
          render={(props) => <Reviews {...props} />}
        />
        <Route
          path="/login"
          render={(props) => <SignIn {...props} />}
        />
      </div>
    );
  }
}

export default withStyles(styles)(MainNav);

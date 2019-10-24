import React from 'react';
import {
  Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem,
  NavLink } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import { ReviewIndex } from "../common/review/Index.js";
import { Users } from "./Users.js";
import { Restaurants } from "./Restaurants.js";
import { SignOut } from "./SignOut.js";
import AuthStore from '../../stores/api/AuthStore.js';
import logo from '../../../images/logo.png';
import './MainNav.css';

class MainNav extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggle() {
    if (this._isMounted) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar light expand="md" className="MainNav">
          <NavbarBrand tag={Link} to="/reviews">
            <img src={logo} className="logo" alt="logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/reviews">
                  Reviews
                </NavLink>
              </NavItem>
              {
                AuthStore.getState().role !== 'ROLE_BASIC'
                  ? <NavItem>
                      <NavLink tag={Link} to="/users">
                        Users
                      </NavLink>
                    </NavItem>
                  : null
              }
              {
                AuthStore.getState().role !== 'ROLE_BASIC'
                  ? <NavItem>
                      <NavLink tag={Link} to="/restaurants">
                        Restaurants
                      </NavLink>
                    </NavItem>
                  : null
              }
              <NavItem>
                <NavLink tag={Link} to="/logout">
                  Sign out
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Route
          path="/reviews"
          render={(props) => <ReviewIndex {...props} />}
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

export { MainNav };

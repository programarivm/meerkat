import React from 'react';
import {
  Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem,
  NavLink } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import { Dashboard } from "./Dashboard.js";
import { Users } from "./Users.js";
import { SignOut } from "./SignOut.js";
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
          <NavbarBrand tag={Link} to="/dashboard">
            <img src={logo} className="logo" alt="logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/dashboard">
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/users">
                  Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/logout">
                  Sign out
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Route
          path="/dashboard"
          render={(props) => <Dashboard {...props} />}
        />
        <Route
          path="/users"
          render={(props) => <Users {...props} />}
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

import ApiAuthStore from '../../stores/api/AuthStore.js';
import {
  Collapse, Nav, Navbar, NavbarToggler,
  NavbarBrand, NavItem } from 'reactstrap';
import { Link, NavLink, Route } from 'react-router-dom';
import React from 'react';
import { Restaurants } from "./Restaurants.js";
import { Reviews } from "../common/Reviews.js";
import { SignOut } from "./SignOut.js";
import { Users } from "./Users.js";
import logo from '../../../images/logo.png';
import '../common/MainNav.css';

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
                <NavLink tag={Link} to="/reviews" activeClassName="active">Reviews</NavLink>
              </NavItem>
              {
                ApiAuthStore.getState().role !== 'ROLE_BASIC'
                  ? <NavItem>
                      <NavLink tag={Link} to="/users" activeClassName="active">Users</NavLink>
                    </NavItem>
                  : null
              }
              {
                ApiAuthStore.getState().role !== 'ROLE_BASIC'
                  ? <NavItem>
                      <NavLink tag={Link} to="/restaurants" activeClassName="active">Restaurants</NavLink>
                    </NavItem>
                  : null
              }
              <NavItem>
                <NavLink tag={Link} to="/logout" activeClassName="active">Sign out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
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

export { MainNav };

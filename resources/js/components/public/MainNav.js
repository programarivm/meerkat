import {
  Collapse, Nav, Navbar, NavbarToggler,
  NavbarBrand, NavItem } from 'reactstrap';
import { Home } from "./Home";
import { Link, NavLink, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { Reviews } from '../common/Reviews';
import { SignIn } from './SignIn';
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
          <NavbarBrand tag={Link} to="/home">
            <img src={logo} className="logo" alt="logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/reviews">Reviews</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/login">Sign In</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
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

export { MainNav };

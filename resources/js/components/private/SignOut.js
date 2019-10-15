import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import GlobalActions from '../../actions/GlobalActions.js';

class SignOut extends Component {
  componentDidMount() {
    GlobalActions.logout();
  }

  render() {
    return (
      <Container className="mt-5 mb-5">
        <p>Signing out...</p>
      </Container>
    );
  }
}

export { SignOut };

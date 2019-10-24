import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import ApiAuthActions from '../../actions/api/AuthActions.js';

class SignOut extends Component {
  componentDidMount() {
    ApiAuthActions.logout();
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

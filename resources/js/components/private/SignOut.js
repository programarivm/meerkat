import ApiAuthActions from '../../actions/api/AuthActions.js';
import { Container } from 'reactstrap';
import React from 'react';

class SignOut extends React.Component {
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

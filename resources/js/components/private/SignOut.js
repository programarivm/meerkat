import ability from '../../ability';
import ApiAuthActions from '../../actions/api/AuthActions';
import ApiAuthStore from '../../stores/api/AuthStore';
import { Container } from 'reactstrap';
import React from 'react';

class SignOut extends React.Component {
  componentDidMount() {
    ApiAuthActions.logout();
    ApiAuthStore
    .on("logout.204", () => {
      ability.update([]);
    });
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

import ability from '../../ability';
import ApiAuthActions from '../../actions/api/AuthActions';
import ApiAuthStore from '../../stores/api/AuthStore';
import { Grid } from '@material-ui/core';
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
      <Grid container style={{ margin: 20, padding: 20 }}>
        <p>Signing out...</p>
      </Grid>
    );
  }
}

export default SignOut;

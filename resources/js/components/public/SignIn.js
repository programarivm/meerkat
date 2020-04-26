import ability from '../../ability';
import abilityRules from '../../../../storage/ability-rules.json';
import ApiAuthActions from '../../actions/api/AuthActions';
import ApiAuthStore from '../../stores/api/AuthStore';
import { Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
import Loading from '../Loading';
import React from 'react';
import Session from '../../Session';
import Validation from '../Validation';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      loading: false
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    ApiAuthStore
    .on("login.204", () => {
      ability.update(abilityRules[Session.get().role]);
    })
    .on("login.401", () => {
      this.setState({
        response: ['The username and password that you entered did not match our records. Please try again.'],
        loading: false
      });
    })
    .on("login.error", () => {
      this.setState({
        response: ['Whoops! Something went wrong, please try again.'],
        loading: false
      });
    });
  }

  handleLogin(e) {
    this.setState({
      loading: true
    });
    ApiAuthActions.login({
      email: e.target.email.value,
      password: e.target.password.value
    });
    e.preventDefault();
  }

  render() {
    return (
      <Grid container style={{ margin: 20, padding: 20 }}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Typography component="h1" variant="h5">
            Log in to your account
          </Typography>
          <Loading loading={this.state.loading}>
            <Validation show={true} messages={this.state.response} />
          </Loading>
          <form onSubmit={ (e) => this.handleLogin(e) }>
            <TextField
              required
              fullWidth
              autoFocus
              variant="outlined"
              margin="normal"
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
            >
              Log in
            </Button>
          </form>
          <Divider style={{ margin: 20 }} />
          <p>How to use the demo:</p>
          <ul>
            <li>john@gmail.com as a basic user</li>
            <li>alice@gmail.com as an editor user</li>
            <li>bob@gmail.com as an admin user</li>
          </ul>
          <p>The password for all roles is <code>password</code></p>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    );
  }
}

export default SignIn;

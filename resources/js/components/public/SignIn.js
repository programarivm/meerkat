import ApiAuthActions from '../../actions/api/AuthActions.js';
import ApiAuthStore from '../../stores/api/AuthStore.js';
import {
  Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Row
} from 'reactstrap';
import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        credentials: {
          email: '',
          password: ''
        },
        validation: null
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    ApiAuthStore
    .on("login.401", () => {
      this.setState({validation: 'The username and password that you entered did not match our records. Please try again.'});
    })
    .on("login.error", () => {
      this.setState({validation: 'Whoops! Something went wrong, please try again.'});
    });
  }

  handleChange = event => {
    let credentials = {...this.state.credentials};
    credentials[event.target.id] = event.target.value;
    this.setState({credentials});
  }

  handleLogin(e) {
    ApiAuthActions.login(this.state.credentials);
    e.preventDefault();
  }

  render() {
    return (
      <Container className="SignIn mt-5">
        <Row>
          <Col lg="3"></Col>
          <Col lg="6">
            <Card>
              <CardHeader className="bg-white">
                <h5 className="text-center">Log in to your account</h5>
              </CardHeader>
              <CardBody className="d-flex justify-content-center">
                <Form className="form" onSubmit={ (e) => this.handleLogin(e) }>
                  { this.state.validation !== null ? <p className="text-danger">{this.state.validation}</p> : null }
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email address"
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <Button color="primary" block>Log in</Button>
                </Form>
              </CardBody>
              <CardFooter className="text-muted">
                <p>How to use the demo:</p>
                <ul>
                  <li>john@gmail.com as a basic user</li>
                  <li>alice@gmail.com as an editor user</li>
                  <li>bob@gmail.com as an admin user</li>
                </ul>
                <p>The password for all roles is password</p>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3"></Col>
        </Row>
      </Container>
    );
  }
}

export { SignIn };

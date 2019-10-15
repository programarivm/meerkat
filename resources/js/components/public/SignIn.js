import React, { Component } from 'react';
import {
  Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Row
} from 'reactstrap';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
      this.state = {
        'credentials': {
          'email': '',
          'password': ''
        },
        'validation': null
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    // TODO ...
  }

  handleChange = event => {
    let credentials = {...this.state.credentials};
    credentials[event.target.id] = event.target.value;
    this.setState({credentials});
  }

  handleLogin(e) {
    // TODO ...
    e.preventDefault();
  }

  render() {
    return (
      <Container className="SignIn mt-5">
        <Row>
          <Col lg="3"></Col>
          <Col lg="6">
            <Card>
              <CardBody>
                <p className="text-center"><b>Log in to your account</b></p>
                <p className="text-danger">{this.state.validation}</p>
                <Form className="form" onSubmit={ (e) => this.handleLogin(e) }>
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
            </Card>
          </Col>
          <Col lg="3"></Col>
        </Row>
      </Container>
    );
  }
}

export { SignIn };

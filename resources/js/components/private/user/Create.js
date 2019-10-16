import React, { Component } from 'react';
import {
  Button, Col, Container, Form, FormGroup, Input, Row
} from 'reactstrap';
import UserActions from '../../../actions/UserActions.js';
import UserStore from '../../../stores/UserStore.js';

class UserCreate extends Component {
  constructor(props) {
    super(props);
      this.state = {
        'user': {
          'firstname': '',
          'surname': '',
          'date_of_birth': '',
          'phone_number': '',
          'email': '',
          'password': ''
        },
        'validation': null
    }
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    UserStore.on("user_create_error", () => {
      this.setState({ validation: 'Whoops! The user could not be added, please try again.' });
    });
  }

  handleChange = event => {
    let user = {...this.state.user};
    user[event.target.id] = event.target.value;
    this.setState({user});
  }

  handleCreate(e) {
    UserActions.create(this.state.user);
    e.preventDefault();
    e.target.reset();
  }

  render() {
    return (
      <Container className="mt-4">
        <p className="text-danger">{this.state.validation}</p>
        <Form className="form" onSubmit={ (e) => this.handleCreate(e) }>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First name"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Surname"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  placeholder="Date of birth"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  placeholder="Phone number"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
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
            </Col>
            <Col md={12}>
              <FormGroup>
                <Button color="secondary" block>Add user</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export { UserCreate };

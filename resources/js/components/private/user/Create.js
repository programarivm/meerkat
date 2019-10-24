import React, { Component } from 'react';
import {
  Button, Col, Container, Form, FormGroup, Input, Row
} from 'reactstrap';
import ApiUserActions from '../../../actions/api/UserActions.js';
import ApiUserStore from '../../../stores/api/UserStore.js';

class UserCreate extends Component {
  constructor(props) {
    super(props);
      this.state = {
        validation: null
    }
    this.handleClickCreate = this.handleClickCreate.bind(this);
  }

  componentDidMount() {
    ApiUserStore.on("create.error", () => {
      this.setState({validation: 'Whoops! The user could not be added, please try again.'});
    });
  }

  handleClickCreate(e) {
    ApiUserActions.create({
      firstname: e.target.elements.firstname.value,
      surname: e.target.elements.surname.value,
      date_of_birth: e.target.elements.date_of_birth.value,
      phone_number: e.target.elements.phone_number.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    });
    e.preventDefault();
    e.target.reset();
  }

  render() {
    return (
      <Container className="mt-4">
        <p className="text-danger">{this.state.validation}</p>
        <Form className="form" onSubmit={ (e) => this.handleClickCreate(e) }>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First name"
                  value={this.props.firstname}
                  onChange={this.props.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Surname"
                  value={this.props.surname}
                  onChange={this.props.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  placeholder="Date of birth"
                  value={this.props.date_of_birth}
                  onChange={this.props.handleChange}
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
                  value={this.props.phone_number}
                  onChange={this.props.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={this.props.email}
                  onChange={this.props.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={this.props.password}
                  onChange={this.props.handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Button color="secondary" block>Add user</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export { UserCreate };

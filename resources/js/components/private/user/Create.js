import ApiUserActions from '../../../actions/api/UserActions.js';
import ApiUserStore from '../../../stores/api/UserStore.js';
import { Button, Form, FormGroup, Input, Jumbotron } from 'reactstrap';
import React from 'react';

class UserCreate extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    ApiUserStore
      .on("create.201", () => {
        if (this._isMounted) {
          this.resetState();
        }
      })
      .on("create.422", (data) => {
        if (this._isMounted) {
          this.setState({ validation: data });
        }
      })
      .on("create.error", (data) => {
        if (this._isMounted) {
          this.setState({ validation: data });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInitialState = () => ({
    user: {
      firstname: '',
      surname: '',
      date_of_birth: '',
      phone_number: '',
      email: '',
      password: ''
    },
    validation: []
  });

  resetState = () => {
    this.setState(this.getInitialState());
  }

  handleChange = e => {
    let user = {...this.state.user};
    user[e.target.id] = e.target.value;
    this.setState({user});
  }

  handleSubmitForm(e) {
    ApiUserActions.create(this.state.user);
    e.preventDefault();
  }

  render() {
    return (
      <Jumbotron className="mt-3">
        <ul className="text-danger">
          {
            this.state.validation.map(function(item, index) {
              return (<li key={index}>{item}</li>)
            })
          }
        </ul>
        <Form className="form" onSubmit={ (e) => this.handleSubmitForm(e) }>
          <FormGroup>
            <Input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First name"
              value={this.state.user.firstname}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="surname"
              id="surname"
              placeholder="Surname"
              value={this.state.user.surname}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              name="date_of_birth"
              id="date_of_birth"
              placeholder="Date of birth"
              value={this.state.user.date_of_birth}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder="Phone number"
              value={this.state.user.phone_number}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={this.state.user.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.user.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" block>Add user</Button>
          </FormGroup>
        </Form>
      </Jumbotron>
    );
  }
}

export { UserCreate };

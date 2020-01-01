import ApiUserActions from '../../../actions/api/UserActions.js';
import ApiUserStore from '../../../stores/api/UserStore.js';
import { Button, Form, FormGroup, Input, Jumbotron } from 'reactstrap';
import { FormGroups } from './common/FormGroups.js';
import Loading from '../../Loading.js';
import React from 'react';
import Validation from '../../Validation.js';

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
          this.setState({ validation: data, loading: false });
        }
      })
      .on("create.error", (data) => {
        if (this._isMounted) {
          this.setState({ validation: data, loading: false });
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
    validation: [],
    loading: false
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
    this.setState({ loading: true });
    ApiUserActions.create(this.state.user);
    e.preventDefault();
  }

  render() {
    return (
      <Jumbotron className="mt-3">
        <Form className="form" onSubmit={ (e) => this.handleSubmitForm(e) }>
          <FormGroups {...this.state.user} handleChange={this.handleChange} />
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
        { this.state.loading ? <Loading /> : <Validation messages={this.state.validation} /> }
      </Jumbotron>
    );
  }
}

export { UserCreate };

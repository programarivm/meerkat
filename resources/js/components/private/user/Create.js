import ApiUserActions from '../../../actions/api/UserActions';
import ApiUserStore from '../../../stores/api/UserStore';
import { Button, ButtonGroup, Paper, TextField } from '@material-ui/core';
import { FormInputs } from './FormInputs';
import Loading from '../../Loading';
import React from 'react';
import Validation from '../../Validation';

class UserCreate extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
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
          this.setState({ response: data, loading: false });
        }
      })
      .on("create.error", (data) => {
        if (this._isMounted) {
          this.setState({ response: data, loading: false });
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
    response: [],
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

  handleClickCancel(e) {
    this.resetState()
    e.preventDefault();
  }

  handleSubmitForm(e) {
    this.setState({ loading: true });
    ApiUserActions.create(this.state.user);
    e.preventDefault();
  }

  render() {
    return (
      <Paper style={{ padding: 15 }}>
        <form onSubmit={ (e) => this.handleSubmitForm(e) }>
          <FormInputs {...this.state.user} handleChange={this.handleChange} />
          <TextField
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={this.state.user.password}
            onChange={this.handleChange}
          />
          <ButtonGroup
            style={{ marginTop: 10, marginBottom: 10 }}
            size="small"
            fullWidth
          >
            <Button color="primary" type="submit">Add</Button>
            <Button color="secondary" onClick={ (e) => this.handleClickCancel(e) }>Cancel</Button>
          </ButtonGroup>
        </form>
        <Loading loading={this.state.loading}>
          <Validation messages={this.state.response} />
        </Loading>
      </Paper>
    );
  }
}

export default UserCreate;

import ApiUserActions from '../../../actions/api/UserActions.js';
import ApiUserStore from '../../../stores/api/UserStore.js';
import {
  Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter
} from 'reactstrap';
import React from 'react';

class UserEdit extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    ApiUserStore
      .on("show.200", (data) => {
        if (this._isMounted) {
          this.setState({
            id: data.id,
            user: {
              firstname: data.firstname,
              surname: data.surname,
              date_of_birth: data.date_of_birth,
              phone_number: data.phone_number,
              email: data.email,
              password: data.password
            },
            modal: {
              open: true
            }
          });
        }
      })
      .on("update.200", () => {
        if (this._isMounted) {
          this.resetState();
        }
      })
      .on("update.422", (data) => {
        if (this._isMounted) {
          let validation = [];
          Object.values(data.errors).forEach(value => {
            value.forEach(message => {
              validation.push(message);
            });
          });
          this.setState({ validation: validation });
        }
      })
      .on("update.error", () => {
        if (this._isMounted) {
          this.setState({ validation: 'Whoops! The user could not be updated, please try again.' });
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
    modal: {
      open: false
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

  handleClickCancel(e) {
    this.resetState();
    e.preventDefault();
  }

  handleClickUpdate(e) {
    ApiUserActions.update(this.state.id, this.state.user);
    e.preventDefault();
  }

  render() {
    return (
      <Modal isOpen={this.state.modal.open}>
        <ModalBody>
          <ul className="text-danger">
            {
              this.state.validation.map(function(item, index) {
                return (<li key={index}>{item}</li>)
              })
            }
          </ul>
          <Form className="form">
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
                value={this.state.user.date_of_birth ? this.state.user.date_of_birth : ''}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="phone_number"
                id="phone_number"
                placeholder="Phone number"
                value={this.state.user.phone_number ? this.state.user.phone_number : ''}
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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ (e) => this.handleClickUpdate(e) }>Update</Button>
          <Button color="secondary" onClick={ (e) => this.handleClickCancel(e) }>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export { UserEdit };

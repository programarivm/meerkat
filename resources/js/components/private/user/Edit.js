import ApiUserActions from '../../../actions/api/UserActions.js';
import ApiUserStore from '../../../stores/api/UserStore.js';
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { FormGroups } from './common/FormGroups.js';
import React from 'react';
import Validation from '../../Validation.js';

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
          this.setState({ validation: data });
        }
      })
      .on("update.error", () => {
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
          <Validation messages={this.state.validation} />
          <Form className="form">
            <FormGroups {...this.state.user} handleChange={this.handleChange} />
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

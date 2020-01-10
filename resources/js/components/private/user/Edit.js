import ApiUserActions from '../../../actions/api/UserActions';
import ApiUserStore from '../../../stores/api/UserStore';
import { Button, Form, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { FormGroups } from './FormGroups';
import Loading from '../../Loading';
import React from 'react';
import Validation from '../../Validation';

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
          this.setState({ response: data, loading: false });
        }
      })
      .on("update.error", () => {
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
    modal: {
      open: false
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
    this.resetState();
    e.preventDefault();
  }

  handleClickUpdate(e) {
    this.setState({ loading: true });
    ApiUserActions.update(this.state.id, this.state.user);
    e.preventDefault();
  }

  render() {
    return (
      <Modal isOpen={this.state.modal.open}>
        <ModalBody>
          <Form className="form">
            <FormGroups {...this.state.user} handleChange={this.handleChange} />
          </Form>
          <Loading loading={this.state.loading}>
            <Validation messages={this.state.response} />
          </Loading>
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

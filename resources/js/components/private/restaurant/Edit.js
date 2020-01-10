import ApiRestaurantActions from '../../../actions/api/RestaurantActions';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore';
import { Button, Form, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { FormGroups } from './FormGroups';
import Loading from '../../Loading';
import React from 'react';
import Validation from '../../Validation';

class RestaurantEdit extends React.Component {
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

    ApiRestaurantStore
      .on("show.200", (data) => {
        if (this._isMounted) {
          this.setState({
            id: data.id,
            restaurant: {
              name: data.name,
              description: data.description,
              address: data.address,
              lat: data.lat,
              lon: data.lon
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
    restaurant: {
      name: '',
      description: '',
      address: '',
      lat: '',
      lon: ''
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
    let restaurant = {...this.state.restaurant};
    restaurant[e.target.id] = e.target.value;
    this.setState({restaurant});
  }

  handleClickCancel(e) {
    this.resetState();
    e.preventDefault();
  }

  handleClickUpdate(e) {
    this.setState({ loading: true });
    ApiRestaurantActions.update(this.state.id, this.state.restaurant);
    e.preventDefault();
  }

  render() {
    return (
      <Modal isOpen={this.state.modal.open}>
        <ModalBody>
          <Form className="form">
            <FormGroups {...this.state.restaurant} handleChange={this.handleChange} />
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

export { RestaurantEdit };

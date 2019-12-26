import ApiRestaurantActions from '../../../actions/api/RestaurantActions.js';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore.js';
import {
  Button, Form, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';
import { FormGroups } from './common/FormGroups.js';
import React from 'react';

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
    validation: []
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
    ApiRestaurantActions.update(this.state.id, this.state.restaurant);
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
            <FormGroups {...this.state.restaurant} handleChange={this.handleChange} />
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

export { RestaurantEdit };

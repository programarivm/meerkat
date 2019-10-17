import React, { Component } from 'react';
import {
  Button, Container, Form, FormGroup
} from 'reactstrap';
import { FormGroups } from './common/FormGroups.js';
import RestaurantActions from '../../../actions/RestaurantActions.js';
import RestaurantStore from '../../../stores/RestaurantStore.js';

class RestaurantEdit extends Component {
  constructor(props) {
    super(props);
      this.state = {
        validation: null
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    // TODO:
    // Add the "Show" action in RestaurantActions
    // ... 
    RestaurantStore.on("restaurant_create_error", () => {
      this.setState({ validation: 'Whoops! The restaurant could not be added, please try again.' });
    });
  }

  handleUpdate(e) {
    RestaurantActions.update({
      name: e.target.elements.name.value,
      description: e.target.elements.description.value,
      address: e.target.elements.address.value,
      lat: e.target.elements.lat.value,
      lon: e.target.elements.lon.value
    });
    e.preventDefault();
    e.target.reset();
  }

  render() {
    return (
      <Container className="mt-4">
        <p className="text-danger">{this.state.validation}</p>
        <Form className="form" onSubmit={ (e) => this.handleUpdate(e) }>
          <FormGroups />
          <FormGroup>
            <Button color="secondary" block>Update restaurant</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export { RestaurantEdit };

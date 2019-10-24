import React, { Component } from 'react';
import {
  Button, Container, Form, FormGroup
} from 'reactstrap';
import { FormGroups } from './common/FormGroups.js';
import ApiRestaurantActions from '../../../actions/api/RestaurantActions.js';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore.js';

class RestaurantCreate extends Component {
  constructor(props) {
    super(props);
      this.state = {
        validation: null
    }
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    ApiRestaurantStore.on("create.error", () => {
      this.setState({ validation: 'Whoops! The restaurant could not be added, please try again.' });
    });
  }

  handleCreate(e) {
    ApiRestaurantActions.create({
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
        <Form className="form" onSubmit={ (e) => this.handleCreate(e) }>
          <FormGroups />
          <FormGroup>
            <Button color="secondary" block>Add restaurant</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export { RestaurantCreate };

import React, { Component } from 'react';
import {
  Button, Col, Container, Form, FormGroup, Input, Row
} from 'reactstrap';
import RestaurantActions from '../../../actions/RestaurantActions.js';
import RestaurantStore from '../../../stores/RestaurantStore.js';

class RestaurantCreate extends Component {
  constructor(props) {
    super(props);
      this.state = {
        restaurant: {
          name: '',
          description: '',
          address: '',
          lat: '',
          lon: ''
        },
        'validation': null
    }
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    RestaurantStore.on("restaurant_create_error", () => {
      this.setState({ validation: 'Whoops! The restaurant could not be added, please try again.' });
    });
  }

  handleChange = event => {
    let restaurant = {...this.state.restaurant};
    restaurant[event.target.id] = event.target.value;
    this.setState({restaurant});
  }

  handleCreate(e) {
    RestaurantActions.create(this.state.restaurant);
    e.preventDefault();
    e.target.reset();
  }

  render() {
    return (
      <Container className="mt-4">
        <p className="text-danger">{this.state.validation}</p>
        <Form className="form" onSubmit={ (e) => this.handleCreate(e) }>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Input
                  type="number"
                  step="0.00000001"
                  name="lat"
                  id="lat"
                  placeholder="Latitude"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  step="0.00000001"
                  name="lon"
                  id="lon"
                  placeholder="Longitude"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Button color="secondary" block>Add restaurant</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export { RestaurantCreate };

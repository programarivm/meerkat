import ApiRestaurantActions from '../../../actions/api/RestaurantActions.js';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore.js';
import { Button, Form, FormGroup, Jumbotron } from 'reactstrap';
import { FormGroups } from './common/FormGroups.js';
import React from 'react';

class RestaurantCreate extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        validation: null
    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidMount() {
    ApiRestaurantStore.on("create.error", () => {
      this.setState({ validation: 'Whoops! The restaurant could not be added, please try again.' });
    });
  }

  handleSubmitForm(e) {
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
      <Jumbotron className="mt-3">
        <p className="text-danger">{this.state.validation}</p>
        <Form className="form" onSubmit={ (e) => this.handleSubmitForm(e) }>
          <FormGroups />
          <FormGroup>
            <Button color="primary" block>Add restaurant</Button>
          </FormGroup>
        </Form>
      </Jumbotron>
    );
  }
}

export { RestaurantCreate };

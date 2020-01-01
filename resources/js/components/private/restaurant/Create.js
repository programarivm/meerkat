import ApiRestaurantActions from '../../../actions/api/RestaurantActions.js';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore.js';
import { Button, Form, FormGroup, Jumbotron } from 'reactstrap';
import { FormGroups } from './common/FormGroups.js';
import Loading from '../../Loading.js';
import React from 'react';
import Validation from '../../Validation.js';

class RestaurantCreate extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    ApiRestaurantStore
      .on("create.201", () => {
        if (this._isMounted) {
          this.resetState();
        }
      })
      .on("create.422", (data) => {
        if (this._isMounted) {
          this.setState({ validation: data, loading: false });
        }
      })
      .on("create.error", (data) => {
        if (this._isMounted) {
          this.setState({ validation: data, loading: false });
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
    validation: [],
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

  handleSubmitForm(e) {
    this.setState({ loading: true });
    ApiRestaurantActions.create(this.state.restaurant);
    e.preventDefault();
  }

  render() {
    return (
      <Jumbotron className="mt-3">
        <Form className="form" onSubmit={ (e) => this.handleSubmitForm(e) }>
          <FormGroups {...this.state.restaurant} handleChange={this.handleChange} />
          <FormGroup>
            <Button color="primary" block>Add restaurant</Button>
          </FormGroup>
        </Form>
        <Loading loading={this.state.loading}>
          <Validation messages={this.state.validation} />
        </Loading>
      </Jumbotron>
    );
  }
}

export { RestaurantCreate };

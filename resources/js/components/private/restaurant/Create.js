import ApiRestaurantActions from '../../../actions/api/RestaurantActions';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore';
import { Button, ButtonGroup, Paper } from '@material-ui/core';
import { FormInputs } from './FormInputs';
import Loading from '../../Loading';
import React from 'react';
import Validation from '../../Validation';

class RestaurantCreate extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
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
          this.setState({ response: data, loading: false });
        }
      })
      .on("create.error", (data) => {
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
    this.resetState()
    e.preventDefault();
  }

  handleSubmitForm(e) {
    this.setState({ loading: true });
    ApiRestaurantActions.create(this.state.restaurant);
    e.preventDefault();
  }

  render() {
    return (
      <Paper style={{ padding: 15 }}>
        <form onSubmit={ (e) => this.handleSubmitForm(e) }>
          <FormInputs {...this.state.restaurant} handleChange={this.handleChange} />
          <ButtonGroup
            style={{ marginTop: 10, marginBottom: 10 }}
            size="small"
            fullWidth
          >
            <Button color="primary" type="submit">Add</Button>
            <Button color="secondary" onClick={ (e) => this.handleClickCancel(e) }>Cancel</Button>
          </ButtonGroup>
        </form>
        <Loading loading={this.props.loading}>
          <Validation messages={this.state.response} />
        </Loading>
      </Paper>
    );
  }
}

export default RestaurantCreate;

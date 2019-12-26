import ApiRestaurantActions from '../../../actions/api/RestaurantActions.js';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore.js';
import ApiReviewActions from '../../../actions/api/ReviewActions.js';
import ApiReviewStore from '../../../stores/api/ReviewStore.js';
import {
  Button, ButtonGroup, Form, FormGroup, Input, Label, Modal, ModalBody
} from 'reactstrap';
import { Range } from 'react-range';
import React from 'react';
import ReviewStore from '../../../stores/ReviewStore.js';

class ReviewCreate extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    ReviewStore
      .on("click.review_now", () => {
        if (this._isMounted) {
          ApiRestaurantActions.fetchAll();
        }
      });

    ApiRestaurantStore
      .on("fetch_all.200", (data) => {
        if (this._isMounted) {
          let newState = Object.assign({}, this.state);
          newState.restaurants = data;
          newState.review.restaurant.id = data[0].id;
          newState.modal.open = true;
          this.setState(newState);
        }
      });

    ApiReviewStore
      .on("create.201", () => {
        if (this._isMounted) {
          ApiReviewActions.fetchAll();
          this.resetState();
        }
      })
      .on("create.422", (data) => {
        if (this._isMounted) {
          let validation = [];
          Object.values(data.errors).forEach(value => {
            value.forEach(message => {
              validation.push(message);
            });
          });
          this.setState({ validation: validation });
        }
      })
      .on("create.error", (data) => {
        if (this._isMounted) {
          this.setState({ validation: ['Whoops! The review could not be added, please try again.'] });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInitialState = () => ({
    restaurants: [],
    review: {
      restaurant: {
        id: ''
      },
      comment: '',
      points: [5]
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
    let review = {...this.state.review};
    switch (e.target.id) {
      case 'restaurant':
        review.restaurant.id = e.target.value;
        break;
      default:
        review[e.target.id] = e.target.value;
        break;
    }
    this.setState({review});
  }

  handleClickCancel(e) {
    this.resetState();
    e.preventDefault();
  }

  handleClickSubmit(e) {
    ApiReviewActions.create(this.state.review);
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
          <Form className="form" onSubmit={ (e) => this.handleClickSubmit(e) }>
            <FormGroup>
              <Label for="restaurant">Select a restaurant:</Label>
              <Input
                type="select"
                name="restaurant"
                id="restaurant"
                value={this.state.review.restaurant.id}
                onChange={this.handleChange}>
                { this.state.restaurants.map( (item, i) => <option key={i} value={item.id}>{item.name}</option> ) }
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Slide the square sincerely:</Label>
              <Range
                step={1}
                min={0}
                max={10}
                values={this.state.review.points}
                onChange={values => {
                  let newState = Object.assign({}, this.state);
                  newState.review.points = values;
                  this.setState(newState);
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      width: '100%',
                      backgroundColor: '#ccc'
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '25px',
                      width: '25px',
                      backgroundColor: '#999'
                    }}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label>Tell us about your opinion:</Label>
              <Input
                type="textarea"
                name="comment"
                id="comment"
                placeholder="In my opinion..."
                value={this.state.review.comment}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <ButtonGroup>
                <Button color="primary">Submit</Button>
                <Button color="secondary" onClick={ (e) => this.handleClickCancel(e) }>Cancel</Button>
              </ButtonGroup>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export { ReviewCreate };

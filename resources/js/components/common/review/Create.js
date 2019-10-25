import ApiRestaurantActions from '../../../actions/api/RestaurantActions.js';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore.js';
import {
  Button, Col, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, Row
} from 'reactstrap';
import React from 'react';
import ReviewActions from '../../../actions/api/ReviewActions.js';
import ReviewStore from '../../../stores/ReviewStore.js';

class ReviewCreate extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
      this.state = {
        restaurants: [],
        review: {
          restaurant: {
            id: ''
          },
          comment: ''
        },
        modal: {
          open: false
        },
        validation: null
    }
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleChangeRestaurant = this.handleChangeRestaurant.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    ReviewStore
      .on("click.review_now", () => {
        if (this._isMounted) {
          ApiRestaurantActions.fetchAll();
          this.setState({ modal: { open: true } });
        }
      });

    ApiRestaurantStore
      .on("fetch_all.200", (data) => {
        if (this._isMounted) {
          this.setState({ restaurants: data });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChangeComment = event => {
    let newState = Object.assign({}, this.state);
    newState.review.comment = event.target.value;
    this.setState(newState);
  }

  handleChangeRestaurant = event => {
    let newState = Object.assign({}, this.state);
    newState.review.restaurant.id = event.target.value;
    this.setState(newState);
  }

  handleClickCancel(e) {
    this.setState({ modal: { open: false } });
    e.preventDefault();
  }

  handleClickSubmit(e) {
    ReviewActions.create(this.state.review);
    this.setState({ modal: { open: false } });
    e.preventDefault();
  }

  render() {
    return (
      <Modal isOpen={this.state.modal.open}>
        <ModalBody>
          <p className="text-danger">{this.state.validation}</p>
          <Form className="form">
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Input
                    type="select"
                    name="restaurant"
                    id="restaurant"
                    value={this.state.review.restaurant.id}
                    onChange={this.handleChangeRestaurant}
                    required>
                    { this.state.restaurants.map( (item, i) => <option key={i} value={item.id}>{item.name}</option> ) }
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="comment"
                    id="comment"
                    placeholder="Your comment..."
                    value={this.state.review.comment}
                    onChange={this.handleChangeComment}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ (e) => this.handleClickSubmit(e) }>Submit</Button>
          <Button color="secondary" onClick={ (e) => this.handleClickCancel(e) }>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export { ReviewCreate };

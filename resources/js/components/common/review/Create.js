import React from 'react';
import {
  Button, Col, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, Row
} from 'reactstrap';
import ReviewActions from '../../../actions/ReviewActions.js';
import ReviewStore from '../../../stores/ReviewStore.js';

class ReviewCreate extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
      this.state = {
        review: {
          comment: ''
        },
        modal: {
          open: false
        },
        validation: null
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    ReviewStore
      .on("click.review_now", () => {
        if (this._isMounted) {
          this.setState({ modal: { open: true } });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCancel(e) {
    this.setState({ modal: { open: false } });
    e.preventDefault();
  }

  handleChange = event => {
    let review = {...this.state.review};
    review[event.target.id] = event.target.value;
    this.setState({review});
  }

  handleSubmit(e) {
    ReviewActions.doReview(this.state.review);
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
                    type="textarea"
                    name="comment"
                    id="comment"
                    placeholder="Your comment..."
                    value={this.state.review.comment}
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ (e) => this.handleSubmit(e) }>Submit</Button>
          <Button color="secondary" onClick={ (e) => this.handleCancel(e) }>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export { ReviewCreate };

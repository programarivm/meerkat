import ApiAuthStore from '../../stores/api/AuthStore.js';
import { Button, ButtonGroup, Col, Row } from 'reactstrap';
import { LoremIpsum } from "./LoremIpsum.js";
import { ReviewCreate } from "./review/Create.js";
import { ReviewIndex } from "./review/Index.js";
import React from 'react';
import ReviewActions from '../../actions/ReviewActions.js';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickReviewNow = this.handleClickReviewNow.bind(this);
  }

  handleClickReviewNow(e) {
    ReviewActions.clickReviewNow();
    e.preventDefault();
  }

  render() {
    return (
      <Row className="m-3">
        <Col md={9}>
          <ReviewIndex />
        </Col>
        <Col md={3}>
          {
            ApiAuthStore.getState().role === 'ROLE_BASIC'
              ? <div>
                  <ButtonGroup className="mt-3">
                    <Button className="mb-4" color="primary" size="sm" onClick={ (e) => this.handleClickReviewNow(e) }>Review now!</Button>
                  </ButtonGroup>
                  <ReviewCreate />
                </div>
              : <LoremIpsum />
          }
        </Col>
      </Row>
    );
  }
}

export { Reviews };

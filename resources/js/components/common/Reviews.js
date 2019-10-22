import React from 'react';
import {
  Col, Container, Row
} from 'reactstrap';
import { NavLink } from "react-router-dom";
import ReviewActions from '../../actions/ReviewActions.js';
import ReviewStore from '../../stores/ReviewStore.js';
import api from '../../../images/api.png';

class Reviews extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
    ReviewActions.fetchAll();
    ReviewStore
      .on("fetch_all.200", (data) => {
        if (this._isMounted) {
          this.setState(ReviewStore.getState());
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <Container className="Reviews mt-5 mb-5">
          <Row>
            <Col lg="12">
              <p>TODO: Reviews</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export { Reviews };

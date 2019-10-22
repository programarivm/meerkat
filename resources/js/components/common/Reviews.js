import React from 'react';
import {
  Col, Container, Row
} from 'reactstrap';
import { NavLink } from "react-router-dom";
import api from '../../../images/api.png';

class Reviews extends React.Component {
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

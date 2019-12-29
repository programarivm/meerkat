import { Col, Row } from 'reactstrap';
import { LoremIpsum } from "../common/LoremIpsum.js";
import { RestaurantCreate } from "./restaurant/Create.js";
import { RestaurantIndex } from "./restaurant/Index.js";
import React from 'react';
import Session from '../../Session.js';

class Restaurants extends React.Component {
  render() {
    return (
      <Row className="m-3">
        <Col md={9}>
          <RestaurantIndex />
        </Col>
        <Col md={3}>
          { Session.get().role === 'ROLE_ADMIN' ? <RestaurantCreate /> : <LoremIpsum /> }
        </Col>
      </Row>
    );
  }
}

export { Restaurants };

import Can from '../Can';
import { Col, Row } from 'reactstrap';
import { LoremIpsum } from '../common/LoremIpsum';
import { RestaurantCreate } from './restaurant/Create';
import { RestaurantIndex } from './restaurant/Index';
import React from 'react';

class Restaurants extends React.Component {
  render() {
    return (
      <Row className="m-3">
        <Col md={9}>
          <RestaurantIndex />
        </Col>
        <Col md={3}>
          <Can I="store" a="Restaurant">
            <RestaurantCreate />
          </Can>
          <Can not I="store" a="Restaurant">
            <LoremIpsum />
          </Can>
        </Col>
      </Row>
    );
  }
}

export { Restaurants };

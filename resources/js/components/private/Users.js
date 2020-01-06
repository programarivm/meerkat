import Can from '../Can';
import { Col, Row } from 'reactstrap';
import { LoremIpsum } from '../common/LoremIpsum';
import { UserCreate } from './user/Create';
import { UserIndex } from './user/Index';
import React from 'react';

class Users extends React.Component {
  render() {
    return (
      <Row className="m-3">
        <Col md={9}>
          <UserIndex />
        </Col>
        <Col md={3}>
          <Can I="store" a="User">
            <UserCreate />
          </Can>
          <Can not I="store" a="User">
            <LoremIpsum />
          </Can>
        </Col>
      </Row>
    );
  }
}

export { Users };

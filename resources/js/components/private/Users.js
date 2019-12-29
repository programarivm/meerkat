import { Col, Row } from 'reactstrap';
import { LoremIpsum } from "../common/LoremIpsum.js";
import { UserCreate } from "./user/Create.js";
import { UserIndex } from "./user/Index.js";
import React from 'react';
import Session from '../../Session.js';

class Users extends React.Component {
  render() {
    return (
      <Row className="m-3">
        <Col md={9}>
          <UserIndex />
        </Col>
        <Col md={3}>
          { Session.get().role === 'ROLE_ADMIN' ? <UserCreate /> : <LoremIpsum /> }
        </Col>
      </Row>
    );
  }
}

export { Users };

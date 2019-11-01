import ApiAuthStore from '../../stores/api/AuthStore.js';
import { Col, Row } from 'reactstrap';
import { LoremIpsum } from "../common/LoremIpsum.js";
import { UserCreate } from "./user/Create.js";
import { UserIndex } from "./user/Index.js";
import React from 'react';

class Users extends React.Component {
  render() {
    return (
      <Row className="m-3">
        <Col md={9}>
          <UserIndex />
        </Col>
        <Col md={3}>
          { ApiAuthStore.getState().role === 'ROLE_ADMIN' ? <UserCreate /> : <LoremIpsum /> }
        </Col>
      </Row>
    );
  }
}

export { Users };

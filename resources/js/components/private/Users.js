import React from 'react';
import { Container } from 'reactstrap';
import { UserCreate } from "./user/Create.js";
import { UserIndex } from "./user/Index.js";

class Users extends React.Component {
  render() {
    return (
      <Container className="Users mt-4 mb-5">
        <h2 className="text-center">Users</h2>
        <UserCreate />
        <UserIndex />
      </Container>
    );
  }
}

export { Users };

import React from 'react';
import { Container } from 'reactstrap';
import { UserCreate } from "./user/Create.js";
import { UserIndex } from "./user/Index.js";

class Dashboard extends React.Component {
  render() {
    return (
      <Container className="Dashboard mt-4 mb-5">
        <h2 className="text-center">Dashboard</h2>
        <UserCreate />
        <UserIndex />
      </Container>
    );
  }
}

export { Dashboard };

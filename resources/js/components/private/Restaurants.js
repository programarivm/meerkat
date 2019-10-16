import React from 'react';
import { Container } from 'reactstrap';
import { RestaurantCreate } from "./restaurant/Create.js";
import { RestaurantIndex } from "./restaurant/Index.js";

class Restaurants extends React.Component {
  render() {
    return (
      <Container className="Restaurants mt-4 mb-5">
        <h2 className="text-center">Restaurants</h2>
        <RestaurantCreate />
        <RestaurantIndex />
      </Container>
    );
  }
}

export { Restaurants };

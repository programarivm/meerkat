import { Jumbotron } from 'reactstrap';
import React from 'react';

class LoremIpsum extends React.Component {
  render() {
    return (
      <Jumbotron className="mt-3">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </Jumbotron>
    );
  }
}

export { LoremIpsum };

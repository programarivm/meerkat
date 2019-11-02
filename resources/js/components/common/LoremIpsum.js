import { Jumbotron } from 'reactstrap';
import React from 'react';

class LoremIpsum extends React.Component {
  render() {
    return (
      <Jumbotron className="mt-3">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </Jumbotron>
    );
  }
}

export { LoremIpsum };

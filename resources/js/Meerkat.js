import React, { Component } from 'react';
import PublicApp from './components/public/App.js';

class Meerkat extends Component {
  render() {
    return (
      <div className="Meerkat">
        <PublicApp path="/" />
      </div>
    );
  }
}

export default Meerkat;

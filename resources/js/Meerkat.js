import ApiAuthStore from './stores/api/AuthStore.js';
import PrivateApp from './components/private/App.js';
import PublicApp from './components/public/App.js';
import React, { Component } from 'react';
import Session from './Session.js';
import './Meerkat.css';

class Meerkat extends Component {
  constructor(props) {
    super(props);
    this.state = Session.get();
  }

  componentDidMount() {
    ApiAuthStore
    .on("login.204", () => {
      this.setState(Session.get());
    })
    .on("logout.204", () => {
      this.setState(Session.get());
    });
  }

  render() {
    return (
      <div className="Meerkat">
        { this.state.role !== null ? <PrivateApp /> : <PublicApp /> }
      </div>
    );
  }
}

export default Meerkat;

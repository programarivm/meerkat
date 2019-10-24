import React, { Component } from 'react';
import PrivateApp from './components/private/App.js';
import PublicApp from './components/public/App.js';
import ApiAuthStore from './stores/api/AuthStore.js';
import './Meerkat.css';

class Meerkat extends Component {
  constructor(props) {
    super(props);
    this.state = ApiAuthStore.getState();
  }

  componentDidMount() {
    ApiAuthStore
    .on("login.204", () => {
      this.setState(ApiAuthStore.getState());
    })
    .on("logout.204", () => {
      this.setState(ApiAuthStore.getState());
    });
  }

  render() {
    return (
      <div className="Meerkat">
        { this.state.role !== null ? <PrivateApp path="/reviews" /> : <PublicApp path="/" /> }
      </div>
    );
  }
}

export default Meerkat;

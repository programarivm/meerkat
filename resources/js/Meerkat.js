import ApiAuthStore from './stores/api/AuthStore.js';
import Cookies from 'js-cookie';
import PrivateApp from './components/private/App.js';
import PublicApp from './components/public/App.js';
import React, { Component } from 'react';
import './Meerkat.css';

class Meerkat extends Component {
  constructor(props) {
    super(props);
    this.state = ApiAuthStore.getState();
  }

  componentDidMount() {
    let session = Cookies.get("session");

    if (session) {
      ApiAuthStore.setState({ role: JSON.parse(session).role });
      this.setState(ApiAuthStore.getState());
    }

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
        { this.state.role !== null ? <PrivateApp /> : <PublicApp /> }
      </div>
    );
  }
}

export default Meerkat;

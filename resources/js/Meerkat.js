import React, { Component } from 'react';
import PrivateApp from './components/private/App.js';
import PublicApp from './components/public/App.js';
import GlobalStore from './stores/GlobalStore.js';

class Meerkat extends Component {
  constructor(props) {
    super(props);
    this.state = GlobalStore.getState();
  }

  componentDidMount() {
    GlobalStore.on("login_succeeded", () => {
      this.setState(GlobalStore.getState());
    });
    GlobalStore.on("logout", () => {
      this.setState(GlobalStore.getState());
    });
  }

  render() {
    return (
      <div className="Meerkat">
        { this.state.authenticated ? <PrivateApp path="/dashboard" /> : <PublicApp path="/" /> }
      </div>
    );
  }
}

export default Meerkat;

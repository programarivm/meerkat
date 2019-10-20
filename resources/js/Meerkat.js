import React, { Component } from 'react';
import PrivateApp from './components/private/App.js';
import PublicApp from './components/public/App.js';
import GlobalStore from './stores/GlobalStore.js';
import './Meerkat.css';

class Meerkat extends Component {
  constructor(props) {
    super(props);
    this.state = GlobalStore.getState();
  }

  componentDidMount() {
    GlobalStore
    .on("login.204", () => {
      this.setState(GlobalStore.getState());
    })
    .on("logout.204", () => {
      this.setState(GlobalStore.getState());
    });
  }

  render() {
    return (
      <div className="Meerkat">
        { this.state.gui.role !== null ? <PrivateApp path="/dashboard" /> : <PublicApp path="/" /> }
      </div>
    );
  }
}

export default Meerkat;

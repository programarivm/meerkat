import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MainNav } from "./MainNav.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.history.push(this.props.path);
  }

  render() {
    return (
      <MainNav />
    );
  }
}

export default withRouter(App);

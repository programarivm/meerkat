import { MainNav } from "./MainNav.js";
import React from 'react';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
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

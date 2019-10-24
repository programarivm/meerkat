import CookieConsent from "react-cookie-consent";
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
      <div>
        <MainNav />
        <CookieConsent>
          Cookies? Mmm, they are delicious! However this website does not collect personal data through third-party cookies.
        </CookieConsent>
      </div>
    );
  }
}

export default withRouter(App);

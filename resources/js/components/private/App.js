import CssBaseline from "@material-ui/core/CssBaseline";
import MainNav from '@/components/private/MainNav';
import React from 'react';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    switch (this.props.location.pathname) {
      case '/login':
        this.props.history.push('/reviews');
        break;
      default:
        this.props.history.push(this.props.location.pathname);
        break;
    }
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <MainNav />
      </div>
    );
  }
}

export default withRouter(App);

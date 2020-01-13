import loading from '../../images/loading.gif';
import React, { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="text-center">
          <img src={loading} alt="loading" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default Loading;

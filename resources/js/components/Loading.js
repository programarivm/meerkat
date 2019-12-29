import loading from '../../images/loading.gif';
import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default Loading;

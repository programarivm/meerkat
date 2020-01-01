import React, { Component } from 'react';

class Validation extends Component {
  render() {
    return (
      <ul className="text-danger">
        {
          this.props.messages.map(function(item, index) {
            return (<li key={index}>{item}</li>)
          })
        }
      </ul>
    );
  }
}

export default Validation;

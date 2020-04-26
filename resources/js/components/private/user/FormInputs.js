import { TextField } from '@material-ui/core';
import React from 'react';

class FormInputs extends React.Component {
  render() {
    return (
      <div>
        <TextField
          fullWidth
          id="firstname"
          label="First name"
          name="firstname"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={this.props.firstname}
          onChange={this.props.handleChange}
        />
        <TextField
          fullWidth
          id="surname"
          label="Surname"
          name="surname"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={this.props.surname}
          onChange={this.props.handleChange}
        />
        <TextField
          fullWidth
          id="date_of_birth"
          label="Date of birth"
          name="date_of_birth"
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={this.props.date_of_birth}
          onChange={this.props.handleChange}
        />
        <TextField
          fullWidth
          id="phone_number"
          label="Phone number"
          name="phone_number"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={this.props.phone_number}
          onChange={this.props.handleChange}
        />
        <TextField
          fullWidth
          id="email"
          label="Email"
          name="email"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={this.props.email}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export { FormInputs };

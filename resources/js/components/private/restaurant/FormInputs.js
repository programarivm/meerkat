import { TextField } from '@material-ui/core';
import React from 'react';

class FormInputs extends React.Component {
  render() {
    return (
      <div>
        <TextField
          fullWidth
          id="name"
          label="Name"
          name="name"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={this.props.name}
          onChange={this.props.handleChange}
        />
        <TextField
          fullWidth
          id="description"
          label="Description"
          name="description"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={this.props.description}
          onChange={this.props.handleChange}
        />
        <TextField
          fullWidth
          id="address"
          label="Address"
          name="address"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={this.props.address}
          onChange={this.props.handleChange}
        />
        <TextField
          fullWidth
          id="lat"
          label="Latitude"
          name="lat"
          type="number"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: "0.00000001" }}
          value={this.props.lat}
          onChange={this.props.handleChange}
        />
        <TextField
          fullWidth
          id="lon"
          label="Longitude"
          name="lon"
          type="number"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: "0.00000001" }}
          value={this.props.lon}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export { FormInputs };

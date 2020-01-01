import { FormGroup, Input } from 'reactstrap';
import React from 'react';

class FormGroups extends React.Component {
  render() {
    return (
      <div>
        <FormGroup>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={this.props.name}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={this.props.description}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            value={this.props.address}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            step="0.00000001"
            name="lat"
            id="lat"
            placeholder="Latitude"
            value={this.props.lat}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            step="0.00000001"
            name="lon"
            id="lon"
            placeholder="Longitude"
            value={this.props.lon}
            onChange={this.props.handleChange}
          />
        </FormGroup>
      </div>
    );
  }
}

export { FormGroups };

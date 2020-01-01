import { FormGroup, Input } from 'reactstrap';
import React from 'react';

class FormGroups extends React.Component {
  render() {
    return (
      <div>
        <FormGroup>
          <Input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First name"
            value={this.props.firstname}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="surname"
            id="surname"
            placeholder="Surname"
            value={this.props.surname}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="date"
            name="date_of_birth"
            id="date_of_birth"
            placeholder="Date of birth"
            value={this.props.date_of_birth}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="phone_number"
            id="phone_number"
            placeholder="Phone number"
            value={this.props.phone_number ? this.props.phone_number : ''}
            onChange={this.props.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={this.props.email}
            onChange={this.props.handleChange}
          />
        </FormGroup>
      </div>
    );
  }
}

export { FormGroups };

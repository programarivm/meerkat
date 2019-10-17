import React, { Component } from 'react';
import {
  Col, FormGroup, Input, Row
} from 'reactstrap';

class FormGroups extends Component {
  render() {
    return (
      <Row>
        <Col md={6}>
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Input
              type="number"
              step="0.00000001"
              name="lat"
              id="lat"
              placeholder="Latitude"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              step="0.00000001"
              name="lon"
              id="lon"
              placeholder="Longitude"
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

export { FormGroups };

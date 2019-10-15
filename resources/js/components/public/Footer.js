import React, { Component } from 'react';
import { Col, Row
} from 'reactstrap';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer p-5">
        <Row>
          <Col lg="2"></Col>
          <Col lg="4">
            <p>
              <b>Meerkat</b><br/>
              Company Name Goes Here Limited,<br/>
              Registered in England and Wales,<br/>
              Company Number: 1234567890
            </p>
          </Col>
          <Col lg="3">
            <b>Legal</b><br/>
            <ul>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookies Policy</li>
            </ul>
          </Col>
          <Col lg="3">
            <b>Social</b><br/>
            <ul>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </Col>
          <Col lg="2"></Col>
        </Row>
      </footer>
    );
  }
}

export { Footer };

import { Col, Container, Row } from 'reactstrap';
import { Footer } from "./Footer.js";
import { Link } from "react-router-dom";
import React from 'react';
import api from '../../../images/api.png';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Container className="Home mt-5 mb-5">
          <Row>
            <Col lg="8">
              <h1 className="mt-5">Welcome to Meerkat</h1>
              <h5>This is a React GUI interacting with a Laravel API, a real-world example SPA.</h5>
              <hr/>
              <p>Features:</p>
              <ul>
                <li>ACL</li>
                <li>Authentication</li>
                <li>CRUD</li>
                <li>Flux: actions, dispatchers and stores</li>
              </ul>
              <Link className="mt-2 btn btn-primary text-white" to="/login">Interact now!</Link>
            </Col>
            <Col lg="4">
              <figure className="swing">
                <img src={api} className="img-fluid" alt="soup" />
              </figure>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export { Home };

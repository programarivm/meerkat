import React from 'react';
import {
  Card, CardBody, CardText, CardTitle, Col, Container, Row
} from 'reactstrap';
import { NavLink } from "react-router-dom";
import { Footer } from "./Footer.js";
import api from '../../../images/api.png';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Container className="Home mt-5 mb-5">
          <Row>
            <Col lg="8">
              <h1 className="mt-5">Welcome to Meerkat!</h1>
              <h5>This is a Laravel REST API.</h5>
              <h5>So far it helps to manage users but this is also a learning task which can be extended.</h5>
              <NavLink className="mt-2 btn btn-primary text-white" to="/login">Interact now!</NavLink>
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

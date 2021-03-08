import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TweetListContainer from "./containers/TweetListContainer";
import SwitchButton from "./containers/SwitchButton";

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="row">
          <Col xs={12}>
            <SwitchButton />
            <TweetListContainer />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

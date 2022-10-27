import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';

export default class NavigationBar extends React.Component{
      render() {
        return (
          <Navbar bg="primary" variant="dark" padding-bottom="100px">
              <Container>
                <Navbar.Brand href="/">CZK Conversion 💰 💵 </Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/conversionTable">Conversion Table</Nav.Link>
                  <Nav.Link href="/conversionForm">Conversion Form</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
        );
      }
}

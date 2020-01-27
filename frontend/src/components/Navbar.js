import React, { Component } from "react";
import 'bootstrap'

import { Navbar, Nav } from 'react-bootstrap';

class NavigationBar extends Component {

    render() {
        return (
            <Navbar className="color-nav" variant="light">
                <Navbar.Brand href="/">Strona Główna</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/add">Dodaj Przepis</Nav.Link>
                    <Nav.Link href="/ingredient">Dodaj Składnik</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/login">Zaloguj</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;



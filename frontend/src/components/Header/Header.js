  
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
    return (
    <header>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
            <Nav className="ml-auto">
            <Nav.Link href="/cart"><i className="fas fa-shopping-cart pr-2"></i>Cart</Nav.Link>
            <Nav.Link href="/login"><i className="fas fa-user pr-2"></i>Sign In</Nav.Link>
           </Nav> 
           </Container>  
        </Navbar>
        </header>
    );
};

export default Header;
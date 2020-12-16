import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../../actions/userActions';

const Header = () => {

    const dispatch = useDispatch()

    const userLoggedIn = useSelector(state => state.userLogin)
    const {userInfo} = userLoggedIn
    
    const handleLogout = () =>{
        dispatch(logout())
    }
    return (
    <header>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
            <Nav className="ml-auto">
            <Nav.Link href="/cart"><i className="fas fa-shopping-cart pr-2"></i>Cart</Nav.Link>
            {
               userInfo ? (
                 <NavDropdown title={userInfo.name} id="username">
                     <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                 </NavDropdown>  
               ):(
               <Nav.Link href="/login"><i className="fas fa-user pr-2"></i>Sign In</Nav.Link> 
               )
            }
          
           </Nav> 
           </Container>  
        </Navbar>
        </header>
    );
};

export default Header;
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import SearchBox from '../SearchBox/SearchBox';

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
              
             <Route render={({history}) => <SearchBox history={history} />}   />  
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
            {
              userInfo && userInfo.isAdmin && (

                <NavDropdown title='Admin' id="userAdmin">

                     <LinkContainer to='/admin/userList'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                   </LinkContainer>

                   <LinkContainer to='/admin/productList'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                   </LinkContainer>
                     
                   <LinkContainer to='/admin/orders'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                   </LinkContainer> 
                   <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                     
                 </NavDropdown>  
              )  
            }
           </Nav> 
           </Container>  
        </Navbar>
        </header>
    );
};

export default Header;
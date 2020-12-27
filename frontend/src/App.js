import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Container} from 'react-bootstrap';
import './index.css';
import Home from './components/screens/HomeScreen/Home';
import ProductScreen from './components/screens/ProsuctScreen/ProductScreen';
import CartScreen from './components/screens/CartScreen/CartScreen';
import LoginScreen from './components/screens/LoginScreen/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen/ProfileScreen';
import ShipingScreen from './components/screens/Shiping Screen/ShipingScreen';
import PaymentScreen from './components/screens/PaymentScreen/PaymentScreen';
import PlaceOrderScreen from './components/screens/PlaceOrderScreen/PlaceOrderScreen';
import OrderScreen from './components/screens/OrderScreen/OrderScreen';
import UserListScreen from './components/screens/UserListScreen/UserListScreen'
import UserEditScreen from './components/screens/UserEditScreen/UserEditScreen';
import ProductListScreen from './components/screens/ProductListScreen/ProductListScreen';
import ProductEditScreen from './components/screens/ProductEditScreen/ProductEditScreen';
import OrderListScreen from './components/screens/OrderListScreen/OrderListScreen';

const App = () => {
  return (
    <>
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          
           <Switch>
            <Route path="/" exact>
            <Home></Home>
            </Route>
            <Route  exact path="/product/:id" >
              <ProductScreen />
            </Route>
            <Route   path="/login" >
              <LoginScreen></LoginScreen>
            </Route>
            <Route   path="/profile" >
              <ProfileScreen></ProfileScreen>
            </Route>
            <Route   path="/register" >
              <RegisterScreen></RegisterScreen>
            </Route>
            <Route   path="/shipping" >
              <ShipingScreen></ShipingScreen>
            </Route>
            <Route   path="/payment" >
               <PaymentScreen></PaymentScreen>
            </Route>
            <Route   path="/placeOrder" >
               <PlaceOrderScreen></PlaceOrderScreen>
            </Route>
            <Route   path="/order/:id" >
               <OrderScreen></OrderScreen>
            </Route>
            <Route   path="/cart/:id?" >
              <CartScreen></CartScreen>
            </Route>
            <Route   path="/admin/userList" >
              <UserListScreen></UserListScreen>
            </Route>
            <Route   path="/admin/user/:id/edit" >
              <UserEditScreen></UserEditScreen>
            </Route>
            <Route   path="/admin/productList" >
              <ProductListScreen></ProductListScreen>
            </Route>
            <Route   path="/admin/orders" >
              <OrderListScreen></OrderListScreen>
            </Route>
            <Route   path="/admin/product/:id/edit" >
              <ProductEditScreen></ProductEditScreen>
            </Route>
             
           </Switch>
        
        </Container>
      </main>
      <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
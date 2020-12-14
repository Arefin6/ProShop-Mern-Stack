import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Container} from 'react-bootstrap';
import './index.css';
import Home from './components/screens/HomeScreen/Home';
import ProductScreen from './components/screens/ProsuctScreen/ProductScreen';
import CartScreen from './components/screens/CartScreen/CartScreen';

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
            <Route   path="/cart/:id?" >
              <CartScreen></CartScreen>
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

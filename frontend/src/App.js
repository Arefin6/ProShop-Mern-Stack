import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import * as ReactBootstrap from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import './index.css';
import Home from './components/screens/HomeScreen/Home';

const App = () => {
  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Home></Home>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;

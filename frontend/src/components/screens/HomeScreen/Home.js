import React from 'react';
import { Col, Row } from 'react-bootstrap';
import products from '../../../fakeData'; 
import Product from '../../Products/Product';

const Home = () => {
    return (
        <>
           <h1>Latest Products</h1>
           <Row>
               
                {
                    products.map(product =>(
                      <Col  key={product._id} sm={12} md={6} lg={4} xl ={3}>
                        <Product product = {product}></Product>
                      </Col> 
                    ))
                      
                } 
               
           </Row>
           
        </>
    );
};

export default Home;
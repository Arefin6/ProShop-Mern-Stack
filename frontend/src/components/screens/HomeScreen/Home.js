import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Product from '../../Products/Product';

const Home = () => {

    const [products,setProducts] = useState([]);

    useEffect(()=>{
           fetch('/api/products')
           .then(res => res.json())
           .then(data => setProducts(data))
    },[])

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
import React from 'react';
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {listProducts} from '../../../actions/productActions'
import { Col, Row } from 'react-bootstrap';
import Product from '../../Products/Product';
import Loader from '../../../Loader/Loader';
import Message from '../../Message/Message';
import { useParams } from 'react-router-dom';

const Home = () => {

    const dispatch = useDispatch()
    
    const {keyword} = useParams()

    const productList = useSelector(state => state.productList)
     
    const {loading,error,products} = productList

    useEffect(()=>{
        dispatch(listProducts(keyword))  
    },[dispatch,keyword])

    return (
        <>
           <h1>Latest Products</h1>
           {
            loading ?(
              <Loader></Loader>
            ): error ?(
              <Message variant="danger" >{error}</Message>
            ):
            <Row>
               
            {
                products.map(product =>(
                  <Col  key={product._id} sm={12} md={6} lg={4} xl ={3}>
                    <Product product = {product}></Product>
                  </Col> 
                ))
                  
            } 
           
         </Row>
       
           }
          
        </>
    );
};

export default Home;
import React from 'react';
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {listProducts} from '../../../actions/productActions'
import { Col, Row } from 'react-bootstrap';
import Product from '../../Products/Product';
import Loader from '../../../Loader/Loader';
import Message from '../../Message/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../../Paginate/Paginate';
import ProductCarosel from '../../ProductCarosel/ProductCarosel';

const Home = () => {

    const dispatch = useDispatch()
    
    const {keyword,pageNumber} = useParams()

    const productList = useSelector(state => state.productList)
     
    const {loading,error,products,page,pages} = productList

    useEffect(()=>{
        dispatch(listProducts(keyword,pageNumber))  
    },[dispatch,keyword,pageNumber])

    return (
        <>
         {!keyword && <ProductCarosel></ProductCarosel>}
           <h1>Latest Products</h1>
           {
            loading ?(
              <Loader></Loader>
            ): error ?(
              <Message variant="danger" >{error}</Message>
            ):
            <> 
            <Row>
               
            {
                products.map(product =>(
                  <Col  key={product._id} sm={12} md={6} lg={4} xl ={3}>
                    <Product product = {product}></Product>
                  </Col> 
                ))
                  
            } 
           
         </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} ></Paginate>
          </>
       
           }
          
        </>
    );
};

export default Home;
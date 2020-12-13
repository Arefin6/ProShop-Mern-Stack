import React from 'react';
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {listProductDetails} from '../../../actions/productActions';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../../Rating/Rating';
import Loader from '../../../Loader/Loader';
import Message from '../../Message/Message';

const ProductScreen = () => {
   const {id}  = useParams()
   
   const dispatch = useDispatch()

   const productDetails = useSelector(state => state.productDetails)

   const {loading,error,product} = productDetails;

   useEffect(()=>{
        dispatch(listProductDetails(id)) 
   },[dispatch,id])
   
  //  const product = products.find((p) => p._id === id)
    
    return (
        <>
           <Link  className="btn btn-light my-3" to="/">
           Go Back
           </Link>
           {
              loading ?(
                <Loader></Loader>
              ): error ?(
                <Message variant="danger" >{error}</Message>
              ):

              <Row>
              <Col md={6}>
                 <Image src={product.image} alt ={product.name} fluid/>
              </Col>
              <Col md={3}>
                 <ListGroup variant="flush">
                     <ListGroup.Item>
                      <h3>{product.name}</h3>
                     </ListGroup.Item>
                     <ListGroup.Item>
                      <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      />
                     </ListGroup.Item>
                     <ListGroup.Item>
                      Price:${product.price}
                     </ListGroup.Item>
                     <ListGroup.Item>
                      Description:{product.description}
                     </ListGroup.Item>

                 </ListGroup>
              </Col>

              <Col md={3}>
                <Card>

                <ListGroup variant="flush">
                     <ListGroup.Item>
                       <Row>
                           <Col>Price</Col>
                           <Col><strong>${product.price}</strong></Col>
                       </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                       <Row>
                           <Col>Status</Col>
                            <Col>{product.countInStock > 0 ? 'In Stock' : "Out of Stock"}</Col>
                       </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button className="btn-block" type="button" disabled={product.countInStock === 0 ? true : false }>
                            Add To Cart
                        </Button>
                     </ListGroup.Item>
                </ListGroup>
                </Card>
              </Col>
          </Row> 
           }
           
        </>
    );
};

export default ProductScreen;
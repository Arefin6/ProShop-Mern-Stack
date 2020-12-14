import React, { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {listProductDetails} from '../../../actions/productActions';
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import Rating from '../../Rating/Rating';
import Loader from '../../../Loader/Loader';
import Message from '../../Message/Message';

const ProductScreen = () => {
   const {id}  = useParams()

   const history = useHistory()

   const [qty,setQty] = useState(1);
   
   const dispatch = useDispatch()

   const productDetails = useSelector(state => state.productDetails)

   const {loading,error,product} = productDetails;

   useEffect(()=>{
        dispatch(listProductDetails(id)) 
   },[dispatch,id])


   const addToCartHandler = () =>{
      history.push(`/cart/${id}?qty=${qty}`)
   }
   
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
                      {
                       product.countInStock &&
                       <ListGroupItem>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                           <Form.Control
                           as='select'
                           value={qty}
                           onChange={(e) => setQty(e.target.value)}
                           >
                            {
                              [...Array(product.countInStock).keys()].map(x =>(
                                <option key={x +1}  value={ x+1 }>
                                  { x  + 1 }
                                </option>
                              ))
                            }
                           </Form.Control>
                          </Col>
                        </Row>

                       </ListGroupItem> 
                      }

                     <ListGroup.Item>
                        <Button className="btn-block" 
                         onClick={addToCartHandler}
                        type="button" disabled={product.countInStock === 0 ? true : false }>
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
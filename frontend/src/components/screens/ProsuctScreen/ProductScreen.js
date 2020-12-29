import React, { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {listProductDetails,reviewProductCreate} from '../../../actions/productActions';
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import Rating from '../../Rating/Rating';
import Loader from '../../../Loader/Loader';
import Message from '../../Message/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../../constains/productConstains';

const ProductScreen = () => {
   const {id}  = useParams()

   const history = useHistory()

   const [qty,setQty] = useState(1);
   const [rating,setRating] = useState();
   const [comment,setComment] = useState('');
   
   const dispatch = useDispatch()

   const productReviewCreate = useSelector(state => state.productReviewCreate)

   const {error:errorReviewCreate, success:successReviewCreate} = productReviewCreate;

   const productDetails = useSelector(state => state.productDetails)

   const {loading,error,product} = productDetails;

   const userLogin = useSelector(state => state.userLogin)

   const {userInfo} = userLogin;


   useEffect(()=>{
         if(successReviewCreate){
           alert('Review Created')
           setRating(0)
           setComment('')
           dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
         }
        dispatch(listProductDetails(id)) 
   },[dispatch,id,successReviewCreate])


   const addToCartHandler = () =>{
      history.push(`/cart/${id}?qty=${qty}`)
   }

   const submitHandler = (e) =>{
     e.preventDefault()
     dispatch(reviewProductCreate(id,{
       rating,
       comment
     }))
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
              <> 
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
          <Row>
             
            <Col md={6}>
               <h2>Reviews</h2>
               {product.reviews.length === 0 && <Message>No Reviews</Message>}
            
               <ListGroup variant='flush'>
                  {product.reviews.map((review) =>(
                       
                       <ListGroupItem key={review._id}>
                          <strong>{review.name}</strong>
                           <Rating value={review.rating}></Rating>
                            <p>{review.createdAt.substring(0,10)}</p>
                             <p>{review.comment}</p>

                       </ListGroupItem> 

                  ))} 

                  <ListGroupItem>
                    <h2>Write A Customer Review</h2>
                    {errorReviewCreate && <Message variant='danger'>{errorReviewCreate}</Message>}
                    {userInfo ?
                    (
                     <Form onSubmit={submitHandler}>
                       <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating}
                         onChange={(e) => setRating( e.target.value)}
                        >
                           <option value="">Select...</option>
                           <option value="1">1-Poor</option>
                           <option value="2">2-Fair</option>
                           <option value="3">3-Good</option>
                           <option value="4">4-very Good</option>
                           <option value="5">5-Excellent</option>

                          </Form.Control>  

                       </Form.Group>

                       <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                          as='textarea' row="3" 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          >
                          </Form.Control>
                       </Form.Group>
                         <Button
                         type='submit' variant="primary">
                            Submit
                         </Button>
                     </Form>


                      ):(
                      <Message>Please <Link to='/login'>Sign in</Link>To Write A Review</Message>   
                    )}
                    
                  </ListGroupItem> 
                   
               </ListGroup>
            
            </Col> 

          </Row>
         
          </>
           }
           
        </>
    );
};

export default ProductScreen;
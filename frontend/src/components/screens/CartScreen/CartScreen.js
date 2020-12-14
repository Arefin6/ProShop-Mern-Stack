import React from 'react';
import { useEffect,} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../../../actions/cartActions';
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import Message from '../../Message/Message';

const CartScreen = () => {

    const {id} = useParams()
    const history = useHistory()

    const qty = history.location.search ? Number(history.location.search.split('=')[1]):1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(id){
            dispatch(addToCart(id,qty))
        }
    },[dispatch,id,qty])

    const  removeFromCartHandler  = (id) =>  {
          dispatch(removeFromCart(id))
    }

    const handleCheckout =()=>{
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {
              cartItems.length === 0 ?(
                  <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
              ):(
                 <ListGroup variant="flush">
                     {
                       cartItems.map(item =>(
                        <ListGroupItem key={item.product}>
                          
                          <Row>
                              <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded/>  
                              </Col>
                              <Col md={3}>
                                <Link to ={`/product/${item.product}`}>{item.name}</Link>  
                              </Col>
                              <Col md={2}>
                                 ${item.price} 
                              </Col>
                              <Col md={2}>
                                <Form.Control
                                as='select'
                                value={item.qty}
                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                >
                                    {
                                    [...Array(item.countInStock).keys()].map(x =>(
                                        <option key={x +1}  value={ x+1 }>
                                        { x  + 1 }
                                        </option>
                                    ))
                                    }
                                </Form.Control>
                              </Col>
                              <Col md={2}>
                                   
                                 <Button type="button" variant="light"
                                 onClick={()=>removeFromCartHandler(item.product)}
                                 >
                                  <i className="fas fa-trash"></i>   
                                </Button>  

                              </Col>
                          </Row>
                            
                        </ListGroupItem>

                       ))  
                     }
                 </ListGroup>
              )  
            }
          </Col>
          <Col md={4}>
           <ListGroup variant="flush">
               <ListGroupItem>
                   <h2>SubTotal({cartItems.reduce((acc,item)=>acc+item.qty,0)}) Items</h2>
                   Total:$ {
                     cartItems.reduce((acc,item)=>acc+ item.qty * item.price,0).toFixed(2)}
               </ListGroupItem>
                <ListGroupItem>
                    <Button 
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={handleCheckout}
                    >
                     Proceed To Checkout 
                    </Button>
                </ListGroupItem>
           </ListGroup>
          </Col>
         

        </Row>
    );
};

export default CartScreen;
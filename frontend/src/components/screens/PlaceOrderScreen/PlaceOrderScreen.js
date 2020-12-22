import React, { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import CheckoutSteps from '../../CheckoutSteps/CheckoutSteps';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Message from '../../Message/Message';
import { orderCreate } from '../../../actions/orderAction';

const PlaceOrderScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    //calculate prices

    const addDecimals = (num) =>{
        return (Math.round(num *100)/100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc,item)=> acc + item.price * item.qty,0)
    ) 

    cart.shippingPrice = addDecimals( cart.itemsPrice >100 ? 0 :100)

    cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2))

    cart.totalPrice = (
        Number(cart.itemsPrice)
        + Number(cart.shippingPrice)
        + Number(cart.taxPrice)
        ).toFixed(2)

     const createOrder = useSelector(state => state.orderCreate)
     const {order,success,error} = createOrder 

      useEffect(()=>{
            
         if(success){
           history.push(`/order/${order._id}`)
         }
      },[history,success]) 

      const handlePlaceOrder = ()=>{
          dispatch(orderCreate({
              orderItems:cart.cartItems,
              shippingAddress:cart.shippingAddress,
              paymentMethod:cart.paymentMethod,
              itemsPrice:cart.itemsPrice,
              taxPrice:cart.taxPrice,
              shippingPrice:cart.shippingPrice,
              totalPrice:cart.totalPrice,
          }))
    }

    return (
        <>
         <CheckoutSteps step1 step2 step3 step4/>
         <Row>
          <Col md={8}>
           <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p> <strong style={{fontWeight:'bold', color:'#000'}}>Address: </strong>
                    
                    {cart.shippingAddress.address} {cart.shippingAddress.city}
                     {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
                    </p>
                   
                </ListGroup.Item>

                 <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p><strong style={{fontWeight:'bold', color:'#000'}}>Method: </strong>
                      {cart.paymentMethod} 
                     </p>
                 </ListGroup.Item>

                 <ListGroup.Item>
                    <h2>Order Items</h2>
                     {cart.cartItems.length === 0 ? <Message>Your Cart is Empty</Message>
                     :(
                         <ListGroup variant='flush'>
                             {cart.cartItems.map((item,index) =>(
                                <ListGroup.Item key={index}>
                                  
                                    <Row>
                                       <Col md={1}>
                                         <Image
                                         src={item.image}
                                         alt={item.name}
                                         rounded fluid
                                         />
                                       </Col> 
                                       <Col>
                                       <Link to={`/product/${item.product}`}>
                                        {item.name}
                                       </Link>
                                       
                                       </Col>
                                       <Col md={4}>
                                         {item.qty} x ${item.price} = ${item.qty * item.price}
                                       </Col>
                                    </Row>
                                </ListGroup.Item>
                             ))}
                         </ListGroup>
                     ) 
                    }
                 </ListGroup.Item>

           </ListGroup>
          </Col>

           <Col md={4}>
               <Card>
                   <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                         
                         <ListGroup.Item>
                             {error && <Message variant="danger">{error}</Message>}
                         </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                            className="btn-block"
                            type="button"
                            disabled={cart.cartItems===0}
                            onClick={handlePlaceOrder}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>

                   </ListGroup>
               </Card>
           </Col>

         </Row>   
        </>
    )
}

export default PlaceOrderScreen
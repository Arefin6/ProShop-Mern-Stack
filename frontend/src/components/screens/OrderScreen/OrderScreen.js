import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'
import {Link,useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../../../Loader/Loader';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Message from '../../Message/Message';
import { getOrderDetails, payOrder } from '../../../actions/orderAction';
import { ORDER_PAY_RESET } from '../../../constains/orderConstains';

const OrderScreen = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    const [sdkReady,setSdkReady] = useState(false)

     const orderDetails = useSelector(state => state.orderDetails)
     const {order,loading,error} = orderDetails 

     const orderPay = useSelector(state => state.orderPay)
     const {loading:loadingPay,success:successPay} =  orderPay

     if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(
          order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
     }

      useEffect(()=>{
        
        const addPayPalScript = async () =>{
            const {data: clientId} = await axios.get('/api/config/payPal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        } 

         if(!order || successPay){
            dispatch({type:ORDER_PAY_RESET}) 
            dispatch(getOrderDetails(id))
         }
         else if(!order.isPaid){
            if(!window.paypal){
               addPayPalScript()  
            }
            else{
                setSdkReady(true)
            }
         }
       

      },[dispatch,id,successPay,order]) 

     const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult) 
        dispatch(payOrder(id,paymentResult))
     }
    

    return  loading ? ( <Loader/> ) : error ? ( <Message variant="danger">{error}</Message>
    ): ( 
    <>
     <h1>Order {order._id}</h1>    
    <Row>
     <Col md={8}>
      <ListGroup variant="flush">
           <ListGroup.Item>
               <h2>Shipping</h2>
                <p><strong style={{fontWeight:'bold', color:'#000'}}>Name: </strong>
                  {order.user.name}
                </p>
                <p><strong style={{fontWeight:'bold', color:'#000'}}>Email: </strong>
                 <a href={`/mailto:${order.user.email}`}>{order.user.email}</a>
                </p>        

               <p> <strong style={{fontWeight:'bold', color:'#000'}}>Address: </strong>
               
               {order.shippingAddress.address} {order.shippingAddress.city}
                {order.shippingAddress.postalCode} {order.shippingAddress.country}
               </p>
                {order.isDelivered ? <Message variant="success">Delivered at {order.deliveredAt}</Message>:<Message variant="danger">Not Delivered</Message> }
              
           </ListGroup.Item>

            <ListGroup.Item>
               <h2>Payment Method</h2>
               <p><strong style={{fontWeight:'bold', color:'#000'}}>Method: </strong>
                 {order.paymentMethod} 
                </p>
                {order.isPaid ? <Message variant="success">Paid at {order.paidAt}</Message>:<Message variant="danger">Not Paid</Message> }
            </ListGroup.Item>

            <ListGroup.Item>
               <h2>Order Items</h2>
                {order.orderItems.length === 0 ? <Message>Your Cart is Empty</Message>
                :(
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item,index) =>(
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
                           <Col>${order.itemsPrice}</Col>
                       </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <Row>
                           <Col>Shipping</Col>
                           <Col>${order.shippingPrice}</Col>
                       </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <Row>
                           <Col>Tax</Col>
                           <Col>${order.taxPrice}</Col>
                       </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <Row>
                           <Col>Total</Col>
                           <Col>${order.totalPrice}</Col>
                       </Row>
                   </ListGroup.Item>
                   {!order.isPaid && (
                      <ListGroup.Item>
                        {loadingPay && <Loader></Loader>}
                        {!sdkReady ? <Loader></Loader>:(
                            <PayPalButton
                             amount ={order.totalPrice}
                             onSuccess={successPaymentHandler} 
                            />
                        )} 
                      </ListGroup.Item>
                   )}  
                  

              </ListGroup>
          </Card>
      </Col>

    </Row>   
   </>  
        
    ) 
            
}

export default OrderScreen ;
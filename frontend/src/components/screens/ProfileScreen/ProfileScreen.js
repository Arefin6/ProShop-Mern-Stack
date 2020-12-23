import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getUserDetails, updateUserProfile} from '../../../actions/userActions'
import Message from '../../Message/Message';
import Loader from '../../../Loader/Loader';
import { listMyOrders } from '../../../actions/orderAction';

const ProfileScreen = () => {
    const [name,setName] = useState('')
     const [email,setEmail] = useState('')
     const [password,setPassword] = useState('')
     const [confirmPassword,setConfirmPassword] = useState('')
     const [message,setMessage] = useState(null)
     
     const dispatch = useDispatch()

     const userDetails = useSelector(state => state.userDetails )
     const {loading,error,user} = userDetails

     const userLogin = useSelector(state => state.userLogin )
     const {userInfo} = userLogin

     const userUpdateProfile = useSelector(state => state.userUpdateProfile )
     const {success} = userUpdateProfile

     const  orderMyList = useSelector(state => state. orderMyList )
     const {loading:loadingOrders,error:errorOrders,orders} = orderMyList

     const history = useHistory()
    
       
     useEffect(() =>{
           if(!userInfo){
               history.push('/login')
           }
           else{
               if(!user.name){
                   dispatch(getUserDetails('profile'))
                   dispatch(listMyOrders())
               }
               else{
                   setName(user.name)
                   setEmail(user.email)
               }
           }  
     },[history,userInfo,user,dispatch]) 

     const submitHandler = (e)=>{
       if(password !== confirmPassword){
           setMessage('Password Did not Match')
       }
       else{
        //Dispatch Update
         dispatch(updateUserProfile({id:user._id,name,email,password}))
       }  
      
       e.preventDefault()
     } 

    return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler} >

            <Form.Group controlId="name">
                   <Form.Label>Name:</Form.Label>
                   <Form.Control type="text" placeholder="Enter Name"
                   value={name}
                   onChange={(e) =>setName(e.target.value)}
                   ></Form.Control>

               </Form.Group>

               <Form.Group controlId="email">
                   <Form.Label>Email Address:</Form.Label>
                   <Form.Control type="email" placeholder="Enter Email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   ></Form.Control>

               </Form.Group>
               <Form.Group controlId="password">
                   <Form.Label>Password:</Form.Label>
                   <Form.Control type="password" placeholder="Enter Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   ></Form.Control>

               </Form.Group>

               <Form.Group controlId="ConfirmPassword">
                   <Form.Label>Confirm Password:</Form.Label>
                   <Form.Control type="password" placeholder="Confirm Password"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   ></Form.Control>

               </Form.Group>
               <Button type="submit" variant="primary">
                   Update
               </Button>
            </Form>
             
            </Col>
            <Col md={9}>
               <h2>My Orders</h2>
               {loadingOrders ? <Loader></Loader>: errorOrders ? <Message variant='danger'>{errorOrders}</Message>:(
                   <Table striped bordered hover responsive className="table-sm">
                       <thead>
                          <tr>
                           <th>ID</th>
                           <th>DATE</th>
                           <th>TOTAL</th>
                           <th>PAID</th>
                           <th>DELIVERED</th> 
                           <th></th>  
                         </tr> 
                        </thead>
                         <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                  <td>{order._id}</td>
                                  <td>{order.createdAt.substring(0,10)}</td>
                                  <td>$
                                       {order.totalPrice}</td>
                                  <td>{order.isPaid ? (
                                     order.paidAt.substring(0,10) 
                                  ):(
                                    <i className='fas fa-times' style={{color:'red'}}></i>  
                                  )}
                                  </td>

                                   <td>{order.isDelivered ? (
                                     order.deliveredAt.subString(0,10) 
                                  ):(
                                    <i className='fas fa-times' style={{color:'red'}}></i>  
                                  )}</td>
                                  <td>
                                    <Link to={`/order/${order._id}`}>
                                       <Button variant='light' className="btn-sm">Details</Button> 
                                    </Link>  
                                  </td>
                                </tr>
                            ))} 
                         </tbody> 
                       
                   </Table>
               )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
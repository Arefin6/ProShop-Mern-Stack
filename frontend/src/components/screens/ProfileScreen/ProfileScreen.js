import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getUserDetails, updateUserProfile} from '../../../actions/userActions'
import Message from '../../Message/Message';
import Loader from '../../../Loader/Loader';

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

     const history = useHistory()
    
       
     useEffect(() =>{
           if(!userInfo){
               history.push('/login')
           }
           else{
               if(!user.name){
                   dispatch(getUserDetails('profile'))
               }
               else{
                   setName(user.name)
                   setEmail(user.email)
               }
           }  
     },[history,userInfo,user]) 

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
            </Col>
        </Row>
    );
};

export default ProfileScreen;
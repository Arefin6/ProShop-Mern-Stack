import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {userLoginAction} from '../../../actions/userActions'
import FormContainer from '../../FormContainer/FormContainer';
import Message from '../../Message/Message';
import Loader from '../../../Loader/Loader';

const LoginScreen = () => {
     const [email,setEmail] = useState('')
     const [password,setPassword] = useState('')
     
     const dispatch = useDispatch()

     const userLogin = useSelector(state => state.userLogin )
     const {loading,error,userInfo} = userLogin 

     const history = useHistory()
     const redirect = history.location.search ? history.location.search.split('=')[1]:'/'
       
     useEffect(() =>{
           if(userInfo){
               history.push(redirect)
           }  
     },[history,redirect,userInfo]) 
       
    
     const submitHandler = (e)=>{
       dispatch(userLoginAction(email,password))  
       e.preventDefault()
     } 

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler} >
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
               <Button type="submit" variant="primary">
                   Sign In
               </Button>
            </Form>
             
             <Row className="py-3">
                 <Col>
                  New Customer?{' '}
                    <Link to={redirect ? `/register/redirect=${redirect}`:'/register'}>Register</Link>
                 </Col>

             </Row>

        </FormContainer>
    );
};

export default LoginScreen;
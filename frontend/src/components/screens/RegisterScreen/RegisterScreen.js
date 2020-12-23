import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {register} from '../../../actions/userActions'
import FormContainer from '../../FormContainer/FormContainer';
import Message from '../../Message/Message';
import Loader from '../../../Loader/Loader';

const RegisterScreen = () => {
    const [name,setName] = useState('')
     const [email,setEmail] = useState('')
     const [password,setPassword] = useState('')
     const [confirmPassword,setConfirmPassword] = useState('')
     const [message,setMessage] = useState(null)
     
     const dispatch = useDispatch()

     const userRegister = useSelector(state => state.userRegister )
     const {loading,error,userInfo} = userRegister

     const history = useHistory()
     const redirect = history.location.search ? history.location.search.split('=')[1]:'/'
       
     useEffect(() =>{
           if(userInfo){
               history.push(redirect)
           }  
     },[history,redirect,userInfo]) 

     const submitHandler = (e)=>{
       if(password !== confirmPassword){
           setMessage('Password Did not Match')
       }
       else{
        dispatch(register(name,email,password))  
       }  
      
       e.preventDefault()
     } 

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
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
                   Register
               </Button>
            </Form>
             
             <Row className="py-3">
                 <Col>
                  Have An ACcount?{' '}
                    <Link to={redirect ? `/login/redirect=${redirect}`:'/login'}>Login</Link>
                 </Col>

             </Row>

        </FormContainer>
    );
};

export default RegisterScreen;
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {savePaymentMethod} from '../../../actions/cartActions'
import FormContainer from '../../FormContainer/FormContainer';
import CheckoutSteps from '../../CheckoutSteps/CheckoutSteps';

const PaymentScreen = () => {
     
    const history = useHistory()

    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart)
    const{shippingAddress} = cart 

    if(!shippingAddress){
        history.push('/shipping');
    }

  
    const [paymentMethod,setPaymentMethod] = useState('payPal')

     const handleSubmit = (e) =>{
        e.preventDefault() 
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeOrder'); 
     }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
             <h1>Payment Method </h1>

            <Form onSubmit={handleSubmit}>
             
               <Form.Group>
                   <Form.Label as='legend'>Select Method</Form.Label>
               
                <Col>
                   <Form.Check
                    type="radio"
                    label="payPal or Credit Card"
                    value="payPal" 
                    name="PaymentMethod"
                    checked
                    onChange={(e) =>setPaymentMethod(e.target.value)} 
                   >
                   </Form.Check>
                 </Col>
                 </Form.Group>
                
                <Button type="Submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
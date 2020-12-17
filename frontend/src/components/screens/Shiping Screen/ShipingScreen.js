import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {saveShippingAddress} from '../../../actions/cartActions'
import FormContainer from '../../FormContainer/FormContainer';
import CheckoutSteps from '../../CheckoutSteps/CheckoutSteps';

const ShipingScreen = () => {

    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart)
    const{shippingAddress} = cart 

    const history = useHistory()
    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)

     const handleSubmit = (e) =>{
        e.preventDefault() 
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment'); 
     }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <h1>Shipping Details </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                   type="text"
                   placeholder="Your Address"
                   value={address}
                   onChange={e => setAddress(e.target.value)}
                  ></Form.Control>    
                </Form.Group> 

                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control 
                   type="text"
                   placeholder="Your City"
                   value={city}
                   onChange={e => setCity(e.target.value)}
                  ></Form.Control>    
                </Form.Group> 

                <Form.Group controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control 
                   type="Number"
                   placeholder="Your PostalCode"
                   value={postalCode}
                   onChange={e => setPostalCode(e.target.value)}
                  ></Form.Control>    
                </Form.Group> 

                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control 
                   type="text"
                   placeholder="Your Country"
                   value={country}
                   onChange={e => setCountry(e.target.value)}
                  ></Form.Control>    
                </Form.Group> 
                 
                <Button type="Submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default ShipingScreen;
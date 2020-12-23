import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {Link, useHistory, useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getUserDetails, updateUser} from '../../../actions/userActions'
import FormContainer from '../../FormContainer/FormContainer';
import Message from '../../Message/Message';
import Loader from '../../../Loader/Loader';
import { USER_UPDATE_RESET } from '../../../constains/userConstains';

const UserEditScreen = () => {
     const [name,setName] = useState('')
     const [email,setEmail] = useState('')
     
     const [isAdmin,setIsAdmin] = useState(false)
   
     const {id} = useParams() 
     
     const dispatch = useDispatch()

     const userDetails = useSelector(state => state.userDetails )
     const {loading,error,user} = userDetails

     const userUpdate = useSelector(state => state.userUpdate )
     const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdate

     const history = useHistory()
    
       
     useEffect(() =>{
         if(successUpdate){
             dispatch({type:USER_UPDATE_RESET})
             history.push('/admin/userList')
         }
         else{
            if(!user.name || user._id !== id){
                dispatch(getUserDetails(id))
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
         }
        
          
     },[dispatch,user,id,successUpdate]) 

     const submitHandler = (e)=>{
      
       e.preventDefault()

       dispatch(updateUser({_id:id,name,email,isAdmin}))
     } 

    return (
         <>
         <Link to='/admin/userList' className='btn btn-light'>Go Back</Link>

         <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader></Loader>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader></Loader> :
            error ? <Message variant="danger">{error}</Message>:(
                 
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
               <Form.Group controlId="isAdmin">
                   <Form.Check
                    type="checkbox"  
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                   ></Form.Check>

               </Form.Group>

               <Button type="submit" variant="primary">
                   Update
               </Button>
            </Form>
            )}
        </FormContainer>
         </>
        
    );
};

export default UserEditScreen;
import axios from 'axios'
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from '../constains/orderConstains'

export const orderCreate = (order) =>async(dispatch,getState)=>{
    try {
       dispatch({
           type:ORDER_CREATE_REQUEST
       }) 

       const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
               'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
           }
       }

       const {data} = await axios.post(`/api/order`,order,
           config
       ) 
       
       dispatch({
        type:ORDER_CREATE_SUCCESS,
        payload:data
    })

       

    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.message
        })   
    }
}
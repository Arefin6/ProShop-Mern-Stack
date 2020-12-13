import axios from 'axios'
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS ,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from '../constains/productConstains'

export const listProducts = ()=>async(dispatch)=>{
 try {
     dispatch({type: PRODUCT_LIST_REQUEST})
     const {data} = await axios.get('api/products')

      dispatch({
          type:PRODUCT_LIST_SUCCESS,
          payload:data
      })
    } catch (error) {
     
     dispatch({
         type:PRODUCT_LIST_FAIL,
         payload:error.message
     })   
 }   
} 


//Single Product

export const listProductDetails = (id)=>async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)
   
         dispatch({
             type:PRODUCT_DETAILS_SUCCESS,
             payload:data
         })
       } catch (error) {
        
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.message
        })   
    }   
   } 
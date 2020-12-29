import axios from 'axios'
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS ,
    PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
     PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
      PRODUCT_CREATE_REQUEST,
      PRODUCT_CREATE_SUCCESS,
      PRODUCT_CREATE_FAIL,
      PRODUCT_UPDATE_REQUEST,
      PRODUCT_UPDATE_SUCCESS,
      PRODUCT_UPDATE_FAIL,
      PRODUCT_CREATE_REVIEW_FAIL,
      PRODUCT_CREATE_REVIEW_SUCCESS,
      PRODUCT_CREATE_REVIEW_REQUEST

} from '../constains/productConstains'

export const listProducts = (keyword = '')=>async(dispatch)=>{
 try {
     dispatch({type: PRODUCT_LIST_REQUEST})

     const {data} = await axios.get(`/admin/api/products?keyword=${keyword}`)

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

        const {data} = await axios.get(`/admin/api/products/${id}`)
   
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

 //Product Delete
   export const deleteProduct = (id)=>async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST})

      const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
                Authorization:`Bearer ${userInfo.token}`
           }
       }

         await axios.delete(`/admin/api/products/${id}`,config)
   
         dispatch({
             type:PRODUCT_DELETE_SUCCESS,
         })
       } catch (error) {
        
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload:error.message
        })   
    }   
   } 
   
   export const createProduct = ()=>async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST})

      const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
           }
       }

         const {data} = await axios.post(`/admin/api/products`,{},config)
   
         dispatch({
             type:PRODUCT_CREATE_SUCCESS,
             payload:data
         })
       } catch (error) {
        
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload:error.message
        })   
    }   
   }  
   
  //Update Product
  
  export const updateProduct = (product)=>async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST})

      const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
           }
       }

         const {data} = await axios.put(`/admin/api/products/${product._id}`,product,config)
   
         dispatch({
             type:PRODUCT_UPDATE_SUCCESS,
             payload:data
         })
       } catch (error) {
        
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
            payload:error.message
        })   
    }   
   }   

//product Review

   export const reviewProductCreate = (productId,review)=>async(dispatch,getState)=>{
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})

      const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
           }
       }

         await axios.post(`/admin/api/products/${productId}/reviews`,review,config)
   
         dispatch({
             type:PRODUCT_CREATE_REVIEW_SUCCESS,
         })
       } catch (error) {
        
        dispatch({
            type:PRODUCT_CREATE_REVIEW_FAIL,
            payload:error.message
        })   
    }   
   }   
 



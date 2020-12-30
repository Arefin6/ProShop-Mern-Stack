import axios from 'axios'
import { ORDER_MY_LIST_RESET } from '../constains/orderConstains'
import {
    
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
 USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, 
 USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, 
 USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_FAIL, 
 USER_UPDATE_PROFILE_REQUEST, 
 USER_UPDATE_PROFILE_SUCCESS, 
 USER_UPDATE_REQUEST, 
 USER_UPDATE_SUCCESS} from '../constains/userConstains'

export const login = (email,password) =>async(dispatch)=>{
    try {
       dispatch({
           type:USER_LOGIN_REQUEST
       }) 
     
       const config = {
           headers:{
               'Content-type':'application/json'
           }
       }

       const {data} = await axios.post('/api/user/login',
           {email,password},
           config
       ) 
       
       dispatch({
           type:USER_LOGIN_SUCCESS,
           payload:data
       })
       localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })   
    }
}

export const logout =() =>(dispatch)=>{
    localStorage.removeItem('userInfo'); 
    
    dispatch({
      type:USER_LOGOUT   
     })
     dispatch({
        type:USER_DETAILS_RESET
        
     })
     dispatch({
        type:ORDER_MY_LIST_RESET 
     })
     dispatch({
         type:USER_LIST_RESET
     })
     document.location.href = '/login'
}

//user get Details

export const getUserDetails = (id) =>async(dispatch,getState)=>{
    try {
       dispatch({
           type:USER_DETAILS_REQUEST
       }) 

       const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
               'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
           }
       }

       const {data} = await axios.get(`/api/user/${id}`,
           config
       ) 
       
       dispatch({
        type:USER_DETAILS_SUCCESS,
        payload:data
    })

       

    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })   
    }
}

//get All User Action
export const listUsers = () =>async(dispatch,getState)=>{
    try {
       dispatch({
           type:USER_LIST_REQUEST
       }) 

       const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
                Authorization:`Bearer ${userInfo.token}`
           }
       }

       const {data} = await axios.get(`/api/user`,
           config
       ) 
       
       dispatch({
        type:USER_LIST_SUCCESS,
        payload:data
    })

       

    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })   
    }
}



//User Register
export const register = (name,email,password) =>async(dispatch,getState)=>{
    try {
       dispatch({
           type:USER_REGISTER_REQUEST
       }) 
     
       const config = {
           headers:{
               'Content-type':'application/json'
           }
       }

       const {data} = await axios.post('/api/user',
           {name,email,password},
           config
       ) 
       
       dispatch({
        type:USER_REGISTER_SUCCESS,
        payload:data
    })

       dispatch({
           type:USER_LOGIN_SUCCESS,
           payload:data
       })
       localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })   
    }
}


//update Profile

export const updateUserProfile = (user) =>async(dispatch,getState)=>{
    try {
       dispatch({
           type:USER_UPDATE_PROFILE_REQUEST
       }) 

       const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
               'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
           }
       }

       const {data} = await axios.put(`/api/user/profile`,user,
           config
       ) 
       
       dispatch({
        type:USER_UPDATE_PROFILE_SUCCESS,
        payload:data
    })

       

    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })   
    }
}

//Delete User

export const deleteUser = (id) =>async(dispatch,getState)=>{
    try {
       dispatch({
           type:USER_DELETE_REQUEST
       }) 

       const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
                
                Authorization:`Bearer ${userInfo.token}`
           }
       }

      await axios.delete(`/api/user/${id}`,
           config
       ) 
       
       dispatch({
        type:USER_DELETE_SUCCESS
    })

       

    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })   
    }
}

//update User


export const updateUser = (user) =>async(dispatch,getState)=>{
    try {
       dispatch({
           type:USER_UPDATE_REQUEST
       }) 

       const {userLogin:{userInfo}}=getState()
     
       const config = {
           headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
           }
       }

       const{data} =  await axios.put(`/api/user/${user._id}`,user,
           config
       ) 
       
       dispatch({
        type:USER_UPDATE_SUCCESS
    })
    dispatch({
        type:USER_DETAILS_SUCCESS,
        payload:data
    })

       

    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })   
    }
}

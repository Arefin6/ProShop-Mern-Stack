import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {productListReducer,productDetailsReducer} from './reducers/productReducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import { cartItemReducer } from './reducers/cartReducer'
import { userDetailsReducer, userLoginReducer, userProfileUpdateReducer, userRegisterReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  cart:cartItemReducer,
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userProfileUpdateReducer
  
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null

const initialState = {
  cart:{cartItems:cartItemFromStorage},
  userLogin:{userInfo:userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(

    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    
)

export default store
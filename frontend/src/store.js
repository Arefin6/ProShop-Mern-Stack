import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {productListReducer,productDetailsReducer} from './reducers/productReducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import { cartItemReducer } from './reducers/cartReducer'
import { orderCreateReducer } from './reducers/orderReducer'
import { userDetailsReducer, userLoginReducer, userProfileUpdateReducer, userRegisterReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  cart:cartItemReducer,
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userProfileUpdateReducer,
  orderCreate:orderCreateReducer
  
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')):{}

const initialState = {
  cart:{cartItems:cartItemFromStorage,
   shippingAddress:shippingAddressFromStorage
  },
  userLogin:{userInfo:userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(

    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    
)

export default store
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {productListReducer,productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer} from './reducers/productReducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import { cartItemReducer } from './reducers/cartReducer'
import { myOrderListReducer, orderCreateReducer, orderDeliveredReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducer'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userProfileUpdateReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  productDelete:productDeleteReducer,
  productCreate:productCreateReducer,
  productUpdate:productUpdateReducer,
  cart:cartItemReducer,
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userProfileUpdateReducer,
  orderCreate:orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderDelivered:orderDeliveredReducer,
  orderMyList:myOrderListReducer,
  orderList:orderListReducer,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer
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
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {productListReducer,productDetailsReducer} from './reducers/productReducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import { cartItemReducer } from './reducers/cartReducer'

const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  cart:cartItemReducer
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]

const initialState = {
  cart:{cartItems:cartItemFromStorage}
}

const middleware = [thunk]

const store = createStore(

    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    
)

export default store
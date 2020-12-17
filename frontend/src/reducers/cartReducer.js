import { CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS  } from "../constains/cartConstains"

export const cartItemReducer = (state = {cartItems:[],shippingAddress:{}},action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
           const item = action.payload
           
           const existsItem = state.cartItems.find(x => x.product === item.product)

           if (existsItem) {
               return {
                   ...state,
                   cartItems:state.cartItems.map(x => x.product === existsItem.product ? item :x)
               }
           } else {
               return{
                   ...state,
                   cartItems:[...state.cartItems,item]
               }
           } 
         case CART_REMOVE_ITEM: 
           return{
               ...state,
               cartItems:state.cartItems.filter(x =>x.product !== action.payload)
           }
           case CART_SAVE_SHIPPING_ADDRESS: 
           return{
               ...state,
               shippingAddress:action.payload
           }  
        default:
         return state   
    }
}
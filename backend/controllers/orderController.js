import Order from '../models/orderModel.js'

import asyncHandler from 'express-async-handler'

const addNewOrder = asyncHandler(async(req,res)=>{
    
     const {orderItems,
         shippingAddress,
         paymentMethod,
         itemPrice,
         taxPrice,
         shippingPrice,
         totalPrice }=req.body

      if(orderItems && orderItems.length === 0){
          res.status(400).json({message:"No Order Items"})
      } 
      else{
          const order = new Order({
            orderItems,
         shippingAddress,
         paymentMethod,
         itemPrice,
         taxPrice,
         shippingPrice,
         totalPrice  
          })

        const createOrder = await order.save()
        
        res.status(201).json(createOrder)

      }   
    
})

export {addNewOrder}
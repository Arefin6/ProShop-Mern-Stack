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
          return
      } 
      else{
          const order = new Order({
         orderItems,
         user:req.user._id,
         shippingAddress,
         paymentMethod,
         itemPrice,
         taxPrice,
         shippingPrice,
         totalPrice  
          })

        const createdOrder = await order.save()
        
        res.status(201).send(createdOrder)

      }   
    
})

const getOrderById = asyncHandler(async(req,res)=>{
    
  const order =  await Order.findById(req.params.id).populate('user','name email')
   
    if(order){
      res.send(order)
    }
    else{
      res.status(404).json({message:'Order Not Found'})
    }
})

//update order to be paid

const updateOrderToPaid = asyncHandler(async(req,res)=>{
    
  const order =  await Order.findById(req.params.id)
   
    if(order){
       order.isPaid = true
       order.paidAt = Date.now()
       order.paymentResult = {
         id:req.body.id,
         status:req.body.status,
         update_time:req.body.update_time,
         email_address:req.body.payer.email_address
       }
       const updatedOrder = await order.save()

       res.send(updatedOrder)
    }
    else{
      res.status(404).json({message:'Order Not Found'})
    }
})


//Get Order oF LoggedIn User

const getMyOrders = asyncHandler(async(req,res)=>{

  
    const orders =  await Order.find({user: req.user._id})


  res.send(orders)
   
})

export {addNewOrder,getOrderById,updateOrderToPaid,getMyOrders}
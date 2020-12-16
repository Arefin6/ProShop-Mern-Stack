import Product from '../models/productModel.js'

import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({})

    res.json(products)
})

const getProductsById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)

    if(product){
        res.send(product)
    }
    else{
        res.status(404).json({message:'Product Not Found'})
    }
})

export {getProducts, getProductsById }
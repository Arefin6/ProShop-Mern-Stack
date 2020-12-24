import Product from '../models/productModel.js'

import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async(req,res)=>{

    const products = await Product.find({})

    res.send(products)
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

const deleteProduct = asyncHandler(async(req,res)=>{

    const product = await Product.findById(req.params.id)

    if(product){

        await product.remove()

        res.json({
            message:'Product Removed'
        })
    }
    else{
        res.status(404).json({message:'Product Not Found'})
    }
})

//Create Product
const createProduct = asyncHandler(async(req,res)=>{

    const product = new Product ({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save() 

    res.json(createProduct)
   
})

//Update Product

const updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
       res.json({
           message:'Not Found'
       })
    }
  })

export {getProducts, getProductsById,deleteProduct,createProduct,updateProduct }
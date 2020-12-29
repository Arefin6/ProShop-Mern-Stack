import Product from '../models/productModel.js'

import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async(req,res)=>{
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ?{
        name:{
         $regex:req.query.keyword,
         $options:'i'
        },
    }:{}

    const count = await Product.countDocuments ({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))

    res.send({products,page,pages:Math.ceil(count/pageSize)})
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

    res.send(createdProduct)
   
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

  //Product Review

  const createProductReview = asyncHandler(async (req, res) => {
    const {rating,comment} = req.body
  
    const product = await Product.findById(req.params.id)
    
    if (product) {

       const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
       
       if(alreadyReviewed){
          const message = 'You Already Reviewed"' 
          res.status(400).json(message);

       }
       else{
        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
 
        product.reviews.push(review)
        product.numReviews = product.reviews.length
 
        product.rating = product.reviews.reduce((acc,item)=> item.rating + acc,0)/product.reviews.length
     
        await product.save()
 
       res.status(201).json({message:'review added'})   
       }
      
    } else {
      res.status(404)
       res.json({
           message:'Not Found'
       })
    }
  })

  //get Top Products

  const getTopProducts = asyncHandler(async (req, res) => {
    
  
    const product = await Product.find({}).sort({rating:-1}).limit(3)
    
    res.send(product)

  })




export {getProducts, getProductsById,deleteProduct,createProduct,
    updateProduct,createProductReview,getTopProducts
}
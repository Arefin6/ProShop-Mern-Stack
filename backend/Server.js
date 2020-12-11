const express = require('express')

const products = require('./data/products')

const app = express()

app.get('/',(req,res)=>{
    res.send('Hello Arefin');
})
app.get('/api/products',(req,res)=>{
    
    res.json(products)
})
app.get('/api/product/:id',(req,res)=>{
    
    const product = products.find(p => p._id === req.params.id);

    res.send(product)
})

app.listen(8080,console.log('Listening buddy'));
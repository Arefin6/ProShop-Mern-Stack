import  express from 'express'
import  dotEnv from 'dotenv'
import  products from'./data/products.js'

 dotEnv.config()

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

const Port = process.env.PORT;
app.listen(Port||8080 ,console.log('Listening buddy'));
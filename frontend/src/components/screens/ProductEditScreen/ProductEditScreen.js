import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {Link, useHistory, useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../../FormContainer/FormContainer';
import Message from '../../Message/Message';
import Loader from '../../../Loader/Loader';
import { listProductDetails, updateProduct } from '../../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../../constains/productConstains';


const ProductEditScreen = () => {
     const [name,setName] = useState('')
     const [price,setPrice] = useState(0)
     const [image,setImage] = useState('')
     const [brand,setBrand] = useState('')
     const [category,setCategory] = useState('')
     const [countInStock,setCountInStock] = useState(0) 
     const [description,setDescription] = useState('')
     const [uploading,setUploading] = useState(false)
   
     const {id} = useParams() 
     
     const dispatch = useDispatch()

     const productDetails = useSelector(state => state.productDetails )
     const {loading,error,product} = productDetails

     const productUpdate = useSelector(state => state.productUpdate )
     const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate


     const history = useHistory()
    
       
     useEffect(() =>{
           if(successUpdate){
               dispatch({type:PRODUCT_UPDATE_RESET})

               history.push('/admin/productList')
           }
           else{
              
            if(!product.name || product._id !== id){
                dispatch(listProductDetails(id))
            }
            else{
                setName(product.name)
                setPrice(product.price)
                setCategory(product.category)
                setBrand(product.brand)
                setImage(product.image)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }

           }        
     },[dispatch,product,id,successUpdate,history]) 

     const handleFileUpload = async(e) =>{
     const file = e.target.files[0]
    const formData = new FormData();
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)

    }
      
     }

     const submitHandler = (e)=>{
      
       e.preventDefault()

       //Update Product
       dispatch(updateProduct({
           _id:id,
           name,
           price,
           category,
           brand,
           countInStock,
           description,
           image

       })
       )
     }
     
     

    return (
         <>
         <Link to='/admin/productList' className='btn btn-light'>Go Back</Link>

         <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader></Loader>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader></Loader> :
            error ? <Message variant="danger">{error}</Message>:(
                 
                <Form onSubmit={submitHandler} >

            <Form.Group controlId="name">
                   <Form.Label>Name:</Form.Label>
                   <Form.Control type="text" placeholder="Enter Name"
                   value={name}
                   onChange={(e) =>setName(e.target.value)}
                   ></Form.Control>

               </Form.Group>

               <Form.Group controlId="price">
                   <Form.Label>Price:</Form.Label>
                   <Form.Control type="number" placeholder="Enter Price"
                   value={price}
                   onChange={(e) => setPrice(e.target.value)}
                   ></Form.Control>
               </Form.Group>
               <Form.Group controlId="image-file">
               <Form.Label>Image:</Form.Label>
               <Form.Control type="text" placeholder="Enter Image Url"
                   value={image}
                   onChange={(e) => setImage(e.target.value)}
                   ></Form.Control>
                  <Form.File
                   type="file"
                   id='image-file'
                   label='choose File'
                   name='image'
                   onChange={handleFileUpload}
                  >
                  </Form.File> 
                 {uploading && <Loader></Loader>}
               </Form.Group>

               <Form.Group controlId="category">
               <Form.Label>Category:</Form.Label>
                <Form.Control type="text" placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>

                </Form.Group>

                <Form.Group controlId="brand">
                <Form.Label>Brand:</Form.Label>   
                <Form.Control type="text" placeholder="Enter Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock:</Form.Label>
                <Form.Control type="number" placeholder="Enter Count InStock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>  
                <Form.Control type="text" placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

               <Button type="submit" variant="primary">
                   Update
               </Button>
            </Form>
            )}
        </FormContainer>
         </>
        
    );
};

export default ProductEditScreen;
import React, { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {Link, useHistory, useParams} from 'react-router-dom'
import Loader from '../../../Loader/Loader'
import Message from '../../Message/Message'
import { listProducts, deleteProduct, createProduct} from '../../../actions/productActions'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { PRODUCT_CREATE_RESET } from '../../../constains/productConstains';
const ProductListScreen = () => {
     const dispatch = useDispatch()

     const history = useHistory()

     const {id} = useParams()
     
      const productList = useSelector(state => state.productList)
      const {loading,error,products} = productList

      const productCreate = useSelector(state => state.productCreate)
      const {loading:loadingCreate,error:errorCreate,success:successCreate, product:createdProduct} = productCreate


      const productDelete = useSelector(state => state.productDelete)
      const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete

      const userLogin = useSelector(state => state.userLogin)
      const {userInfo} = userLogin
      
      useEffect(()=>{
          dispatch({type:PRODUCT_CREATE_RESET})
           
          if( !userInfo.isAdmin){
            history.push('/login')
          }
          if(successCreate){
              history.push(`/admin/product/${createdProduct._id}/edit`)
          }
          else{
              dispatch(listProducts())
          }
          
          
      },[dispatch,history,userInfo,successDelete,successCreate,createdProduct])

      const deleteHandler = (id) => {
          if(window.confirm('Are You Sure')){
           //Delete Products
            dispatch(deleteProduct(id))
          }
          
      }
      const addProductHandler = () =>{
         dispatch(createProduct())
      }

    return (
        <>
         <Row className='align-items-center'>
             <Col>
               <h1>Products</h1>
             </Col>
             <Col className='text-right'>
                <Button className='my-3' onClick={addProductHandler}>
                     <i className='fas fa-plus'></i> Create Product
                </Button> 
             </Col>
         </Row>
         {loadingCreate && <Loader></Loader>}
         {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
         {loadingDelete && <Loader></Loader>}
         {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
         {loading ? <Loader></Loader>: error ? <Message variant='danger'>{error}</Message> :(
             <Table striped bordered hover responsive className="table-sm">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NAME</th> 
                         <th>PRICE</th> 
                         <th>CATEGORY</th>
                         <th>BRAND</th>
                         <th></th>  
                     </tr>
                 </thead>
                 <tbody>
                     {products.map(product => (

                         <tr key ={product._id}>

                            <td>{product._id}</td>

                             <td>{product.name}</td>

                            <td>${product.price}</td>

                            <td>
                              {product.category}  
                            </td>
                            <td>
                              {product.brand}  
                            </td>
                            <td>
                               <Link to={`/admin/product/${product._id}/edit`}>
                                 <Button variant='light' className='btn-sm'>
                                      <i className='fas fa-edit'></i>
                                 </Button>
                               </Link>
                               <Button
                                variant='danger'
                                className='btn-sm'
                                onClick ={ () => deleteHandler(product._id)}
                               >
                                  <i className="fas fa-trash"></i>
                                </Button> 
                            </td>

                         </tr>
                     ))}
                 </tbody>

             </Table>
         ) }   
        </>
    );
};

export default ProductListScreen;
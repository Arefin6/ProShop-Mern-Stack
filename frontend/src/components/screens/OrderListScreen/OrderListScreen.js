import React, { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import Loader from '../../../Loader/Loader'
import Message from '../../Message/Message'
import {listOrders} from '../../../actions/orderAction'
import { Button, Table } from 'react-bootstrap';
const OrderListScreen = () => {
     const dispatch = useDispatch()

     const history = useHistory()
     
      const orderList = useSelector(state => state.orderList)
      const {loading,error,orders} = orderList

      const userLogin = useSelector(state => state.userLogin)
      const {userInfo} = userLogin

      
      useEffect(()=>{
          if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
          }
          else{
              history.push('/login')
          }
          
      },[dispatch,history,userInfo])

    

    return (
        <>
         <h1>Orders</h1>
         {loading ? <Loader></Loader>: error ? <Message variant='danger'>{error}</Message> :(
             <Table striped bordered hover responsive className="table-sm">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>USER</th> 
                         <th>DATE</th> 
                         <th>TOTAL</th>
                         <th>PAID</th> 
                         <th>DELIVERED</th>  
                         <th></th> 
                     </tr>
                 </thead>
                 <tbody>
                     {orders.map(order => (

                         <tr key ={order._id}>

                            <td>{order._id}</td>

                             <td>{order.user && order.user.name}</td>

                            <td>{order.createdAt.substring(0,10)}</td>

                            <td>${order.totalPrice}</td>

                            <td>{order.isPaid ? 
                                 (
                                  order.paidAt.substring(0,10)
                                 ): (
                                    <i className="fas fa-times" 
                                    style={{color:'red'}}></i>       
                                 )}
                            </td>
                            <td>{order.isDelivered ? 
                                 (
                                  order.deliveredAt.substring(0,10)
                                 ): (
                                    <i className="fas fa-times" 
                                    style={{color:'red'}}></i>       
                                 )}
                            </td>
                            <td>
                               <Link to={`/order/${order._id}`}>
                                 <Button variant='light' className='btn-sm'>
                                     Details
                                 </Button>
                               </Link>
                               
                            </td>

                         </tr>
                     ))}
                 </tbody>

             </Table>
         ) }   
        </>
    );
};

export default OrderListScreen;
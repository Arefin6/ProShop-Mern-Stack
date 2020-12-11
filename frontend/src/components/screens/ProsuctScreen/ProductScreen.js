import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../../Rating/Rating';

const ProductScreen = () => {
   const {id}  = useParams();
   const [product,setProduct] = useState([]);

   useEffect(()=>{
          fetch(`/api/product/${id}`)
          .then(res => res.json())
          .then(data => setProduct(data))
   },[])
   
  //  const product = products.find((p) => p._id === id)
    
    return (
        <>
           <Link  className="btn btn-light my-3" to="/">
           Go Back
           </Link>

           <Row>
               <Col md={6}>
                  <Image src={product.image} alt ={product.name} fluid/>
               </Col>
               <Col md={3}>
                  <ListGroup variant="flush">
                      <ListGroup.Item>
                       <h3>{product.name}</h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                       <Rating
                       value={product.rating}
                       text={`${product.numReviews} reviews`}
                       />
                      </ListGroup.Item>
                      <ListGroup.Item>
                       Price:${product.price}
                      </ListGroup.Item>
                      <ListGroup.Item>
                       Description:{product.description}
                      </ListGroup.Item>

                  </ListGroup>
               </Col>

               <Col md={3}>
                 <Card>

                 <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                            <Col>Price</Col>
                            <Col><strong>${product.price}</strong></Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                            <Col>Status</Col>
                             <Col>{product.countInStock > 0 ? 'In Stock' : "Out of Stock"}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                         <Button className="btn-block" type="button" disabled={product.countInStock === 0 ? true : false }>
                             Add To Cart
                         </Button>
                      </ListGroup.Item>
                 </ListGroup>
                 </Card>
               </Col>
           </Row>
        </>
    );
};

export default ProductScreen;
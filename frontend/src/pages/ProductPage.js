import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Card,Image,ListGroup, Button,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from "react-redux"
import axios from 'axios'
import Rating from '../components/Rating'
import { getProductDetail } from '../redux/product/actionCreator'
import Loader from '../components/Loader'
import Message from '../components/Message'
const ProductPage = ({history,match}) => {
    const [qty,setQty]=useState(1)
    const {loading,error,product}=useSelector(state=>state.productDetail)
    const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(getProductDetail(match.params.id))
    },[dispatch,match.params.id])
    const addToCart=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <div>
            <Link to="/" className="btn btn-light mb-3" >
                Go back
            </Link>
           {
               loading?<Loader/>:
               error?<Message variant="danger" message={error}/>:
               (
                    <Row>
                <Col md={6}>
                    <Image src={product.image} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                             <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.rating} numReviews={product.numReviews}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {`Price: $${product.price}`}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col>{`$${product.price}`}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>{product.countInStock>0?"In Stock":"not available"}</Col>
                                </Row>
                            </ListGroup.Item>
                          {product.countInStock>0&&(
                                <ListGroup.Item>
                                <Row>
                                    <Col>Quantity</Col>
                                    <Col>
                                    <Form.Control as="select" onChange={(e)=>setQty(e.target.value)}>
                                        {
                                            [...Array(product.countInStock).keys()].map(item=>{
                                                return <option key={item+1} value={item+1} >{item+1}</option>
                                            })
                                        }
                                        
                                    </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                          )}
                            <ListGroup.Item >
                               <Button className="btn btn-dark btn-block" type="button" disabled={product.countInStock===0}
                               onClick={addToCart}>ADD TO CART</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
               )
           }
        </div>
    )
}

export default ProductPage
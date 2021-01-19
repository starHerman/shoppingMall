import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Card,Image,ListGroup, Button,Form, Alert} from 'react-bootstrap'
import {useDispatch,useSelector} from "react-redux"
import axios from 'axios'
import Rating from '../components/Rating'
import { createProductReviews, getProductDetail } from '../redux/product/actionCreator'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PRODUCT_CREATE_REVIEWS_RESET} from '../redux/product/actionType'
const ProductPage = ({history,match}) => {
    const [qty,setQty]=useState(1)
    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState("")
    const {loading,error,product}=useSelector(state=>state.productDetail)
    const {userInfo}=useSelector(state=>state.userLogin)
    const {loading:reviewCreateLoading,success,error:reviewCreateError}=useSelector(state=>state.productReviewCreate)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(success){
            dispatch(getProductDetail(match.params.id))
            setComment("")
            setRating(0)
        }
        if(!userInfo){
             dispatch({ type: PRODUCT_CREATE_REVIEWS_RESET })
        }
        if(!product._id||product._id!=match.params.id){
            console.log("ss")
             dispatch(getProductDetail(match.params.id))
            dispatch({ type: PRODUCT_CREATE_REVIEWS_RESET })
        }
       
    },[dispatch,match.params.id,userInfo,success])
    const addToCart=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(createProductReviews(match.params.id,{rating,comment}))
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
                   <>
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
            <Row mt={6}> 
                <Col md={6}>
                    <h1>Product Reviews</h1>
                    {product.reviews.length===0&&<Message variant="danger" message="No Comments"></Message>}
                        <ListGroup variant="flush">
                            {
                                product.reviews.map(r=>(
                                    <ListGroup.Item key={r._id}>
                                        <h6>{r.name}</h6>
                                        <Rating rating={r.rating} ></Rating>
                                        <h6>{r.createdAt}</h6>
                                        <p>{r.comment}</p>
                                    </ListGroup.Item>
                                ))
                            }
                            <ListGroup.Item>
                                <h1>Write A Customer Review</h1>
                                {reviewCreateLoading&&<Loader/>}
                                {reviewCreateError&&<Message message={reviewCreateError}></Message>}
                                {userInfo?<Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                as='textarea'
                                row='3'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button
                                type='submit'
                                variant='primary'>
                                Submit
                            </Button>
                                </Form>:
                                <Alert variant="danger">
                                   You can <Link to="/login">Sign In</Link> to write a review</Alert>}
                            </ListGroup.Item>
                        </ListGroup>
                    
                </Col>
            </Row>
            </>
               )
           }
        </div>
    )
}

export default ProductPage
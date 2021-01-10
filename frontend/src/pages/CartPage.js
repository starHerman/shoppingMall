import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { addCartItem, removeCartItem } from '../redux/cart/actionCreator'
import { CART_ADD_ITEM } from '../redux/cart/actionType'
import {Row,Col,ListGroup,Container,Image,Form,Button, ListGroupItem} from 'react-bootstrap'
import Message from '../components/Message'
import  _ from 'lodash'
const CartPage = ({history,match,location}) => {
    const {cartItems}= useSelector(state=>state.cart)
    const dispatch=useDispatch()
    const id=match.params.id
    const qty=Number(location.search.split("=")[1])
    useEffect(()=>{
        //?qty=1
        if(id){
            dispatch(addCartItem(id,qty))
        }
           
    },[dispatch,id,qty])
    const removeItemFromCart=(id)=>{
        console.log(id)
        dispatch(removeCartItem(id))
    }
    const checkoutHandler=()=>{
        history.push("/login?redirect=shipping")
    }
    return (
        <Container>
           <Row>
              <Col md={8}>
                   <h2>Shopping Cart</h2>
               {
                   cartItems.length===0?
                   <div>
                       <Link to="/" className="btn btn-light">Go Back</Link>
                       <Message message='You cart is empty'></Message>
                   </div>:
                   <ListGroup variant="flush">
                       {
                           cartItems.map(item=>{
                               return <ListGroup.Item  key={item.productId}>
                                   <Row>
                                       <Col md={2}>
                                           <Image src={item.image} fluid rounded></Image>
                                       </Col>
                                       <Col md={3}>
                                           <h3 style={{fontSize:'1.0rem'}}>{item.name}</h3>
                                       </Col>
                                       <Col md={2}>
                                           <h3 style={{fontSize:'1.0rem'}}> ${item.price}</h3>
                                       </Col>
                                       <Col md={3}>
                                            <Form.Control 
                                            value={item.qty}
                                            as="select" 
                                            onChange={(e)=>dispatch(addCartItem(item.productId,e.target.value))}>
                                               {
                                                    [...Array(item.countInStock).keys()].map(item=>{
                                                    return <option key={item} value={item+1}>{item+1}</option>
                                                })
                                               }
                                            </Form.Control>
                                       </Col>
                                       <Col md={2}>
                                           <Button type="button" variant="light" onClick={()=>removeItemFromCart(item.productId)}>
                                               <i className='fas fa-trash'></i>
                                           </Button>
                                       </Col>

                                   </Row>
                               </ListGroup.Item>
                           })
                       }
                   </ListGroup>
               }
              </Col>
              <Col md={4}>
                  <ListGroup>
                      <ListGroup.Item>
                          <h4>SUBTOTAL ({cartItems.reduce((acc,cur)=>acc+Number(cur.qty),0)})ITEMS</h4>
                          ${
                              _.round(cartItems.reduce((acc,cur)=>acc+cur.qty*cur.price,0),2)
                          }
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <Button type="button" 
                          className="btn btn-block btn-dark"
                          onClick={checkoutHandler}
                          >Proceed To Checkout</Button>
                      </ListGroup.Item>
                  </ListGroup>
              </Col>
           </Row>
        </Container>
    )
}

export default CartPage

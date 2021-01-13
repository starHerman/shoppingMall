import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PayPalButton} from 'react-paypal-button-v2'
// import CheckoutSteps from '../components/CheckoutSteps'
import { getOrderById,updateOrderToPaid } from '../redux/order/actionCreator'
import { ORDER_PAY_RESET } from '../redux/order/actionType'

const OrderPage = ({match}) => {
    const [payPalSdk,setPayPalSdk]=useState(false)
    const dispatch = useDispatch()
    const {loading,order,error}= useSelector((state) => state.orderDetails)
    const {loading:loadingPay,success:successPay}=useSelector(state=>state.orderPay)
    const orderId=match.params.id
    useEffect(() => {
        const loadPaypalScript=async ()=>{
            const {data:clientId}=await axios.get("/api/config/clientId")
            const script=document.createElement("script");
            script.type = 'text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload=()=>{
                setPayPalSdk(true)
            }
            document.body.appendChild(script)
        }
        loadPaypalScript()
        if(!order||successPay||orderId!=order._id)
            dispatch(getOrderById(orderId))
        
    }, [dispatch,orderId,successPay])

    const successPaymentHandler=(paymentResult)=>{
        console.log(paymentResult)
        dispatch(updateOrderToPaid(orderId,paymentResult))
    }
    return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger' message={error}></Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success' message={`Delivered on ${order.shippingAddress.address}`}></Message>
              ) : (
                <Message variant='danger' message="Not Delivered"></Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success' message={`>Paid on ${order.paidAt}`}></Message>
              ) : (
                <Message variant='danger' message="Not Paid"></Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{`$${order.totalPrice}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid&&(
                  <ListGroup.Item>
                      {loadingPay&&<Loader/>}
                       {!payPalSdk ? (
                        <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                  </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderPage

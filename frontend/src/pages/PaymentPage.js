import React, { useState } from 'react'
import { Form, Button, Col,Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../redux/cart/actionCreator'


const PaymentPage = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <Container >
        <CheckoutSteps step1 step2  />
        <Row className="justify-content-center">
            <Form onSubmit={submitHandler}>
                <h1>Payment Method</h1>
                <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                    type='radio'
                    label='Stripe'
                    id='Stripe'
                    name='paymentMethod'
                    value='Stripe'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                Continue
                </Button>
            </Form>
        </Row>
    </Container>
  )
}

export default PaymentPage
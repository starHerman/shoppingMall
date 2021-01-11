import React,{useState} from 'react'
import { Col, Container,Row,Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {saveShppingAddress} from '../redux/cart/actionCreator'
import CheckoutSteps from '../components/CheckoutSteps'
const ShippingPage = ({history}) => {
    const {shippingAddress}=useSelector(state=>state.cart)
    const[address,setAddress]=useState(shippingAddress.address)
    const[city,setCity]=useState(shippingAddress.city)
    const[postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const[country,setCountry]=useState(shippingAddress.country)
    const dispatch=useDispatch()

    const submitHandeler=(e)=>{
        e.preventDefault()
        dispatch(saveShppingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        <Container>
            
           <Row className="justify-content-center">
               <Col md={6}>
                   <CheckoutSteps step1 ></CheckoutSteps>
                   <h1>Shipping</h1>
                    <Form onSubmit={submitHandeler}>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="select the address"
                            value={address}
                            required
                            onChange={e=>setAddress(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="select the city"
                            value={city}
                            onChange={e=>setCity(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="postalCode">
                            <Form.Label>PostalCode</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="enter the postalCode"
                            value={postalCode}
                            onChange={e=>setPostalCode(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="select your country"
                            value={country}
                            onChange={e=>setCountry(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="dark" type="submit">Continue</Button>
            </Form>
               </Col>
           </Row>
        </Container>
    )
}

export default ShippingPage

import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Form,Container,Row,Col, Button} from 'react-bootstrap'
import { userLogin } from '../redux/user/actionCreator'
import Message from '../components/Message'
import Loader from '../components/Loader'
const LoginPage = ({location,history}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
    const redirect=location.search?location.search.split("=")[1]:""
    const {loading,error,userInfo} =useSelector(state=>state.userLogin)

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])
    const loginHandler=(e)=>{
        e.preventDefault();
       dispatch(userLogin(email,password))
    }
    return (
        <Container>
                <Row className="justify-content-center">
                <Col md={6}>
                    <h1>Sign In</h1>
                    {loading&&<Loader/>}
                    {error&&<Message variant="danger" message={error}/>}
                    <Form onSubmit={loginHandler}>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" 
                            placeholder="Enter the email" 
                            value={email} 
                            onChange={(e)=>setEmail(()=>e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>password </Form.Label>
                            <Form.Control type="password" 
                            placeholder="Enter the password"
                            value={password}
                            onChange={(e)=>setPassword(()=>e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button variant="dark" type="submit">Submit</Button>
                        <Row className="px-3 py-3"> 
                            New Customer?<Link to={redirect?`/register?redirect=${redirect}`:"/register"}>Register</Link>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage

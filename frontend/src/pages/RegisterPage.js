import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Form,Container,Row,Col, Button} from 'react-bootstrap'
import { userRegister } from '../redux/user/actionCreator'
import Message from '../components/Message'
import Loader from '../components/Loader'
const RegisterPage = ({location,history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [message,setMessage]=useState(null)
    const dispatch=useDispatch()
    const redirect=location.search?location.search.split("=")[1]:""
    const {loading,error,userInfo} =useSelector(state=>state.userRegister)

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])
    const loginHandler=(e)=>{
        e.preventDefault();
       if(password!==confirmPassword){
           setMessage("Password Not Match ")
       }else{
           dispatch(userRegister(name,email,password))
       }
    }
    return (
        <Container>
                <Row className="justify-content-center">
                <Col md={6}>
                    <h1>Sign Up</h1>
                    {message&&<Message variant="danger" message={message}/>}
                    {loading&&<Loader/>}
                    {error&&<Message variant="danger" message={error}/>}
                    <Form onSubmit={loginHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" 
                            placeholder="Enter the username" 
                            value={name} 
                            onChange={(e)=>setName(()=>e.target.value)}></Form.Control>
                        </Form.Group>
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
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" 
                            placeholder="Enter the confirm password" 
                            value={confirmPassword} 
                            onChange={(e)=>setConfirmPassword(()=>e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button variant="dark" type="submit">Submit</Button>
                        <Row className="px-3 py-3"> 
                            Have an account?<Link to={redirect?`/login?redirect=${redirect}`:"/login"}>Sign In</Link>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage

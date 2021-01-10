import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Form,Container,Row,Col, Button} from 'react-bootstrap'
import { getUserDetails,updateUserProfile } from '../redux/user/actionCreator'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../redux/user/actionType'
const UserDetailsPage = ({location,history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [message,setMessage]=useState(null)
    const dispatch=useDispatch()
    const {loading,error,userProfile} =useSelector(state=>state.userDetails)
    const {userInfo}=useSelector(state=>state.userLogin)
    const {error:updateError,success}=useSelector(state=>state.userUpdateProfile)

    useEffect(()=>{
        if(!userInfo){
            history.push("/login")
        }else{
            if(!userProfile.name){
                dispatch(getUserDetails())
                //  dispatch({type:USER_UPDATE_PROFILE_RESET})
            }else{
                // console.log(userProfile)
                setName(userProfile.name)
                setEmail(userProfile.email)
            }
        }
    },[dispatch,history,userInfo,userProfile])
    const loginHandler=(e)=>{
        e.preventDefault();
        setMessage("")
       if(password!==confirmPassword){
           setMessage("Password Not Match ")
       }else{
           dispatch(updateUserProfile({id:userInfo._id,name,email,password}))
       }
    }
    return (
        <Container>
                <Row>
                    <Col md={3}>
                        <h2>User Profile</h2>
                        {loading&&<Loader/>}
                        {message&&<Message variant="danger" message={message}/>}
                        {updateError&&<Message variant="danger" message={updateError}/>}
                        {success&&<Message variant="success" message="User Profile Updated"/>}
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
                        <Button variant="dark" type="submit">update</Button>
                    </Form>
                    </Col>
                    <Col md={9}>
                        <h2>My Orders</h2>
                    </Col>
                </Row>
        </Container>
    )
}

export default UserDetailsPage

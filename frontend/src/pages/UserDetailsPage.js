import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Form,Container,Row,Col, Button,Table} from 'react-bootstrap'
import { getUserDetails,updateUserProfile } from '../redux/user/actionCreator'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../redux/user/actionType'
import { listMyOrders } from '../redux/order/actionCreator'
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
    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
    useEffect(()=>{
        if(!userInfo){
            history.push("/login")
        }else{
            if(!userProfile.name){
                dispatch(getUserDetails())
                //  dispatch({type:USER_UPDATE_PROFILE_RESET})
                // dispatch(listMyOrders())
            }else{
                // console.log(userProfile)
                setName(userProfile.name)
                setEmail(userProfile.email)
            }
        }
    },[dispatch,history,userInfo,userProfile])
    useEffect(() => {
        dispatch(listMyOrders())
    }, [])
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
                        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger' message={errorOrders}></Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
                    </Col>
                </Row>
        </Container>
    )
}

export default UserDetailsPage

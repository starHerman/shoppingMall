import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Container,Navbar,Nav, NavDropdown} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { userLogout } from '../redux/user/actionCreator'
const Header = () => {
    const dispatch=useDispatch()
    const {userInfo}=useSelector(state=>state.userLogin)
    const logoutHandler=()=>{
       dispatch(userLogout())
    }
    return (
        <header>
            <Navbar bg="dark"  variant="dark" expand="lg" collapseOnSelect >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >Mall Deal</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link ><i className="fas fa-shopping-cart pr-2"></i>Cart</Nav.Link>
                            </LinkContainer>
                           {userInfo?<NavDropdown title={userInfo.name}>
                            <LinkContainer to="/profile">
                                <NavDropdown.Item>
                                   Profile
                               </NavDropdown.Item>
                            </LinkContainer>
                               <NavDropdown.Item onClick={logoutHandler}>
                                   Logout
                               </NavDropdown.Item>
                           </NavDropdown>:
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user pr-2"></i>Sign In</Nav.Link>
                            </LinkContainer>}
                            {userInfo&&userInfo.isAdmin&&<NavDropdown title="Admin">
                            <LinkContainer to="/admin/users">
                                <NavDropdown.Item>
                                   Users
                               </NavDropdown.Item>
                            </LinkContainer>
                               <LinkContainer to="/admin/products">
                                <NavDropdown.Item>
                                   Products
                               </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/orders">
                                <NavDropdown.Item>
                                   Orders
                               </NavDropdown.Item>
                            </LinkContainer>
                            </NavDropdown>
                           }
                        </Nav>              
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

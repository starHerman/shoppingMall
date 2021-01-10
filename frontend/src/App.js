import React from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import Checkout from './pages/Checkout'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserDetailsPage from './pages/UserDetailsPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
function App() {
  return (
      <Router>
        <Header/> 
        <main>
          <Container>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/products/:id" component={ProductPage}></Route>
            <Route path="/cart/:id?" component={CartPage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/profile" component={UserDetailsPage}></Route>
            <Route path="/shipping" component={ShippingPage}></Route>
            <Route path="/payment" component={PaymentPage}></Route>
          </Container>
        </main>
        <Footer/>
      </Router>
  );
}

export default App;

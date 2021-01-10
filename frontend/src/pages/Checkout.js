import React from 'react'
import {Tabs,Tab} from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import Product from '../components/Product'
import HomePage from './HomePage'
import ProductPage from './ProductPage'
import PaymentPage from './PaymentPage'
const Checkout = () => {
    return (
        <div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
              <PaymentPage/>
            </Tab>
            <Tab eventKey="profile" title="Profile">
                <HomePage/>
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
                hello
            </Tab>
</Tabs>
        </div>
    )
}

export default Checkout
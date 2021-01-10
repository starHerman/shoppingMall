import React from 'react'
import { Nav } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
const CheckoutSteps = ({step1,step2,step3}) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Link>
                {step1?<LinkContainer to="/shipping">
                        <Nav.Link variant="dark">Shipping</Nav.Link>
                    </LinkContainer>
                    :<Nav.Link disabled>Shipping</Nav.Link>}
            </Nav.Link>
            <Nav.Link>
                {step2?<LinkContainer to="/payment">
                        <Nav.Link variant="dark">Payment</Nav.Link>
                    </LinkContainer>
                    :<Nav.Link disabled>Payment</Nav.Link>}
            </Nav.Link>
            <Nav.Link>
                {step3?<LinkContainer to="/placeorder">
                        <Nav.Link variant="dark">Place Order</Nav.Link>
                    </LinkContainer>
                    :<Nav.Link disabled>Place Order</Nav.Link>}
            </Nav.Link>
        </Nav>
    )
}

export default CheckoutSteps

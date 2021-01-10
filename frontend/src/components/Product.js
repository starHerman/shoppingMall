import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'
const Product = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/products/${product._id}`}>
                <Card.Img src={`${product.image}`}>
                </Card.Img>
            </Link>
            <Card.Body>
                <Link to={`/products/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating rating={product.rating} numReviews={product.numReviews}/>
                </Card.Text>
                <Card.Text as="h3" style={{marginTop:"0.2rem"}}>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product

import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import {listProducts} from '../redux/product/actionCreator'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import queryString from 'query-string'
import ProductCarousel from '../components/ProductCarousel'
const HomePage = ({location}) => {
    const dispatch=useDispatch()
    const productList=useSelector(state=>state.productList)
    const {loading,error,products,pages}=productList
    const query=queryString.parse(location.search)
    useEffect(()=>{
        dispatch(listProducts(query.pageNum||1))
    },[dispatch,query.pageNum])
    return (
        <div>
            <ProductCarousel/>
            <h1>Latest Products</h1>
             {/* <Loader></Loader> */}
           {loading?
           (<Loader></Loader>):
           error?
            <Message variant="danger" message={error}/>
           :(<>
           <Row>
               {
                   products.map((product)=>
                        <Col key={product._id}sm={12} md={6}lg={4} xl={3} >
                            <Product product={product}/>
                        </Col>
                   )
               }
           </Row>
               <Row className="justify-content-center mt-3">
                   <Col>
                        <Pagination>
                            {
                                [...Array(pages).keys()].map(x=>(
                                    <LinkContainer key={x+1} to={`/?pageNum=${x+1}`}>
                                        <Pagination.Item  active={query.pageNum==x+1}>
                                                {x+1}
                                            </Pagination.Item>
                                    </LinkContainer>
                                ))
                            }
                        </Pagination>
                   </Col>
               </Row>
           </>
           )
           }
        </div>
    )
}

export default HomePage

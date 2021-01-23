import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Table,Button,Row,Col,Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {deleteProduct, listProducts,createProduct} from '../redux/product/actionCreator'
import queryString from 'query-string'
import { PRODUCT_DELETE_RESET,PRODUCT_CREATE_RESET } from '../redux/product/actionType'
const ProductListPage = ({history,location}) => {

    const {userInfo}=useSelector(state=>state.userLogin)
    const {loading,products,pages,error}=useSelector(state=>state.productList)
    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate
    // const {success}=useSelector(state=>state.userDelete)
    const dispatch=useDispatch()
    const query=queryString.parse(location.search)

     useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        // dispatch({type:PRODUCT_DELETE_RESET})
        if (!userInfo || !userInfo.isAdmin) {
        history.push('/login')
        }

        if (successCreate) {
        history.push(`/admin/products/${createdProduct._id}/edit`)
        } else {
        dispatch(listProducts(query.pageNum))
        }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    query.pageNum,
  ])

    const deleteHandler=(id)=>{
        if(window.confirm("Are you sure?")){
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler=()=>{
        dispatch(createProduct())
    }
    return (
        <div>
             <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' message={error}></Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
        </Table>
      )}
    </>
    <Row className="justify-content-center mt-3">
                   <Col className="text-right">
                        <Pagination>
                            {
                                [...Array(pages).keys()].map(x=>(
                                    <LinkContainer key={x+1} to={`/admin/products?pageNum=${x+1}`}>
                                        <Pagination.Item  active={(query.pageNum||1)==x+1}>
                                                {x+1}
                                            </Pagination.Item>
                                    </LinkContainer>
                                ))
                            }
                        </Pagination>
                   </Col>
               </Row>
        </div>
    )
}

export default ProductListPage

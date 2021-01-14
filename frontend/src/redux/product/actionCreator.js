import {PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL,
    PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_CREATE_REVIEWS_REQUEST, PRODUCT_CREATE_REVIEWS_SUCCESS, PRODUCT_CREATE_REVIEWS_FAIL,PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,}from './actionType'
import axios from "axios"

export const getProductDetail=(id)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAIL_REQUEST})
        const {data}=await axios.get(`/api/products/${id}`)
        dispatch({type:PRODUCT_DETAIL_SUCCESS,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:PRODUCT_DETAIL_FAIL,payload:error.response.data.message})
    }
}

export const listProducts=(pageNum)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data}=await axios.get(`/api/products?pageNum=${pageNum}`)
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.response.data.message})
    }
}

export const createProductReviews= (id,reviews)=>{
    return async (dispatch,getState)=>{
       try {
            dispatch({
            type:PRODUCT_CREATE_REVIEWS_REQUEST
        })
        const {userInfo:{token}}=getState().userLogin
        console.log(token)
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        const {data}=await axios.post(`/api/products/${id}/reviews`,reviews,config);
        dispatch({
            type:PRODUCT_CREATE_REVIEWS_SUCCESS,
        })
       } catch (error) {
           console.log(error.response)
           dispatch({
               type:PRODUCT_CREATE_REVIEWS_FAIL,
               payload:error.response.data
           })
       }
    }

}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })

    const { data } = await axios.get(`/api/products/top`)

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response.data
    })
  }
}
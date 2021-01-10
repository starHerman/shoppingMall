import {PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL}from './actionType'
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

export const listProducts=()=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data}=await axios.get("/api/products")
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    } catch (error) {
        // console.log(error.response.data.message)
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.response.data.message})
    }
}
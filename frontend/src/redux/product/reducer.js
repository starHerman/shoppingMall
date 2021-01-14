import {PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_CREATE_REVIEWS_FAIL, PRODUCT_CREATE_REVIEWS_REQUEST, PRODUCT_CREATE_REVIEWS_SUCCESS, PRODUCT_CREATE_REVIEWS_RESET,
PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL} from './actionType'

export const productDetailReducer= (state={product:{},loading:true},action)=>{
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {loading:true}
        case PRODUCT_DETAIL_SUCCESS:
            return {loading:false,product:action.payload}
        case PRODUCT_DETAIL_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }

}

export const productListReducer= (state={products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true}
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload.products,pages:action.payload.pages}
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }

}

export const productReviewCreateReducer= (state={},action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REVIEWS_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_REVIEWS_SUCCESS:
            return {loading:false,success:true}
        case PRODUCT_CREATE_REVIEWS_FAIL:
            return {loading:false,error:action.payload}
        case PRODUCT_CREATE_REVIEWS_RESET:
            return {}
        default:
            return state
    }

}
export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
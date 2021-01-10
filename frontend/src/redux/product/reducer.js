import {PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL} from './actionType'

export const productDetailReducer= (state={product:{}},action)=>{
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
            return {oading:false,products:action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }

}
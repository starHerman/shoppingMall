import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "./actionType"

const initialState={
    cartItems:[],
    shippingAddress:{}
}

export const cartReducer=(state=initialState,action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const product=action.payload
             const existProduct=state.cartItems.find(x=>x.productId===product.productId)
             if(existProduct){
                 return {
                     ...state,
                     cartItems:[...state.cartItems.map(x=>x.productId===product.productId?product:x)]
                 }
             }
             else{
                 return {
                     ...state,
                     cartItems:[...state.cartItems,product]
                 }
             }
        case CART_REMOVE_ITEM:
            const id=action.payload
            console.log(state.cartItems.filter(item=>item.productId!=id))
            console.log(state.cartItems[0].productId,id)
             return {
                 ...state,
                 cartItems:[...state.cartItems.filter(item=>item.productId!==id)]
             }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress:action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod:action.payload
            }
        default:
            return state

    }
} 
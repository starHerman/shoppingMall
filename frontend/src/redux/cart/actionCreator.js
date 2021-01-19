import axios from 'axios'
import { CART_ADD_ITEM ,CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS,CART_CLEAR_ITEMS} from './actionType'

export const addCartItem=(id,qty)=>{
    return async (dispatch,getState)=>{
        const {data}=await axios.get(`/api/products/${id}`)
        // console.log(data)
        dispatch({type:CART_ADD_ITEM,
            payload:{
                productId:id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty:Number(qty)
        }})
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
    }
    
}

export const removeCartItem=(id)=>{
    return (dispatch,getState)=>{
        dispatch({type:CART_REMOVE_ITEM,payload:id})
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
    }
}

export const saveShppingAddress=(data)=>{
    return (dispatch)=>{
        dispatch({
            type:CART_SAVE_SHIPPING_ADDRESS,
            payload:data
        })
        localStorage.setItem("shippingAddress",JSON.stringify(data))
    }
}

export const savePaymentMethod=(method)=>{
    return (dispatch)=>{
        dispatch({
            type:CART_SAVE_PAYMENT_METHOD,
            payload:method
        })
        localStorage.setItem("paymentMethod",JSON.stringify(method))
    }
}

export const cartClear=()=>{
    return (dispatch)=>{
        localStorage.removeItem("cartItems")
        dispatch({
            type:CART_CLEAR_ITEMS
        })
    }
}
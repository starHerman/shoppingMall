import {createStore,combineReducers,applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailReducer,productReviewCreateReducer,productTopRatedReducer,productDeleteReducer,productCreateReducer,productUpdateReducer} from './product/reducer'
import {cartReducer} from './cart/reducer'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer} from './order/reducer'
import {userLoginReducer, userRegisterReducer,userDetailsReducer,updateUserProfileReducer,userListReducer,userDeleteReducer} from './user/reducer'
import { fromPairs } from "lodash"
const reducer=combineReducers({
    productList:productListReducer,
    productDetail:productDetailReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:updateUserProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    
})
const cartItemFromLocalStorage=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
const userInfoFromLocalStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):""
const shippingAddressFromLocalStorage=localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{}
const initialState={
    cart:{cartItems:cartItemFromLocalStorage,shippingAddress:shippingAddressFromLocalStorage},
    userLogin:{userInfo:userInfoFromLocalStorage}
}
const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
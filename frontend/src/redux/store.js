import {createStore,combineReducers,applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer} from './product/reducer'
import {productDetailReducer} from './product/reducer'
import {cartReducer} from './cart/reducer'
import {userLoginReducer, userRegisterReducer,userDetailsReducer,updateUserProfileReducer} from './user/reducer'
const reducer=combineReducers({
    productList:productListReducer,
    productDetail:productDetailReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:updateUserProfileReducer 
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
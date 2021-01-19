import { USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
USER_LIST_FAIL,USER_LIST_SUCCESS,USER_LIST_RESET,
USER_DELETE_REQUEST,USER_DELETE_FAIL,USER_DELETE_SUCCESS } from "./actionType"
import axios from 'axios'
export const userLogin=(email,password)=>{
    return async(dispatch)=>{
        try {
            dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
            const {data}=await axios.post("/api/users/login",{email,password},config)
            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data
            })
            localStorage.setItem("userInfo",JSON.stringify(data))
        } catch (error) {
            dispatch({
                type:USER_LOGIN_FAIL,
                payload:error.response.data.error
            })
        }
    }
}

export const userRegister=(name,email,password)=>{
    return async(dispatch)=>{
        try {
            dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
            const {data}=await axios.post("/api/users/register",{name,email,password},config)
            dispatch({
                type:USER_REGISTER_SUCCESS,
                payload:data
            })
            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data
            })
            localStorage.setItem("userInfo",JSON.stringify(data))
        } catch (error) {
            dispatch({
                type:USER_REGISTER_FAIL,
                payload:error.response.data
            })
        }
    }
}

export const getUserDetails=()=>{
    return async(dispatch,getState)=>{
        try {
            dispatch({
            type:USER_DETAILS_REQUEST
        })
        const {userInfo:{token}}=getState().userLogin
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
            const {data}=await axios.get("/api/users/profile",config)
            dispatch({
                type:USER_DETAILS_SUCCESS,
                payload:data
            })
        } catch (error) {
            dispatch({
                type:USER_DETAILS_FAIL,
                payload:error.response.data
            })
        }
    }
}


export const updateUserProfile=(user)=>{
    return async(dispatch,getState)=>{
        try {
            dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })
        console.log(user)
        const {userInfo:{token}}=getState().userLogin
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
            const {data}=await axios.put("/api/users/profile",user,config)
            dispatch({
                type:USER_UPDATE_PROFILE_SUCCESS,
                payload:data
            })
             dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data
            })
            dispatch(
                {type:USER_DETAILS_SUCCESS,payload:data
            })
            
            localStorage.setItem("userInfo",JSON.stringify(data))
        } catch (error) {
            console.log(error)
            dispatch({
                type:USER_UPDATE_PROFILE_FAIL,
                payload:error.response.data
            })
        }
    }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message=error.response.data
    if (message === 'jwt expired') {
      dispatch(userLogout())
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}


export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/users/${id}`, config)

    dispatch({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    const message=error.response.data
    if (message === 'jwt expired') {
      dispatch(userLogout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}



export const userLogout=()=>{
    return (dispatch)=>{
        localStorage.removeItem("userInfo")
        dispatch({
            type:USER_LOGOUT
        })
        dispatch({
            type:USER_LIST_RESET
        })
    }
}


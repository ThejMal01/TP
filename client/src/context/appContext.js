import React, { useState, useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios'
import { 
    DISPLAY_ALERT,
    CLEAR_ALERT, 
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_FAIL,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
 } from './actions'


const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user):null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
    showSidebar: false
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,initialState)

    //axios
    const authFetch = axios.create({
        baseURL: '/api/v1/'
    })

    //request
    authFetch.interceptors.request.use(
        (config)=>{
            //before below line as a comment in folder 28 video 6 middle - save changes button didn't work
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        }, (error)=>{
            return Promise.reject(error)
        }
    )

    //response
    authFetch.interceptors.response.use(
        (response)=>{
            return response
        }, (error)=>{
            console.log(error.response)

            if(error.response.status === 401) {
                console.log('AUTH ERROR');
            }

            return Promise.reject(error)
        }
    )

    const displayAlert = () => {
        dispatch({type:DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(()=>{
            dispatch({type:CLEAR_ALERT})
        }, 3000)
    }

    const addUserToLocalStorage = ({user, token, location}) =>{
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = ()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const setupUser = async({currentUser, endPoint, alertText})=>{
        dispatch({type:SETUP_USER_BEGIN})
        try {
            const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

            const {user, token, location} = data
            dispatch({
                type:SETUP_USER_SUCCESS, 
                payload:{user, token, location, alertText}
            })

            addUserToLocalStorage({
                user, 
                token, 
                location
            })
        } catch (error) {
            dispatch({
                type:SETUP_USER_FAIL, 
                payload:{msg:error.response.data.msg}
            })
        }
        clearAlert()
    }

    const toggleSidebar = ()=>{
        dispatch({type: TOGGLE_SIDEBAR})
    }

    const logoutUser = ()=>{
        dispatch({type: LOGOUT_USER})
        removeUserFromLocalStorage()
    }

    const updateUser = async(currentUser)=>{
        dispatch({type: UPDATE_USER_BEGIN})
        try {
            const {data} = await authFetch.patch('/auth/update', currentUser)
           
            const {user, location, token} = data

            dispatch({
                type: UPDATE_USER_SUCCESS, 
                payload: {user, location, token}
            })

            addUserToLocalStorage({user, location, token})
        } catch (error) {
            dispatch({
                type: UPDATE_USER_FAIL, 
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }
    return (
        <AppContext.Provider 
            value={{
                ...state, 
                displayAlert, 
                setupUser, 
                toggleSidebar, 
                logoutUser, 
                updateUser
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}
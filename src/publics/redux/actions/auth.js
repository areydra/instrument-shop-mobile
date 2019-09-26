import axios from 'axios'

export const login = user => {
    return {
        type : 'LOGIN',
        payload : axios.post('https://instrument-shop-backend.herokuapp.com/api/auth/login', user)
    }
}

export const register = user => {
    return {
        type: 'REGISTER',
        payload: axios.post('https://instrument-shop-backend.herokuapp.com/api/auth/register', user)
    }
}
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export const getTransactions = (z) => {
    return {
        type: 'GET_TRANSACTIONS',
        payload: axios.get(`https://instrument-shop-backend.herokuapp.com/api/transactions`, {
            headers: {
                'x-auth-token' : AsyncStorage.getItem('token')
            }
        })
    }
}

export const getTransactionsPaginate = (offset, limit) => {
    return {
        type: 'GET_TRANSACTIONS_PAGINATE',
        payload: axios.get(`https://instrument-shop-backend.herokuapp.com/api/transactions/page/${offset}/${limit}`, {
            headers: {
                'x-auth-token' : AsyncStorage.getItem('token')
            }
        })
    }
}

export const getTransactionsByUser = id_user => {
    return {
        type: 'GET_TRANSACTIONS_BY_USER',
        payload: axios.get(`https://instrument-shop-backend.herokuapp.com/api/transactions/user/${id_user}`)
    }
}

export const postTransaction = product => {
    return {
        type: 'POST_TRANSACTION',
        payload: axios.post(`https://instrument-shop-backend.herokuapp.com/api/transactions`, product)
    }
}
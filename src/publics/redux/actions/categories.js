import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export const getCategories = () => {
    return {
        type : 'GET_CATEGORIES',
        payload : axios.get('https://instrument-shop-backend.herokuapp.com/api/categories')
    }
}

export const getCategoriesPaginate = (offset, limit) => {
    return {
        type: 'GET_CATEGORIES_PAGINATE',
        payload: axios.get(`https://instrument-shop-backend.herokuapp.com/api/categories/page/${offset}/${limit}`)
    }
}
export const postCategory = (category) => {
    return {
        type: 'POST_CATEGORY',
        payload: axios.post('https://instrument-shop-backend.herokuapp.com/api/categories', category, {
            headers: {
                'x-auth-token': AsyncStorage.getItem('token')
            }
        })
    }
}

export const patchCategory = (id, category) => {
    return {
        type: 'PATCH_CATEGORY',
        payload: axios.patch(`https://instrument-shop-backend.herokuapp.com/api/categories/${id}`, category, {
            headers: {
                'x-auth-token': localStorage.get('token')
            }
        })
    }
}

export const deleteCategory = id => {
    return {
        type: 'DELETE_CATEGORY',
        payload: axios.delete(`https://instrument-shop-backend.herokuapp.com/api/categories/${id}`, {
            headers: {
                'x-auth-token': localStorage.get('token')
            }
        })
    }
}
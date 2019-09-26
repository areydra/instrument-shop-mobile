import axios from 'axios'

export const getCartsByUser = id_user => {
    return {
        type: 'GET_CARTS_BY_USER',
        payload: axios.get(`https://instrument-shop-backend.herokuapp.com/api/carts/user/${id_user}`)
    }
}

export const getCartDetails = (id_user, id_product) => {
    return {
        type: 'GET_CART_DETAILS',
        payload: axios.get(`https://instrument-shop-backend.herokuapp.com/api/carts/details/${id_user}/${id_product}`)
    }
}

export const postCart = product => {
    return {
        type : 'POST_CART',
        payload : axios.post(`https://instrument-shop-backend.herokuapp.com/api/carts`, product)
    }
}

export const patchCarts = (id,product) => {
    return {
        type: 'PATCH_CARTS',
        payload: axios.patch(`https://instrument-shop-backend.herokuapp.com/api/carts/${id}`, product)
    }
}

export const deleteCart = id => {
    if(id.length > 0){
        id.map(cart => {
            return {
                type: 'DELETE_CART',
                payload: axios.delete(`https://instrument-shop-backend.herokuapp.com/api/carts/${cart.id}`)
            }
        })
    }

    return {
        type : 'DELETE_CART',
        payload : axios.delete(`https://instrument-shop-backend.herokuapp.com/api/carts/${id}`)
    }
}

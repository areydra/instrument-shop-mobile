import axios from 'axios'

export const getWishlistsByUser = id_user => {
    return {
        type: 'GET_WISHLISTS_BY_USER',
        payload : axios.get(`https://instrument-shop-backend.herokuapp.com/api/wishlists/user/${id_user}`)
    }
}

export const getWishlistDetails = (id_user, id_product) => {
    return {
        type: 'GET_WISHLIST_DETAILS',
        payload: axios.get(`https://instrument-shop-backend.herokuapp.com/api/wishlists/details/${id_user}/${id_product}`)
    }
}

export const postWishlist = product => {
    return {
        type : 'POST_WISHLIST',
        payload : axios.post(`https://instrument-shop-backend.herokuapp.com/api/wishlists`, product)
    }
}

export const addToCart = wishlist => {
    return {
        type : 'ADD_TO_CART',
        payload : axios.post(`https://instrument-shop-backend.herokuapp.com/api/carts`, wishlist)
    }
}

export const addPatchToCart = (id_cart, wishlist) => {
    return {
        type: 'ADD_PATCH_TO_CART',
        payload: axios.patch(`https://instrument-shop-backend.herokuapp.com/api/carts/${id_cart}`, wishlist)
    }
}


export const deleteWishlist = id => {
    if (id.length > 0) {
        id.map(wishlist => {
            return {
                type: 'DELETE_WISHLIST',
                payload: axios.delete(`https://instrument-shop-backend.herokuapp.com/api/wishlists/${wishlist.id}`)
            }
        })
    }
 
    return {
        type : 'DELETE_WISHLIST',
        payload : axios.delete(`https://instrument-shop-backend.herokuapp.com/api/wishlists/${id}`)
    }
}
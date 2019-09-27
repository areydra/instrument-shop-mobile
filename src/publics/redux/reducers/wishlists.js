const initialState = {
    wishlists: [],
    newWishlist: [],
    status : 0,
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}

const wishlist = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_WISHLISTS_BY_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_WISHLISTS_BY_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_WISHLISTS_BY_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                wishlists: action.payload.data.responses,
                status: action.payload.data.status
            }

        case 'GET_WISHLIST_DETAILS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_WISHLIST_DETAILS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_WISHLIST_DETAILS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                wishlists: action.payload.data.responses
            }

        case 'POST_WISHLIST_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'POST_WISHLIST_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'POST_WISHLIST_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                newWishlist: action.payload.data.responses
            }

        case 'DELETE_WISHLIST_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'DELETE_WISHLIST_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'DELETE_WISHLIST_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }

        case 'ADD_TO_CART_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'ADD_TO_CART_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'ADD_TO_CART_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                wishlists: action.payload.data.data
            }

        case 'ADD_PATCH_TO_CART_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'ADD_PATCH_TO_CART_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'ADD_PATCH_TO_CART_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }

        default:
            return state
    }
}

export default wishlist
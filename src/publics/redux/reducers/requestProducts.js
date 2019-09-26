const initialState = {
    requestProducts: [],
    requestProductsPaginate : [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}

const requestProducts = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_REQUEST_PRODUCTS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_REQUEST_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_REQUEST_PRODUCTS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                requestProducts: action.payload.data.responses
            }

        case 'GET_REQUEST_PRODUCTS_PAGINATE_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_REQUEST_PRODUCTS_PAGINATE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_REQUEST_PRODUCTS_PAGINATE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                requestProductsPaginate: action.payload.data.responses
            }

        case 'POST_REQUEST_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'POST_REQUEST_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'POST_REQUEST_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                requestProducts: action.payload.data.responses
            }

        case 'DELETE_REQUEST_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'DELETE_REQUEST_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'DELETE_REQUEST_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                requestProducts: action.payload.data.responses
            }

        default:
            return state
    }
}

export default requestProducts
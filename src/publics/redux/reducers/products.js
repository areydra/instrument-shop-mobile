const initialState = {
    products : [],
    status : 0,
    postProduct: [],
    productsData: [],
    bestProducts: [],
    mostFavorites: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}

const products = (state = initialState, action) => {
    switch(action.type){
        case 'GET_PRODUCTS_PENDING' :
            return{
                ...state,
                isLoading : true,
                isRejected : false,
                isFulfilled : false
            }
        case 'GET_PRODUCTS_REJECTED' :
            return{
                ...state,
                isLoading : false,
                isRejected : true
            }
        case 'GET_PRODUCTS_FULFILLED' :
            return{
                ...state,
                isLoading : false,
                isFulfilled : true,
                products : action.payload.data.responses
            }

        case 'GET_MOST_FAVORITES_PENDING' :
            return{
                ...state,
                isLoading : true,
                isRejected : false,
                isFulfilled : false
            }
        case 'GET_MOST_FAVORITES_REJECTED' :
            return{
                ...state,
                isLoading : false,
                isRejected : true
            }
        case 'GET_MOST_FAVORITES_FULFILLED' :
            return{
                ...state,
                isLoading : false,
                isFulfilled : true,
                mostFavorites : action.payload.data.responses
            }

        case 'GET_BEST_PRODUCTS_PENDING' :
            return{
                ...state,
                isLoading : true,
                isRejected : false,
                isFulfilled : false
            }
        case 'GET_BEST_PRODUCTS_REJECTED' :
            return{
                ...state,
                isLoading : false,
                isRejected : true
            }
        case 'GET_BEST_PRODUCTS_FULFILLED' :
            return{
                ...state,
                isLoading : false,
                isFulfilled : true,
                bestProducts : action.payload.data.responses,
                status : action.payload.data.status
            }

        case 'GET_ALL_PRODUCTS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_ALL_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_ALL_PRODUCTS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                productsData: action.payload.data.responses
            }

        case 'GET_PRODUCTS_BY_CATEGORY_PENDING' :
            return{
                ...state,
                isLoading : true,
                isRejected : false,
                isFulfilled : false
            }
        case 'GET_PRODUCTS_BY_CATEGORY_REJECTED' :
            return{
                ...state,
                isLoading : false,
                isRejected : true
            }
        case 'GET_PRODUCTS_BY_CATEGORY_FULFILLED' :
            return{
                ...state,
                isLoading : false,
                isFulfilled : true,
                products : action.payload.data.responses
            }

        case 'GET_PRODUCT_DETAILS_PENDING' :
            return{
                ...state,
                isLoading : true,
                isRejected : false,
                isFulfilled : false
            }
        case 'GET_PRODUCT_DETAILS_REJECTED' :
            return{
                ...state,
                isLoading : false,
                isRejected : true
            }
        case 'GET_PRODUCT_DETAILS_FULFILLED' :
            return{
                ...state,
                isLoading : false,
                isFulfilled : true,
                products : action.payload.data.responses
            }

        case 'GET_SEARCH_PRODUCTS_PENDING' :
            return{
                ...state,
                isLoading : true,
                isRejected : false,
                isFulfilled : false
            }
        case 'GET_SEARCH_PRODUCTS_REJECTED' :
            return{
                ...state,
                isLoading : false,
                isRejected : true
            }
        case 'GET_SEARCH_PRODUCTS_FULFILLED' :
            return{
                ...state,
                isLoading : false,
                isFulfilled : true,
                products : action.payload.data.responses,
                status : action.payload.data.status
            }

        case 'POST_PRODUCT_PENDING' :
            return{
                ...state,
                isLoading : true,
                isRejected : false,
                isFulfilled : false
            }
        case 'POST_PRODUCT_REJECTED' :
            return{
                ...state,
                isLoading : false,
                isRejected : true
            }
        case 'POST_PRODUCT_FULFILLED' :
            return{
                ...state,
                isLoading : false,
                isFulfilled : true,
                postProduct : action.payload.data.data
            }

        case 'PATCH_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'PATCH_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'PATCH_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }

        case 'DELETE_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'DELETE_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'DELETE_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                postProduct: action.payload.data.data
            }

        default: 
            return state
    }
}

export default products
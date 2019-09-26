const initialState = {
    categories: [],
    categoriesPaginate : [],
    postCategory: [],
    isLoading : false,
    isRejected : false,
    isFulfilled : false
}

const categories = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES_PENDING':
            return{
                ...state,
                isLoading : true,
                isRejected : false,
                isFulfilled : false
            }    
        case 'GET_CATEGORIES_REJECTED' :
            return{
                ...state,
                isLoading : false,
                isRejected : true
            }
        case 'GET_CATEGORIES_FULFILLED' :
            return{
                ...state,
                isLoading : false,
                isFulfilled : true,
                categories : action.payload.data.responses
            }

        case 'GET_CATEGORIES_PAGINATE_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_CATEGORIES_PAGINATE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_CATEGORIES_PAGINATE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoriesPaginate: action.payload.data.responses
            }

        case 'POST_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'POST_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'POST_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                postCategory: action.payload.data.data
            }

        case 'PATCH_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'PATCH_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'PATCH_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                postCategory: action.payload.data.data
            }

        case 'DELETE_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'DELETE_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'DELETE_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoriesPaginate: action.payload.data.responses
            }

        default:
            return state
    }
}

export default categories
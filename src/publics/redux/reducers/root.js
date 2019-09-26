import { combineReducers } from 'redux'

import auth from './auth'
import carts from './carts'
import products from './products'
import wishlists from './wishlists'
import categories from './categories'
import transactions from './transactions'
import requestProducts from './requestProducts'

const reducers = combineReducers({
    auth,
    carts,
    products,
    wishlists,
    categories,
    transactions,
    requestProducts
})

export default reducers
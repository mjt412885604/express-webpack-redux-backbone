import {
    combineReducers,
    applyMiddleware,
    createStore
} from 'redux'
import thunk from 'redux-thunk'
import user from './modules/user'

const reducer = combineReducers({
    user
})
export default createStore(reducer, applyMiddleware(thunk));
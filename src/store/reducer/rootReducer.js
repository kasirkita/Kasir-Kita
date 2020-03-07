import { combineReducers } from "redux"
import checkUserReducer from "./checkUserReducer"
import registerReducer from "./registerReducer"
import loginReducer from "./loginReducer"
import productReducer from "./productReducer"

const rootReducer = combineReducers({
    checkUser: checkUserReducer,
    register: registerReducer,
    login: loginReducer,
    product: productReducer
})

export default rootReducer
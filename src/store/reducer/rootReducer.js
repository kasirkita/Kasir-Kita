import { combineReducers } from "redux"
import checkUserReducer from "./checkUserReducer"
import registerReducer from "./registerReducer"
import loginReducer from "./loginReducer"
import productReducer from "./productReducer"
import categoryReducer from "./categoryReducer"
import unitReducer from "./unitReducer"
import roleReducer from "./roleReducer"
import permissionReducer from "./permissionReducer"
import userReducer from "./userReducer"
import customerReducer from "./customerReducer"
import supplierReducer from "./supplierReducer"
import settingReducer from "./settingReducer"
import salesReducer from "./salesReducer"
import discountReducer from "./discountReducer"

const rootReducer = combineReducers({
    checkUser: checkUserReducer,
    register: registerReducer,
    login: loginReducer,
    product: productReducer,
    category: categoryReducer,
    unit: unitReducer,
    role: roleReducer,
    permission: permissionReducer,
    user: userReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    setting: settingReducer,
    sales: salesReducer,
    discount: discountReducer
})

export default rootReducer
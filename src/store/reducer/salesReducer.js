const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null,
    type: null,
    sales: null,
    carts: null
}

const salesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_SALES_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_SALES_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                type: 'fetch'
            }

        case 'FETCH_SALES_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        case 'SAVE_SALES_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'SAVE_SALES_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                carts: action.data,
                type: 'save',
                success: true
            }

        case 'SAVE_SALES_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'save',
                success: false
            }
        case 'GET_SALES_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'GET_SALES_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'get',
                sales: action.data,
                success: true
            }

        case 'GET_SALES_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'get',
                success: false
            }
        case 'UPDATE_SALES_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'UPDATE_SALES_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'update',
                success: true
            }

        case 'UPDATE_SALES_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'update',
                success: false
            }
        case 'TOGGLE_SALES_PENDING':
            return {
                ...state,
                // fetching: true,
            }
        case 'TOGGLE_SALES_SUCCESS':

            return {
                ...state,
                // fetching: false,
                // fetched: true,
                // message: action.message,
                // type: 'toggle',
                // success: true
            }

        case 'TOGGLE_SALES_FAILED':
            return {
                ...state,
                // fetching: false,
                // fetched: true,
                error: action.error,
                // message: action.message,
                type: 'toggle',
                // success: false
            }
        case 'DELETE_SALES_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'DELETE_SALES_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'delete',
                message: action.message,
                success: true
            }

        case 'DELETE_SALES_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'delete',
                success: false
            }
        default:
            return state
    }
}

export default salesReducer
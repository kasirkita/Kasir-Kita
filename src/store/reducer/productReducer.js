const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null,
    type: null,
    product: null,
    selected: null
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_PRODUCT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                selected: action.selected,
                type: 'fetch'
            }

        case 'FETCH_PRODUCT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        case 'SAVE_PRODUCT_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'SAVE_PRODUCT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'save',
                success: true
            }

        case 'SAVE_PRODUCT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'save',
                success: false
            }
        case 'GET_PRODUCT_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'GET_PRODUCT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'get',
                product: action.data,
                success: true
            }

        case 'GET_PRODUCT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'get',
                success: false
            }
        case 'UPDATE_PRODUCT_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'UPDATE_PRODUCT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'update',
                success: true
            }

        case 'UPDATE_PRODUCT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'update',
                success: false
            }
        case 'TOGGLE_PRODUCT_PENDING':
            return {
                ...state,
                // fetching: true,
            }
        case 'TOGGLE_PRODUCT_SUCCESS':

            return {
                ...state,
                // fetching: false,
                // fetched: true,
                // message: action.message,
                // type: 'toggle',
                // success: true
            }

        case 'TOGGLE_PRODUCT_FAILED':
            return {
                ...state,
                // fetching: false,
                // fetched: true,
                error: action.error,
                // message: action.message,
                type: 'toggle',
                // success: false
            }
        case 'SELECT_PRODUCT_PENDING':
            return {
                ...state,
                // fetching: true,
            }
        case 'SELECT_PRODUCT_SUCCESS':

            return {
                ...state,
                selected: action.selected
                // fetching: false,
                // fetched: true,
                // message: action.message,
                // type: 'toggle',
                // success: true
            }

        case 'SELECT_PRODUCT_FAILED':
            return {
                ...state,
                // fetching: false,
                // fetched: true,
                error: action.error,
                // message: action.message,
                type: 'toggle',
                // success: false
            }
        case 'DELETE_PRODUCT_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'DELETE_PRODUCT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'delete',
                message: action.message,
                success: true
            }

        case 'DELETE_PRODUCT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'delete',
                success: false
            }
        case 'IMPORT_PRODUCT_PENDING':
            return {
                ...state,
                uploading: true,
            }
        case 'IMPORT_PRODUCT_SUCCESS':

            return {
                ...state,
                uploading: false,
                type: 'import',
                message: action.message,
                success: true
            }

        case 'IMPORT_PRODUCT_FAILED':
            return {
                ...state,
                uploading: false,
                error: action.error,
                message: action.message,
                type: 'import',
                success: false
            }
        default:
            return state
    }
}

export default productReducer
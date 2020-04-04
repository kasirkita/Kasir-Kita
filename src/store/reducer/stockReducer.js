const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null,
    type: null,
    stock: null
}

const stockReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_STOCK_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_STOCK_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                type: 'fetch'
            }

        case 'FETCH_STOCK_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        case 'SAVE_STOCK_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'SAVE_STOCK_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                carts: action.data,
                type: 'save',
                success: true
            }

        case 'SAVE_STOCK_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'save',
                success: false
            }
        default:
            return state
    }
}

export default stockReducer
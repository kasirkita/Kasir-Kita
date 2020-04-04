const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null,
    type: null,
}

const reportReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_SALES_REPORT_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_SALES_REPORT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                type: 'fetch'
            }

        case 'FETCH_SALES_REPORT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        case 'FETCH_PURCHASE_REPORT_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_PURCHASE_REPORT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                type: 'fetch'
            }

        case 'FETCH_PURCHASE_REPORT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        case 'FETCH_EXPENSE_REPORT_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_EXPENSE_REPORT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                type: 'fetch'
            }

        case 'FETCH_EXPENSE_REPORT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }

        case 'FETCH_STOCK_REPORT_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_STOCK_REPORT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                type: 'fetch'
            }

        case 'FETCH_STOCK_REPORT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        default:
            return state
    }
}

export default reportReducer
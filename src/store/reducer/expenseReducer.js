const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null,
    type: null,
    expense: null,
}

const expenseReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_EXPENSE_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_EXPENSE_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                type: 'fetch'
            }

        case 'FETCH_EXPENSE_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        case 'SAVE_EXPENSE_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'SAVE_EXPENSE_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'save',
                success: true
            }

        case 'SAVE_EXPENSE_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'save',
                success: false
            }
        case 'GET_EXPENSE_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'GET_EXPENSE_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'get',
                expense: action.data,
                success: true
            }

        case 'GET_EXPENSE_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'get',
                success: false
            }
        case 'UPDATE_EXPENSE_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'UPDATE_EXPENSE_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'update',
                success: true
            }

        case 'UPDATE_EXPENSE_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'update',
                success: false
            }
        case 'DELETE_EXPENSE_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'DELETE_EXPENSE_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'delete',
                message: action.message,
                success: true
            }

        case 'DELETE_EXPENSE_FAILED':
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

export default expenseReducer
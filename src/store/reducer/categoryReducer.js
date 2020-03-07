const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null,
    type: null,
    category: null,
}

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORY_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_CATEGORY_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                type: 'fetch'
            }

        case 'FETCH_CATEGORY_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        case 'SAVE_CATEGORY_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'SAVE_CATEGORY_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'save',
                success: true
            }

        case 'SAVE_CATEGORY_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'save',
                success: false
            }
        case 'GET_CATEGORY_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'GET_CATEGORY_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'get',
                category: action.data,
                success: true
            }

        case 'GET_CATEGORY_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'get',
                success: false
            }
        case 'UPDATE_CATEGORY_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'UPDATE_CATEGORY_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'update',
                success: true
            }

        case 'UPDATE_CATEGORY_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'update',
                success: false
            }
        case 'TOGGLE_CATEGORY_PENDING':
            return {
                ...state,
                // fetching: true,
            }
        case 'TOGGLE_CATEGORY_SUCCESS':

            return {
                ...state,
                // fetching: false,
                // fetched: true,
                // message: action.message,
                // type: 'toggle',
                // success: true
            }

        case 'TOGGLE_CATEGORY_FAILED':
            return {
                ...state,
                // fetching: false,
                // fetched: true,
                error: action.error,
                // message: action.message,
                type: 'toggle',
                // success: false
            }
        case 'DELETE_CATEGORY_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'DELETE_CATEGORY_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'delete',
                message: action.message,
                success: true
            }

        case 'DELETE_CATEGORY_FAILED':
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

export default categoryReducer
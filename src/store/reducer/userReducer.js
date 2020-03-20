const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null,
    type: null,
    user: null,
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_USER_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_USER_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                selected: action.selected,
                type: 'fetch'
            }

        case 'FETCH_USER_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        case 'SAVE_USER_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'SAVE_USER_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'save',
                success: true
            }

        case 'SAVE_USER_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'save',
                success: false
            }
        case 'GET_USER_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'GET_USER_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'get',
                user: action.data,
                success: true
            }

        case 'GET_USER_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'get',
                success: false
            }
        case 'UPDATE_USER_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'UPDATE_USER_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'update',
                success: true
            }

        case 'UPDATE_USER_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'update',
                success: false
            }
        case 'TOGGLE_USER_PENDING':
            return {
                ...state,
                // fetching: true,
            }
        case 'TOGGLE_USER_SUCCESS':

            return {
                ...state,
                // fetching: false,
                // fetched: true,
                // message: action.message,
                // type: 'toggle',
                // success: true
            }

        case 'TOGGLE_USER_FAILED':
            return {
                ...state,
                // fetching: false,
                // fetched: true,
                error: action.error,
                // message: action.message,
                type: 'toggle',
                // success: false
            }
        case 'DELETE_USER_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'DELETE_USER_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'delete',
                message: action.message,
                success: true
            }

        case 'DELETE_USER_FAILED':
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

export default userReducer
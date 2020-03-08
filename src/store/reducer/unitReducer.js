const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null,
    type: null,
    unit: null,
}

const unitReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_UNIT_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'FETCH_UNIT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                success: true,
                type: 'fetch'
            }

        case 'FETCH_UNIT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'fetch'
            }
        case 'SAVE_UNIT_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'SAVE_UNIT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'save',
                success: true
            }

        case 'SAVE_UNIT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'save',
                success: false
            }
        case 'GET_UNIT_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'GET_UNIT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'get',
                unit: action.data,
                success: true
            }

        case 'GET_UNIT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'get',
                success: false
            }
        case 'UPDATE_UNIT_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'UPDATE_UNIT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'update',
                success: true
            }

        case 'UPDATE_UNIT_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'update',
                success: false
            }
        case 'TOGGLE_UNIT_PENDING':
            return {
                ...state,
                // fetching: true,
            }
        case 'TOGGLE_UNIT_SUCCESS':

            return {
                ...state,
                // fetching: false,
                // fetched: true,
                // message: action.message,
                // type: 'toggle',
                // success: true
            }

        case 'TOGGLE_UNIT_FAILED':
            return {
                ...state,
                // fetching: false,
                // fetched: true,
                error: action.error,
                // message: action.message,
                type: 'toggle',
                // success: false
            }
        case 'DELETE_UNIT_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'DELETE_UNIT_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'delete',
                message: action.message,
                success: true
            }

        case 'DELETE_UNIT_FAILED':
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

export default unitReducer
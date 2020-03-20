const initState = {
    permissions: [],
    fetching: false,
    fetched: false,
    error: null,
    type: null
}

const permissionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LIST_PERMISSION_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'LIST_PERMISSION_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                permissions: action.data,
                success: true,
                type: 'list'
            }

        case 'LIST_PERMISSION_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false,
                type: 'list'
            }
        default:
            return state
    }
}

export default permissionReducer
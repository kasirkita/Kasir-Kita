const initState = {
    fetching: false,
    fetched: false,
    userExists: null,
    error: null
}

const checkUserReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHECK_USER_PENDING':
            return {
                ...state,
                fetching: true
            }
        case 'CHECK_USER_SUCCESS':
            return {
                ...state,
                fetching: false,
                fetched: true,
                userExists: action.userExists
            }
        case 'CHECK_USER_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error
            }
        default:
            return state
    }
}

export default checkUserReducer
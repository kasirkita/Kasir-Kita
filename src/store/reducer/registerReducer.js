const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null
}

const registerReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REGISTER_PENDING':
            return {
                ...state,
                fetching: true
            }
        case 'REGISTER_SUCCESS':
            sessionStorage.setItem('token', action.token)
            sessionStorage.setItem('name', action.data.name)
            sessionStorage.setItem('avatar', action.data.avatar)
            sessionStorage.setItem('email', action.data.email)
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.data,
                message: action.message,
                success: true
            }
        case 'REGISTER_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.error.data.message,
                success: false
            }
        default:
            return state
    }
}

export default registerReducer
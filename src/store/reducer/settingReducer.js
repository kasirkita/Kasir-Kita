const initState = {
    fetching: false,
    fetched: false,
    message: null,
    data: null,
    error: null,
    success: null,
    type: null,
    setting: null,
}

const settingReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SAVE_SETTING_PENDING':
            return {
                ...state,
                fetching: true,
            }
        case 'SAVE_SETTING_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                message: action.message,
                type: 'save',
                success: true
            }

        case 'SAVE_SETTING_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'save',
                success: false
            }
        case 'GET_SETTING_PENDING':
            return {
                ...state,
                fetching: true,
                error: null
            }
        case 'GET_SETTING_SUCCESS':

            return {
                ...state,
                fetching: false,
                fetched: true,
                type: 'get',
                setting: action.data,
                success: true
            }

        case 'GET_SETTING_FAILED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error,
                message: action.message,
                type: 'get',
                success: false
            }
        case 'UPDATE_SETTING_PENDING':
            return {
                ...state,
                fetching: true,
            }
        default:
            return state
    }
}

export default settingReducer
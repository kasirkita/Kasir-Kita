import Axios from 'axios'
import { url } from '../../global'

const fetchRole = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            filter
        } = params
        
        dispatch({
            type: 'FETCH_ROLE_PENDING'
        })

        Axios.get(`${url}/role`, {
            params: {
                page,
                perpage,
                keyword,
                ordering,
                filter
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'FETCH_ROLE_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_ROLE_FAILED',
                    error: {
                        status: null,
                        connection: true,
                        statusText: 'Koneksi Terputus',
                        data: {
                            message: 'Silahkan periksa koneksi backend, lihat tutorial di sini https://github.com/kasirkita/Kasir-Kita'
                        }
                    }
                })

            } else {

                dispatch({
                    type: 'FETCH_ROLE_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const saveRole = (data) => {
    return (dispatch, getState) => {
        
        const {
            name,
            permissions
        } = data
        
        dispatch({
            type: 'SAVE_ROLE_PENDING'
        })

        Axios.post(`${url}/role`, {
                name,
                permissions
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_ROLE_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_ROLE_FAILED',
                    error: {
                        status: null,
                        connection: true,
                        statusText: 'Koneksi Terputus',
                        data: {
                            message: 'Silahkan periksa koneksi backend, lihat tutorial di sini https://github.com/kasirkita/Kasir-Kita'
                        }
                    }
                })

            } else {

                dispatch({
                    type: 'SAVE_ROLE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getRole = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_ROLE_PENDING',
        })

        Axios.get(`${url}/role/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_ROLE_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_ROLE_FAILED',
                    error: {
                        status: null,
                        connection: true,
                        statusText: 'Koneksi Terputus',
                        data: {
                            message: 'Silahkan periksa koneksi backend, lihat tutorial di sini https://github.com/kasirkita/Kasir-Kita'
                        }
                    }
                })

            } else {

                dispatch({
                    type: 'GET_ROLE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const updateRole = (id, data) => {
    return (dispatch, getState) => {
        
        const {
            name,
            permissions
        } = data
        
        dispatch({
            type: 'UPDATE_ROLE_PENDING'
        })

        Axios.post(`${url}/role/${id}`, {
                name,
                permissions
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'UPDATE_ROLE_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'UPDATE_ROLE_FAILED',
                    error: {
                        status: null,
                        connection: true,
                        statusText: 'Koneksi Terputus',
                        data: {
                            message: 'Silahkan periksa koneksi backend, lihat tutorial di sini https://github.com/kasirkita/Kasir-Kita'
                        }
                    }
                })

            } else {

                dispatch({
                    type: 'UPDATE_ROLE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const toggleRole = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_ROLE_PENDING',
        })

        Axios.delete(`${url}/role/toggle/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'TOGGLE_ROLE_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'TOGGLE_ROLE_FAILED',
                    error: {
                        status: null,
                        connection: true,
                        statusText: 'Koneksi Terputus',
                        data: {
                            message: 'Silahkan periksa koneksi backend, lihat tutorial di sini https://github.com/kasirkita/Kasir-Kita'
                        }
                    }
                })

            } else {

                dispatch({
                    type: 'TOGGLE_ROLE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

const deleteRole = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_ROLE_PENDING',
        })

        Axios.delete(`${url}/role/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_ROLE_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_ROLE_FAILED',
                    error: {
                        status: null,
                        connection: true,
                        statusText: 'Koneksi Terputus',
                        data: {
                            message: 'Silahkan periksa koneksi backend, lihat tutorial di sini https://github.com/kasirkita/Kasir-Kita'
                        }
                    }
                })

            } else {

                dispatch({
                    type: 'DELETE_ROLE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

export { fetchRole, saveRole, getRole, updateRole, toggleRole, deleteRole }
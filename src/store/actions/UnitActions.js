import Axios from 'axios'
import { url } from '../../global'

const fetchUnit = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            filter
        } = params
        
        dispatch({
            type: 'FETCH_UNIT_PENDING'
        })

        Axios.get(`${url}/unit`, {
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
                type: 'FETCH_UNIT_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_UNIT_FAILED',
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
                    type: 'FETCH_UNIT_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const saveUnit = (data) => {
    return (dispatch, getState) => {
        
        const {
            name    
        } = data
        
        dispatch({
            type: 'SAVE_UNIT_PENDING'
        })

        Axios.post(`${url}/unit`, {
                name
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_UNIT_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_UNIT_FAILED',
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
                    type: 'SAVE_UNIT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getUnit = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_UNIT_PENDING',
        })

        Axios.get(`${url}/unit/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_UNIT_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_UNIT_FAILED',
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
                    type: 'GET_UNIT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const updateUnit = (id, data) => {
    return (dispatch, getState) => {
        
        const {
            name
        } = data
        
        dispatch({
            type: 'UPDATE_UNIT_PENDING'
        })

        Axios.post(`${url}/unit/${id}`, {
                name
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'UPDATE_UNIT_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'UPDATE_UNIT_FAILED',
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
                    type: 'UPDATE_UNIT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const toggleUnit = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_UNIT_PENDING',
        })

        Axios.delete(`${url}/unit/toggle/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'TOGGLE_UNIT_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'TOGGLE_UNIT_FAILED',
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
                    type: 'TOGGLE_UNIT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

const deleteUnit = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_UNIT_PENDING',
        })

        Axios.delete(`${url}/unit/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_UNIT_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_UNIT_FAILED',
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
                    type: 'DELETE_UNIT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

export { fetchUnit, saveUnit, getUnit, updateUnit, toggleUnit, deleteUnit }
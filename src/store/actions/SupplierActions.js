import Axios from 'axios'
import { url } from '../../global'

const fetchSupplier = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            filter
        } = params
        
        dispatch({
            type: 'FETCH_SUPPLIER_PENDING'
        })

        Axios.get(`${url}/supplier`, {
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
                type: 'FETCH_SUPPLIER_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_SUPPLIER_FAILED',
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
                    type: 'FETCH_SUPPLIER_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const saveSupplier = (data) => {
    return (dispatch, getState) => {
        
        const {
            name,
            email,
            phone_number,
            address
        } = data
        
        dispatch({
            type: 'SAVE_SUPPLIER_PENDING'
        })

        Axios.post(`${url}/supplier`, {
                name,
                email,
                phone_number,
                address
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_SUPPLIER_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_SUPPLIER_FAILED',
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
                    type: 'SAVE_SUPPLIER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getSupplier = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_SUPPLIER_PENDING',
        })

        Axios.get(`${url}/supplier/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_SUPPLIER_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_SUPPLIER_FAILED',
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
                    type: 'GET_SUPPLIER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const updateSupplier = (id, data) => {
    return (dispatch, getState) => {
        
        const {
            name,
            email,
            phone_number,
            address
        } = data
        
        dispatch({
            type: 'UPDATE_SUPPLIER_PENDING'
        })

        Axios.post(`${url}/supplier/${id}`, {
                name,
                email,
                phone_number,
                address
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'UPDATE_SUPPLIER_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'UPDATE_SUPPLIER_FAILED',
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
                    type: 'UPDATE_SUPPLIER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const toggleSupplier = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_SUPPLIER_PENDING',
        })

        Axios.delete(`${url}/supplier/toggle/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'TOGGLE_SUPPLIER_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'TOGGLE_SUPPLIER_FAILED',
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
                    type: 'TOGGLE_SUPPLIER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const deleteSupplier = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_SUPPLIER_PENDING',
        })

        Axios.delete(`${url}/supplier/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_SUPPLIER_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_SUPPLIER_FAILED',
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
                    type: 'DELETE_SUPPLIER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

export { fetchSupplier, saveSupplier, getSupplier, updateSupplier, toggleSupplier, deleteSupplier }
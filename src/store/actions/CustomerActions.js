import Axios from 'axios'
import { url } from '../../global'

const fetchCustomer = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            filter
        } = params
        
        dispatch({
            type: 'FETCH_CUSTOMER_PENDING'
        })

        Axios.get(`${url}/customer`, {
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
                type: 'FETCH_CUSTOMER_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_CUSTOMER_FAILED',
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
                    type: 'FETCH_CUSTOMER_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const saveCustomer = (data) => {
    return (dispatch, getState) => {
        
        const {
            name,
            email,
            phone_number,
            type_label,
            type_value,
            address
        } = data
        
        dispatch({
            type: 'SAVE_CUSTOMER_PENDING'
        })

        Axios.post(`${url}/customer`, {
                name,
                email,
                phone_number,
                type_label,
                type_value,
                address
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_CUSTOMER_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_CUSTOMER_FAILED',
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
                    type: 'SAVE_CUSTOMER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getCustomer = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_CUSTOMER_PENDING',
        })

        Axios.get(`${url}/customer/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_CUSTOMER_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_CUSTOMER_FAILED',
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
                    type: 'GET_CUSTOMER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const updateCustomer = (id, data) => {
    return (dispatch, getState) => {
        
        const {
            name,
            email,
            phone_number,
            type_label,
            type_value,
            address
        } = data
        
        dispatch({
            type: 'UPDATE_CUSTOMER_PENDING'
        })

        Axios.post(`${url}/customer/${id}`, {
                name,
                email,
                phone_number,
                type_label,
                type_value,
                address
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'UPDATE_CUSTOMER_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'UPDATE_CUSTOMER_FAILED',
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
                    type: 'UPDATE_CUSTOMER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const toggleCustomer = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_CUSTOMER_PENDING',
        })

        Axios.delete(`${url}/customer/toggle/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'TOGGLE_CUSTOMER_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'TOGGLE_CUSTOMER_FAILED',
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
                    type: 'TOGGLE_CUSTOMER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const deleteCustomer = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_CUSTOMER_PENDING',
        })

        Axios.delete(`${url}/customer/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_CUSTOMER_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_CUSTOMER_FAILED',
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
                    type: 'DELETE_CUSTOMER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

export { fetchCustomer, saveCustomer, getCustomer, updateCustomer, toggleCustomer, deleteCustomer }
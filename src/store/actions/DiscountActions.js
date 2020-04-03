import Axios from 'axios'
import { url } from '../../global'
import moment from 'moment'

const fetchDiscount = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            filter
        } = params
        
        dispatch({
            type: 'FETCH_DISCOUNT_PENDING'
        })

        Axios.get(`${url}/discount`, {
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
                type: 'FETCH_DISCOUNT_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_DISCOUNT_FAILED',
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
                    type: 'FETCH_DISCOUNT_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const saveDiscount = (data) => {
    return (dispatch, getState) => {
        
        const {
            valid_thru,
            amount,
            type,
            term,
            total_qty,
            quota,
            customer_id,
            customer_name,
            product_name,
            product_id
        } = data
        
        dispatch({
            type: 'SAVE_DISCOUNT_PENDING'
        })

        Axios.post(`${url}/discount`, {
                valid_thru: valid_thru ? moment(valid_thru).format('YYYY-MM-DD') : null,
                amount,
                type,
                term,
                total_qty,
                quota,
                customer_type: customer_id,
                customer_type_name: customer_name,
                product_name,
                product_id
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_DISCOUNT_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_DISCOUNT_FAILED',
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
                    type: 'SAVE_DISCOUNT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getDiscount = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_DISCOUNT_PENDING',
        })

        Axios.get(`${url}/discount/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_DISCOUNT_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_DISCOUNT_FAILED',
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
                    type: 'GET_DISCOUNT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const updateDiscount = (id, data) => {
    return (dispatch, getState) => {
        
        const {
            valid_thru,
            amount,
            type,
            term,
            total_qty,
            quota,
            customer_id,
            customer_name,
            product_name,
            product_id
        } = data
        
        dispatch({
            type: 'UPDATE_DISCOUNT_PENDING'
        })

        Axios.post(`${url}/discount/${id}`, {
            valid_thru: valid_thru ? moment(valid_thru).format('YYYY-MM-DD') : null,
            amount,
            type,
            term,
            total_qty,
            quota,
            customer_type: customer_id,
            customer_type_name: customer_name,
            product_name,
            product_id
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'UPDATE_DISCOUNT_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'UPDATE_DISCOUNT_FAILED',
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
                    type: 'UPDATE_DISCOUNT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const toggleDiscount = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_DISCOUNT_PENDING',
        })

        Axios.delete(`${url}/discount/toggle/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'TOGGLE_DISCOUNT_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'TOGGLE_DISCOUNT_FAILED',
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
                    type: 'TOGGLE_DISCOUNT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

const deleteDiscount = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_DISCOUNT_PENDING',
        })

        Axios.delete(`${url}/discount/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_DISCOUNT_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_DISCOUNT_FAILED',
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
                    type: 'DELETE_DISCOUNT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

const selectDiscount = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SELECT_DISCOUNT_PENDING',
        })

        Axios.get(`${url}/discount/select/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'SELECT_DISCOUNT_SUCCESS',
                message: res.data.message,
                selected: res.data.selected,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'SELECT_DISCOUNT_FAILED',
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
                    type: 'SELECT_DISCOUNT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

export { fetchDiscount, saveDiscount, getDiscount, updateDiscount, toggleDiscount, deleteDiscount, selectDiscount }
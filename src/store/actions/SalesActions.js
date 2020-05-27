import Axios from 'axios'
import { url } from '../../global'
import moment from 'moment'

const fetchSales = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            filter,
            start_date,
            end_date
        } = params
        
        dispatch({
            type: 'FETCH_SALES_PENDING'
        })

        Axios.get(`${url}/sales`, {
            params: {
                page,
                perpage,
                keyword,
                ordering,
                filter,
                start_date: moment(start_date).format('YYYY-MM-DD'),
                end_date: moment(end_date).format('YYYY-MM-DD')
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'FETCH_SALES_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_SALES_FAILED',
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
                    type: 'FETCH_SALES_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const saveSales = (data) => {
    return (dispatch, getState) => {
        
        const {
            number,
            customer_id,
            customer_name,
            customer_type,
            payment,
            subtotal,
            cash,
            change,
            carts,
            units,
            tax,
            total_discount,
            total,
            status,
        } = data
        
        dispatch({
            type: 'SAVE_SALES_PENDING'
        })

        Axios.post(`${url}/cashier`, {
                number,
                customer_id,
                customer_name,
                customer_type,
                payment_type: payment,
                subtotal,
                amount: cash,
                change,
                tax,
                total_discount,
                status,
                total,
                details: carts,
                units
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_SALES_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_SALES_FAILED',
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
                    type: 'SAVE_SALES_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getSales = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_SALES_PENDING',
        })

        Axios.get(`${url}/sales/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_SALES_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_SALES_FAILED',
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
                    type: 'GET_SALES_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const updateSales = (id, data) => {
    return (dispatch, getState) => {
        
        const {
            name
        } = data
        
        dispatch({
            type: 'UPDATE_SALES_PENDING'
        })

        Axios.post(`${url}/sales/${id}`, {
                name
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'UPDATE_SALES_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'UPDATE_SALES_FAILED',
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
                    type: 'UPDATE_SALES_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const toggleSales = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_SALES_PENDING',
        })

        Axios.delete(`${url}/sales/toggle/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'TOGGLE_SALES_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'TOGGLE_SALES_FAILED',
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
                    type: 'TOGGLE_SALES_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

const deleteSales = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_SALES_PENDING',
        })

        Axios.delete(`${url}/sales/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_SALES_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_SALES_FAILED',
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
                    type: 'DELETE_SALES_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

export { fetchSales, saveSales, getSales, updateSales, toggleSales, deleteSales }
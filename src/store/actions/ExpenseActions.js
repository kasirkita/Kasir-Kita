import Axios from 'axios'
import { url } from '../../global'
import moment from 'moment'

const fetchExpense = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            filter,
            payment_date_start,
            payment_date_end,
        } = params
        
        dispatch({
            type: 'FETCH_EXPENSE_PENDING'
        })

        Axios.get(`${url}/expense`, {
            params: {
                page,
                perpage,
                keyword,
                ordering,
                filter,
                payment_date_start: moment(payment_date_start).format('YYYY-MM-DD'),
                payment_date_end: moment(payment_date_end).format('YYYY-MM-DD'),
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'FETCH_EXPENSE_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_EXPENSE_FAILED',
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
                    type: 'FETCH_EXPENSE_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const saveExpense = (data) => {
    return (dispatch, getState) => {
        
        const {
            number,
            payment_date,
            product_name,
            price,
            qty,
            supplier_name,
            in_charge_id,
            in_charge_name,
            notes,
            evidence,
        } = data
        
        dispatch({
            type: 'SAVE_EXPENSE_PENDING'
        })


        const fd = new FormData();

        fd.append('evidence', evidence)
        fd.set('payment_date', moment(payment_date).format('YYYY-MM-DD'))
        fd.set('number', number)
        fd.set('product_name', product_name)
        fd.set('price', price)
        fd.set('qty', qty)
        fd.set('supplier_name', supplier_name)
        fd.set('in_charge_id', in_charge_id)
        fd.set('in_charge_name', in_charge_name)
        fd.set('notes', notes)

        Axios.post(`${url}/expense`, fd,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_EXPENSE_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_EXPENSE_FAILED',
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
                    type: 'SAVE_EXPENSE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}


const updateExpense = (id, data) => {
    return (dispatch, getState) => {
        
        const {
            number,
            payment_date,
            product_name,
            price,
            qty,
            supplier_name,
            in_charge_id,
            in_charge_name,
            notes,
            evidence,
        } = data
        
        dispatch({
            type: 'UPDATE_EXPENSE_PENDING'
        })


        const fd = new FormData();

        fd.append('evidence', evidence)
        fd.set('payment_date', moment(payment_date).format('YYYY-MM-DD'))
        fd.set('number', number)
        fd.set('product_name', product_name)
        fd.set('price', price)
        fd.set('qty', qty)
        fd.set('supplier_name', supplier_name)
        fd.set('in_charge_id', in_charge_id)
        fd.set('in_charge_name', in_charge_name)
        fd.set('notes', notes)

        Axios.post(`${url}/expense/${id}`, fd,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
            }
        }).then(res => {

            dispatch({
                type: 'UPDATE_EXPENSE_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'UPDATE_EXPENSE_FAILED',
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
                    type: 'UPDATE_EXPENSE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getExpense = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_EXPENSE_PENDING',
        })

        Axios.get(`${url}/expense/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_EXPENSE_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_EXPENSE_FAILED',
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
                    type: 'GET_EXPENSE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

const deleteExpense = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_EXPENSE_PENDING',
        })

        Axios.delete(`${url}/expense/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_EXPENSE_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_EXPENSE_FAILED',
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
                    type: 'DELETE_EXPENSE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


export { fetchExpense, saveExpense, getExpense, deleteExpense, updateExpense }
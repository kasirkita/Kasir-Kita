import Axios from 'axios'
import { url } from '../../global'
import moment from 'moment'

const fetchPurchase = (params) => {
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
            type: 'FETCH_PURCHASE_PENDING'
        })

        Axios.get(`${url}/purchase`, {
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
                type: 'FETCH_PURCHASE_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_PURCHASE_FAILED',
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
                    type: 'FETCH_PURCHASE_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const savePurchase = (data) => {
    return (dispatch, getState) => {
        
        const {
            number,
            payment_date,
            supplier_id,
            supplier_name,
            in_charge_id,
            in_charge_name,
            notes,
            tax,
            total_discount,
            total,
            evidence,
            carts
        } = data
        
        dispatch({
            type: 'SAVE_PURCHASE_PENDING'
        })


        const fd = new FormData();

        fd.append('evidence', evidence)
        fd.set('payment_date', moment(payment_date).format('YYYY-MM-DD'))
        fd.set('number', number)
        fd.set('supplier_id', supplier_id)
        fd.set('supplier_name', supplier_name)
        fd.set('in_charge_id', in_charge_id)
        fd.set('in_charge_name', in_charge_name)
        fd.set('notes', notes)
        fd.set('tax', tax)
        fd.set('total_discount', total_discount)
        fd.set('total', total)
        fd.set('details', JSON.stringify(carts))

        Axios.post(`${url}/purchase`, fd,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_PURCHASE_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_PURCHASE_FAILED',
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
                    type: 'SAVE_PURCHASE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getPurchase = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_PURCHASE_PENDING',
        })

        Axios.get(`${url}/purchase/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_PURCHASE_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_PURCHASE_FAILED',
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
                    type: 'GET_PURCHASE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

const deletePurchase = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_PURCHASE_PENDING',
        })

        Axios.delete(`${url}/purchase/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_PURCHASE_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_PURCHASE_FAILED',
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
                    type: 'DELETE_PURCHASE_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


export { fetchPurchase, savePurchase, getPurchase, deletePurchase }
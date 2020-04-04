import Axios from 'axios'
import { url } from '../../global'
import moment from 'moment'

const fetchSalesReport = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            start_date,
            end_date
        } = params
        
        dispatch({
            type: 'FETCH_SALES_REPORT_PENDING'
        })

        Axios.get(`${url}/report-sales`, {
            params: {
                page,
                perpage,
                keyword,
                ordering,
                start_date: moment(start_date).format('YYYY-MM-DD'),
                end_date: moment(end_date).format('YYYY-MM-DD')
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'FETCH_SALES_REPORT_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_SALES_REPORT_FAILED',
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
                    type: 'FETCH_SALES_REPORT_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const fetchPurchaseReport = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            start_date,
            end_date
        } = params
        
        dispatch({
            type: 'FETCH_PURCHASE_REPORT_PENDING'
        })

        Axios.get(`${url}/report-purchase`, {
            params: {
                page,
                perpage,
                keyword,
                ordering,
                start_date: moment(start_date).format('YYYY-MM-DD'),
                end_date: moment(end_date).format('YYYY-MM-DD')
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'FETCH_PURCHASE_REPORT_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_PURCHASE_REPORT_FAILED',
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
                    type: 'FETCH_PURCHASE_REPORT_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const fetchExpenseReport = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            start_date,
            end_date
        } = params
        
        dispatch({
            type: 'FETCH_EXPENSE_REPORT_PENDING'
        })

        Axios.get(`${url}/report-expense`, {
            params: {
                page,
                perpage,
                keyword,
                ordering,
                start_date: moment(start_date).format('YYYY-MM-DD'),
                end_date: moment(end_date).format('YYYY-MM-DD')
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'FETCH_EXPENSE_REPORT_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_EXPENSE_REPORT_FAILED',
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
                    type: 'FETCH_EXPENSE_REPORT_FAILED',
                    error: error.response
                })
            }

        })
    }
}

export { fetchSalesReport, fetchPurchaseReport, fetchExpenseReport }
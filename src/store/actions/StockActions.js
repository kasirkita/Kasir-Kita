import Axios from 'axios'
import { url } from '../../global'
import moment from 'moment'

const fetchStock = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            product_id,
            start_date,
            end_date
        } = params
        
        dispatch({
            type: 'FETCH_STOCK_PENDING'
        })

        Axios.get(`${url}/stock`, {
            params: {
                page,
                perpage,
                keyword,
                ordering,
                product_id,
                start_date: moment(start_date).format('YYYY-MM-DD'),
                end_date: moment(end_date).format('YYYY-MM-DD')
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'FETCH_STOCK_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_STOCK_FAILED',
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
                    type: 'FETCH_STOCK_FAILED',
                    error: error.response
                })
            }

        })
    }
}


const saveStock = (data) => {
    return (dispatch, getState) => {
        
        const {
            product_id,
            real_stock,
            description    
        } = data
        
        dispatch({
            type: 'SAVE_STOCK_PENDING'
        })

        Axios.post(`${url}/stock`, {
                product_id,
                real_stock,
                description
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_STOCK_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_STOCK_FAILED',
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
                    type: 'SAVE_STOCK_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

export { fetchStock, saveStock }
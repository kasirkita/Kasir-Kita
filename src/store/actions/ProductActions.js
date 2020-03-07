import Axios from 'axios'
import { url } from '../../global'

const fetchProduct = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            filter
        } = params
        
        dispatch({
            type: 'FETCH_PRODUCT_PENDING'
        })

        Axios.get(`${url}/product`, {
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
                type: 'FETCH_PRODUCT_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_PRODUCT_FAILED',
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
                    type: 'FETCH_PRODUCT_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const saveProduct = (data) => {
    return (dispatch, getState) => {
        
        const {
            code,
            name,
            cost,
            price,
            wholesale,
            unit_id,
            unit_label,
            category_id,
            category_label,
            stock
        } = data
        
        dispatch({
            type: 'SAVE_PRODUCT_PENDING'
        })

        Axios.post(`${url}/product`, {
                code,
                name,
                cost,
                price,
                wholesale,
                unit_id,
                unit_label,
                category_id,
                category_label,
                stock
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_PRODUCT_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_PRODUCT_FAILED',
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
                    type: 'SAVE_PRODUCT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getProduct = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_PRODUCT_PENDING',
        })

        Axios.get(`${url}/product/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_PRODUCT_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_PRODUCT_FAILED',
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
                    type: 'GET_PRODUCT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const updateProduct = (id, data) => {
    return (dispatch, getState) => {
        
        const {
            code,
            name,
            cost,
            price,
            wholesale,
            unit_id,
            unit_label,
            category_id,
            category_label,
            stock
        } = data
        
        dispatch({
            type: 'UPDATE_PRODUCT_PENDING'
        })

        Axios.post(`${url}/product/${id}`, {
                code,
                name,
                cost,
                price,
                wholesale,
                unit_id,
                unit_label,
                category_id,
                category_label,
                stock
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            dispatch({
                type: 'UPDATE_PRODUCT_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'UPDATE_PRODUCT_FAILED',
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
                    type: 'UPDATE_PRODUCT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const toggleProduct = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_PRODUCT_PENDING',
        })

        Axios.delete(`${url}/product/toggle/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'TOGGLE_PRODUCT_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'TOGGLE_PRODUCT_FAILED',
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
                    type: 'TOGGLE_PRODUCT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const selectProduct = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SELECT_PRODUCT_PENDING',
        })

        Axios.get(`${url}/product/select/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'SELECT_PRODUCT_SUCCESS',
                message: res.data.message,
                selected: res.data.selected,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'SELECT_PRODUCT_FAILED',
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
                    type: 'SELECT_PRODUCT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const deleteProduct = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_PRODUCT_PENDING',
        })

        Axios.delete(`${url}/product/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_PRODUCT_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_PRODUCT_FAILED',
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
                    type: 'DELETE_PRODUCT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

const importProduct = (file) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'IMPORT_PRODUCT_PENDING',
        })

        const formdata = new FormData()
        formdata.append('file', file)

        Axios.post(`${url}/product/import`, formdata,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            },
        }).then(res => {
            dispatch({
                type: 'IMPORT_PRODUCT_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'IMPORT_PRODUCT_FAILED',
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
                    type: 'IMPORT_PRODUCT_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

export { fetchProduct, saveProduct, getProduct, updateProduct, toggleProduct, deleteProduct, importProduct, selectProduct }
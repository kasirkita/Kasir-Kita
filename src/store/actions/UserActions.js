import Axios from 'axios'
import { url } from '../../global'
import moment from 'moment'

const fetchUser = (params) => {
    return (dispatch, getState) => {
        
        const {
            page,
            perpage,
            keyword,
            ordering,
            filter
        } = params
        
        dispatch({
            type: 'FETCH_USER_PENDING'
        })

        Axios.get(`${url}/user`, {
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
                type: 'FETCH_USER_SUCCESS',
                data: res.data.data,
                selected: res.data.selected
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'FETCH_USER_FAILED',
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
                    type: 'FETCH_USER_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const saveUser = (data) => {
    return (dispatch, getState) => {
        
        const {
            date_of_birth,
            name,
            email,
            phone_number,
            role_id,
            role_name,
            password,
            password_confirmation,
            photo,
            place_of_birth,
            address
        } = data
        
        dispatch({
            type: 'SAVE_USER_PENDING'
        })


        const fd = new FormData();

        fd.append('photo', photo)
        fd.set('date_of_birth', date_of_birth ? moment(date_of_birth).format('YYYY-MM-DD') : '')
        fd.set('name', name)
        fd.set('email', email)
        fd.set('phone_number', phone_number)
        fd.set('role_id', role_id)
        fd.set('role_name', role_name)
        fd.set('password', password)
        fd.set('password_confirmation', password_confirmation)
        fd.set('photo', photo)
        fd.set('place_of_birth', place_of_birth)
        fd.set('address', address)

        Axios.post(`${url}/user`, fd,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
            }
        }).then(res => {

            dispatch({
                type: 'SAVE_USER_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_USER_FAILED',
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
                    type: 'SAVE_USER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const getUser = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_USER_PENDING',
        })

        Axios.get(`${url}/user/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_USER_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_USER_FAILED',
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
                    type: 'GET_USER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const updateUser = (id, data) => {
    return (dispatch, getState) => {
        
        const {
            date_of_birth,
            name,
            email,
            phone_number,
            role_id,
            role_name,
            password,
            password_confirmation,
            photo,
            place_of_birth,
            address
        } = data
        
        dispatch({
            type: 'UPDATE_USER_PENDING'
        })

        const fd = new FormData();

        fd.append('photo', photo)
        fd.set('date_of_birth', date_of_birth ? moment(date_of_birth).format('YYYY-MM-DD') : '')
        fd.set('name', name)
        fd.set('email', email)
        fd.set('phone_number', phone_number)
        fd.set('role_id', role_id)
        fd.set('role_name', role_name)
        fd.set('password', password)
        fd.set('password_confirmation', password_confirmation)
        fd.set('photo', photo)
        fd.set('place_of_birth', place_of_birth)
        fd.set('address', address)

        Axios.post(`${url}/user/${id}`, fd,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
            }
        }).then(res => {

            dispatch({
                type: 'UPDATE_USER_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'UPDATE_USER_FAILED',
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
                    type: 'UPDATE_USER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}

const toggleUser = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_USER_PENDING',
        })

        Axios.delete(`${url}/user/toggle/${id}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'TOGGLE_USER_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'TOGGLE_USER_FAILED',
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
                    type: 'TOGGLE_USER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


const deleteUser = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_USER_PENDING',
        })

        Axios.delete(`${url}/user/${id}`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'DELETE_USER_SUCCESS',
                message: res.data.message,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'DELETE_USER_FAILED',
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
                    type: 'DELETE_USER_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}


export { fetchUser, saveUser, getUser, updateUser, toggleUser, deleteUser }
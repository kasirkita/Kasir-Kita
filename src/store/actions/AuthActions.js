import Axios from 'axios'
import { url } from '../../global'

const checkUser = () => {
    return (dispatch, getState) => {

        dispatch({
            type: 'CHECK_USER_PENDING'
        })

        Axios.get(`${url}/check`).then(res => {
            dispatch({
                type: 'CHECK_USER_SUCCESS',
                userExists: res.data.user_exists
            })
        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'CHECK_USER_FAILED',
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
                    type: 'CHECK_USER_FAILED',
                    error: error.response
                })
            }

        })
    }
}

const register = (data) => {
    return async  (dispatch, getState) => {
        
        const {
            name,
            email,
            password,
            password_confirmation
        } = data

        dispatch({
            type: 'REGISTER_PENDING'
        })

        await Axios.post(`${url}/register`, {

            name,
            email,
            password,
            password_confirmation

        }).then(res => {

            const setting = res.data.setting
            sessionStorage.setItem('decimal_separator', setting ? setting.decimal_separator : '.')
            sessionStorage.setItem('thousand_separator', setting ? setting.thousand_separator : '.' )
            sessionStorage.setItem('currency', setting ? setting.currency : '')
            sessionStorage.setItem('printer', setting ? setting.printer : '')
            sessionStorage.setItem('tax', setting ? setting.tax : '')
            sessionStorage.setItem('logo', setting.logo_url)
            sessionStorage.setItem('logo_remove', setting.logo_remove ? setting.logo_remove : false)
            sessionStorage.setItem('shop_name', setting.name ? setting.name : '')
            sessionStorage.setItem('address', setting.address ? setting.address : '')
            sessionStorage.setItem('phone_number', setting.phone_number ? setting.phone_number : '')
            sessionStorage.setItem('divider', setting.divider ? setting.divider : '')


            dispatch({
                type: 'REGISTER_SUCCESS',
                token: res.data.token,
                data: res.data.data,
                message: res.data.message
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'REGISTER_FAILED',
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
                    type: 'REGISTER_FAILED',
                    error: error.response
                })
            }
        })
    }
}


const login = (data) => {
    return (dispatch, getState) => {
        
        const {
            email,
            password
        } = data

        dispatch({
            type: 'LOGIN_PENDING'
        })

        Axios.post(`${url}/login`, {
            email,
            password

        }).then(res => {

            const setting = res.data.setting
            sessionStorage.setItem('decimal_separator', setting ? setting.decimal_separator : '.')
            sessionStorage.setItem('thousand_separator', setting ? setting.thousand_separator : '.' )
            sessionStorage.setItem('currency', setting ? setting.currency : '')
            sessionStorage.setItem('printer', setting ? setting.printer : '')
            sessionStorage.setItem('tax', setting ? setting.tax : '')
            sessionStorage.setItem('logo', setting.logo_url)
            sessionStorage.setItem('logo_remove', setting.logo_remove ? setting.logo_remove : false)
            sessionStorage.setItem('shop_name', setting.name ? setting.name : '')
            sessionStorage.setItem('address', setting.address ? setting.address : '')
            sessionStorage.setItem('phone_number', setting.phone_number ? setting.phone_number : '')
            sessionStorage.setItem('divider', setting.divider ? setting.divider : '')
            
            dispatch({
                type: 'LOGIN_SUCCESS',
                token: res.data.token,
                data: res.data.data,
                message: res.data.message,
                permissions: res.data.permissions,
                redirect: res.data.redirect
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'LOGIN_FAILED',
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
                    type: 'LOGIN_FAILED',
                    error: error.response
                })
            }
        })
    }
}

export { checkUser, register, login }
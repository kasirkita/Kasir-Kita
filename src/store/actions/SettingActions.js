import Axios from "axios"
import { url } from "../../global"

const getSetting = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'GET_SETTING_PENDING',
        })

        Axios.get(`${url}/setting`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'GET_SETTING_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'GET_SETTING_FAILED',
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
                    type: 'GET_SETTING_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

const saveSetting = (data) => {
    return (dispatch, getState) => {
        
        const {
            name,
            address,
            logo,
            logo_remove,
            logo_url,
            phone_number,
            divider,
            currency,
            thousand_separator,
            decimal_separator
        } = data
        
        dispatch({
            type: 'SAVE_SETTING_PENDING'
        })

        const fd = new FormData();

        fd.set('name', name)
        fd.set('address', address)
        fd.append('logo', logo)
        fd.set('logo_remove', logo_remove)
        fd.set('phone_number', phone_number)
        fd.set('divider', divider)
        fd.set('currency', currency)
        fd.set('thousand_separator', thousand_separator)
        fd.set('decimal_separator', decimal_separator)

        Axios.post(`${url}/setting`, fd,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
            }
        }).then(res => {

            sessionStorage.setItem('decimal_separator', res.data.data.decimal_separator)
            sessionStorage.setItem('thousand_separator', res.data.data.thousand_separator)
            sessionStorage.setItem('currency', res.data.data.currency)


            dispatch({
                type: 'SAVE_SETTING_SUCCESS',
                data: res.data.data,
                message: res.data.message
            })

        }).catch(error => {

            if (!error.response) {
                dispatch({
                    type: 'SAVE_SETTING_FAILED',
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
                    type: 'SAVE_SETTING_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }

        })
    }
}


export { getSetting, saveSetting }
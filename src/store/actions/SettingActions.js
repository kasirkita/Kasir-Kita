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
            phone_number,
            divider,
            currency,
            thousand_separator,
            decimal_separator,
            tax,
            printer
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
        fd.set('tax', tax)
        fd.set('printer', printer)

        Axios.post(`${url}/setting`, fd,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
            }
        }).then(res => {

            sessionStorage.setItem('decimal_separator', res.data.data.decimal_separator ? res.data.data.decimal_separator : '')
            sessionStorage.setItem('thousand_separator', res.data.data.thousand_separator ? res.data.data.thousand_separator : '')
            sessionStorage.setItem('currency', res.data.data.currency ? res.data.data.currency : '')
            sessionStorage.setItem('printer', res.data.data.printer ? res.data.data.printer : '')
            sessionStorage.setItem('tax', res.data.data.tax ? res.data.data.tax : '')
            sessionStorage.setItem('logo', res.data.data.logo_url)
            sessionStorage.setItem('logo_remove', res.data.data.logo_remove ? res.data.data.logo_remove : false)
            sessionStorage.setItem('shop_name', res.data.data.name ? res.data.data.name : '')
            sessionStorage.setItem('address', res.data.data.address ? res.data.data.address : '')
            sessionStorage.setItem('phone_number', res.data.data.phone_number ? res.data.data.phone_number : '')
            sessionStorage.setItem('divider', res.data.data.divider ? res.data.data.divider : '')


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
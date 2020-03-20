import { url } from "../../global"
import Axios from "axios"

const getListPermission = () => {
    return (dispatch, getState) => {

        dispatch({
            type: 'LIST_PERMISSION_PENDING',
        })

        Axios.get(`${url}/permission/list`, {
            headers: {
                Authorization:  `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch({
                type: 'LIST_PERMISSION_SUCCESS',
                data: res.data.data,
                success: true
            })
        }).catch(error => {
            if (!error.response) {
                dispatch({
                    type: 'LIST_PERMISSION_FAILED',
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
                    type: 'LIST_PERMISSION_FAILED',
                    error: error.response,
                    message: error.response.data.message
                })
            }
        })
    }
}

export { getListPermission }
import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { withToastManager } from 'react-toast-notifications'
import { url } from '../global'
import Axios from 'axios'

function Login(props) {

    const { toastManager } = props 

    const [fetching, setFetching] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    useEffect(() => {
        checkUser()
    }, [])
    
    const handleChange = (name) => (e) => {
        setError(null)
        setData({
            ...data,
            [name]: e.target.value
        })
    }

    const handleReset = () => {
        setData({
            email: '',
            password: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        Axios.post(`${url}/login`, {
            email: data.email,
            password: data.password
        }).then(res => {
            toastManager.add(res.data.message, {
                appearance: 'success',
                autoDismiss: true
            })

            const setting = res.data.settings
            const data = res.data

            console.log(setting, data)

            sessionStorage.setItem('decimal_separator', setting ? setting.decimal_separator : '.')
            sessionStorage.setItem('thousand_separator', setting ? setting.thousand_separator : '.' )
            sessionStorage.setItem('currency', setting ? setting.currency : '')
            sessionStorage.setItem('tax', setting ? setting.tax : '')
            sessionStorage.setItem('logo', setting.logo_url)
            sessionStorage.setItem('logo_remove', setting.logo_remove ? setting.logo_remove : false)
            sessionStorage.setItem('shop_name', setting.name ? setting.name : '')
            sessionStorage.setItem('address', setting.address ? setting.address : '')
            sessionStorage.setItem('phone_number', setting.phone_number ? setting.phone_number : '')
            sessionStorage.setItem('divider', setting.divider ? setting.divider : '')
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('name', data.data.name)
            sessionStorage.setItem('avatar', data.data.avatar)
            sessionStorage.setItem('email', data.data.email)
            sessionStorage.setItem('permissions', JSON.stringify(data.permissions))

            return props.history.push(data.redirect.slug)

        }).catch(err => {
            if (err.response) {
                if (err.response.status === 400) {
                    setError(err.response.data)
                } else {
                    toastManager.add(err.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })
                }
            }

            setLoading(false)
            
        })
    }

    const checkUser = () => {
        setFetching(true)
        Axios.get(`${url}/check`).then(res => {
            setFetching(false)
            if (!res.data.user_exists) {
                return props.history.push('welcome')
            }
        }).catch(err => {
            if (err.response) {
                toastManager.add(err.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true
                })
            }
        })
    }

    return (
        <div className="d-flex justify-content-center align-content-center mt-5">
            {
                fetching && (
                    <Loading />
                )
            }
            <div className="col-6">
                <h4>Masuk</h4>
                <p className="text-muted">Silahkan masukan username dan password</p>
                <div className="col p-0">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="control-label">Email <span className="text-danger">*</span></label>
                            <input type="text" className={`form-control ${error && error.email && 'is-invalid'}`} value={data.email} onChange={handleChange('email')} />
                            {
                                error && error.email && (
                                    <div className="invalid-feedback">{ error.email }</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <label className="control-label">Password <span className="text-danger">*</span></label>
                            <input type="password" className={`form-control ${error && error.password && 'is-invalid'}`} value={data.password} onChange={handleChange('password')} />
                            {
                                error && error.password && (
                                    <div className="invalid-feedback">{ error.password }</div>
                                )
                            }
                        </div>
                        <div className="form-group mt-4">
                            {
                                loading ? (
                                    <button type="button" className="btn btn-primary btn-disabled mr-2" disabled alt="loading"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading...</button>
                                ) : (
                                    <button className="btn btn-primary mr-2" type="submit"><i className="mdi mdi-lock mr-2"></i>Masuk</button>
                                ) 
                            }
                            <button type="reset" onClick={handleReset} className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default (withToastManager(Login))

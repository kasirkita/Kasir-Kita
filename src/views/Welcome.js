import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import {withToastManager} from 'react-toast-notifications'
import Axios from 'axios'
import { url } from '../global'

function Welcome(props){
    const {toastManager} = props
    const [fetching, setFetching] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        agree: false,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const [error, setError] = useState(null)

    useEffect(() => {
        checkUser()
    }, [])

    const handleAgree = (e) => {
        setData({
            ...data,
            agree: e.target.checked
        })
    }

    const handleChange = (name) => (e) => {
        setError(null)
        setData({
            ...data,
            [name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        Axios.post(`${url}/register`, {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation
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
                    console.log(err.response.data)
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
            if (res.data.user_exists) {
                return props.history.push('login')
            }

            if (!res.data.database_exists) {
                return props.history.push('/starting')
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

            <div className="col-8 border p-5">
                <p><i className="mdi mdi-desktop-classic mr-2"></i>Kasir Kita 2.0</p>
                <h1>Selamat Datang</h1>
                <p>Baru pertama kali install ya? Ayo isi data nya dulu disini</p>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">Siapa nama kamu?</label>
                        <input type="text" className={`form-control ${error && error.name && 'is-invalid'}`} placeholder="Nama" onChange={handleChange('name')} value={data.name} />
                        {
                            error && error.name && (
                                <div className="invalid-feedback">{ error.name }</div>
                            )
                        }
                    </div>
                    <div className="form-group">
                        <label className="control-label">Apa email kamu?</label>
                        <input type="email" className={`form-control ${error && error.email && 'is-invalid'}`} placeholder="Email" onChange={handleChange('email')} value={data.email} />
                        {
                            error && error.email && (
                                <div className="invalid-feedback">{ error.email }</div>
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Masukin password?</label>
                                <input type="password" className={`form-control ${error && error.password && 'is-invalid'}`} placeholder="Password" onChange={handleChange('password')} value={data.password} />
                                {
                                    error && error.password && (
                                        <div className="invalid-feedback">{ error.password }</div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Ulangi passwordnya</label>
                                <input type="password" className={`form-control ${error && error.password_confirmation && 'is-invalid'}`} placeholder="Ulangi Password" onChange={handleChange('password_confirmation')} value={data.password_confirmation} />
                                {
                                    error && error.password_confirmation && (
                                        <div className="invalid-feedback">{ error.password_confirmation }</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Syarat dan Ketentuan</label>
                        <div className="term-and-condition">
                            <p>Aplikasi ini 100% Gratis, tetapi jika menginginkan penambahan fitur dan atau cara menjalakan aplikasi silahkan chat melalui whatsapp 089611081675 Adapun ketentuan pada penggunaan aplikasi ini adalah</p>
                            <ul>
                                <li>Tidak boleh dikomersilkan dalam bentuk apapun</li>
                                <li>Tidak boleh menyalin dan menyebarkan ulang kode tanpa sepengetahuan author</li>
                                <li>Tidak boleh menghapus credit pada aplikasi</li>
                            </ul>
                            <p>Jika ingin berkontribusi, silahkan lakukan fork pada repository github ini : <a href="https://github.com/kasirkita/Kasir-Kita">https://github.com/kasirkita/Kasir-Kita</a></p>
                            <p>Bisa juga melaukan donasi untuk mendukung author dengan seikhlasnya disini</p>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/kasirkita/Kasir-Kita/raw/master/github/dana.png"><img src="https://github.com/kasirkita/Kasir-Kita/raw/master/github/dana.png" alt="Dana" width="120" /></a>           
                                        </td>
                                        <td>
                                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/kasirkita/Kasir-Kita/raw/master/github/ovo.png"><img src="https://github.com/kasirkita/Kasir-Kita/raw/master/github/ovo.png" alt="Ovo" width="120" /></a>        
                                        </td>
                                        <td>
                                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/kasirkita/Kasir-Kita/raw/master/github/paypal.png"><img src="https://github.com/kasirkita/Kasir-Kita/raw/master/github/paypal.png" alt="Paypal" width="120" /></a>            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="agree" checked={data.agree} onChange={handleAgree} />
                        <label className="form-check-label" htmlFor="agree">
                            Saya sudah setuju
                        </label>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-right">
                            {
                                data.agree ? loading ? (
                                    <button type="button" className="btn btn-primary btn-disabled" disabled alt="loading"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading...</button>
                                ) : (
                                        <button type="submit" className="btn btn-primary"><i className="mdi mdi-check mr-2"></i>Submit</button>
                                ) : (
                                    <button type="button" className="btn btn-primary btn-disabled" disabled alt="Harus setuju dulu"><i className="mdi mdi-check mr-2"></i>Submit</button>
                                )
                            }
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default (withToastManager(Welcome))

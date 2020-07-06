import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { url } from '../global'
import { withToastManager } from 'react-toast-notifications'
import Loading from '../components/Loading'

function Starting(props) {

    const { toastManager } = props

    useEffect(() => {
        check()
    }, [])

    const [error, setError] = useState(null)

    const [data, setData] = useState({
        host: 'localhost',
        port: '27017',
        username: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)

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
        Axios.post(`${url}/configuration`, {
            host: data.host,
            port: data.port,
            username: data.username,
            password: data.password
        }).then(res => {
            
            toastManager.add(res.data.message, {
                appearance: 'success',
                autoDismiss: true
            })

            return props.history.push('/welcome')

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

    const check = () => {
        setFetching(true)
        Axios.get(`${url}/check`).then(res => {
            setFetching(false)
            
            if (res.data.database_exists) {
                return props.history.push('/welcome')
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
                <h1>Halo selamat datang! </h1>
                <p>Silahkan isi bidang dibawah ini untuk pengaturan database, gunakan MongoDB</p>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">Host database MongoDB <span className="text-danger">*</span></label>
                        <input type="text" className={`form-control ${error && error.host && 'is-invalid'}`} placeholder="localhost" onChange={handleChange('host')} value={data.host} />
                        {
                            error && error.host && (
                                <div className="invalid-feedback">{ error.host }</div>
                            )
                        }
                    </div>
                    <div className="form-group">
                        <label className="control-label">Port MongoDB <span className="text-danger">*</span></label>
                        <input type="text" className={`form-control ${error && error.port && 'is-invalid'}`} placeholder="27017" onChange={handleChange('port')} value={data.port} />
                        {
                            error && error.port && (
                                <div className="invalid-feedback">{ error.port }</div>
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Nama Pengguna Database</label>
                                <input type="text" className={`form-control ${error && error.username && 'is-invalid'}`} placeholder="Nama Pengguna" onChange={handleChange('username')} value={data.username} />
                                {
                                    error && error.username && (
                                        <div className="invalid-feedback">{ error.username }</div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Kata Sandi Database</label>
                                <input type="password" className={`form-control ${error && error.password && 'is-invalid'}`} placeholder="Password" onChange={handleChange('password')} value={data.password} />
                                {
                                    error && error.password && (
                                        <div className="invalid-feedback">{ error.password }</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 text-right">
                            {
                                loading ? (
                                    <button type="button" className="btn btn-primary btn-disabled" disabled><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading...</button>
                                ) : (
                                    <button type="submit" className="btn btn-primary"><i className="mdi mdi-content-save mr-2"></i>Simpan</button>
                                )
                            }
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withToastManager(Starting)
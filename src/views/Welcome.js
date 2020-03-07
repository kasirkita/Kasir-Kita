import React, { Component } from 'react'
import { checkUser, register } from '../store/actions/AuthActions'
import { connect } from 'react-redux'
import Error from './Errors/Error'
import Loading from '../components/Loading'
import {withToastManager} from 'react-toast-notifications'

export class Welcome extends Component {

    state = {
        agree: false,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    handleAgree = (e) => {
        this.setState({
            ...this.state,
            agree: e.target.checked
        })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.checkUserExists !== this.props.checkUserExists) {
            if (this.props.checkUserExists) 
                return this.props.history.push('/login')
        }

        if (prevProps.registerSuccess !== this.props.registerSuccess) {
            const { toastManager } = this.props;
            
            if (this.props.registerSuccess) {

                toastManager.add(this.props.registerMessage, {
                    appearance: 'success',
                    autoDismiss: true
                });

                return this.props.history.push('/dashboard')

            } else {

                toastManager.add(this.props.registerMessage, {
                    appearance: 'error',
                    autoDismiss: true
                });
            }
        }
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.register(this.state)
    }

    componentDidMount = () => {
        this.props.checkUser()
    }

    render() {

        const { 
                checkFetching, 
                checkError,
                registerFetching,
                registerError
                
        } = this.props
        const { agree, name, email, password, password_confirmation } = this.state
        const error = registerError && registerError.data && registerError.data.errors
        
        if (checkError && checkError.status !== 422)
            return <Error title={checkError.statusText} message={checkError.data.message} code={checkError.status} connection={checkError.connection} />
       
        return (
            <div className="d-flex justify-content-center align-content-center mt-5">
                
                {
                    checkFetching && (
                        <Loading />
                    )
                }

                <div className="col-8 border p-5">
                    <p><i className="mdi mdi-desktop-classic mr-2"></i>Kasir Kita 2.0</p>
                    <h1>Selamat Datang</h1>
                    <p>Baru pertama kali install ya? Ayo isi data nya dulu disini</p>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="control-label">Siapa nama kamu?</label>
                            <input type="text" className={`form-control ${error && error.name && 'is-invalid'}`} placeholder="Nama" onChange={this.handleChange('name')} value={name} />
                            {
                                error && error.name && (
                                    <div className="invalid-feedback">{ error.name[0] }</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <label className="control-label">Apa email kamu?</label>
                            <input type="email" className={`form-control ${error && error.email && 'is-invalid'}`} placeholder="Email" onChange={this.handleChange('email')} value={email} />
                            {
                                error && error.email && (
                                    <div className="invalid-feedback">{ error.email[0] }</div>
                                )
                            }
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Masukin password?</label>
                                    <input type="password" className={`form-control ${error && error.password && 'is-invalid'}`} placeholder="Password" onChange={this.handleChange('password')} value={password} />
                                    {
                                        error && error.password && (
                                            <div className="invalid-feedback">{ error.password[0] }</div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Ulangi passwordnya</label>
                                    <input type="password" className="form-control" placeholder="Ulangi Password" onChange={this.handleChange('password_confirmation')} value={password_confirmation} />
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
                            <input className="form-check-input" type="checkbox" id="agree" checked={agree} onChange={this.handleAgree} />
                            <label className="form-check-label" htmlFor="agree">
                                Saya sudah setuju
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-right">
                                {
                                    agree ? registerFetching ? (
                                        <button type="button" className="btn btn-primary btn-disabled" disabled alt="loading"><i className="mdi mdi-loading mdi-spin mr-2"></i>Looading...</button>
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
}

const mapStateToProps = (state) => {
    return {
        checkFetching: state.checkUser.fetching,
        checkFetched: state.checkUser.fetched,
        checkUserExists: state.checkUser.userExists,
        checkError: state.checkUser.error,
        registerFetching: state.register.fetching,
        registerFetched: state.register.fetched,
        registerError: state.register.error,
        registerMessage: state.register.message,
        registerSuccess: state.register.success,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkUser: () => dispatch(checkUser()),
        register: (data) => dispatch(register(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Welcome))

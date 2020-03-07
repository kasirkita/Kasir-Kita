import React, { Component } from 'react'
import { checkUser, login } from '../store/actions/AuthActions'
import { connect } from 'react-redux'
import Error from './Errors/Error'
import Loading from '../components/Loading'
import { withToastManager } from 'react-toast-notifications'

export class Login extends Component {

    state = {
        agree: false,
        email: '',
        password: ''
    }

    componentDidMount = () => {
        this.props.checkUser()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.checkUserExists !== this.props.checkUserExists) {
            if (!this.props.checkUserExists) 
                return this.props.history.push('/welcome')
        }

        if (prevProps.loginSuccess !== this.props.loginSuccess) {
            const { toastManager } = this.props;
            
            if (this.props.loginSuccess) {

                toastManager.add(this.props.loginMessage, {
                    appearance: 'success',
                    autoDismiss: true
                });

                return this.props.history.push('/dashboard')

            } else {

                toastManager.add(this.props.loginMessage, {
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
        this.props.login(this.state)
    }

    render() {

        const { 
            checkFetching, 
            checkError,
            loginFetching,
            loginError
            
        } = this.props
        
        const { email, password } = this.state

        const error = loginError && loginError.data && loginError.data.errors

        if (checkError && checkError.status !== 422)
            return <Error title={checkError.statusText} message={checkError.data.message} code={checkError.status} connection={checkError.connection} />

        return (
            <div className="d-flex justify-content-center align-content-center mt-5">
                {
                    checkFetching && (
                        <Loading />
                    )
                }
                <div className="col-6">
                    <h4>Masuk</h4>
                    <p className="text-muted">Silahkan masukan username dan password</p>
                    <div className="col p-0">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="control-label">Email <span className="text-danger">*</span></label>
                                <input type="text" className={`form-control ${error && error.email && 'is-invalid'}`} value={email} onChange={this.handleChange('email')} />
                                {
                                    error && error.email && (
                                        <div className="invalid-feedback">{ error.email[0] }</div>
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <label className="control-label">Password <span className="text-danger">*</span></label>
                                <input type="password" className={`form-control ${error && error.password && 'is-invalid'}`} value={password} onChange={this.handleChange('password')} />
                                {
                                    error && error.password && (
                                        <div className="invalid-feedback">{ error.password[0] }</div>
                                    )
                                }
                            </div>
                            <div className="form-group mt-4">
                                {
                                    loginFetching ? (
                                        <button type="button" className="btn btn-primary btn-disabled mr-2" disabled alt="loading"><i className="mdi mdi-loading mdi-spin mr-2"></i>Looading...</button>
                                    ) : (
                                        <button className="btn btn-primary mr-2" type="submit"><i className="mdi mdi-lock mr-2"></i>Masuk</button>
                                    ) 
                                }
                                <button className="btn btn-secondary">Reset</button>
                            </div>
                        </form>
                    </div>
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
        loginFetching: state.login.fetching,
        loginFetched: state.login.fetched,
        loginMessage: state.login.message,
        loginError: state.login.error,
        loginSuccess: state.login.success
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkUser: () => dispatch(checkUser()),
        login: (data) => dispatch(login(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Login))

import React, { Component } from 'react'

export class Login extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-content-center mt-5">
                <div className="col-6">
                    <h4>Masuk</h4>
                    <p className="text-muted">Silahkan masukan username dan password</p>
                    <div className="col p-0">
                        <div className="form-group">
                            <label className="control-label">Username <span className="text-danger">*</span></label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Password <span className="text-danger">*</span></label>
                            <input type="password" className="form-control"/>
                        </div>
                        <div className="form-group mt-4">
                            <button className="btn btn-primary mr-2"><i className="mdi mdi-lock mr-2"></i>Masuk</button>
                            <button className="btn btn-secondary">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

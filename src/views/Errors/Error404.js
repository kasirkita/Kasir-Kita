import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Error404 extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-content-center mt-5">
                <div className="col-6">
                    <h1 className="text-muted">404 - Halaman tidak di temukan</h1>
                    <p>Halaman yang anda cari hilang, atau tidak ditemukan</p>
                    <Link className="btn btn-primary" to="/">
                        <i className="mdi mdi-home mr-2"></i> Kembali ke rumah
                    </Link>
                </div>
            </div>
        )
    }
}

export default Error404

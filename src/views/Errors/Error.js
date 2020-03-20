import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Error extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-content-center mt-5">
                <div className="col-8">
                    <h1 className="text-muted">{ this.props.code } - { this.props.title }</h1>
                    <p className="text-muted">{this.props.message}</p>
                    <br />
                    {
                        !this.props.connection && (
                            <Link className="btn btn-primary mt-3" to="/">
                                <i className="mdi mdi-home mr-2"></i> Kembali ke rumah
                            </Link>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Error

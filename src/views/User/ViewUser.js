import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from '../../store/actions/UserActions'

class ViewUser extends Component {

    async componentDidMount() {
        await this.props.getUser(this.props.match.params.id)
    }

    render() {
        const { user } = this.props
        return (
            <Fragment>
                <div className="row p-3"> 
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>{ user && user.name }</h1>
                            </div>
                            <div className="col-md-4 text-right">
                                <Link className="btn btn-secondary" to="/user"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <div className="row">

                            <div className="col-md-2">
                                <img src={ user && user.avatar ? user.avatar : require('../../assets/img/default.png')} alt={user && user.name} className="rounded-circle mt-4" style={{ height: 150, width: 150, objectFit: 'cover' }} />
                            </div>
                            <div className="col-md-10">
                                <table className="table table-hover">
                                    <tbody>
                                        <tr>
                                            <th>Nama:</th>
                                            <td colSpan="3">{user && user.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email:</th>
                                            <td>{user && user.email}</td>
                                            <th>Nomor Telfon:</th>
                                            <td>{user && user.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <th>Peranan:</th>
                                            <td>{user && user.role && user.role.name }</td>
                                            <th>Tempat tanggal lahir:</th>
                                            <td>{user && user.place_of_birth}, {user && user.date_of_birth_formatted}</td>
                                        </tr>
                                        <tr>
                                            <th>Alamat:</th>
                                            <td colSpan="3">{user && user.address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        user: state.user.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: id => dispatch(getUser(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser)

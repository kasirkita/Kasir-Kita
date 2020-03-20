import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRole } from '../../store/actions/RoleActions'
import { getListPermission } from '../../store/actions/PermissionAction'

class ViewRole extends Component {

    async componentDidMount() {
        await this.props.getListPermission()
        await this.props.getRole(this.props.match.params.id)
    }

    render() {
        const { role, permissions } = this.props
        return (
            <Fragment>
                <div className="row p-3"> 
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>{ role && role.name }</h1>
                            </div>
                            <div className="col-md-4 text-right">
                                <Link className="btn btn-secondary" to="/role"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <h2>Izin</h2>
                        <div className="row">
                            {
                                permissions && permissions.map(permission => {
                                    return (
                                        <div className="col-md-4" key={permission._id}>
                                            <span>{permission.name} {role && role.perms[permission.slug] ? <span className="text-success ml-2"><i className="mdi mdi-check" /></span> : <span className="text-danger ml-2"><i className="mdi mdi-close" /></span> }</span>
                                        </div>
                                    )
                                })
                            }
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
        role: state.role.role,
        permissions: state.permission.permissions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRole: id => dispatch(getRole(id)),
        getListPermission: () => dispatch(getListPermission())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRole)

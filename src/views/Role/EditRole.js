import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { updateRole, getRole } from '../../store/actions/RoleActions'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import Error from '../Errors/Error'
import { getListPermission } from '../../store/actions/PermissionAction'

class EditRole extends Component {
    
    state = {
        name: '',
        permissions: {}
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.updateRole(this.props.match.params.id, this.state)
    }

    handleClickCheckbox = (e) => {
        const { permissions } = this.state
        this.setState({
            ...this.state,
            permissions: {
                ...permissions,
                [e.target.value]: e.target.checked
            }
        })
    }

    componentDidUpdate = (prevProps) => {
        
        const { toastManager } = this.props;

        if (prevProps.type !== this.props.type || prevProps.success !== this.props.success) {
            if (this.props.type === 'update') {
                
                if (this.props.success) {
    
                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    });
    
                    return this.props.history.push('/role')
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }

            if (this.props.type === 'get') {

                if (this.props.success) {

                    
                    if (this.props.role !== prevProps.role) {
                        
                        const { role } = this.props

                        this.setState({
                            ...this.state,
                            name: role.name,
                            permissions: role.perms
                        })
                    }
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }

            }
        }
    }

    componentDidMount = () => {
        this.props.getRole(this.props.match.params.id)
        this.props.getListPermssion()
    }

    render() {

        const { error, permissions, role } = this.props
        const { name, permissions: rolePermission } = this.state
        const validate = error && error.data && error.data.errors
        
        console.log(rolePermission)

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <div className="row p-3"> 
                   
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-8">
                                    <h1>Ubah Peranan</h1>
                                </div>
                                <div className="col-md-4 text-right">
                                    <Link className="btn btn-secondary" to="/role"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                                </div>
                            </div>
                            <hr/>
                        </div>
                
                            <div className="col-md-6 mt-3">
                                <div className="form-group">
                                    <label className="control-label">Nama <span className="text-danger">*</span></label>
                                    <input value={name} onChange={this.handleChange('name')} type="text" className={`form-control ${validate && validate.name ? 'is-invalid' : ''}`} placeholder="Nama Peranan"/>
                                    {
                                        validate && validate.name && (
                                            <div className="invalid-feedback">{ validate.name[0] }</div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-6 mt-3">
                                
                                <div className="form-group">
                                    <label className="control-label">Izin</label>
                                    <div className="row">
                                        {
                                            permissions && permissions.map(permission => {
                                                return (
                                                    <div className="col-md-4" key={permission._id}>
                                                        <div className="form-check">
                                                            <input checked={rolePermission[permission.slug] ? rolePermission[permission.slug] : false} onChange={this.handleClickCheckbox} className="form-check-input" type="checkbox" onChange={this.handleClickCheckbox} value={permission.slug} id={permission.slug} />
                                                            <label className="form-check-label" htmlFor={permission.slug}>
                                                                {permission.name} 
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-md-12 mt-2 text-right mb-5">
                        <hr/>
                        <button type="submit" className="btn btn-primary mr-2"><i className="mdi mdi-content-save mr-2"></i>Simpan Perubahan</button>
                        <button type="reset" className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        message: state.role.message,
        fetching: state.role.fetching,
        error: state.role.error,
        success: state.role.success,
        type: state.role.type,
        role: state.role.role,
        permissions: state.permission.permissions
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        updateRole: (id, data) => dispatch(updateRole(id, data)),
        getRole: id => dispatch(getRole(id)),
        getListPermssion: () => dispatch(getListPermission())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditRole))

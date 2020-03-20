import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { saveSupplier, updateSupplier, getSupplier } from '../../store/actions/SupplierActions'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import Error from '../Errors/Error'

class EditSupplier extends Component {

    state = {
        name: '',
        email: '',
        phone_number: '',
        address: ''
    }

    handleSave = () => {
        this.props.updateSupplier(this.props.match.params.id, this.state)
    }

    handleReset = () => {

        this.setState({
            name: '',
            email: '',
            phone_number: '',
            address: ''
        })
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    componentDidUpdate = (prevProps) => {
       
        const { toastManager } = this.props;

        if (prevProps.type !== this.props.type) {
            if (this.props.type === 'update') {
                
                if (this.props.success) {
    
                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    });
    
                    return this.props.history.push('/supplier')
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }

            if (this.props.type === 'get') {

                if (this.props.success) {

                    
                    if (this.props.supplier !== prevProps.supplier) {
                        
                        const { supplier } = this.props

                        this.setState({
                            ...this.state,
                            name: supplier.name, 
                            email: supplier.email, 
                            phone_number: supplier.phone_number, 
                            address: supplier.address, 
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

    componentDidMount(){
        this.props.getSupplier(this.props.match.params.id)
    }


    render() {

        const { error, fetching } = this.props

        const {
            name,
            email,
            phone_number,
            address
        } = this.state

        const validate = error && error.data && error.data.errors

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />
            
        return (
            <Fragment>
                <div className="row p-3"> 
                   
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>Ubah Pemasok</h1>
                            </div>
                            <div className="col-md-4 text-right">
                                <Link className="btn btn-secondary" to="/supplier"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                            </div>
                        </div>
                        <hr/>
                    </div>
                

                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label className="control-label">Nama <span className="text-danger">*</span></label>
                            <input value={name} onChange={this.handleChange('name')} type="text" className={`form-control  ${ validate && validate.name && 'is-invalid'}`} placeholder="Nama Pemasok"/>
                            {
                                validate && validate.name  && (
                                    <div className="invalid-feedback">{ validate.name[0] }</div>
                                )
                            }
                        </div>
                        
                        
                        <div className="form-group">
                            <label className="control-label">Email</label>
                            <input value={email} onChange={this.handleChange('email')} type="email" className={`form-control  ${ validate && validate.email && 'is-invalid'}`} placeholder="Email Pemasok"/>
                            {
                                validate && validate.email  && (
                                    <div className="invalid-feedback">{ validate.email[0] }</div>
                                )
                            }
                        </div>
                    
                        <div className="form-group">
                            <label className="control-label">Nomor Telefon</label>
                            <input value={phone_number} onChange={this.handleChange('phone_number')} type="text" className="form-control" placeholder="Nomor Telefon"/>
                        </div>
                    


                    </div>
                    <div className="col-md-6 mt-3">
                        
                        <div className="form-group">
                            <label className="control-label">Alamat</label>
                            <textarea value={address} onChange={this.handleChange('address')} rows  ="5" className="form-control" placeholder="Nama Jalan RT/RW Desa Kecamatan, Kabupaten, Kode Pos" />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-2 text-right mb-5">
                    <hr/>
                    {
                        fetching ? (
                            <button className="btn btn-primary btn-disabled mr-2" disabled><i className="mdi mdi-loading mdi-spin mr-2"></i>Simpan Perubahan</button>
                        ) : (
                            <button className="btn btn-primary mr-2" onClick={this.handleSave}><i className="mdi mdi-content-save mr-2"></i>Simpan Perubahan</button>
                        )
                    }
                    <button className="btn btn-secondary" onClick={this.handleReset}><i className="mdi mdi-reload mr-2"></i>Reset</button>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        message: state.supplier.message,
        fetching: state.supplier.fetching,
        error: state.supplier.error,
        success: state.supplier.success,
        type: state.supplier.type,
        supplier: state.supplier.supplier
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        updateSupplier: (id, data) => dispatch(updateSupplier(id, data)),
        getSupplier: id => dispatch(getSupplier(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditSupplier))
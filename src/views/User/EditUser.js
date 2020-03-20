import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'
import { url } from '../../global';
import Axios from 'axios';
import { updateUser, getUser } from '../../store/actions/UserActions';
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications'
import Error from '../Errors/Error';
import moment from 'moment';

class EditUser extends Component {

    state = {
        date_of_birth: null,
        name: '',
        email: '',
        phone_number: '',
        role_id: '',
        role_name: '',
        password: '',
        password_confirmation: '',
        photo: '',
        place_of_birth: '',
        address: ''
   }

    handleChangeDate = (name, date) => {
        this.setState({
            ...this.state,
            [name]: date
        })
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleChangeSelect = (name) => (e) => {

        if (e !== null) {
            this.setState({
                ...this.state,
                [`${name}_name`]: e.label,
                [`${name}_id`]: e.value
            })

        } else {
            this.setState({
                ...this.state,
                [`${name}_name`]: null,
                [`${name}_id`]: null
            })
        }

    }

    handleChangePhoto = (name) => (e) => {
        const file = e.target.files[0];
        
        this.setState({
            ...this.state,
            [name]: file
        })
    }

    handleReset = () => {

        this.setState({
            ...this.state,
            date_of_birth: null,
            date_of_birth: '',
            name: '',
            email: '',
            phone_number: '',
            role_id: '',
            role_name: '',
            password: '',
            password_confirmation: '',
            photo: '',
            place_of_birth: '',
            address: ''
        })

        this.photo.value = ""

    }

    handleSave = () => {
        this.props.updateUser(this.props.match.params.id, this.state)
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
    
                    return this.props.history.push('/user')
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }

            if (this.props.type === 'get') {

                if (this.props.success) {

                    
                    if (this.props.user !== prevProps.user) {
                        
                        const { user } = this.props

                        this.setState({
                            ...this.state,
                            date_of_birth: moment(user.date_of_birth).toDate(),
                            name: user.name,
                            email: user.email,
                            phone_number: user.phone_number,
                            role_id: user.role_id,
                            role_name: user.role_name,
                            photo: user.photo,
                            place_of_birth: user.place_of_birth,
                            address: user.address,
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

    componentDidMount() {
        this.props.getUser(this.props.match.params.id)
    }

    render() {
        const { date_of_birth, name, email, phone_number, role_id, role_name, password, password_confirmation, photo, place_of_birth, address } = this.state
        const { fetching, error } = this.props

        const validate = error && error.data && error.data.errors

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        return (
            <Fragment>
                <div className="row p-3"> 
                   
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>Ubah Pengguna</h1>
                            </div>
                            <div className="col-md-4 text-right">
                                <Link className="btn btn-secondary" to="/user"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                            </div>
                        </div>
                        <hr/>
                    </div>
                

                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label className="control-label">Nama <span className="text-danger">*</span></label>
                            <input value={name} onChange={this.handleChange('name')} type="text" className={`form-control ${ validate && validate.name && 'is-invalid'}`} placeholder="Nama Pengguna"/>
                            {
                                validate && validate.name && (
                                    <div className="invalid-feedback">{ validate.name[0] }</div>
                                )
                            }
                        </div>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Email <span className="text-danger">*</span></label>
                                    <input value={email} onChange={this.handleChange('email')} type="email" className={`form-control ${ validate && validate.email && 'is-invalid'}`} placeholder="Email Pengguna"/>
                                    {
                                        validate && validate.email && (
                                            <div className="invalid-feedback">{ validate.email[0] }</div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Nomor Telefon</label>
                                    <input value={phone_number} onChange={this.handleChange('phone_number')} type="text" className="form-control" placeholder="Nomor Telefon"/>
                                </div>
                            </div>

                        </div>

                        <div className="form-group">
                            <label className="control-label">Peranan <span className="text-danger">*</span></label>
                            <AsyncSelect
                                placeholder="Pilih Peranan"
                                value={role_id && {
                                    label: role_name,
                                    value: role_id
                                } } 
                                onChange={this.handleChangeSelect('role')}
                                loadOptions={ getRoleList }
                                cacheOptions
                                defaultOptions
                                className={`${ validate && validate.role_id && 'is-invalid-select'}`}
                            />

                            {
                                validate && validate.role_id && (
                                    <small className="text-danger">{ validate.role_id[0] }</small>
                                )
                            }
                        </div>
                        
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label">Kata Sandi</label>
                                    <input value={password} onChange={this.handleChange('password')} type="password" className={`form-control ${ validate && validate.password && 'is-invalid'}`} placeholder="Kata Sandi"/>
                                    {
                                        validate && validate.password && (
                                            <div className="invalid-feedback">{ validate.password[0] }</div>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label">Ulangi Kata Sandi</label>
                                    <input value={password_confirmation} onChange={this.handleChange('password_confirmation')} type="password" className="form-control" placeholder="Ulangi Kata Sandi"/>
                                </div>
                                <div className="help-block ml-2">
                                    <small className="text-muted"><em>*) Biarkan kosong jika tidak ingin mengubah kata sandi</em></small>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label className="control-label">Photo</label>
                            <input ref={ref => this.photo = ref} onChange={this.handleChangePhoto('photo')} type="file" className="form-control"/>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label className="control-label">Tempat Lahir</label>
                                    <input value={place_of_birth} onChange={this.handleChange('place_of_birth')} type="text" className="form-control" placeholder="Jakarta" />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label className="control-label">Tanggal Lahir</label>
                                    <DatePicker placeholderText="mm/dd/yyyy" selected={date_of_birth} className="form-control" onChange={date => this.handleChangeDate('date_of_birth', date)} />
                                </div>
                            </div>
                        </div>
                
                        <div className="form-group">
                            <label className="control-label">Alamat</label>
                            <textarea value={address} onChange={this.handleChange('address')} rows="5" className="form-control" placeholder="Nama Jalan RT/RW Desa Kecamatan, Kabupaten, Kode Pos" />
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

const filterRoleList = (categories) => {
    const options = categories.map(role => {
        return { label: role.name, value: role._id }
    })
    return appendRole(options);
 };

const appendRole = filteredOptions => {
    return [
      ...filteredOptions
    ];
};
   
const getRoleList = (inputValue, callback) => {
     Axios.get(`${url}/role/list`, {
         params: {
             keyword: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
        callback(filterRoleList(response.data.data));
     })
}

const mapStateToProps = state => {
    return {
        ...state,
        message: state.user.message,
        fetching: state.user.fetching,
        error: state.user.error,
        success: state.user.success,
        type: state.user.type,
        user: state.user.user
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (id, data) => dispatch(updateUser(id, data)),
        getUser: id => dispatch(getUser(id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditUser))

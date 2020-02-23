import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'

export class AddUser extends Component {

    state = {
        date_of_birth: null,
    }

    changeDate = (name, date) => {
        this.setState({
            ...this.state,
            [name]: date
        })
    }

    render() {
        const { date_of_birth } = this.state
        return (
            <Fragment>
                <div className="row p-3"> 
                   
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>Tambah Pengguna</h1>
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
                            <input type="text" className="form-control" placeholder="Nama Pengguna"/>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Email <span className="text-danger">*</span></label>
                                    <input type="email" className="form-control" placeholder="Email Pengguna"/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Nomor Telefon</label>
                                    <input type="text" className="form-control" placeholder="Nomor Telefon"/>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Username <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" placeholder="Username"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Peranan <span className="text-danger">*</span></label>
                                    <Select
                                        placeholder="Pilih Peranan"
                                        options= {[
                                            {
                                                label: 'Administrator',
                                                value: 1
                                            },
                                            {
                                                label: 'Manajer',
                                                value: 2
                                            },
                                            {
                                                label: 'Kasir',
                                                value: 3
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label">Kata Sandi <span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" placeholder="Kata Sandi"/>
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label">Ulangi Kata Sandi <span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" placeholder="Ulangi Kata Sandi"/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label className="control-label">Photo</label>
                            <input type="file" className="form-control"/>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label className="control-label">Tempat Lahir</label>
                                    <input type="text" className="form-control" placeholder="Jakarta" />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label className="control-label">Tanggal Lahir</label>
                                    <DatePicker placeholderText="mm/dd/yyyy" selected={date_of_birth} className="form-control" onChange={date => this.changeDate('date_of_birth', date)} />
                                </div>
                            </div>
                        </div>
                
                        <div className="form-group">
                            <label className="control-label">Alamat</label>
                            <textarea rows  ="5" className="form-control" placeholder="Nama Jalan RT/RW Desa Kecamatan, Kabupaten, Kode Pos" />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-2 text-right mb-5">
                    <hr/>
                    <button className="btn btn-primary mr-2"><i className="mdi mdi-content-save mr-2"></i>Simpan</button>
                    <button className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                </div>
            </Fragment>
        )
    }
}

export default AddUser

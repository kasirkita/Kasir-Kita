import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'

export class AddDiscount extends Component {
    state = {
        valid_thru: null,
    }

    changeDate = (name, date) => {
        this.setState({
            ...this.state,
            [name]: date
        })
    }

    render() {
        const { valid_thru } = this.state
        return (
        <Fragment>

            <div className="row p-3">
               
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8">
                            <h1>Tambah Promo</h1>
                        </div>
                        <div className="col-md-4 text-right">
                            <Link className="btn btn-secondary" to="/discount"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                        </div>
                    </div>
                    <hr/>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label className="control-label">Barang <span className="text-danger">*</span></label>
                        <Select isClearable placeholder="Pilih Barang" />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Berlaku sampai <span className="text-danger">*</span></label>
                        <DatePicker style={{display: 'block'}} placeholderText="dd/mm/yyyy" className="form-control" selected={valid_thru} onChange={date => this.changeDate('valid_thru', date)} />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Kuota</label>
                        <input type="text" className="form-control text-right" placeholder="Kuota" />
                    </div>

                </div>

                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label className="control-label">Amoun <span className="text-danger">*</span></label>
                        <input type="text" className="form-control text-right" placeholder="Amoun" />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Tipe <span className="text-danger">*</span></label>
                        <select className="form-control">
                            <option value="Fiks">Fiks</option>
                            <option value="Persentase">Persentase</option>
                        </select>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">Ketentuan<span className="text-danger">*</span></label>
                                <select className="form-control">
                                    <option value=">">Lebih dari</option>
                                    <option value="<">Kurang dari</option>
                                    <option value="=">Sama dengan</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label className="control-label">Total Produk<span className="text-danger">*</span></label>
                                <input type="text" className="form-control text-right" placeholder="Total Produk" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-md-12 mt-2 text-right mb-5">
                    <hr/>
                    <button className="btn btn-primary mr-2" onClick={this.handleSave}><i className="mdi mdi-content-save mr-2"></i>Simpan</button>
                    <button className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                </div>

            </div>
        </Fragment>
        )
    }
}

export default AddDiscount

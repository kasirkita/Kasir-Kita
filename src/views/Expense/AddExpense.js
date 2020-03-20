import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'

class AddExpense extends Component {

    state = {
        payment_date: new Date(),
    }

    changeDate = (name, date) => {
        this.setState({
            ...this.state,
            [name]: date
        })
    }

    render() {
        const { payment_date } = this.state
        return (
        <Fragment>

            <div className="row p-3">
               
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8">
                            <h1>Tambah Pembelian Barang</h1>
                        </div>
                        <div className="col-md-4 text-right">
                            <Link className="btn btn-secondary" to="/purchase"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                        </div>
                    </div>
                    <hr/>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label className="control-label">Nomor Referensi <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" placeholder="Nomor Referensi" />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Tanggal Pembelian <span className="text-danger">*</span></label>
                        <DatePicker style={{display: 'block'}} className="form-control" selected={payment_date} onChange={date => this.changeDate('payment_date', date)} />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Nama Toko / Pemasok</label>
                        <input type="text" className="form-control" placeholder="Nama Toko / Pemasok" />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Bukti</label>
                        <input type="file" className="form-control" placeholder="Bukti Pembelian" />
                        <span className="help-block text-muted">*) Format .jpg, .png, .pdf</span>
                    </div>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label className="control-label">Nama Barang <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" placeholder="Nama Barang" />
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label className="control-label">Harga <span className="text-danger">*</span></label>
                                <input type="text" className="form-control text-right" placeholder="Rp.0.0" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">Qty <span className="text-danger">*</span></label>
                                <input type="text" className="form-control text-center" defaultValue="1" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Penanggung Jawab</label>
                        <Select isClearable placeholder="Pilih Penanggung Jawab" options={[
                            {
                                label: 'Yayan - Kasir',
                                value: '1'
                            },
                            {
                                label: 'Mega - Manajer',
                                value: '2'
                            },
                            {
                                label: 'Ulfa - Kasir',
                                value: '3'
                            }
                        ]} />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Catatan</label>
                        <textarea rows="5" className="form-control" placeholder="Catatan"></textarea>
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

export default AddExpense

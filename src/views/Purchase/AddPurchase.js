import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import AddProduct from '../Product/AddProduct'
import Modal from 'react-bootstrap4-modal'

class AddPurchase extends Component {

    state = {
        payment_date: new Date(),
        modal: false
    }

    changeDate = (name, date) => {
        this.setState({
            ...this.state,
            [name]: date
        })
    }

    openModal = () => {
        this.setState({
            ...this.state,
            modal: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            ...this.state,
            modal: false
        })
    }

    render() {
        const { payment_date, modal } = this.state
        return (
        <Fragment>

            {/*  modal */}

            <Modal visible={modal} dialogClassName="modal-xl" onClickBackdrop={this.handleCloseModal}>
                <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseModal}>&times;</button>
                <div className="modal-header">
                    <h5 className="modal-title">Tambah Data Barang</h5>
                </div>
                <div className="modal-body">
                    <AddProduct isModal={true} onFinish={this.handleCloseModal} />
                </div>
            </Modal>

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
                        <label className="control-label">Pemasok</label>
                        <Select isClearable placeholder="Pilih Pemasok" options={[
                            {
                                label: 'CV Alam Sutera',
                                value: '1'
                            },
                            {
                                label: 'Indogrosir',
                                value: '2'
                            },
                            {
                                label: 'CV Berkah Barokah',
                                value: '3'
                            }
                        ]} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Bukti</label>
                        <input type="file" className="form-control" placeholder="Bukti Pembelian" />
                        <span className="help-block text-muted">*) Format .jpg, .png, .pdf</span>
                    </div>
                </div>

                <div className="col-md-6 mt-3">
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

                <div className="col-md-12 mt-4">
                    <hr/>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Pindai atau ketik" />
                            </div>
                        </div>
                        <div className="col-md-3 text-right">
                            <button className="btn btn-secondary" onClick={this.openModal}>
                                <i className="mdi mdi-plus mr-2"></i> Tambah Barang
                            </button>
                        </div>
                        <div className="col-md-12">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Nama</th>
                                        <th>Harga Beli</th>
                                        <th>Qty</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ABC Alkaline AAA</td>
                                        <td>
                                            <input type="text" className="form-control text-right" defaultValue="Rp. 12,000"/>
                                        </td>
                                        <td>
                                            <input type="number" className="form-control text-center" defaultValue="1" />
                                        </td>
                                        <td>Rp. 12,000</td>
                                        <td className="text-right">
                                            <button className="btn btn-link text-danger">Hapus</button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className="text-right" colSpan="4">Pajak</th>
                                        <th className="text-right">
                                            <input type="text" className="form-control text-right" defaultValue="Rp. 1,200" />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan="4">Diskon</th>
                                        <th className="text-right">
                                            <input type="text" className="form-control text-right" defaultValue="Rp. 0" />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan="4">Total</th>
                                        <th className="text-right">Rp. 13,200</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 mt-2 text-right mb-5">
                    <hr/>
                    <button className="btn btn-primary mr-2"><i className="mdi mdi-content-save mr-2"></i>Simpan</button>
                    <button className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                </div>

            </div>
        </Fragment>
        )
    }
}

export default AddPurchase

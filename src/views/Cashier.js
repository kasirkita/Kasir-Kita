import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import Modal from 'react-bootstrap4-modal'

export class Cashier extends Component {
    state = {
        ordering: {
            type: 'name',
            sort: 'asc'
        },
        payModal: false
    }

    handlePayModal = () => {
        this.setState({
            ...this.state,
            payModal: true
        })
    }

    handleClosePayModal = () => {
        this.setState({
            ...this.state,
            payModal: false
        })
    }

    render() {
        const { payModal } = this.state
        return (
            <Fragment>
                <div className="row p-3"> 
                
                    <div className="col-md-12">
                        <h1>Kasir</h1>
                        <hr/>
                    </div>

                    {/*  pay modal */}

                    <Modal visible={payModal} dialogClassName="modal-lg" onClickBackdrop={this.handleClosePayModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleClosePayModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Bayar pesanan</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="border-0">Pelanggan</td>
                                                <td className="border-0">-</td>
                                            </tr>
                                            <tr>
                                                <td>Total belanja</td>
                                                <td>Rp. 0</td>
                                            </tr>
                                            <tr>
                                                <td>Pembayaran</td>
                                                <td>Rp. 0</td>
                                            </tr>
                                            <tr>
                                                <td>Kembalian</td>
                                                <td>Rp. 0</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label">Sistem Pembayaran</label>
                                        <select className="form-control">
                                            <option value="cash">Tunai</option>
                                            <option value="card">Kartu Debit / Kredit</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Pembayaran</label>
                                        <div className="col p-0 mb-3">
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-info">Rp. 20,000</button>
                                                <button type="button" className="btn btn-info">Rp. 50,000</button>
                                                <button type="button" className="btn btn-info">Rp. 100,000</button>
                                            </div>
                                        </div>
                                        <input type="text" className="form-control text-right" placeholder="Rp. 0"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary mr-2" onClick={this.handlePayModal}><i className="mdi mdi-cash mr-2"></i>Bayar</button>
                            <button className="btn btn-success mr-2"><i className="mdi mdi-clock mr-2"></i>Tahan</button>
                        </div>
                    </Modal>

                    <div className="col-md-12">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" id="barcode-tab" data-toggle="tab" href="#barcode" role="tab" aria-controls="barcode" aria-selected="true">Barcode</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="manual-tab" data-toggle="tab" href="#manual" role="tab" aria-controls="manual" aria-selected="true">Manual Input</a>
                            </li>
                        </ul>

                        <div className="tab-content mt-4" id="myTabContent">
                            <div className="tab-pane fade show active" id="barcode" role="tabpanel" aria-labelledby="barcode-tab">
                                <input type="text" className="form-control form-control-lg" placeholder="Pindai disini" />
                            </div>
                            <div className="tab-pane fade autocomplete-wrapper" id="manual" role="tabpanel" aria-labelledby="manual-tab">
                                <input type="text" className="form-control form-control-lg" placeholder="Ketik nama barang atau barcode" />
                                <div className="autocomplete">
                                    <ul className="autocomplete-list m-0">
                                        <li>199291929102 - ABC Susu 20gr</li>
                                        <li>199291929103 - ABC Alkaline AAA</li>
                                        <li>199291929104 - Betadine 350ml</li>
                                        <li>199291929105 - Bear Brand 900ml</li>
                                        <li>199291929106 - Obat nyamuk kingkong</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="form-group">
                            <label className="control-label">Pelanggan</label>
                            <Select
                                isClearable
                                placeholder="Pilih pelanggan"
                                options={[
                                    {
                                        label: 'Pengecer',
                                        options: [
                                                {

                                                    label: '1991280 - Yayan Ruhiyan',
                                                    value: '1'
                                                },
                                                {
                                                    label: '1191281 - Nadien Subagja',
                                                    value: '2'
                                                }
                                        ]
                                        
                                    },
                                    {
                                        label: 'Grosir',
                                        options: [
                                            {
                                                label: '1191281 - Rio Ananda',
                                                value: '3'
                                            }
                                        ]
                                    }
                                    
                                ]}
                            />
                        </div>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Nama</th>
                                    <th>Harga Jual</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="4" className="text-center">Belum ada data</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th className="text-right" colSpan="3">Total</th>
                                    <th className="text-right">Rp. 0</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="col-md-12 mt-3 text-right">
                        <button className="btn btn-primary mr-2" onClick={this.handlePayModal}><i className="mdi mdi-cash mr-2"></i>Bayar</button>
                        <button className="btn btn-success mr-2"><i className="mdi mdi-clock mr-2"></i>Tahan</button>
                        <button className="btn btn-secondary"><i className="mdi mdi-delete mr-2"></i>Hapus transaksi</button>
                    </div>

                </div>
            </Fragment>
        )
    }
}

export default Cashier

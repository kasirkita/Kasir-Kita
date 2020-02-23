import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export class AddRole extends Component {

    render() {
        return (
            <Fragment>
                <div className="row p-3"> 
                   
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>Tambah Peranan</h1>
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
                            <input type="text" className="form-control" placeholder="Nama Peranan"/>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        
                        <div className="form-group">
                            <label className="control-label">Izin</label>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="dashboard" />
                                        <label className="form-check-label" htmlFor="dashboard">
                                            Dashboard
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="kasir" />
                                        <label className="form-check-label" htmlFor="kasir">
                                            Kasir
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="barang" />
                                        <label className="form-check-label" htmlFor="barang">
                                            Barang
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="data-barang" />
                                        <label className="form-check-label" htmlFor="data-barang">
                                            Data Barang
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="kategori" />
                                        <label className="form-check-label" htmlFor="kategori">
                                            Kategori
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="penjualan" />
                                        <label className="form-check-label" htmlFor="penjualan">
                                            Penjualan
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="pembelian" />
                                        <label className="form-check-label" htmlFor="pembelian">
                                            Pembelian
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="pembelian-barang" />
                                        <label className="form-check-label" htmlFor="pembelian-barang">
                                            Pembelian Barang
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="pembelian-peralatan" />
                                        <label className="form-check-label" htmlFor="pembelian-peralatan">
                                            Pembelian Peralatan
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="stok" />
                                        <label className="form-check-label" htmlFor="stok">
                                            Stok
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="pengguna" />
                                        <label className="form-check-label" htmlFor="pengguna">
                                            Pengguna
                                        </label>
                                    </div>
                                </div>
                            </div>
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

export default AddRole

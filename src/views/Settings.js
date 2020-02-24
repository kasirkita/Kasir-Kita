import React, { Component, Fragment } from 'react'

export class Settings extends Component {
    render() {
        return (
            <Fragment>
               <div className="row p-3"> 
                    <div className="col-md-12">
                        <h1>Pengaturan</h1>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label className="control-label">Nama Toko</label>
                                    <input type="text" placeholder="Nama Toko" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Alamat Toko</label>
                                    <textarea type="text" placeholder="Gunakan \n untuk break" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Logo</label>
                                    <input type="file" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Nomor Telfon Toko</label>
                                    <input type="text" placeholder="Nomor Telfon Toko" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Garis Pembatas</label>
                                    <input type="text" placeholder="Garis Pembatas Struk" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Mata Uang</label>
                                    <input type="text" placeholder="Mata Uang" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Separator Ribuan</label>
                                    <input type="text" placeholder="Separator Ribuan" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Separator Desimal</label>
                                    <input type="text" placeholder="Separator Desimal" className="form-control" />
                                </div>

                            </div>
                            <div className="col-md-4">
                                <p>Hasil Struk</p>
                                <div className="receipt pb-5">
                                    <h5 className="text-center m-0">Kasir Kita</h5>
                                    <p className="text-center m-0"><img src={require('../assets/img/logo.png')} width="200" alt="Toko Sukamakmur"/></p>
                                    <p className="text-center m-0">Jl. Medan Merdeka No 190 Kec. Sukaharja Karawang</p>
                                    <p className="text-center m-0">Telp. 08213331414441</p>
                                    <br />
                                    <div className="d-flex justify-content-between">
                                        <div>Nomor</div>
                                        <div>198383811001</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>Tanggal/Waktu</div>
                                        <div>24 Feb 2020 23:49</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>Kasir</div>
                                        <div>Agus Saripudin</div>
                                    </div>
                                    <p className="text-center m-0">=====================================</p>
                                    <p className="m-0">Minuman Berenergi</p>
                                    <div className="d-flex justify-content-between">
                                        <div>x1 Rp.12,000</div>
                                        <div>Rp.12,000</div>
                                    </div>
                                    <p className="m-0">Makanan Ringan</p>
                                    <div className="d-flex justify-content-between">
                                        <div>x2 Rp.8,000</div>
                                        <div>Rp.16,000</div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <div>Diskon 50%</div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <div>-Rp.8,000</div>
                                    </div>
                                    <p className="text-center m-0">=====================================</p>
                                    <div className="d-flex justify-content-between">
                                        <div>Total</div>
                                        <div>Rp.20,000</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>Pajak</div>
                                        <div>Rp.0</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>Tunai</div>
                                        <div>Rp.20,000</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>Kembalian</div>
                                        <div>Rp.0</div>
                                    </div>
                                    <p className="text-center m-0">=====================================</p>
                                    <br />
                                    <p className="m-0 text-center">Terimakasih Telah Berkunjung</p>
                                    <p className="m-0 text-center">&copy; 2020 Kasir Kita</p>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2 text-right mb-5">
                                <hr/>
                                <button className="btn btn-primary mr-2"><i className="mdi mdi-content-save mr-2"></i>Simpan</button>
                                <button className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Settings

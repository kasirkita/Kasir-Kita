import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export class AddSupplier extends Component {

    render() {
        return (
            <Fragment>
                <div className="row p-3"> 
                   
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>Tambah Pemasok</h1>
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
                            <input type="text" className="form-control" placeholder="Nama Pemasok"/>
                        </div>
                        
                        
                        <div className="form-group">
                            <label className="control-label">Email</label>
                            <input type="email" className="form-control" placeholder="Email Pemasok"/>
                        </div>
                    
                        <div className="form-group">
                            <label className="control-label">Nomor Telefon</label>
                            <input type="text" className="form-control" placeholder="Nomor Telefon"/>
                        </div>
                    


                    </div>
                    <div className="col-md-6 mt-3">
                        
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

export default AddSupplier

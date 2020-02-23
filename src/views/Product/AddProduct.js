import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable';

export class AddProduct extends Component {

    handleSave = () => {
        if (this.props.isModal) {
            this.props.onFinish()
        } else {
            this.props.history.push('/product')
        }
    }

    render() {

        const { isModal } = this.props

        return (
            <Fragment>
                <div className="row p-3"> 
                    {
                        !isModal && (
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h1>Tambah Barang</h1>
                                    </div>
                                    <div className="col-md-4 text-right">
                                        <Link className="btn btn-secondary" to="/product"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        )
                    }

                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label className="control-label">Kode <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" placeholder="Kode Barang"/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Nama <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" placeholder="Nama Barang"/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Harga Beli <span className="text-danger">*</span></label>
                            <input type="text" className="form-control text-right" placeholder="Rp. 0.0"/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Harga Jual <span className="text-danger">*</span></label>
                            <input type="text" className="form-control text-right" placeholder="Rp. 0.0"/>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label className="control-label">Harga Grosir <span className="text-danger">*</span></label>
                            <input type="text" className="form-control text-right" placeholder="Rp. 0.0"/>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Satuan <span className="text-danger">*</span></label>
                            <CreatableSelect
                                isClearable
                                placeholder="Pilih atau ketik baru"
                                options={[
                                    {
                                        label: 'Pcs',
                                        value: 'Pcs'
                                    },
                                    {
                                        label: 'Pak',
                                        value: 'Pak'
                                    },
                                    {
                                        label: 'Dus',
                                        value: 'Dus'
                                    }
                                ]}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Kategori <span className="text-danger">*</span></label>
                            <CreatableSelect
                                isClearable
                                placeholder="Pilih atau ketik baru"
                                options={[
                                    {
                                        label: 'Minuman Sashet',
                                        value: 'Minuman Sashet'
                                    },
                                    {
                                        label: 'Minuman',
                                        value: 'Minuman'
                                    },
                                    {
                                        label: 'Masakan',
                                        value: 'Masakan'
                                    }
                                ]}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Stok</label>
                            <input type="text" className="form-control text-right" placeholder="0.0"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-2 text-right mb-5">
                    <hr/>
                    <button className="btn btn-primary mr-2" onClick={this.handleSave}><i className="mdi mdi-content-save mr-2"></i>Simpan</button>
                    <button className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                </div>
            </Fragment>
        )
    }
}

export default AddProduct

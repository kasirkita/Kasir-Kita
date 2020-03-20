import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import AsyncCreateableSelect from 'react-select/async-creatable'
import { getProduct, updateProduct } from '../../store/actions/ProductActions';
import { connect } from 'react-redux'
import Error from '../Errors/Error';
import { withToastManager } from 'react-toast-notifications'
import Axios from 'axios'
import { url } from '../../global'

class AddProduct extends Component {

    state = {
        code: '',
        name: '',
        cost: '',
        price: '',
        wholesale: '',
        unit_id: '',
        unit_label: '',
        category_id: '',
        category_label: '',
        stock: ''
    }

    handleSave = () => {
        this.props.updateProduct(this.props.match.params.id, this.state)
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
                [`${name}_label`]: e.label,
                [`${name}_id`]: e.value
            })

        } else {
            this.setState({
                ...this.state,
                [`${name}_label`]: null,
                [`${name}_id`]: null
            })
        }
    }

    componentDidUpdate = (prevProps) => {
       
        const { toastManager } = this.props

        if (prevProps.type !== this.props.type) {
            if (this.props.type === 'update') {
                
                if (this.props.success) {
    
                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    });
    
                    return this.props.history.push('/product')
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }

            if (this.props.type === 'get') {

                if (this.props.success) {

                    
                    if (this.props.product !== prevProps.product) {
                        
                        const { product } = this.props

                        this.setState({
                            ...this.state,
                            code: product.code,
                            name: product.name,
                            cost: product.cost,
                            price: product.price,
                            wholesale: product.wholesale,
                            unit_id: product.unit && product.unit._id,
                            unit_label: product.unit && product.unit.name,
                            category_id: product.category && product.category._id,
                            category_label: product.category && product.category.name,
                            stock: product.stock && product.stock.amount
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

    componentDidMount(){
        this.props.getProduct(this.props.match.params.id)
    }

    render() {

        const { isModal, error, fetching } = this.props
        const {
            code,
            name,
            cost,
            price,
            wholesale,
            unit_id,
            unit_label,
            category_id,
            category_label,
            stock,
        } = this.state

        const validate = error && error.data && error.data.errors

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />
        

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
                            <input type="text" className={`form-control ${ validate && validate.code && 'is-invalid'}`} onChange={this.handleChange('code')} value={code} placeholder="Kode Barang"/>
                            {
                                validate && validate.code && (
                                    <div className="invalid-feedback">{ validate.code[0] }</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <label className="control-label">Nama <span className="text-danger">*</span></label>
                            <input type="text" className={`form-control ${validate && validate.name && 'is-invalid'}`} onChange={this.handleChange('name')} value={name} placeholder="Nama Barang"/>
                            {
                                validate && validate.name && (
                                    <div className="invalid-feedback">{ validate.name[0] }</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <label className="control-label">Harga Beli <span className="text-danger">*</span></label>
                            <input type="text" className={`form-control text-right ${validate && validate.cost && 'is-invalid'}`} onChange={this.handleChange('cost')} value={cost} placeholder="Rp. 0.0"/>
                            {
                                validate && validate.cost && (
                                    <div className="invalid-feedback">{ validate.cost[0] }</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <label className="control-label">Harga Jual <span className="text-danger">*</span></label>
                            <input type="text" className={`form-control text-right ${validate && validate.price && 'is-invalid'}`} onChange={this.handleChange('price')} value={price} placeholder="Rp. 0.0"/>
                            {
                                validate && validate.price && (
                                    <div className="invalid-feedback">{ validate.price[0] }</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label className="control-label">Harga Grosir <span className="text-danger">*</span></label>
                            <input type="text" className={`form-control text-right ${validate && validate.wholesale && 'is-invalid'}`} onChange={this.handleChange('wholesale')} value={wholesale} placeholder="Rp. 0.0"/>
                            {
                                validate && validate.wholesale && (
                                    <div className="invalid-feedback">{ validate.wholesale[0] }</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <label className="control-label">Satuan</label>
                            <AsyncCreateableSelect
                                isClearable
                                onChange={this.handleChangeSelect('unit')}
                                value={ unit_id && { label: unit_label, value: unit_id }}
                                placeholder="Pilih atau ketik baru"
                                loadOptions={ getUnitList }
                                cacheOptions
                                defaultOptions
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Kategori</label>
                            <AsyncCreateableSelect
                                isClearable
                                onChange={this.handleChangeSelect('category')}
                                value={ category_id && { label: category_label, value: category_id }}
                                placeholder="Pilih atau ketik baru"
                                loadOptions={ getCategoryList }
                                cacheOptions
                                defaultOptions
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Stok <span className="text-danger">*</span></label>
                            <input type="text" readOnly className={`form-control btn-disabled text-right ${validate && validate.stock && 'is-invalid'}`} value={stock} placeholder="0.0"/>
                            {
                                validate && validate.stock && (
                                    <div className="invalid-feedback">{ validate.stock[0] }</div>
                                )
                            }
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
                    <button className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                </div>
            </Fragment>
        )
    }
}


const filterCategoryList = (categories) => {
    const options = categories.map(category => {
        return { label: category.name, value: category.name }
    })
    return appendCategory(options);
 };

const appendCategory = filteredOptions => {
    return [
      ...filteredOptions
    ];
};
   
const getCategoryList = (inputValue, callback) => {
     Axios.get(`${url}/category/list`, {
         params: {
             keyword: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
        callback(filterCategoryList(response.data.data));
     })
 }

const filterUnitList = (units) => {
    const options = units.map(unit => {
        return { label: unit.name, value: unit.name }
    })
    return appendUnit(options);
 };

const appendUnit = filteredOptions => {
    return [
      ...filteredOptions
    ];
};
   
const getUnitList = (inputValue, callback) => {
     Axios.get(`${url}/unit/list`, {
         params: {
             keyword: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
        callback(filterUnitList(response.data.data));
     })
 }

const mapStateToProps = state => {
    return {
        ...state,
        message: state.product.message,
        fetching: state.product.fetching,
        error: state.product.error,
        success: state.product.success,
        type: state.product.type,
        product: state.product.product
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        updateProduct: (id, data) => dispatch(updateProduct(id, data)),
        getProduct: id => dispatch(getProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddProduct))
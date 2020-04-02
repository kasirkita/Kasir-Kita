import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getProduct } from '../../store/actions/ProductActions'
import { connect } from 'react-redux'

class ViewProduct extends Component {
    componentDidMount() {
        this.props.getProduct(this.props.match.params.id)
    }
    render() {
        const { product } = this.props
        return (
            <Fragment>
                <div className="row p-3"> 
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>{ product && product.name }</h1>
                            </div>
                            <div className="col-md-4 text-right">
                                <Link className="btn btn-secondary" to="/product"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Kode</th>
                                    <td>{product && product.code}</td>
                                    <th>Harga Jual</th>
                                    <td>{ product && product.price_formatted }</td>
                                </tr>
                                <tr>
                                    <th>Harga Beli</th>
                                    <td>{ product && product.cost_formatted }</td>
                                    <th>Harga Grosir</th>
                                    <td>{ product && product.wholesale_formatted }</td>
                                </tr>
                                <tr>
                                    <th>Kategori</th>
                                    <td>{ product && product.category && product.category.name }</td>
                                    <th>Stok</th>
                                    <td>{ product && product.qty && product.qty.amount }/{ product && product.unit && product.unit.name }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        product: state.product.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProduct: id => dispatch(getProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct)

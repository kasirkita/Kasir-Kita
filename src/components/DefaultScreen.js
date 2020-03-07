import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

export class DefaultScreen extends Component {

    handleLogout = () => {
        sessionStorage.removeItem('token')
        return this.props.history.push('/login')
    }

    render() {
        const path = this.props.location.pathname.split('/')[1]
        
        return (
            <div className="container-fluid p-0">
                
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand pl-3" to="/">
                        <i className="mdi mdi-desktop-classic mr-2"></i>Kasir Kita 2.0
                    </Link>
                    <ul className="navbar-nav ml-auto">
                        <li className="dropdown">
                            <button className="btn btn-link nav-link dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="rounded-circle mr-2" width="25px" src={sessionStorage.getItem('avatar') !== 'null' ? sessionStorage.getItem('avatar') : require('../assets/img/default.png')} alt=""/> Halo {sessionStorage.getItem('name')}
                            </button>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <button onClick={this.handleLogout} className="btn btn-link nav-link active pointer"><i className="mdi mdi-lock-open mr-2"></i>Keluar</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">

                    <div className="col-md-2 p-0">
                        <ul className="nav flex-column nav-pills">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboard"><i className="mdi mdi-view-dashboard mr-2"></i> Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/cashier"><i className="mdi mdi-desktop-classic mr-2"></i> Kasir</NavLink>
                            </li>
                            <li className={`dropdown ${ path === 'product' || path === 'category' ? 'dropdown-active' : ''}`}>
                                <a className="nav-link dropdown-toggle pointer" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-calendar-text mr-2"></i> Barang 
                                </a>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <NavLink className="dropdown-item" to="/product">Data Barang</NavLink>
                                    <NavLink className="dropdown-item" to="/category">Kategori Barang</NavLink>
                                </div>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/sales"><i className="mdi mdi-basket mr-2"></i> Penjualan</NavLink>
                            </li>
                            <li className={`dropdown ${ path === 'purchase' || path === 'expense' ? 'dropdown-active' : ''}`}>
                                <a className="nav-link dropdown-toggle pointer" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-store mr-2"></i> Pembelian
                                </a>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <NavLink className="dropdown-item" to="/purchase">Pembelian Barang</NavLink>
                                    <NavLink className="dropdown-item" to="/expense">Pembelian Peralatan</NavLink>
                                </div>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/discount"><i className="mdi mdi-ticket-confirmation mr-2"></i> Promo</NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/stock"><i className="mdi mdi-library-shelves mr-2"></i> Stok</NavLink>
                            </li>
                            <li className={`dropdown ${ 
                                path === 'user' || 
                                path === 'customer' ||
                                path === 'supplier' ||
                                path === 'role'
                                 ? 'dropdown-active' : ''}`}>
                                <a className="nav-link dropdown-toggle pointer" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-account mr-2"></i> Pengguna
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <NavLink className="dropdown-item" to="/user">Pengguna</NavLink>
                                    <NavLink className="dropdown-item" to="/customer">Pelanggan</NavLink>
                                    <NavLink className="dropdown-item" to="/supplier">Pemasok</NavLink>
                                    <NavLink className="dropdown-item" to="/role">Peranan</NavLink>
                                </div>
                            </li>
                            <li className={`dropdown ${ 
                                path === 'report-sales' || 
                                path === 'report-purchase' ||
                                path === 'report-expense' ||
                                path === 'report-stock' 
                                 ? 'dropdown-active' : ''}`}>
                                <a className="nav-link dropdown-toggle pointer" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-file mr-2"></i> Laporan
                                </a>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <NavLink className="dropdown-item" to="/report-sales">Penjualan</NavLink>
                                    <NavLink className="dropdown-item" to="/report-purchase">Pembelian Barang</NavLink>
                                    <NavLink className="dropdown-item" to="/report-expense">Pembelian Peralatan</NavLink>
                                    <NavLink className="dropdown-item" to="/report-stock">Stok</NavLink>
                                </div>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/settings"><i className="mdi mdi-settings mr-2"></i> Pengatuan</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-10">
                        {this.props.children}
                    </div>
                </div>
                </div>

           
        )
    }
}

export default DefaultScreen

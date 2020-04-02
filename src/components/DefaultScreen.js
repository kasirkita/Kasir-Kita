import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

class DefaultScreen extends Component {

    handleLogout = () => {
        sessionStorage.removeItem('token')
        return this.props.history.push('/login')
    }

    render() {
        const path = this.props.location.pathname.split('/')[1]
        const permissions = sessionStorage.getItem('permissions') ? JSON.parse(sessionStorage.getItem('permissions')).filter(permission => permission !== null) : []
        
        return (
            <div className="container-fluid p-0">
                
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand pl-3" to="/">
                        <i className="mdi mdi-desktop-classic mr-2"></i>Kasir Kita 2.0
                    </Link>
                    <ul className="navbar-nav ml-auto">
                        <li className="dropdown">
                            <button className="btn btn-link nav-link dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                            {
                                permissions && permissions.length > 0 && permissions.map(permission => {
                                    return (
                                        permission.children && permission.children.length > 0 ? (
                                            <li className={`dropdown ${ path === permission.slug || permission.children.map(child => child.slug).includes(path) ? 'dropdown-active' : ''}`} key={permission._id}>
                                                <a href="/" className="nav-link dropdown-toggle pointer" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="mdi mdi-calendar-text mr-2"></i> {permission.name} 
                                                </a>

                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    {
                                                        permission.children.map(child => {
                                                            return (
                                                                <NavLink key={child._id} className="dropdown-item" to={`/${child.slug}`}>{child.name}</NavLink>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </li>
                                        ) : (
                                            <li className="nav-item" key={permission._id}>
                                                <NavLink className="nav-link" to={`/${permission.slug}`}><i className={permission.icon}></i> {permission.name}</NavLink>
                                            </li>
                                        ) 
                                    )
                                })
                            }
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

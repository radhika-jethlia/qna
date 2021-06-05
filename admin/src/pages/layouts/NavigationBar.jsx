import React from 'react'
import { withRouter } from 'react-router-dom'

const NavigationBar = (props) => {
    return (
        <>
            <div className="header">
                <div className="header-left">
                    <a href="index.html" className="logo logo-small">
                        <img src="assets/img/logo-icon.png" alt="Logo" width="30" height="30" />
                    </a>
                </div>
                <span id="toggle_btn">
                    <i className="fas fa-align-left"></i>
                </span>
                <span className="mobile_btn" id="mobile_btn">
                    <i className="fas fa-align-left"></i>
                </span>
                <ul className="nav user-menu">
                    {/* <li className="nav-item dropdown noti-dropdown"> */}
                        {/* <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                            <i className="far fa-bell"></i>  <span className="badge badge-pill"></span>
                        </a> */}
                        {/* <div className="dropdown-menu dropdown-menu-right notifications">
                            <div className="topnav-dropdown-header">
                                <span className="notification-title">Notifications</span>
                                <a href="javascript:void(0)" className="clear-noti"> Clear All </a>
                            </div>
                            <div className="noti-content">
                                <ul className="notification-list">
                                    <li className="notification-message">
                                        <a href="admin-notification.html">
                                            <div className="media">
                                                <span className="avatar avatar-sm">
                                                    <img className="avatar-img rounded-circle" alt="" src="assets/img/provider/provider-01.jpg" />
                                                </span>
                                                <div className="media-body">
                                                    <p className="noti-details">
                                                        <span className="noti-title">Thomas Herzberg have been subscribed</span>
                                                    </p>
                                                    <p className="noti-time">
                                                        <span className="notification-time">15 Sep 2020 10:20 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="topnav-dropdown-footer">
                                <a href="admin-notification.html">View all Notifications</a>
                            </div>
                        </div> */}
                        {/* <ul> */}
                            <li className="nav-item dropdown">
                                <span className="dropdown-toggle user-link  nav-link" data-toggle="dropdown">
                                    <span className="user-img">
                                        <img className="rounded-circle" src="assets/img/logo-icon.png" width="40" alt="Admin" />
                                    </span>
                                </span>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={
                                        e => props.history.push('/password')
                                    }>Profile</a>
                                    <a className="dropdown-item" onClick={
                                        e => props.history.push('/logout')
                                    }>Logout</a>
                                </div>
                            </li>
                        {/* </ul> */}
                    {/* </li> */}
                </ul>
            </div>
        </>
    )
}

export default withRouter(NavigationBar)
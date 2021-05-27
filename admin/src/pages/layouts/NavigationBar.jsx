import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const NavigationBar = (props) => {
    return (
        <>
            <div className="header">
                <div className="header-left">
                    <a href="index.html" className="logo logo-small">
                        {/* <img src="assets/img/logo-icon.png" alt="Logo" width="30" height="30"> */}
                    </a>
                </div>
                <a href="javascript:void(0);" id="toggle_btn">
                    <i className="fas fa-align-left"></i>
                </a>
                <a className="mobile_btn" id="mobile_btn" href="javascript:void(0);">
                    <i className="fas fa-align-left"></i>
                </a>
                <ul className="nav user-menu">
                    <li className="nav-item dropdown noti-dropdown">
                        <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                            <i className="far fa-bell"></i>  <span className="badge badge-pill"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right notifications">
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
                                                    {/* <img className="avatar-img rounded-circle" alt="" src="assets/img/provider/provider-01.jpg"> */}
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
                                    <li className="notification-message">
                                        <a href="admin-notification.html">
                                            <div className="media">
                                                <span className="avatar avatar-sm">
                                                    {/* <img className="avatar-img rounded-circle" alt="" src="assets/img/provider/provider-02.jpg"> */}
                                                </span>
                                                <div className="media-body">
                                                    <p className="noti-details">
                                                        <span className="noti-title">Matthew Garcia have been subscribed</span>
                                                    </p>
                                                    <p className="noti-time">
                                                        <span className="notification-time">13 Sep 2020 03:56 AM</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a href="admin-notification.html">
                                            <div className="media">
                                                <span className="avatar avatar-sm">
                                                    {/* <img className="avatar-img rounded-circle" alt="" src="assets/img/provider/provider-03.jpg"> */}
                                                </span>
                                                <div className="media-body">
                                                    <p className="noti-details">
                                                        <span className="noti-title">Yolanda Potter have been subscribed</span>
                                                    </p>
                                                    <p className="noti-time">
                                                        <span className="notification-time">12 Sep 2020 09:25 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a href="admin-notification.html">
                                            <div className="media">
                                                <span className="avatar avatar-sm">
                                                    {/* <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/provider/provider-04.jpg"> */}
                                                </span>
                                                <div className="media-body">
                                                    <p className="noti-details">
                                                        <span className="noti-title">Ricardo Flemings have been subscribed</span>
                                                    </p>
                                                    <p className="noti-time">
                                                        <span className="notification-time">11 Sep 2020 06:36 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a href="admin-notification.html">
                                            <div className="media">
                                                <span className="avatar avatar-sm">
                                                    {/* <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/provider/provider-05.jpg"> */}
                                                </span>
                                                <div className="media-body">
                                                    <p className="noti-details">
                                                        <span className="noti-title">Maritza Wasson have been subscribed</span>
                                                    </p>
                                                    <p className="noti-time">
                                                        <span className="notification-time">10 Sep 2020 08:42 AM</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a href="admin-notification.html">
                                            <div className="media">
                                                <span className="avatar avatar-sm">
                                                    {/* <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/provider/provider-06.jpg"> */}
                                                </span>
                                                <div className="media-body">
                                                    <p className="noti-details">
                                                        <span className="noti-title">Marya Ruiz have been subscribed</span>
                                                    </p>
                                                    <p className="noti-time">
                                                        <span className="notification-time">9 Sep 2020 11:01 AM</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a href="admin-notification.html">
                                            <div className="media">
                                                <span className="avatar avatar-sm">
                                                    {/* <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/provider/provider-07.jpg"> */}
                                                </span>
                                                <div className="media-body">
                                                    <p className="noti-details">
                                                        <span className="noti-title">Richard Hughes have been subscribed</span>
                                                    </p>
                                                    <p className="noti-time">
                                                        <span className="notification-time">8 Sep 2020 06:23 AM</span>
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
                        </div>
                        <li className="nav-item dropdown">
                            <a href="javascript:void(0)" className="dropdown-toggle user-link  nav-link" data-toggle="dropdown">
                                <span className="user-img">
                                    {/* <img className="rounded-circle" src="assets/img/user.jpg" width="40" alt="Admin"> */}
                                </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="admin-profile.html">Profile</a>
                                <a className="dropdown-item" href="login.html">Logout</a>
                            </div>
                        </li>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NavigationBar
import React from 'react'

const Sidebar = (props) => {
    return (
        <>
            <div className="sidebar" id="sidebar">
                <div className="sidebar-logo">
                    <a href="index.html">
                        {/* <img src="assets/img/logo-icon.png" className="img-fluid" alt=""> */}
                    </a>
                </div>
                <div className="sidebar-inner" style={{ overflow: 'scroll' }}>
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className="active">
                                <a href="index.html"><i className="fas fa-columns"></i> <span>Dashboard</span></a>
                            </li>
                            <li>
                                <a href="categories.html"><i className="fas fa-layer-group"></i> <span>Categories</span></a>
                            </li>
                            <li>
                                <a href="subcategories.html"><i className="fab fa-buffer"></i> <span>Sub Categories</span></a>
                            </li>
                            <li>
                                <a href="service-list.html"><i className="fas fa-bullhorn"></i> <span> Services</span></a>
                            </li>
                            <li>
                                <a href="total-report.html"><i className="far fa-calendar-check"></i> <span> Booking List</span></a>
                            </li>
                            <li>
                                <a href="payment_list.html"><i className="fas fa-hashtag"></i> <span>Payments</span></a>
                            </li>
                            <li>
                                <a href="ratingstype.html"><i className="fas fa-star-half-alt"></i> <span>Rating Type</span></a>
                            </li>
                            <li>
                                <a href="review-reports.html"><i className="fas fa-star"></i> <span>Ratings</span></a>
                            </li>
                            <li>
                                <a href="subscriptions.html"><i className="far fa-calendar-alt"></i> <span>Subscriptions</span></a>
                            </li>
                            <li>
                                <a href="wallet.html"><i className="fas fa-wallet"></i> <span> Wallet</span></a>
                            </li>
                            <li>
                                <a href="service-providers.html"><i className="fas fa-user-tie"></i> <span> Service Providers</span></a>
                            </li>
                            <li>
                                <a href="users.html"><i className="fas fa-user"></i> <span>Users</span></a>
                            </li>
                            <li>
                                <a href="settings.html"><i className="fas fa-cog"></i> <span> Settings</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
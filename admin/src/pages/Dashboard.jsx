import React from 'react'
import { connect } from 'react-redux'

const Dashboard = (props) => {
    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-12">
                        <h3 className="page-title">Welcome Admin!</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <span className="dash-widget-icon bg-primary">
                                    <i className="far fa-user"></i>
                                </span>
                                <div className="dash-widget-info">
                                    <h3>429</h3>
                                    <h6 className="text-muted">Users</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <span className="dash-widget-icon bg-primary">
                                    <i className="fas fa-user-shield"></i>
                                </span>
                                <div className="dash-widget-info">
                                    <h3>148</h3>
                                    <h6 className="text-muted">Providers</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <span className="dash-widget-icon bg-primary">
                                    <i className="fas fa-qrcode"></i>
                                </span>
                                <div className="dash-widget-info">
                                    <h3>124</h3>
                                    <h6 className="text-muted">Services</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="dash-widget-header">
                                <span className="dash-widget-icon bg-primary">
                                    <i className="far fa-credit-card"></i>
                                </span>
                                <div className="dash-widget-info">
                                    <h3>$11378</h3>
                                    <h6 className="text-muted">Subscription</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const MapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
}

export default connect(MapStateToProps)(Dashboard)
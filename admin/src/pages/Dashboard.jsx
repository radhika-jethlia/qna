import React from 'react'
import { connect } from 'react-redux'

const Dashboard = (props) => {
    return (
        <h1>Dashboard</h1>
    )
}

const MapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
}

export default connect(MapStateToProps)(Dashboard)
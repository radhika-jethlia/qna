import React from 'react'
import NavigationBar from './NavigationBar.jsx'
import Sidebar from './Sidebar.jsx'
import { connect } from 'react-redux'

const Layout = ({ Content }) => {
    return (
        <>
            <div className="main-wrapper">
                <NavigationBar />
                <Sidebar />
                <div class="page-wrapper">
                    <div class="content container-fluid">
                        {Content}
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
export default connect(MapStateToProps)(Layout)
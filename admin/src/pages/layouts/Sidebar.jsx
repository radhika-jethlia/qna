import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Sidebar = (props) => {

    return (
        <>
            <div className="sidebar" id="sidebar">
                <div className="sidebar-logo">
                    <a href="index.html">
                        <img src="assets/img/logo-icon.png" className="img-fluid" alt="" />
                    </a>
                </div>
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className={props.history.location.pathname == '/dashboard' ? 'active' : null}>
                                <Link replace to={'/dashboard'} className={'no-underline'}><i className="fas fa-home"></i> <span> Dashboard </span></Link>
                            </li>
                            <li className={props.history.location.pathname == '/subjects' ? 'active' : null}>
                                <Link to={'/subjects'} className={'no-underline'}><i className="fas fa-subscript"></i> <span>Subjects</span></Link>
                            </li>
                            <li className={props.history.location.pathname == '/questions' ? 'active' : null}>
                                <Link to={'/questions'} className={'no-underline'}><i className="fas fa-question-circle"></i> <span>Questions</span></Link>
                            </li>
                            <li className={props.history.location.pathname == '/sliders' ? 'active' : null}>
                                <Link to={'/sliders'} className={'no-underline'}><i className="fa fa-camera"></i> <span>Sliders</span></Link>
                            </li>
                            <li className={props.history.location.pathname == '/password' ? 'active' : null}>
                                <Link to={'/password'} className={'no-underline'}><i className="fa fa-cog"></i> <span>Profile</span></Link>
                            </li>
                            <li className={props.history.location.pathname == '/logout' ? 'active' : null}>
                                <Link to={'/logout'} className={'no-underline'}><i className="fa fa-arrow-left"></i> <span>Logout</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Sidebar)
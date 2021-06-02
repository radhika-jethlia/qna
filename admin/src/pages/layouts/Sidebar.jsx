import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

const Sidebar = (props) => {
    const [path, setPath] = useState('')
    useEffect(() => {
        setPath(window.location.href.replace('//', "").split('/')[2])
    }, [path])

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
                            <li className={path == 'dashboard' ? 'active' : null}>
                                <Link replace to={'/dashboard'} className={'no-underline'}><i className="fas fa-columns"></i> <span> Dashboard </span></Link>
                            </li>
                            <li>
                                <Link to={'/subjects'} className={'no-underline'}><i className="fab fa-buffer"></i> <span>Subjects</span></Link>
                            </li>
                            <li className={path == 'questions' ? 'active' : null}>
                                <Link to={'/questions'} className={'no-underline'}><i className="fas fa-question-circle"></i> <span>Questions</span></Link>
                            </li>
                            <li className={path == 'password' ? 'active' : null}>
                                <Link to={'/password'} className={'no-underline'}><i className="fas fa-user-shield"></i> <span>Profile</span></Link>
                            </li>
                            <li className={path == 'logout' ? 'active' : null}>
                                <Link to={'/logout'} className={'no-underline'}><i className="fas fa-user-shield"></i> <span>Logout</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Sidebar)
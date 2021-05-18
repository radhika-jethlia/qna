import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
    useLocation
} from "react-router-dom"
import ScrollRestoration from 'react-scroll-restoration'
import { connect } from 'react-redux'
import Login from '../pages/authentication/Login'

let MainRouter = (props) => {
    return (<>
        <Router>
            <ScrollRestoration />
            <Route exact path={'/'}
                render={(routeProps) => {
                    return (
                        <>
                            {props.authentication.isAuthorized ? (
                                <Redirect
                                    to={{
                                        pathname: "/dashboard",
                                        state: {
                                            from: props.location,
                                        },
                                    }}
                                />
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: "/login",
                                        state: {
                                            from: props.location,
                                        },
                                    }}
                                />
                            )}
                        </>
                    );
                }}
            />
            <Route exact path={'/login'} component={Login} />
        </Router>
    </>
    )
}
const MapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
}

export default connect(MapStateToProps)(MainRouter)
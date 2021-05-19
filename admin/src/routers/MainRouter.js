import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
    useLocation
} from "react-router-dom"
import ScrollRestoration from 'react-scroll-restoration'
import { connect } from 'react-redux'
import ProgressBar from '../pages/components/LoadingComponent.jsx'
import SnackBar from '../pages/components/SnackBars.jsx'
import React from "react"
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

// async Pages, import using lazy loader

const Login = React.lazy(() => {
    // import('../pages/Dashboard')
    return new Promise(resolve => {
        setTimeout(() => resolve(import("../pages/authentication/Login")), 1 * 1000)
    });
})

const Dashboard = React.lazy(() => {
    // import('../pages/Dashboard')
    return new Promise(resolve => {
        setTimeout(() => resolve(import("../pages/Dashboard")), 1 * 1000)
    });
})

const FallBackLoader = () => {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress />
        </Backdrop>
    )
}

const PrivateRoute = ({ component: Component, authorized, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return (
                    authorized
                        ?
                        <React.Suspense fallback={<FallBackLoader />}>
                            <Component {...routeProps} />
                        </React.Suspense>
                        :
                        <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />
                )
            }}
        />
    )
}

let MainRouter = (props) => {
    return (<>
        <Router>
            <ProgressBar />
            <SnackBar />
            <ScrollRestoration />
            <Switch>
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
                <Route exact
                    path={'/login'}
                    render={(routeProps) => {
                        return (
                            props.authentication.isAuthorized ? <Redirect to={{
                                pathname: "/dashboard",
                                state: {
                                    from: props.location,
                                },
                            }} /> : <React.Suspense fallback={<FallBackLoader />}><Login /></React.Suspense>
                        )
                    }} />
                <PrivateRoute exact path={'/dashboard'} authorized={props.authentication.isAuthorized} component={Dashboard} />
            </Switch>
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
import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
    useLocation,
    BrowserRouter
} from "react-router-dom"
import ScrollRestoration from 'react-scroll-restoration'
import { connect } from 'react-redux'
import ProgressBar from '../pages/components/LoadingComponent.jsx'
import SnackBar from '../pages/components/SnackBars.jsx'
import ModalComponent from '../pages/components/ModalComponent.jsx'
import React from "react"
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { action_logout } from '../redux/actions/LoginAction'
import Layout from '../pages/layouts/Layout.jsx'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

// async Pages, import using lazy loader

const Login = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import("../pages/authentication/Login")), 1 * 1000)
    });
})

const Dashboard = React.lazy(() => {
    return import('../pages/Dashboard.jsx')
    // return new Promise(resolve => {
    //     setTimeout(() => resolve(import("../pages/Dashboard")), 1 * 1000)
    // });
})

const Password = React.lazy(() => import('../pages/profile/Password'))
const Subjects = React.lazy(() => import('../pages/subject/Subjects'))
const AddSubject = React.lazy(() => import('../pages/subject/AddSubject'))
const EditSubject = React.lazy(() => import('../pages/subject/EditSubject'))

const Questions = React.lazy(() => import('../pages/questions/Questions'))
const AddQuestions = React.lazy(() => import('../pages/questions/AddQuestion'))
const EditQuestion = React.lazy(() => import('../pages/questions/EditQuestion'))

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
                            <Layout Content={<Component {...routeProps} />} />
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
        <BrowserRouter>
            <Router>
                <ProgressBar />
                <SnackBar />
                <ScrollRestoration />
                <ModalComponent />
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
                    <PrivateRoute exact path={'/password'} authorized={props.authentication.isAuthorized} component={Password} />

                    <PrivateRoute exact path={'/subjects'} authorized={props.authentication.isAuthorized} component={Subjects} />
                    <PrivateRoute exact path={'/subjects/add'} authorized={props.authentication.isAuthorized} component={AddSubject} />
                    <PrivateRoute exact path={'/subjects/edit/:subjectId'} authorized={props.authentication.isAuthorized} component={EditSubject} />

                    <PrivateRoute exact path={'/questions'} authorized={props.authentication.isAuthorized} component={Questions} />
                    <PrivateRoute exact path={'/questions/add-question'} authorized={props.authentication.isAuthorized} component={AddQuestions} />
                    <PrivateRoute exact path={'/question/edit/:questionId'} authorized={props.authentication.isAuthorized} component={EditQuestion} />

                    {/* logout */}
                    <Route exact path={'/logout'} render={() => {
                        props.authentication.isAuthorized && props.logout()
                        return (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: {
                                        from: props.location,
                                    },
                                }}
                            />
                        )
                    }} />

                    {/* 404 page */}
                    <Route exact path="" render={() => <center><h3>404! Nothing to do here</h3></center>} />
                </Switch>
            </Router>
        </BrowserRouter>
    </>
    )
}
const MapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(action_logout())
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(MainRouter)
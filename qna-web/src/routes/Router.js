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
import React from "react"
import { Backdrop, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ModalComponent from "../pages/components/ModalComponent.jsx"

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

// async Pages, import using lazy loader

const LandingPage = React.lazy(() => import('../pages/LandingPage'))
const StartGame = React.lazy(() => import('../pages/StartGame'))

const FallBackLoader = () => {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={true}>
            <LinearProgress />
        </Backdrop>
    )
}


const ModifiedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return (
                    <React.Suspense fallback={<FallBackLoader />}>
                        {/* <Layout Content={<Component {...routeProps} />} /> */}
                        <Component {...routeProps} />
                    </React.Suspense>
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
                <ScrollRestoration />
                <ModalComponent />
                <Switch>
                    <Route exact path={'/'}
                        render={(routeProps) => {
                            return (
                                <>
                                    {props.game.isGameRunning ? (
                                        <Redirect
                                            to={{
                                                pathname: "/play",
                                                state: {
                                                    from: props.location,
                                                },
                                            }}
                                        />
                                    ) : (
                                        <Redirect
                                            to={{
                                                pathname: "/start",
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
                    <ModifiedRoute exact path={'/start'} component={LandingPage} />
                    <ModifiedRoute exact path={'/play'} component={StartGame} />

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
        game: state.game
    }
}

export default connect(MapStateToProps)(MainRouter)
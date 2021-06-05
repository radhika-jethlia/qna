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
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

// async Pages, import using lazy loader

const LandingPage = React.lazy(() => import('../pages/LandingPage'))

const FallBackLoader = () => {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress />
        </Backdrop>
    )
}

let MainRouter = (props) => {
    return (<>
        <BrowserRouter>
            <Router>
                <ProgressBar />
                <ScrollRestoration />
                <Switch>
                    <Route exact path={'/'}
                        render={(routeProps) => {
                            return (
                                <>
                                    {props.gamq.isGameRunning ? (
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
                                                pathname: "/",
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
                    <Route exact path={'/play'} component={LandingPage} />

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
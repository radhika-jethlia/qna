import React from 'react'
import { connect } from 'react-redux'
import { LinearProgress, Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const ProgressBar = (props) => {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={props.progress.isOpen}>
            <CircularProgress />
        </Backdrop>
    )
}

const MapStateToProps = (state) => {
    return {
        progress: state.progress
    }
}

export default connect(MapStateToProps)(ProgressBar)
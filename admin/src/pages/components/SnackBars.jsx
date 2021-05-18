import React from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = (props) => {
    return (
        <>
            <Snackbar open={props.snackbar.success.isOpen} autoHideDuration={6000}>
                <Alert severity="success">{props.snackbar.success.message}</Alert>
            </Snackbar>
            <Snackbar open={props.snackbar.warning.isOpen} autoHideDuration={6000}>
                <Alert severity="warning">{props.snackbar.warning.message}</Alert>
            </Snackbar>
            <Snackbar open={props.snackbar.info.isOpen} autoHideDuration={6000}>
                <Alert severity="info">{props.snackbar.info.message}</Alert>
            </Snackbar>
            <Snackbar open={props.snackbar.error.isOpen} autoHideDuration={6000}>
                <Alert severity="error">{props.snackbar.error.message}</Alert>
            </Snackbar>
        </>
    )
}

const MapStateToProps = (state) => {
    return {
        snackbar: state.snackbar
    }
}

export default connect(MapStateToProps)(SnackBar)
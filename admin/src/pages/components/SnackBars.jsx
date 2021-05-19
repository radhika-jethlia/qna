import React from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import {
    hide_success,
    hide_warning,
    hide_info,
    hide_error
} from '../../redux/actions/SnackbarActions'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = (props) => {
    return (
        <>
            <Snackbar open={props.snackbar.success.isOpen} autoHideDuration={6000} onClose={() => props.hide_success()}>
                <Alert severity="success">{props.snackbar.success.message}</Alert>
            </Snackbar>
            <Snackbar open={props.snackbar.warning.isOpen} autoHideDuration={6000} onClose={() => props.hide_warning()}>
                <Alert severity="warning">{props.snackbar.warning.message}</Alert>
            </Snackbar>
            <Snackbar open={props.snackbar.info.isOpen} autoHideDuration={6000} onClose={() => props.hide_info()}>
                <Alert severity="info">{props.snackbar.info.message}</Alert>
            </Snackbar>
            <Snackbar open={props.snackbar.error.isOpen} autoHideDuration={6000} onClose={() => props.hide_error()}>
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
const MapDispatchToProps = (dispatch) => {
    return {
        hide_success: () => dispatch(hide_success()),
        hide_warning: () => dispatch(hide_warning()),
        hide_info: () => dispatch(hide_info()),
        hide_error: () => dispatch(hide_error()),
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(SnackBar)
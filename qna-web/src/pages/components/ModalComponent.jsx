import React from 'react'
import { hide_modal, show_modal } from '../../redux/actions/ModalActions'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button,
    Slide,
    Dialog,
    ListItemText,
    ListItem,
    List,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Container
} from '@material-ui/core/'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// useEffect(() => {
//     effect
// }, [input])

const ModalDialog = (props) => {

    const classes = useStyles()

    return (
        <div>
            <Dialog fullScreen open={props.modal.isOpenModal} onClose={e => props.hide_modal()} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={e => props.hide_modal()} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.modal.title}
                        </Typography>
                        <Button onClick={
                            e => props.hide_modal()
                        } form='modalForm' type="submit" autoFocus color="inherit">
                            Close
                    </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <Container>
                        {props.modal.body}
                    </Container>
                </List>
            </Dialog>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        modal: state.modal
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        hide_modal: () => dispatch(hide_modal()),
        show_modal: (payload) => dispatch(show_modal(payload))
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(ModalDialog)
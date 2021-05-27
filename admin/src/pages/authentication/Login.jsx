import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    LinearProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { BASE_URI } from '../../utils/API'
import { PROJECT_NAME } from '../../utils/Config'
import {
    action_check_login,
    action_login
} from '../../redux/actions/LoginAction'
import {
    show_progress,
    hide_progress
} from '../../redux/actions/ProgressAction'
import {
    show_success,
    show_error
} from '../../redux/actions/SnackbarActions'
import { withRouter } from 'react-router'

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href={BASE_URI}>
                {PROJECT_NAME}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

let Login = (props) => {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const formValidator = () => {
        if (email == '') {
            setErrors({
                email: 'Email is required'
            })
            return false
        }
        if (password == '') {
            setErrors({
                password: 'Password is required'
            })
            return false
        }
        return true
    }
    const signin = async () => {
        props.show_progress()
        if (formValidator()) {
            setErrors([])
            const tempPassword = password
            setPassword('')
            try {
                const result = await props.action_login({
                    email: email,
                    password: tempPassword
                })
                if (result.status === 200) {
                    props.show_success({
                        message: 'Authentication success, logging in...'
                    })
                    localStorage.setItem('jsonwebtoken', result.data.token)
                    props.history.push('/dashboard')
                } else {
                    props.show_error({
                        message: result.data.message
                    })
                }
            } catch (err) {
                props.show_error({
                    message: err.response.data.message
                })
            }
        }
        props.hide_progress()
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in to {PROJECT_NAME}</Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={
                        e => setEmail(e.target.value)
                    }
                    value={email}
                />
                <span style={{ color: "red" }}>{errors.email}</span>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={
                        e => setPassword(e.target.value)
                    }
                    value={password}
                />
                <span style={{ color: "red" }}>{errors.password}</span>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={signin}
                >
                    Sign In</Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?</Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}

const MapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
}
const MapDispatchToProps = (dispatch) => {
    return {
        action_check_login: payload => dispatch(action_check_login(payload)),
        action_login: (payload) => dispatch(action_login(payload)),
        show_progress: () => dispatch(show_progress()),
        hide_progress: () => dispatch(hide_progress()),
        show_success: (payload) => dispatch(show_success(payload)),
        show_error: (payload) => dispatch(show_error(payload))
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(withRouter(Login))
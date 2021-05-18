import React, { useState } from 'react'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { BASE_URI } from '../../utils/API'
import { PROJECT_NAME } from '../../utils/Config'
import {
    action_check_login,
    action_login
} from '../../redux/actions/LoginAction'

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

const Login = (props) => {
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
        if (formValidator()) {
            console.log('here')
            try {
                const result = await props.action_login({
                    email: email,
                    password: password
                })
                console.log(result)
            } catch (err) {
                console.log(err)
            }
        }
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
        action_login: (payload) => dispatch(action_login(payload))
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(Login)
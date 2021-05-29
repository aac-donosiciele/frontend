import { Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { login } from '../api/login/login';
import { AppUser } from '../models/appUser';


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
}));

export interface LoginPageProps {
    setUser: React.Dispatch<React.SetStateAction<AppUser | undefined>>;
}

const LoginPage = (props: LoginPageProps) => {
    const classes = useStyles();
    const history = useHistory()

    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(username, password).then(r => {
            if (r.isError) {
                enqueueSnackbar(`Loggin failed: ${r.errorMessage}`, { variant: "error" });
            }
            else {
                props.setUser(prev => {
                    return { ...prev, token: 'Bearer ' + r.data?.token, userName: username, role: r.data?.role }
                })
                history.push("/");
            }
        });
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleFormSubmit}>
                        <TextField
                            id={"LoginInput"}
                            label={"Login"}
                            value={username}
                            onChange={handleUsernameChange}
                            autoComplete="username"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                        />
                        <TextField
                            id={"PasswordInput"}
                            label={"Password"}
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="current-password"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                         </Button>
                    </form>
                    <Button color="secondary" onClick={() => history.push("/register")}>Create Account</Button>

                </div>
            </Container>
        </>
    )
}

export default LoginPage;
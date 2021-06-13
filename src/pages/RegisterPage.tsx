import { Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { register } from '../api/login/register';


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

export interface RegisterPageProps {
}

const RegisterPage = (props: RegisterPageProps) => {
    const classes = useStyles();
    const history = useHistory()

    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleRepasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepassword(event.target.value);
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        register(username, password).then(r => {
            if (r.isError) {
                enqueueSnackbar(`Register failed: ${r.errorMessage}`, { variant: "error" });
            }
            else {
                history.push("/login");
            }
        });
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Create new account
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
                            autoComplete="new-password"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                        />
                        <TextField
                            error={password !== repassword}
                            helperText={password !== repassword ? "Passwords do not match." : ""}
                            id={"RepasswordInput"}
                            label={"Retype Password"}
                            type="password"
                            value={repassword}
                            onChange={handleRepasswordChange}
                            autoComplete="new-password"
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
                            Create Account
                         </Button>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default RegisterPage;
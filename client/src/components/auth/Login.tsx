import * as React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from 'axios';
import helpers from '../../helpers';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <a href="https://github.com/hsariaslan" target="_blank" className="underline">
                Hakan Sarıaslan
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
axios.defaults.withCredentials = true;

export default function Login() {
    let navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const userStorageName = process.env.REACT_APP_STORAGE_NAME + '_user_';

    if (localStorage.getItem(userStorageName + 'email') || sessionStorage.getItem(userStorageName + 'email')) {
        navigate('/');
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(() => {
            axios.post('http://localhost:8000/api/v1/login', {
                email: data.get('email'),
                password: data.get('password')
            }).then((response) => {
                let user = response.data.data;
                const userStorageName = process.env.REACT_APP_STORAGE_NAME + '_user_';

                if (helpers.isNull(data.get('rememberMe'))) {
                    sessionStorage.setItem(userStorageName + 'email', user.email);
                    sessionStorage.setItem(userStorageName + 'name', user.name);
                    sessionStorage.setItem(userStorageName + 'surname', user.surname);
                    sessionStorage.setItem(userStorageName + 'role', user.role);
                    localStorage.removeItem(userStorageName + 'email');
                    localStorage.removeItem(userStorageName + 'name');
                    localStorage.removeItem(userStorageName + 'surname');
                    localStorage.removeItem(userStorageName + 'role');
                } else {
                    localStorage.setItem(userStorageName + 'email', user.email);
                    localStorage.setItem(userStorageName + 'name', user.name);
                    localStorage.setItem(userStorageName + 'surname', user.surname);
                    localStorage.setItem(userStorageName + 'role', user.role);
                    sessionStorage.removeItem(userStorageName + 'email');
                    sessionStorage.removeItem(userStorageName + 'name');
                    sessionStorage.removeItem(userStorageName + 'surname');
                    sessionStorage.removeItem(userStorageName + 'role');
                }

                user = helpers.getUserDataFromStorage();
                console.log(user);
                navigate('/');
            }).catch((error) => {
                // reject(error);
                // console.log(error);
            });
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}/>
                    <Typography component="h1" variant="h5">
                        {t("loginTitle")}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t("email")}
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t("password")}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="1" color="primary" name="rememberMe"/>}
                            // label={ t("rememberMe") }
                            label="Remember Me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            {t("loginButton")}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/register" className="text-gray-600 text-sm">
                                    {t("registerText")}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}

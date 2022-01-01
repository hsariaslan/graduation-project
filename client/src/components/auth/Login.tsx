import * as React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth";
import {useTranslation} from "react-i18next";
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
    let navigate = useNavigate();
    let auth = useAuth();
    const {t} = useTranslation();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorMessage("");
        setOpenSnackbar(false);

        let data = new FormData(event.currentTarget);
        let credentials = {
            email: data.get('email') as string,
            password: data.get('password') as string,
            rememberMe: data.get('rememberMe') as any,
        };

        auth.login(credentials, () => {
            navigate('/', {replace: true});
        }).catch((error: { response: any; }) => {
            setOpenSnackbar(true);
            setErrorMessage(error.response.data.message);
        });

    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
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
                {errorMessage !== "" ?
                    <Snackbar open={openSnackbar} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '100%'}}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                    : null
                }
            </Container>
        </ThemeProvider>
    );
}

import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import { update } from '../../features/title/title';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import axios from "axios";
import helpers from "../../helpers";
import Alert from "@mui/material/Alert";

const MyProjectsNew = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [successMessage, setSuccessMessage] = React.useState<any>(null);
    const [errorMessage, setErrorMessage] = React.useState<any>(null);

    useEffect(() => {
        dispatch(update("Yeni Proje"));
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorMessage(null);
        setSuccessMessage(null);

        const data = new FormData(event.currentTarget);
        const userStorageId = process.env.REACT_APP_STORAGE_NAME + '_user_id';
        let userId:any;
        if (localStorage.getItem(userStorageId)) {
            userId = helpers.decryptStorageData(userStorageId, "local");
        } else {
            userId = helpers.decryptStorageData(userStorageId);
        }

        axios.post('/projects', {
            user_id: userId.toString(),
            title: data.get('title'),
            description: data.get('description'),
            status: 0,
        }).then(() => {
            setSuccessMessage("Başarıyla kaydedildi.");
        }).catch(error => {
            setErrorMessage(error.response.status + ': ' + error.response.data.message);
        });

    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Link to="/my-projects" className="flex items-center w-20">
                <ArrowBackIosIcon fontSize="small" className="text-blue-500 cursor-pointer" />
                <span className="hover:text-blue-500 mt-0.5">Geri</span>
            </Link>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label={t("projectTitle")}
                    name="title"
                    autoComplete="title"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label={t("projectDescription")}
                    type="description"
                    id="description"
                    autoComplete="description"
                    multiline
                    rows={3}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {t("save")}
                </Button>
                {successMessage !== null ?
                    <Alert severity="success" sx={{width: '100%'}}>
                        {successMessage}
                    </Alert>
                    : null
                }
                {errorMessage !== null ?
                    <Alert severity="error" sx={{width: '100%'}}>
                        {errorMessage}
                    </Alert>
                    : null
                }
            </Box>
        </div>
    );
};

export default MyProjectsNew;
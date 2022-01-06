import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import {Link, useParams} from "react-router-dom";
import { update } from '../../features/title/title';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import axios from "axios";
import Alert from "@mui/material/Alert";

const MyProjectsEdit = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const { id } = useParams();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [status, setStatus] = React.useState(0);
    const [successMessage, setSuccessMessage] = React.useState<any>(null);
    const [errorMessage, setErrorMessage] = React.useState<any>(null);

    useEffect(() => {
        dispatch(update("Proje Güncelle"));

        axios.get('/projects/' + id).then(response => {
            setTitle(response.data.data.title);
            setDescription(response.data.data.description);
            setStatus(response.data.data.status);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorMessage(null);
        setSuccessMessage(null);

        const formData = new FormData(event.currentTarget);

        axios.patch('/projects/' + id, {
            title: formData.get('title'),
            description: formData.get('description'),
            status: status,
        }).then(() => {
            setSuccessMessage("Başarıyla kaydedildi.");
        }).catch(error => {
            setErrorMessage(error.response.status + ': ' + error.response.data.message);
        });

    };

    const handleTitleChange = (e:any) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e:any) => {
        setDescription(e.target.value);
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
                    value={title}
                    onChange={handleTitleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label={t("projectDescription")}
                    type="description"
                    id="description"
                    multiline
                    rows={3}
                    value={description}
                    onChange={handleDescriptionChange}
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

export default MyProjectsEdit;
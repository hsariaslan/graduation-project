import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {update} from '../features/title/title';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

const Projects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = React.useState<any>([]);
    const [id, setId] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);

    useEffect(() => {
        dispatch(update("Projeler"));
        axios.get('/projects').then(response => {
            setRows(response.data.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleConfirm = () => {
        setOpenDialog(false);
        return navigate('/cancel-select/' + id);
    };

    return (
        <div style={{height: 400, width: '100%'}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead className="bg-blue-500">
                        <TableRow>
                            <TableCell>
                                <span className="text-white">Proje Adı</span>
                            </TableCell>
                            <TableCell>
                                <span className="text-white">Öğretim Üyesi</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className="text-white">Tercih Edenlerin Sayısı</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className="text-white">Durumu</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className="text-white">Son Teslim Tarihi</span>
                            </TableCell>
                            <TableCell align="right">
                                <span className="text-white">İşlemler</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row:any) => (
                            <TableRow
                                key={row.title}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell>{row.user?.name + ' ' + row.user?.surname}</TableCell>
                                <TableCell align="center">{row.selection_count}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="center">{row.deadline}</TableCell>
                                <TableCell align="right">{row.actions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Tercihi iptal etmek istediğinize emin misiniz?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Hayır</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Evet
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Projects;
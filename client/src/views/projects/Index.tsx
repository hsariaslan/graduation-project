import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {useNavigate, Link} from "react-router-dom";
import {update} from '../../features/title/title';
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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import VisibilityIcon from '@mui/icons-material/Visibility';

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
        return navigate('/selections/' + id + '/delete');
    };

    const cancel = (id: number) => {
        setId(id);
        handleClickOpen();
    };

    return (
        <div style={{width: '100%'}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small">
                    <TableHead className="bg-blue-500">
                        <TableRow>
                            <TableCell>
                                <span className="text-white">No</span>
                            </TableCell>
                            <TableCell>
                                <span className="text-white">Proje Adı</span>
                            </TableCell>
                            <TableCell>
                                <span className="text-white">Öğretim Üyesi</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className="text-white">Tercih Edenler</span>
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
                        {rows.map((row: any) => (
                            <TableRow
                                key={row.title}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{rows.indexOf(row) + 1}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.user?.name + ' ' + row.user?.surname}</TableCell>
                                <TableCell align="center">{row.selection_count}</TableCell>
                                <TableCell align="center">
                                    {row.status !== 1 && row.status !== 4 && row.status !== 6 ?
                                        <div className="flex items-center gap-x-1">
                                            <AccessTimeIcon className="text-gray-500"/>
                                            <span className="text-gray-500 mt-1"><i>Bekliyor</i></span>
                                        </div>
                                        : <div className="flex items-center gap-x-1">
                                            <CheckCircleOutlineIcon className="text-blue-500"/>
                                            <span className="text-blue-500 mt-1"><i>Kabul Edildi</i></span>
                                        </div>
                                    }
                                </TableCell>
                                <TableCell align="center">{row.deadline}</TableCell>
                                <TableCell align="right">
                                    <div>
                                        <Link title="Detaylar" to={"/projects/" + row.id}>
                                            <VisibilityIcon
                                                className="text-blue-500 cursor-pointer hover:text-blue-800"/>
                                        </Link>
                                        {row.actions === 0 ?
                                            <Link title="Tercih Yap" to={"/selections/" + row.id}>
                                                <AddCircleIcon
                                                    className="text-green-500 cursor-pointer hover:text-green-800"/>
                                            </Link>
                                            : row.actions === 1 ?
                                                <a title="Tercihi İptal Et" href="javascript:void(0);">
                                                    <DoDisturbOnIcon onClick={() => cancel(row.id)}
                                                                     className="text-red-500 cursor-pointer hover:text-red-800"/>
                                                </a>
                                                : row.actions === 4 ?
                                                    <a title="Tercih iptal edilemez" href="javascript:void(0);">
                                                        <DoDisturbOnIcon className="text-gray-500 cursor-not-allowed"/>
                                                    </a>
                                                    : null
                                        }
                                    </div>
                                </TableCell>
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
import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {Link, useParams, useNavigate} from "react-router-dom";
import {update} from '../../features/title/title';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface Project {
    title: string;
    description: string;
    deadline: string;
    status: string;
    score: string;
    uploads: string;
    selection_count: string;
}

const MyProjectsShow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [data, setData] = React.useState<Project | any>({});
    const [rows, setRows] = React.useState<any>([]);
    const [selectionId, setselectionId] = React.useState(0);
    const [openRejectDialog, setOpenRejectDialog] = React.useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

    useEffect(() => {
        dispatch(update("Proje Detayı"));

        axios.get('/projects/' + id).then(response => {
            setData(response.data.data);
            setRows(response.data.data.students);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    // console.log(data);

    const handleClickOpen = (action: string) => {
        if (action === 'confirm') {
            setOpenConfirmDialog(true);
        } else if (action === 'reject') {
            setOpenRejectDialog(true);
        }
    };

    const handleClose = () => {
        setOpenConfirmDialog(false);
        setOpenRejectDialog(false);
    };

    const handleConfirm = () => {
        setOpenConfirmDialog(false);
        return navigate('/confirm-selection/' + selectionId);
    };

    const handleReject = () => {
        setOpenRejectDialog(false);
        return navigate('/reject-selection/' + selectionId);
    };

    const confirm = (id: number) => {
        setselectionId(id);
        handleClickOpen('confirm');
    };

    const reject = (id: number) => {
        setselectionId(id);
        handleClickOpen('reject');
    };

    let returnElement: any;

    switch (data.status) {
        case 0:
            returnElement = (<div className="flex items-center gap-x-1">
                <AccessTimeIcon className="text-gray-500"/>
                <span className="text-gray-500 mt-1"><i>Bekliyor</i></span>
            </div>);
            break;
        case 1:
            returnElement = (<div className="flex items-center gap-x-1">
                <DoneAllIcon className="text-green-500"/>
                <span className="text-green-500 mt-1"><i>Kabul Edildi</i></span>
            </div>);
            break;
        case 2:
            returnElement = (<div className="flex items-center gap-x-1">
                <DoneIcon className="text-cyan-500"/>
                <span className="text-cyan-500 mt-1"><i>Teslim Edildi</i></span>
            </div>);
            break;
        case 3:
            returnElement = (<div className="flex items-center gap-x-1">
                <DoneAllIcon className="text-blue-500"/>
                <span className="text-blue-500 mt-1"><i>Not Verildi</i></span>
            </div>);
            break;
    }

    return (
        <div style={{height: 400, width: '100%'}}>
            <Link to="/my-projects" className="flex items-center">
                <ArrowBackIosIcon fontSize="small" className="text-blue-500 cursor-pointer"/>
                <span className="hover:text-blue-500 mt-0.5">Geri</span>
            </Link>
            <div className="mt-4">
                <Paper className="p-3">
                    <Table sx={{minWidth: 650}} size="small">
                        <TableHead className="bg-blue-500">
                            <TableRow>
                                <TableCell>
                                    <span className="text-white">Proje Adı</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-white">Yayınlayan</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-white">Durumu</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-white">Kabul Edilen Öğrenci</span>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-white">Son Teslim Tarihi</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{data.title}</TableCell>
                                <TableCell>{data?.user?.name + ' ' + data?.user?.surname + ' (' + data?.user?.role + ')'}</TableCell>
                                <TableCell>{returnElement}</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell align="center">{data.deadline}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="mt-6 mb-1 text-sm text-gray-700">Proje Detayları</div>
                    <p>{data.description}</p>
                    <div className="mt-10 mb-1 text-sm text-gray-700">Projeyi Tercih Eden Öğrenciler</div>
                    <Table sx={{minWidth: 650}} size="small">
                        <TableHead className="bg-blue-500">
                            <TableRow>
                                <TableCell>
                                    <span className="text-white">#</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-white">selection_id</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-white">student_id</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-white">project_id</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-white">Öğrenci No</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-white">Ad Soyad</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-white">Email</span>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-white">Tercih Sırası</span>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-white">İşlemler</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow>
                                    <TableCell>{rows.indexOf(row) + 1}</TableCell>
                                    <TableCell>{row.selection_id}</TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{row.number}</TableCell>
                                    <TableCell>{row.name + ' ' + row.surname}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell align="center">{row.order}</TableCell>
                                    <TableCell align="center">
                                        {row.action === 0 ?
                                            <div>
                                                <a title="Onayla" href="javascript:void(0);">
                                                    <CheckCircleIcon
                                                        onClick={() => confirm(row.selection_id)}
                                                        className="text-green-500 cursor-pointer hover:text-green-800"/>
                                                </a>
                                                <a title="Reddet" href="javascript:void(0);">
                                                    <DoDisturbOnIcon
                                                        onClick={() => reject(row.selection_id)}
                                                        className="text-red-500 cursor-pointer hover:text-red-800"/>
                                                </a>
                                            </div>
                                            : row.action === 1 ?
                                                <div>
                                                    <DoneAllIcon fontSize="small" className="text-green-500"/>
                                                    <i className="text-green-500">Kabul edildi</i>
                                                </div>
                                                : row.action === 2 ?
                                                    <div>
                                                        <RemoveDoneIcon fontSize="small" className="text-red-500"/>
                                                        <i className="text-red-500">Reddedildi</i>
                                                    </div>
                                                    : row.action === 3 ?
                                                        <div>
                                                            <a title="İşlem yapılamaz."
                                                               href="javascript:void(0);">
                                                                <CheckCircleIcon className="text-gray-500 cursor-not-allowed"/>
                                                            </a>
                                                            <a title="İşlem yapılamaz."
                                                               href="javascript:void(0);">
                                                                <DoDisturbOnIcon className="text-gray-500 cursor-not-allowed"/>
                                                            </a>
                                                        </div>
                                                        : null
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>

            <Dialog
                open={openConfirmDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Öğrencinin tercihini onaylamak istedğinize emin misiniz?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Hayır</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Evet
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openRejectDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Öğrencinin tercihini reddetmek istedğinize emin misiniz?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Hayır</Button>
                    <Button onClick={handleReject} autoFocus>
                        Evet
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MyProjectsShow;
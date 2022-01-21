import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {update} from '../features/title/title';
import {DataGrid, GridApi, GridCellValue, GridColDef} from '@mui/x-data-grid';
import axios from "axios";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import helpers from "../helpers";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Projects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
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

    const userStorageId = process.env.REACT_APP_STORAGE_NAME + '_user_id';
    let userId: any;

    if (localStorage.getItem(userStorageId)) {
        userId = helpers.decryptStorageData(userStorageId, "local");
    } else {
        userId = helpers.decryptStorageData(userStorageId);
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'title', headerName: 'Proje Adı', width: 400},
        {
            field: 'status',
            headerName: 'Durumu',
            width: 200,
            renderCell: (params) => {
                const findValue = () => {
                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c: any) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c: any) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    return thisRow.status;
                }
                let returnElement: any;

                switch (findValue()) {
                    case 0:
                        returnElement = (<div className="flex items-center gap-x-1">
                            <AccessTimeIcon className="text-gray-500"/>
                            <span className="text-gray-500 mt-1"><i>Bekliyor</i></span>
                        </div>);
                        break;
                    case 1:
                        returnElement = (<div className="flex items-center gap-x-1">
                            <CheckCircleOutlineIcon className="text-blue-500"/>
                            <span className="text-blue-500 mt-1"><i>Kabul Edildi</i></span>
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
                            <DoneAllIcon className="text-green-500"/>
                            <span className="text-green-500 mt-1"><i>Not Verildi</i></span>
                        </div>);
                        break;
                }

                return (
                    <div>
                        {returnElement}
                    </div>
                );
            }
        },
        {field: 'deadline', headerName: 'Bitiş Tarihi', width: 200},
        {
            field: "actions",
            headerName: "İşlemler",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                const findRow = () => {
                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c: any) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c: any) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    return [thisRow.id as number, thisRow.actions as number];
                };
                const action = () => {
                    let foundAction: any = findRow();
                    return foundAction[1] as number;
                };
                const selection = (e: any) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let foundId: any = findRow();
                    return navigate('/select-project/' + foundId[0]);
                };
                const cancel = (e: any) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let foundId: any = findRow();
                    setId(foundId);
                    handleClickOpen();
                };

                return (
                    <List>
                        {action() === 1 ?
                            <ListItem title="Tercih Yap">
                                <AddCircleIcon onClick={selection}
                                               className="text-blue-500 cursor-pointer hover:text-blue-800"/>
                            </ListItem>
                            : action() === 0 ?
                                <ListItem title="Tercihi İptal Et">
                                    <DoDisturbOnIcon onClick={cancel}
                                                     className="text-red-500 cursor-pointer hover:text-red-800"/>
                                </ListItem>
                                :
                                <ListItem title="Daha fazla tercih yapılamaz">
                                    <AddCircleIcon onClick={cancel}
                                                     className="text-gray-500 cursor-not-allowed"/>
                                </ListItem>
                        }

                    </List>
                );
            }
        },
    ];

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[25]}
                disableSelectionOnClick
                disableColumnMenu
            />
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
};

export default Projects;
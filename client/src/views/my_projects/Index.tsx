import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {update} from '../../features/title/title';
import {DataGrid, GridApi, GridCellValue, GridColDef} from '@mui/x-data-grid';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const MyProjects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const [id, setId] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);

    useEffect(() => {
        dispatch(update("Projelerim"));
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
        return navigate('/my-projects/' + id + '/delete');
    };

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID',},
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
                let returnElement:any;

                switch (findValue()) {
                    case 0:
                        returnElement = (<div className="flex items-center gap-x-1">
                            <AccessTimeIcon className="text-gray-500" />
                            <span className="text-gray-500 mt-1"><i>Bekliyor</i></span>
                        </div>);
                        break;
                    case 1:
                        returnElement = (<div className="flex items-center gap-x-1">
                            <CheckCircleOutlineIcon className="text-blue-500" />
                            <span className="text-blue-500 mt-1"><i>Kabul Edildi</i></span>
                        </div>);
                        break;
                    case 2:
                        returnElement = (<div className="flex items-center gap-x-1">
                            <DoneIcon className="text-cyan-500" />
                            <span className="text-cyan-500 mt-1"><i>Teslim Edildi</i></span>
                        </div>);
                        break;
                    case 3:
                        returnElement = (<div className="flex items-center gap-x-1">
                            <DoneAllIcon className="text-green-500" />
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
                const findId = () => {
                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c: any) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c: any) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    return thisRow.id as number;
                }
                const show = (e: any) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let foundId = findId();
                    return navigate('/my-projects/' + foundId);
                };
                const edit = (e: any) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let foundId = findId();
                    return navigate('/my-projects/' + foundId + '/edit');
                };
                const deleteItem = (e: any) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let foundId:number = findId();
                    setId(foundId);
                    handleClickOpen();
                };

                return (
                    <div className="flex gap-x-2">
                        <VisibilityIcon onClick={show} className="text-gray-500 cursor-pointer hover:text-blue-500"/>
                        <EditIcon onClick={edit} className="text-gray-500 cursor-pointer hover:text-green-500"/>
                        <DeleteIcon onClick={deleteItem} className="text-gray-500 cursor-pointer hover:text-red-500"/>
                    </div>
                );
            }
        },
    ];

    return (
        <div style={{height: 400, width: '100%'}}>
            <Link to="/my-projects/new" className="flex items-center w-40">
                <AddIcon className="text-blue-500 cursor-pointer"/>
                <span className="hover:text-blue-500 mt-1">Yeni Proje Oluştur</span>
            </Link>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[25]}
                disableSelectionOnClick
                disableColumnMenu
                className="mt-4"
            />
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Silmek istediğinize emin misiniz?"}
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

export default MyProjects;
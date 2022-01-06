import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {update} from '../../features/title/title';
import {DataGrid, GridApi, GridCellValue, GridColDef} from '@mui/x-data-grid';
import axios from "axios";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Selections = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const [id, setId] = React.useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);

    useEffect(() => {
        dispatch(update("Tercihlerim"));
        axios.get('/selections').then(response => {
            console.log(response.data.data);
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

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID',},
        {field: 'project_name', headerName: 'Proje Adı', width: 330,},
        {field: 'order', headerName: 'Tercih Sırası', width: 130,},
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

                if (findValue() === 0 || findValue() === 3) {
                    returnElement = (<div className="flex items-center gap-x-1">
                        <AccessTimeIcon className="text-gray-500"/>
                        <span className="text-gray-500 mt-1"><i>Onay Bekliyor</i></span>
                    </div>);
                } else if (findValue() === 1 || findValue() === 4 || findValue() === 6) {
                    returnElement = (<div className="flex items-center gap-x-1">
                        <CheckCircleOutlineIcon className="text-blue-500"/>
                        <span className="text-blue-500 mt-1"><i>Onaylandı</i></span>
                    </div>);
                } else if (findValue() === 2 || findValue() === 5) {
                    returnElement = (<div className="flex items-center gap-x-1">
                        <DoDisturbOnIcon className="text-red-500"/>
                        <span className="text-red-500 mt-1"><i>Reddedildi</i></span>
                    </div>);
                }

                return (
                    <div>
                        {returnElement}
                    </div>
                );
            }
        },
        {field: 'project_deadline', headerName: 'Bitiş Tarihi', width: 200},
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
                const cancel = (e: any) => {
                    e.stopPropagation(); // don't select this row after clicking
                    let foundId: number = findId();
                    setId(foundId);
                    handleClickOpen();
                };

                return (
                    <div className="flex gap-x-2">
                        <DeleteIcon onClick={cancel} className="text-gray-500 cursor-pointer hover:text-red-500"/>
                    </div>
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
                className="mt-4"
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

export default Selections;
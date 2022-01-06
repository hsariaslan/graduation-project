import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { update } from '../features/title/title';
import {DataGrid, GridApi, GridCellValue, GridColDef} from '@mui/x-data-grid';
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Projects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        dispatch(update("Projeler"));
        axios.get('/projects').then(response => {
            setRows(response.data.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Proje Adı', width: 130 },
        { field: 'status', headerName: 'Durumu', width: 130 },
        { field: 'deadline', headerName: 'Bitiş Tarihi', width: 200 },
        {
            field: "actions",
            headerName: "İşlemler",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                const selection = (e:any) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c:any) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c:any) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );

                    return navigate("/selection/" + thisRow.id);
                };

                return (
                    <List>
                        <ListItem title="Tercih Yap">
                            <CheckCircleIcon onClick={selection} className="text-blue-500 cursor-pointer hover:text-blue-900" />
                        </ListItem>
                    </List>
                );
            }
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default Projects;
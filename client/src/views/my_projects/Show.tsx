import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import {Link, useParams} from "react-router-dom";
import { update } from '../../features/title/title';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";

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
    const { id } = useParams();
    const [data, setData] = React.useState<Project | any>({});

    useEffect(() => {
        dispatch(update("Proje Detayı"));

        axios.get('/projects/' + id).then(response => {
            setData(response.data.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);
    // console.log(data);

    let returnElement:any;

    switch (data.status) {
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
        <div style={{ height: 400, width: '100%' }}>
            <Link to="/my-projects" className="flex items-center">
                <ArrowBackIosIcon fontSize="small" className="text-blue-500 cursor-pointer" />
                <span className="hover:text-blue-500 mt-0.5">Geri</span>
            </Link>
            <div className="mt-4">
                <Paper className="p-3">
                    <p><b>Proje Adı:</b> {data.title}</p>
                    <p><b>Projeyi Yayınlayan:</b> {data?.user?.name + ' ' + data?.user?.surname + ' (' + data?.user?.role +')'}</p>
                    <p><b>Son Teslim Tarihi:</b> {data.deadline}</p>
                    <p className="flex items-center gap-x-1"><b>Proje Durumu:</b> <span>{returnElement}</span></p>
                    <p><b>Projeyi Tercih Eden Öğrencilerin Sayısı:</b> {data.selection_count}</p>
                    <p><b>Projeye Kabul Edilen Öğrenci:</b> {data.selection_count}</p>
                    <p><b>Öğrencinin Notu:</b> {data.score}</p>
                    <p><b>Yüklemeler:</b> {data.uploads}</p>
                    <p><b>Detaylar:</b> <br/> {data.description}</p>
                </Paper>
            </div>
        </div>
    );
};

export default MyProjectsShow;
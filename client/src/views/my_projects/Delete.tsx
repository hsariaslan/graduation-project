import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const MyProjectsDelete = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.delete('/projects/' + id).then(() => {
            navigate("/my-projects", { replace: true });
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            Deleting...
        </div>
    );
};

export default MyProjectsDelete;
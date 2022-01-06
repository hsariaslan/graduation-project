import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const SelectProject = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.post('/selections', {
            project_id: id
        }).then(() => {
            navigate("/selections", { replace: true });
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            Selecting...
        </div>
    );
};

export default SelectProject;
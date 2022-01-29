import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const SelectionsDelete = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.delete('/selections/' + id).then(() => {
            navigate("/selections", { replace: true });
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

export default SelectionsDelete;
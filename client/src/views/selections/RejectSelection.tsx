import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const ConfirmSelection = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.post('/reject-selection', {
            id: id
        }).then((response) => {
            navigate("/my-projects/" + response.data.project_id, { replace: true });
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            Rejecting...
        </div>
    );
};

export default ConfirmSelection;
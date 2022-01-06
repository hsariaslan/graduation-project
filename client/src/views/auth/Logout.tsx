import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../auth";

const Logout = () => {
    let navigate = useNavigate();
    let auth = useAuth();

    auth.logout(() => {
        navigate("/login", { replace: true });
    });

    return (
        <div>Logging out...</div>
    );
};

export default Logout;

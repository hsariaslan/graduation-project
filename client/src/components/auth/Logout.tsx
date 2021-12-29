import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../auth";

const Logout = () => {
    let navigate = useNavigate();
    let auth = useAuth();
    const userStorageName = process.env.REACT_APP_STORAGE_NAME + '_user_';

    sessionStorage.removeItem(userStorageName + 'email');
    sessionStorage.removeItem(userStorageName + 'name');
    sessionStorage.removeItem(userStorageName + 'surname');
    sessionStorage.removeItem(userStorageName + 'role');
    localStorage.removeItem(userStorageName + 'email');
    localStorage.removeItem(userStorageName + 'name');
    localStorage.removeItem(userStorageName + 'surname');
    localStorage.removeItem(userStorageName + 'role');

    auth.signout(() => {
        navigate("/login", { replace: true });
    });

    return (
        <div>Logging out...</div>
    );
};

export default Logout;

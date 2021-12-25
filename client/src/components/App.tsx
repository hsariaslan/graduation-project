import React from "react";
import { Link, useNavigate } from "react-router-dom";

const App = () => {
    let navigate = useNavigate();
    const userStorageName = process.env.REACT_APP_STORAGE_NAME + '_user_';

    if (!localStorage.getItem(userStorageName + 'email') && !sessionStorage.getItem(userStorageName + 'email')) {
        navigate('login');
    }

    return (
        <div>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default App;

import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import helpers from "./helpers";
import axios from "axios";

interface Credentials {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface AuthContextType {
    user: any;
    login: (user: Credentials, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const userStorageName = process.env.REACT_APP_STORAGE_NAME + '_user_';
let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({children}: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);

    let login = (credentials: Credentials, callback: VoidFunction) => {
        return authApiProvider.login(credentials, () => {
            setUser(credentials);
            callback();
        });
    };

    let logout = (callback: VoidFunction) => {
        return authApiProvider.logout(() => {
            setUser(null);
            callback();
        });
    };

    let value = {user, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return React.useContext(AuthContext);
}

function RequireAuth({children}: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user && (helpers.isNull(localStorage.getItem(userStorageName + 'email')) && helpers.isNull(sessionStorage.getItem(userStorageName + 'email')))) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

function WithoutAuth({children}: { children: JSX.Element }) {
    let location = useLocation();

    if (localStorage.getItem(userStorageName + 'email') || sessionStorage.getItem(userStorageName + 'email')) {
        return <Navigate to="/" state={{from: location}} replace/>;
    }

    return children;
}

const authApiProvider = {
    isAuthenticated: false,
    login(credentials: Credentials, callback: VoidFunction) {
        axios.get(process.env.REACT_APP_SERVER_URL + '/sanctum/csrf-cookie').then(() => {
            axios.post('/login', {
                email: credentials.email,
                password: credentials.password
            }).then((response) => {
                let user = response.data.data;
                const userStorageName = process.env.REACT_APP_STORAGE_NAME + '_user_';

                if (helpers.isNull(credentials.rememberMe)) {
                    sessionStorage.setItem(userStorageName + 'email', user.email);
                    sessionStorage.setItem(userStorageName + 'name', user.name);
                    sessionStorage.setItem(userStorageName + 'surname', user.surname);
                    sessionStorage.setItem(userStorageName + 'role', user.role);
                    localStorage.removeItem(userStorageName + 'email');
                    localStorage.removeItem(userStorageName + 'name');
                    localStorage.removeItem(userStorageName + 'surname');
                    localStorage.removeItem(userStorageName + 'role');
                } else {
                    localStorage.setItem(userStorageName + 'email', user.email);
                    localStorage.setItem(userStorageName + 'name', user.name);
                    localStorage.setItem(userStorageName + 'surname', user.surname);
                    localStorage.setItem(userStorageName + 'role', user.role);
                    sessionStorage.removeItem(userStorageName + 'email');
                    sessionStorage.removeItem(userStorageName + 'name');
                    sessionStorage.removeItem(userStorageName + 'surname');
                    sessionStorage.removeItem(userStorageName + 'role');
                }

                // user = helpers.getUserDataFromStorage();
                authApiProvider.isAuthenticated = true;
                callback();
            }).catch((error) => {
                console.log(error);
            });
        });
    },

    logout(callback: VoidFunction) {
        axios.post('/logout').then(() => {
            let userStorageName = process.env.REACT_APP_STORAGE_NAME + '_user_';

            sessionStorage.removeItem(userStorageName + 'email');
            sessionStorage.removeItem(userStorageName + 'name');
            sessionStorage.removeItem(userStorageName + 'surname');
            sessionStorage.removeItem(userStorageName + 'role');
            localStorage.removeItem(userStorageName + 'email');
            localStorage.removeItem(userStorageName + 'name');
            localStorage.removeItem(userStorageName + 'surname');
            localStorage.removeItem(userStorageName + 'role');

            authApiProvider.isAuthenticated = false;
            callback();
        }).catch((error) => {
            console.log(error);
        });
    }
};

export {AuthProvider, RequireAuth, WithoutAuth, useAuth};

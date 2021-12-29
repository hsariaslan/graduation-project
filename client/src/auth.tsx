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
    signin: (user: Credentials, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({children}: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);

    let signin = (credentials: Credentials, callback: VoidFunction) => {
        return fakeAuthProvider.signin(credentials, () => {
            setUser(credentials);
            callback();
        });
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    let value = {user, signin, signout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return React.useContext(AuthContext);
}

function RequireAuth({children}: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
    const userStorageName = process.env.REACT_APP_STORAGE_NAME + '_user_';

    if (!auth.user && (helpers.isNull(localStorage.getItem(userStorageName + 'email')) && helpers.isNull(sessionStorage.getItem(userStorageName + 'email')))) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

function WithoutAuth({children}: { children: JSX.Element }) {
    let location = useLocation();
    const userStorageName = process.env.REACT_APP_STORAGE_NAME + '_user_';

    if (localStorage.getItem(userStorageName + 'email') || sessionStorage.getItem(userStorageName + 'email')) {
        return <Navigate to="/" state={{from: location}} replace/>;
    }

    return children;
}

const fakeAuthProvider = {
    isAuthenticated: false,
    signin(credentials: Credentials, callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = true;
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(() => {
            axios.post('http://localhost:8000/api/v1/login', {
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
                callback();
            }).catch((error) => {
                // reject(error);
                console.log(error);
            });
        });
    },

    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};

export {AuthProvider, RequireAuth, WithoutAuth, useAuth};

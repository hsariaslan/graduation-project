import React from 'react';
import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider, RequireAuth, WithoutAuth} from "./auth";
import store from './app/store'
import {Provider} from 'react-redux'
import "./i18n";
import './index.css';
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Selections from "./components/Selections";
import Assignments from "./components/Assignments";
import Profile from "./components/Profile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";

render(
    <Provider store={store}>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <DashboardLayout/>
                            </RequireAuth>
                        }
                    >
                        <Route index element={<Home/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/selections" element={<Selections/>}/>
                        <Route path="/assignments" element={<Assignments/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                    </Route>
                    <Route
                        path="/login"
                        element={
                            <WithoutAuth>
                                <Login/>
                            </WithoutAuth>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <WithoutAuth>
                                <Register/>
                            </WithoutAuth>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

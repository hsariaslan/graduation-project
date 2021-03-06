import React from 'react';
import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider, RequireAuth, WithoutAuth} from "./auth";
import store from './app/store'
import {Provider} from 'react-redux'
import "./i18n";
import './index.css';
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./views/Home";

import MyProjects from "./views/my_projects/Index";
import MyProjectsNew from "./views/my_projects/New";
import MyProjectsShow from "./views/my_projects/Show";
import MyProjectsEdit from "./views/my_projects/Edit";
import MyProjectsDelete from "./views/my_projects/Delete";

import Projects from "./views/projects/Index";
import ProjectsShow from "./views/projects/Show";
import Selections from "./views/selections/Index";
import SelectionsDelete from "./views/selections/Delete";
import SelectProject from "./views/selections/SelectProject";
import ConfirmSelection from "./views/selections/ConfirmSelection";
import RejectSelection from "./views/selections/RejectSelection";

import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Logout from "./views/auth/Logout";

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

                        <Route path="/my-projects" element={<MyProjects/>}/>
                        <Route path="/my-projects/new" element={<MyProjectsNew/>}/>
                        <Route path="/my-projects/:id" element={<MyProjectsShow/>}/>
                        <Route path="/my-projects/:id/edit" element={<MyProjectsEdit/>}/>
                        <Route path="/my-projects/:id/delete" element={<MyProjectsDelete/>}/>

                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/projects/:id" element={<ProjectsShow/>}/>

                        <Route path="/selections" element={<Selections/>}/>
                        <Route path="/selections/:id" element={<SelectProject/>}/>
                        <Route path="/selections/:id/delete" element={<SelectionsDelete/>}/>
                        <Route path="/confirm-selection/:id" element={<ConfirmSelection/>}/>
                        <Route path="/reject-selection/:id" element={<RejectSelection/>}/>

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

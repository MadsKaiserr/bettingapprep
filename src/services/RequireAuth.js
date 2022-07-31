import { useLocation, Navigate, Outlet } from "react-router-dom";
import { resetUserSession } from "./authService.js"
import jwtDecode from "jwt-decode";
import * as React from 'react';
import Velkommen from '../components/velkommen/velkommen';

const RequireAuth = () => {
    const location = useLocation();
    if (localStorage.getItem("auth")) {
        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
    
        var decodedToken = jwtDecode(authToken);
        var todayTime = new Date().getTime();
        var todayMS = todayTime/1000;
        
        if (decodedToken.exp > todayMS) {
            if (localStorage.getItem("velkommen") === "now") {
                return [<Outlet />, <Velkommen />]
            } else {
                return <Outlet />
            }
        } else {
            resetUserSession();
            return (
                <Navigate to="/" state={{ from: location}} replace />
            );
        }
    } else {
        return (
            <Navigate to="/signup" state={{ from: "/"}} replace />
        );
    }
}

export default RequireAuth;
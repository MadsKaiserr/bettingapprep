import { useLocation, Navigate, Outlet } from "react-router-dom";
import { resetUserSession } from "./authService.js"
import jwtDecode from "jwt-decode";
import * as React from 'react';

import Stagefix from '../components/fix/stagefix';
import StageHeader from '../components/reusables/stageHeader';
import StageForside from '../routes/stage/forside/forside';
import StageTutorial from '../routes/stage/tutorial/tutorial';

const RequireAuth = () => {
    const location = useLocation();
    if (localStorage.getItem("auth")) {
        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
        const tut = JSON.parse(localStorage.getItem("auth")).tutorial;
    
        var decodedToken = jwtDecode(authToken);
        var todayTime = new Date().getTime();
        var todayMS = todayTime/1000;
        
        if (decodedToken.exp > todayMS) {
            if (tut === false) {
                return (
                    <>
                        <StageHeader />
                        <Stagefix />
                        <StageForside />
                        <StageTutorial />
                    </>
                );
            } else {
                return (
                    <Outlet />
                );
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
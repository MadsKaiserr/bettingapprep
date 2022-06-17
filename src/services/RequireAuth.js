import { useLocation, Navigate, Outlet } from "react-router-dom";
import { resetUserSession } from "../services/authService.ts"
import jwtDecode from "jwt-decode";

const RequireAuth = () => {
    const location = useLocation();
    if (localStorage.getItem("auth")) {
        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
    
        var decodedToken = jwtDecode(authToken);
        var todayTime = new Date().getTime();
        var todayMS = todayTime/1000;
        
        if (decodedToken.exp > todayMS) {
            return (
                <Outlet />
            );
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
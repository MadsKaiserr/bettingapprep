import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const RequireAuth = () => {
    const location = useLocation();

    if (localStorage.getItem("auth")) {

        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/verified";

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        const auth = JSON.parse(localStorage.getItem("auth"));

        const verifyBody = {
            user: {
                username: auth.username
            },
            token: auth.auth_token
        }

        const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
            
        var decodedToken = jwtDecode(authToken);
        var todayTime = new Date().getTime();
        var todayMS = todayTime/1000;

        axios.post(URL, verifyBody, requestConfig).then(response => {
            console.log(response);
            if (decodedToken.exp > todayMS && decodedToken.rolle === "administrator") {
                return (
                    <Outlet />
                );
            } else {
                return (
                    <Navigate to="/" state={{ from: location}} replace />
                );
            }
        }).catch(error => {
            console.log(error);
            return (
                <Navigate to="/" state={{ from: location}} replace />
            );
        })
    } else {
        return (
            <Navigate to="/signup" state={{ from: "/"}} replace />
        );
    }
}

export default RequireAuth;
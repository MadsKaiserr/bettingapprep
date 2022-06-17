import * as React from 'react';
import {useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
 
function AdminAuth () {

    const [outlet, setOutlet] = useState(<></>);
    const [dataLoad, setDataLoad] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("auth") && dataLoad === false) {
            const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/verified";
            const requestConfig = {
                headers: {
                    "x-api-key": process.env.REACT_APP_API_SECRET
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
                setDataLoad(true);
                console.log(response);
                if (decodedToken["exp"] > todayMS && decodedToken["rolle"] === "administrator") {
                    setOutlet(<Outlet />);
                } else {
                    window.open("/", "_self");
                }
            }).catch(error => {
                console.log(error);
                window.open("/", "_self");
            })
        }
    })

    return (
        <>
            {outlet}
        </>
    )
}
 
export default AdminAuth;
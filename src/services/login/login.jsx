import * as React from 'react';
import { useState } from 'react';
import { remLogin } from "../login.ts";
import { setUserSession } from "../authService.ts";
import axios from "axios";
 
function Login () {

    const [email, setEmail] = useState("");
    const [kodeord, setKodeord] = useState("");
    const [message, setMessage] = useState("");

    const loginURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/login";

    const loginHandler = (event) => {
        event.preventDefault();

        setMessage("");

        if(email.trim() === "" || kodeord.trim() === "") {
            setMessage("Udfyld alle felter");
            var loginBTN = document.getElementById("loginBTN");
                loginBTN.innerHTML = "Log ind";
        } else {
            const requestConfig = {
                headers: {
                    "x-api-key": process.env.REACT_APP_API_SECRET
                }
            }
    
            const requestBody = {
                email: email,
                password: kodeord
            }
    
            axios.post(loginURL, requestBody, requestConfig).then(response => {
                console.log(response.data.user);
                setUserSession(response.data.user, response.data.token);
                var loginBTN = document.getElementById("loginBTN");
                loginBTN.innerHTML = "Log ind";
                window.open("/stage", "_self");
            }).catch(error => {
                console.log(error);
                setMessage("Forkert email eller kodeord");
                var loginBTN = document.getElementById("loginBTN");
                loginBTN.innerHTML = "Log ind";
            })
        }
    }

    return (
        <>
            <div className="login-container" id="login-container">
                <form className="login-popup" onSubmit={loginHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => remLogin()} className="login-close" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
                    <div className="login-text">
                        <p className="login-text-h1">Log ind på din konto</p>
                    </div>
                    <p className="form-error">{message}</p>
                    <div className="login-form">
                        <p className="login-form-p">Email</p>
                        <input 
                        value={email} 
                        onChange={event => setEmail(event.target.value)} 
                        type="email" 
                        className="login-form-input" 
                        />
                        <p className="login-form-p">Kodeord</p>
                        <input 
                        value={kodeord} 
                        onChange={event => setKodeord(event.target.value)} 
                        type="password" 
                        className="login-form-input" 
                        />
                        <button value="Login" id="loginBTN" className="main-btn-login" style={{width: "100%"}} onClick={() => {
                            var loginBTN = document.getElementById("loginBTN");
                            loginBTN.innerHTML = "<div class='loader'></div>";
                        }} type="submit">Log ind</button>
                        <p className="login-form-label">Har du ikke en konto? <a href="/signup" className="login-link">Opret konto</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}
 
export default Login;
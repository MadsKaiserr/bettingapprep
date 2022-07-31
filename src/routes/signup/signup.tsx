import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { resetUserSession, setUserSession } from "../../services/authService";

import './signup.css';
 
function Signup () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const [message, setMessage] = useState("");

    const [fornavn, setFornavn] = useState("");
    const [efternavn, setEfternavn] = useState("");
    const [email, setEmail] = useState("");
    const [kodeord, setKodeord] = useState("");
    const [kodeordVali, setKodeordVali] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        setMessage("");
      }, [fornavn, efternavn, email, kodeord, username])

    useEffect(() => {
        if (kodeord.length >= 8) {
            document.getElementById("passTegn").className = "login-req-element-active";
        } else {
            document.getElementById("passTegn").className = "login-req-element";
        }

        var hasNumber = false;
        var hasUpper = false;
        var hasLower = false;
        for (var i = 0; i < kodeord.length; i++) {
            if (parseInt(kodeord[i]) === 0 || parseInt(kodeord[i]) === 1 || parseInt(kodeord[i]) === 2 || parseInt(kodeord[i]) === 3 || parseInt(kodeord[i]) === 4 || parseInt(kodeord[i]) === 5 || parseInt(kodeord[i]) === 6 || parseInt(kodeord[i]) === 7 || parseInt(kodeord[i]) === 8 || parseInt(kodeord[i]) === 9) {
                hasNumber = true;
            }
            if (kodeord[i] === kodeord[i].toUpperCase()) {
                hasUpper = true;
            }
            if (kodeord[i] === kodeord[i].toLowerCase()) {
                hasLower = true;
            }
        }

        if (hasUpper && hasLower) {
            document.getElementById("passBig").className = "login-req-element-active";
        } else {
            document.getElementById("passBig").className = "login-req-element";
        }

        if (hasNumber) {
            document.getElementById("passTal").className = "login-req-element-active";
        } else {
            document.getElementById("passTal").className = "login-req-element";
        }
        if (hasNumber && hasUpper && hasLower && kodeord.length >= 8) {
            setKodeordVali(true);
        } else {
            setKodeordVali(false);
        }
    }, [kodeord])

    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/signup";

    const signupHandler = (event) => {
        event.preventDefault();

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        const requestBody = {
            username: username,
            fornavn: fornavn,
            efternavn: efternavn,
            email: email,
            password: kodeord,
            rolle: "none"
        }

        if (fornavn !== "" && efternavn !== "" && username !== "" && email !== "") {
            console.log(kodeordVali);
            if (!kodeordVali) {
                setMessage("Dit kodeord skal matche kravene")
                document.getElementById("signupBTN").innerHTML = "Opret konto";
            } else {
                axios.post(signupURL, requestBody, requestConfig).then(response => {
                    console.log("API REQUEST");
                    resetUserSession();
                    document.getElementById("signupBTN").innerHTML = "Opret konto";
                    

                    const loginURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/login";
                    const loginConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }
            
                    const loginBody = {
                        email: email,
                        password: kodeord
                    }
            
                    axios.post(loginURL, loginBody, loginConfig).then(response => {
                        console.log(response.data.user);
                        setUserSession(response.data.user, response.data.token);
                        localStorage.setItem("velkommen", "now");
                        window.open("/stage", "_self");
                    }).catch(error => {
                        console.log(error);
                    })
                }).catch(error => {
                    if (error.response.status === 401 || error.response.status === 403) {
                        setMessage(error.response.data.message);
                        document.getElementById("signupBTN").innerHTML = "Opret konto";
                    } else {
                        setMessage("Backend server is down")
                        document.getElementById("signupBTN").innerHTML = "Opret konto";
                    }
                })
            }
        } else {
            setMessage("Udfyld venligst alle felter");
            document.getElementById("signupBTN").innerHTML = "Opret konto";
        }
    }

    return (
        <>
        <div className="signup-wave-top"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="signup-wave" viewBox="0 0 1440 320">
  <path d="M0,224L120,213.3C240,203,480,181,720,149.3C960,117,1200,75,1320,53.3L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
</svg>
            <div className="signup-container">
                <div className="signup-section">
                    <form className="signup-popup" onSubmit={signupHandler}>
                        <div className="login-text">
                            <p className="login-text-h1">Opret din konto</p>
                        </div>
                        <div className="login-form">
                            <p className="login-form-p">Fornavn<span className="signup-form-p red-color">*</span></p>
                            <input value={fornavn} onChange={event => setFornavn(event.target.value)} type="text" className="login-form-input" required/>
                            <p className="login-form-p">Efternavn<span className="signup-form-p red-color">*</span></p>
                            <input value={efternavn} onChange={event => setEfternavn(event.target.value)} type="text" className="login-form-input" required/>
                            <p className="login-form-p">Brugernavn<span className="signup-form-p red-color">*</span></p>
                            <input value={username} onChange={event => setUsername(event.target.value)} type="text" className="login-form-input" required/>
                            <p className="login-form-p">Email<span className="signup-form-p red-color">*</span></p>
                            <input value={email} onChange={event => setEmail(event.target.value)} type="text" className="login-form-input" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                            <p className="login-form-p">Kodeord<span className="signup-form-p red-color">*</span></p>
                            <input value={kodeord} style={{marginBottom: "15px"}} onChange={event => setKodeord(event.target.value)} type="password" className="login-form-input" required/>
                            <div className="login-req">
                                <div className="login-req-element" id="passTegn">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="login-req-check" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                    <p className="login-req-p">Mindst 8 tegn</p>
                                </div>
                                <div className="login-req-element" id="passTal">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="login-req-check" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                    <p className="login-req-p">Mindst 1 tal</p>
                                </div>
                                <div className="login-req-element" id="passBig">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="login-req-check" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                    <p className="login-req-p">Mindst 1 stort og småt bogstav</p>
                                </div>
                            </div>
                            <div className="form-btn">
                                <p className="form-error">{message}</p>
                                <button value="Login" id="signupBTN" className="main-btn-login" style={{width: "100%"}} onClick={() => {
                                var signupBTN = document.getElementById("signupBTN");
                                signupBTN.innerHTML = "<div class='loader'></div>";
                            }} type="submit">Opret konto</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
 
export default Signup;
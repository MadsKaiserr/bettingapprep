import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import "./indstillinger.css";
 
function StageIndstillinger () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const [dataLoad, setDataLoad] = useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const [urlPlace, seturlPlace] = useState("");

    const [user, setUser] = useState("");
    const [usernameField, setUsernameField] = useState("Indlæser...");
    const [emailField, setEmailField] = useState("Indlæser...");
    const [oprettelseText, setOprettelseText] = useState("Indlæser...");
    const [fornavn, setFornavn] = useState("Indlæser...")
    const [efternavn, setEfternavn] = useState("Indlæser...")

    useEffect(() => {
        seturlPlace(urlParams.get('show'));
    });

    function apiCall() {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/user?user="+ localStorage.getItem("email");

        const requestConfig = {
            headers: {
                "x-api-key": process.env.REACT_APP_API_SECRET
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log(response)
            setUser(JSON.stringify(response.data));
            setUsernameField(response.data["username"]);
            setEmailField(response.data["email"]);
            setFornavn(response.data["fornavn"]);
            setEfternavn(response.data["efternavn"]);

            const year = new Date(response.data["oprettelse"]).getFullYear();
            const month = new Date(response.data["oprettelse"]).getMonth();
            const day = new Date(response.data["oprettelse"]).getDate();
            setOprettelseText(day + "/" + month + "/" + year);
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    if (dataLoad === false) {
        setTimeout(function (){
            apiCall();
            console.log("API: Called");
        }, 500);
        setDataLoad(true);
    }

    setTimeout(function (){
        if (urlPlace) {
            if (urlPlace === "privatliv") {
                document.getElementById("privatliv").className = "indstillinger-element-active";
                document.getElementById("privatliv2").className = "indstillinger-p-active";
    
                document.getElementById("konto").className = "indstillinger-element";
                document.getElementById("sikkerhed").className = "indstillinger-element";
                document.getElementById("notifikationer").className = "indstillinger-element";
                document.getElementById("konto2").className = "indstillinger-p";
                document.getElementById("sikkerhed2").className = "indstillinger-p";
                document.getElementById("notifikationer2").className = "indstillinger-p";
            } else if (urlPlace === "sikkerhed") {
                document.getElementById("sikkerhed").className = "indstillinger-element-active";
                document.getElementById("sikkerhed2").className = "indstillinger-p-active";
    
                document.getElementById("konto").className = "indstillinger-element";
                document.getElementById("privatliv").className = "indstillinger-element";
                document.getElementById("notifikationer").className = "indstillinger-element";
                document.getElementById("konto2").className = "indstillinger-p";
                document.getElementById("privatliv2").className = "indstillinger-p";
                document.getElementById("notifikationer2").className = "indstillinger-p";
            } else if (urlPlace === "notifikationer") {
                document.getElementById("notifikationer").className = "indstillinger-element-active";
                document.getElementById("notifikationer2").className = "indstillinger-p-active";
    
                document.getElementById("konto").className = "indstillinger-element";
                document.getElementById("sikkerhed").className = "indstillinger-element";
                document.getElementById("privatliv").className = "indstillinger-element";
                document.getElementById("konto2").className = "indstillinger-p";
                document.getElementById("sikkerhed2").className = "indstillinger-p";
                document.getElementById("privatliv2").className = "indstillinger-p";
            }
        } else {
            document.getElementById("konto").className = "indstillinger-element-active";
            document.getElementById("konto2").className = "indstillinger-p-active";
    
            document.getElementById("privatliv").className = "indstillinger-element";
            document.getElementById("sikkerhed").className = "indstillinger-element";
            document.getElementById("notifikationer").className = "indstillinger-element";
            document.getElementById("notifikationer2").className = "indstillinger-p";
            document.getElementById("sikkerhed2").className = "indstillinger-p";
            document.getElementById("privatliv2").className = "indstillinger-p";
        }
    }, 100);

    function getIndhold() {
        if (urlPlace === "privatliv") {
            return (
                <div className="stage-indstillinger-main">
                    <p className="indstillinger-h1">Privatliv</p>
                    <div className="indstilling">
                    </div>
                </div>
            );
        } else if (urlPlace === "sikkerhed") {
            return (
                <div className="stage-indstillinger-main">
                    <p className="indstillinger-h1">Sikkerhed</p>
                    <div className="indstilling">
                    </div>
                </div>
            );
        } else if (urlPlace === "notifikationer") {
            return (
                <div className="stage-indstillinger-main">
                    <p className="indstillinger-h1">Notifikationer</p>
                    <div className="indstilling">
                    </div>
                </div>
            );
        } else {}
        return (
            <div className="stage-indstillinger-main">
                <p className="indstillinger-h1">Konto</p>
                <div className="indstilling">
                    <p className="indstillinger-h2">Fornavn</p>
                    <input value={fornavn} type="text" onChange={event => setFornavn(event.target.value)} className="login-form-input" style={{width: "350px", marginBottom: "20px"}} />
                    <p className="indstillinger-h2">Efternavn</p>
                    <input value={efternavn} type="text" onChange={event => setEfternavn(event.target.value)} className="login-form-input" style={{width: "350px", marginBottom: "20px"}} />
                    <p className="indstillinger-h2">Email</p>
                    <input value={emailField} type="text" onChange={event => setEmailField(event.target.value)} className="login-form-input" style={{width: "350px", marginBottom: "20px"}} />
                    <p className="indstillinger-h2">Brugernavn</p>
                    <input value={usernameField} type="text" onChange={event => setUsernameField(event.target.value)} className="login-form-input" style={{width: "350px", marginBottom: "20px"}} />
                    <p className="indstillinger-h2">Kodeord</p>
                    <input value="DitKodeord" disabled type="password" className="login-form-input" style={{width: "350px", marginBottom: "20px"}} />
                    <p className="indstillinger-h2">Oprettet: <span className="indstillinger-p">{oprettelseText}</span></p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="stage-main-container">
                <div className="stage-indstillinger-sidebar">
                    <div className="indstillinger-element" id="konto">
                        <Link to="/stage/indstillinger" onClick={() => {seturlPlace("konto")}}>
                            <p id="konto2" className="indstillinger-p">Konto indstillinger</p>
                        </Link>
                    </div>
                    <div className="indstillinger-element" id="privatliv">
                        <Link to="/stage/indstillinger?show=privatliv" onClick={() => {seturlPlace("privatliv")}}>
                            <p id="privatliv2" className="indstillinger-p">Privatliv</p>
                        </Link>
                    </div>
                    <div className="indstillinger-element" id="sikkerhed">
                        <Link to="/stage/indstillinger?show=sikkerhed" onClick={() => {seturlPlace("sikkerhed")}}>
                            <p id="sikkerhed2" className="indstillinger-p">Sikkerhed</p>
                        </Link>
                    </div>
                    <div className="indstillinger-element" id="notifikationer">
                        <Link to="/stage/indstillinger?show=notifikationer" onClick={() => {seturlPlace("notifikationer")}}>
                            <p id="notifikationer2" className="indstillinger-p">Notifikationer</p>
                        </Link>
                    </div>
                </div>
                {getIndhold()}
            </div>
        </>
    )
}
 
export default StageIndstillinger;
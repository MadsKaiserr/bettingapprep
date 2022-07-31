import * as React from 'react';
import './experience.css'
import { useState, useEffect } from 'react';
import axios from "axios";

import Banner from '../../assets/img/FB_Banner.png';
 
function Experience () {

    const [mangel, setMangel] = useState("");
    const [fejl, setFejl] = useState("");

    function click() {
        document.getElementById("wrapper").classList.toggle("display-not");
        document.getElementById("wrap").classList.toggle("display-not");
    }

    function minimize() {
        document.getElementById("wrapper").classList.toggle("display-not");
        document.getElementById("wrap").classList.toggle("display-not");
    }

    useEffect(() => {
        if (mangel !== "" || fejl !== "") {
            document.getElementById("submitExp").classList.remove("odd-off");
        }
    }), [mangel, fejl]

    function indsend() {
        const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/fejl";

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        const requestBody = {
            bruger: localStorage.getItem("email"),
            forbedring: mangel,
            fejl: fejl,
            iat: new Date().getTime()
        }

        if (mangel !== "" || fejl !== "") {
            axios.post(signupURL, requestBody, requestConfig).then(response => {
                console.log("Fejl meldt", response);
                document.getElementById("wrapper").classList.toggle("display-not");
                document.getElementById("wrap").classList.toggle("display-not");
                setMangel("");
                setFejl("");
                var placeBetBTN = document.getElementById("submitExp");
                placeBetBTN.innerHTML = "Indsend";
            }).catch(error => {
                console.log(error);
                var placeBetBTN = document.getElementById("submitExp");
                placeBetBTN.innerHTML = "Indsend";
            })
        }
    }

    return (
        <>
            <div className="exp-wrapper display-not" id="wrapper">
                <div className="exp-top">
                    <p className="exp-h1">Fortæl os om dit oplevelse</p>
                    <div className="exp-top-right">
                        <svg xmlns="http://www.w3.org/2000/svg" className="exp-icon" viewBox="0 0 16 16" onClick={() => minimize()}>
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="exp-icon" viewBox="0 0 16 16" onClick={() => minimize()}>
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
                <div className="exp-content">
                    <img src={Banner} alt="" className="exp-img" />
                    <div className="exp-form">
                        <p className="exp-h2">Eventuelle forbedringer?</p>
                        <textarea value={mangel} onChange={event => setMangel(event.target.value)} className="exp-input" required/>
                        <p className="exp-h2">Har du fundet fejl?</p>
                        <textarea value={fejl} onChange={event => setFejl(event.target.value)} className="exp-input" required/>
                        <button className="kupon-btn odd-off" id="submitExp" onClick={() => {indsend();
                            var placeBetBTN = document.getElementById("submitExp");
                            placeBetBTN.innerHTML = "<div class='loader'></div>";}}>Indsend</button>
                    </div>
                </div>
            </div>
            <div className="exp-container" id="wrap" onClick={() => click()}>
                <p className="exp-p">Fortæl os om dit oplevelse</p>
            </div>
        </>
    )
}
 
export default Experience;
import * as React from 'react';
import './name.css'
import { useState, useEffect } from 'react';
import axios from "axios";
 
function Name () {

    const [mangel, setMangel] = useState("");
    const [fejl, setFejl] = useState("");

    function click() {
        document.getElementById("wrapper1").classList.toggle("display-not");
        document.getElementById("wrap1").classList.toggle("display-not");
    }

    function minimize() {
        document.getElementById("wrapper1").classList.toggle("display-not");
        document.getElementById("wrap1").classList.toggle("display-not");
    }

    useEffect(() => {
        if (mangel !== "" || fejl !== "") {
            document.getElementById("submit1").classList.remove("odd-off");
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
            forbedring: "NAVN: " + mangel,
            fejl: "NAVN:" + fejl,
            iat: new Date().getTime()
        }

        if (mangel !== "" || fejl !== "") {
            axios.post(signupURL, requestBody, requestConfig).then(response => {
                console.log("Navn meldt", response);
                document.getElementById("wrapper1").classList.toggle("display-not");
                document.getElementById("wrap1").classList.toggle("display-not");
                setMangel("");
                setFejl("");
                var placeBetBTN = document.getElementById("submit1");
                placeBetBTN.innerHTML = "Indsend";
            }).catch(error => {
                console.log(error);
                var placeBetBTN = document.getElementById("submit1");
                placeBetBTN.innerHTML = "Indsend";
            })
        }
    }

    function choose(a) {
        if (a === "a1") {
            setMangel("TipsRunden");
            document.getElementById("a1").classList.add("navn-btn-active");
            document.getElementById("a2").classList.remove("navn-btn-active");
            document.getElementById("a3").classList.remove("navn-btn-active");
            document.getElementById("a4").classList.remove("navn-btn-active");
        } else if (a === "a2") {
            setMangel("TipsTuren");
            document.getElementById("a1").classList.remove("navn-btn-active");
            document.getElementById("a2").classList.add("navn-btn-active");
            document.getElementById("a3").classList.remove("navn-btn-active");
            document.getElementById("a4").classList.remove("navn-btn-active");
        } else if (a === "a3") {
            setMangel("Tips-Spillet");
            document.getElementById("a1").classList.remove("navn-btn-active");
            document.getElementById("a2").classList.remove("navn-btn-active");
            document.getElementById("a3").classList.add("navn-btn-active");
            document.getElementById("a4").classList.remove("navn-btn-active");
        } else if (a === "a4") {
            setMangel("TipsKlubben");
            document.getElementById("a1").classList.remove("navn-btn-active");
            document.getElementById("a2").classList.remove("navn-btn-active");
            document.getElementById("a3").classList.remove("navn-btn-active");
            document.getElementById("a4").classList.add("navn-btn-active");
        }
    }

    return (
        <>
            <div className="exp-wrapper display-not" id="wrapper1">
                <div className="exp-top">
                    <p className="exp-h1">Vær med til at vælge et navn</p>
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
                    <div className="exp-form">
                        <p className="exp-h2" style={{marginBottom: "10px"}}>Klik på dit fortrukne navn</p>
                        <button className="navn-btn" id="a1" onClick={() => {choose("a1")}}>TipsRunden</button>
                        <button className="navn-btn" id="a2" onClick={() => {choose("a2")}}>TipsTuren</button>
                        <button className="navn-btn" id="a3" onClick={() => {choose("a3")}}>Tips-Spillet</button>
                        <button className="navn-btn" id="a4" onClick={() => {choose("a4")}}>TipsKlubben</button>
                        <p className="exp-h2">Andet navn?</p>
                        <textarea value={fejl} onChange={event => setFejl(event.target.value)} className="exp-input"/>
                        <button className="kupon-btn odd-off" id="submit1" onClick={() => {indsend();
                            var placeBetBTN = document.getElementById("submit1");
                            placeBetBTN.innerHTML = "<div class='loader'></div>";}}>Indsend</button>
                    </div>
                </div>
            </div>
            <div className="name-container" id="wrap1" onClick={() => click()}>
                <p className="name-p">Hvad skal vi hedde?</p>
            </div>
        </>
    )
}
 
export default Name;
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import "./gameindstillinger.css";
 
function StageGameindstillinger () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const [spilNavn, setSpilNavn] = useState("Unknown");
    const [spilVarighed, setVarighed] = useState("Angiv varigheden");
    const [spilStart, setStart] = useState("Startbeløb");
    const [spilMin, setMin] = useState("Min-beløb pr. kupon");
    const [spilMax, setMax] = useState("Maks-beløb pr. kupon");
    const [spilAntal, setAntal] = useState("Beløb");
    const [spilBankerot, setBankerot] = useState("tilskuer");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const activeGame = urlParams.get("game");

    const [dataLoad, setDataLoad] = useState(false);

    const updateHandler = (event) => {
    }

    function getGame() {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/gruppesession?game=" + activeGame;

        const requestConfig = {
            headers: {
                "x-api-key": process.env.REACT_APP_API_SECRET
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log(response);
            setSpilNavn(response.data.name);
            setMax(response.data.max_amount);
            setMin(response.data.min_amount);
            setStart(response.data.start_amount);
            setVarighed(response.data.varighed);
            setBankerot(response.data.bankerot_tilstand);
            setAntal(response.data.bankerot_belob);
            bankerotHandler(response.data.bankerot_tilstand);
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    if (dataLoad === false) {
        setTimeout(function (){
            getGame();
            console.log("API: Called");
        }, 500);
        setDataLoad(true);
    }

    function bankerotHandler(button) {
        if (button === "tilskuer") {
            setBankerot("tilskuer");
            document.getElementById("belob").classList.remove("display");
            document.getElementById("tilskuer").classList.add("opret-element-btn-active");
            document.getElementById("tilskuer").classList.remove("opret-element-btn");
            document.getElementById("modtag").classList.remove("opret-element-btn-active");
            document.getElementById("runde").classList.remove("opret-element-btn-active");
            document.getElementById("runde").classList.add("opret-element-btn");
            document.getElementById("modtag").classList.add("opret-element-btn");
        } else if (button === "modtag") {
            setBankerot("modtag");
            document.getElementById("belob").classList.add("display");
            document.getElementById("modtag").classList.add("opret-element-btn-active");
            document.getElementById("modtag").classList.remove("opret-element-btn");
            document.getElementById("tilskuer").classList.remove("opret-element-btn-active");
            document.getElementById("runde").classList.remove("opret-element-btn-active");
            document.getElementById("runde").classList.add("opret-element-btn");
            document.getElementById("tilskuer").classList.add("opret-element-btn");
        } else if (button === "runde") {
            setBankerot("runde");
            document.getElementById("belob").classList.add("display");
            document.getElementById("runde").classList.add("opret-element-btn-active");
            document.getElementById("runde").classList.remove("opret-element-btn");
            document.getElementById("tilskuer").classList.remove("opret-element-btn-active");
            document.getElementById("modtag").classList.remove("opret-element-btn-active");
            document.getElementById("modtag").classList.add("opret-element-btn");
            document.getElementById("tilskuer").classList.add("opret-element-btn");
        }
    }

    function deleteGame() {
        
    }

    const [messageType, setMessageType] = useState("error-con-error");

    return (
        <>
            <div className="stageopret-container">
                <form className="opret-section" onSubmit={updateHandler}>
                    <h1 className="opret-h1">Rediger gruppespil</h1>
                    <div className="opret-element">
                        <div className="opret-element-top">
                            <p className="opret-element-h1">Spillets navn</p>
                            <p className="opret-element-h2">Spillets navn vil blive brugt til oversigter og invitationer</p>
                        </div>
                        <input type="text" onChange={event => setSpilNavn(event.target.value)} id="navninput" value={spilNavn} className="opret-element-input" placeholder="Indtast spillets navn"/>
                    </div>
                    <div className="opret-element">
                        <div className="opret-element-top">
                            <p className="opret-element-h1">Varighed</p>
                            <p className="opret-element-h2">Angiv spillets varighed</p>
                        </div>
                        <div className="opret-element-input-container" onClick={() => {document.getElementById("varighedDropdown").classList.toggle("display")}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 16 16">
                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            <div className="opret-element-input-trans">
                                <p className="opret-element-input-p">{spilVarighed}</p>
                                <div className="opret-element-dropdown" id="varighedDropdown">
                                    <div className="opret-drop-element" onClick={() => {setVarighed("7 dage");}}>
                                        <p className="opret-drop-element-p">7 dage</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setVarighed("30 dage");}}>
                                        <p className="opret-drop-element-p">30 dage</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setVarighed("6 måneder");}}>
                                        <p className="opret-drop-element-p">6 måneder</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setVarighed("1 år");}}>
                                        <p className="opret-drop-element-p">1 år</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setVarighed("1 sæson");}}>
                                        <p className="opret-drop-element-p">1 sæson</p>
                                    </div>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="opret-element">
                        <div className="opret-element-top">
                            <p className="opret-element-h1">Økonomi</p>
                            <p className="opret-element-h2">Udfyld indstillinger for økonomien i dit spil</p>
                        </div>
                        <div className="opret-element-input-container" onClick={() => {document.getElementById("startDropdown").classList.toggle("display")}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 16 16">
                                <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-.39 9H1.39l-.25 1h13.72l-.25-1z"/>
                            </svg>
                            <div className="opret-element-input-trans">
                                <p className="opret-element-input-p">{spilStart}</p>
                                <div className="opret-element-dropdown" id="startDropdown">
                                    <div className="opret-drop-element" onClick={() => {setStart("Startbeløb: 100 kr.");}}>
                                        <p className="opret-drop-element-p">100,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setStart("Startbeløb: 500 kr.");}}>
                                        <p className="opret-drop-element-p">500,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setStart("Startbeløb: 1000 kr.");}}>
                                        <p className="opret-drop-element-p">1.000,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setStart("Startbeløb: 5000 kr.");}}>
                                        <p className="opret-drop-element-p">5.000,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setStart("Startbeløb: 10000 kr.");}}>
                                        <p className="opret-drop-element-p">10.000,-</p>
                                    </div>
                                    <div className="opret-drop-element-other">
                                        <p className="opret-drop-element-p-other">Andet</p>
                                        <input type="number" min="0" max="100000" className="opret-drop-element-input" placeholder="Beløb" />
                                    </div>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                        <div className="opret-element-input-container" onClick={() => {document.getElementById("minDropdown").classList.toggle("display")}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon deg90" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM14.346 8.5 8 1.731 1.654 8.5H4.5a1 1 0 0 1 1 1v1h5v-1a1 1 0 0 1 1-1h2.846zm-9.846 5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1zm6 0h-5v1h5v-1z"/>
                            </svg>
                            <div className="opret-element-input-trans">
                                <p className="opret-element-input-p">{spilMin}</p>
                                <div className="opret-element-dropdown" id="minDropdown">
                                    <div className="opret-drop-element" onClick={() => {setMin("Min-beløb: 10 kr.");}}>
                                        <p className="opret-drop-element-p">10,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMin("Min-beløb: 50 kr.");}}>
                                        <p className="opret-drop-element-p">50,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMin("Min-beløb: 100 kr.");}}>
                                        <p className="opret-drop-element-p">100,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMin("Min-beløb: 200 kr.");}}>
                                        <p className="opret-drop-element-p">200,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMin("Min-beløb: 500 kr.");}}>
                                        <p className="opret-drop-element-p">500,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMin("Min-beløb: Ingen grænse");}}>
                                        <p className="opret-drop-element-p">Ingen grænse</p>
                                    </div>
                                    <div className="opret-drop-element-other">
                                        <p className="opret-drop-element-p-other">Andet</p>
                                        <input type="number" min="0" max="5000" className="opret-drop-element-input" placeholder="Beløb" />
                                    </div>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                        <div className="opret-element-input-container" onClick={() => {document.getElementById("maxDropdown").classList.toggle("display")}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM14.346 8.5 8 1.731 1.654 8.5H4.5a1 1 0 0 1 1 1v1h5v-1a1 1 0 0 1 1-1h2.846zm-9.846 5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1zm6 0h-5v1h5v-1z"/>
                            </svg>
                            <div className="opret-element-input-trans">
                                <p className="opret-element-input-p">{spilMax}</p>
                                <div className="opret-element-dropdown" id="maxDropdown">
                                    <div className="opret-drop-element" onClick={() => {setMax("Maks-beløb: 100 kr.");}}>
                                        <p className="opret-drop-element-p">100,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMax("Maks-beløb: 200 kr.");}}>
                                        <p className="opret-drop-element-p">200,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMax("Maks-beløb: 500 kr.");}}>
                                        <p className="opret-drop-element-p">500,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMax("Maks-beløb: 1000 kr.");}}>
                                        <p className="opret-drop-element-p">1.000,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMax("Maks-beløb: 2500 kr.");}}>
                                        <p className="opret-drop-element-p">2.500,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setMax("Maks-beløb: Ingen grænse");}}>
                                        <p className="opret-drop-element-p">Ingen grænse</p>
                                    </div>
                                    <div className="opret-drop-element-other">
                                        <p className="opret-drop-element-p-other">Andet</p>
                                        <input type="number" min="0" max="100000" className="opret-drop-element-input" placeholder="Beløb" />
                                    </div>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="opret-element">
                        <div className="opret-element-top">
                            <p className="opret-element-h1">Bankerot</p>
                            <p className="opret-element-h2">Angiv hvad det skal ske, hvis en spiller mister alle sine penge</p>
                        </div>
                        <button type="button" className="opret-element-btn-active" id="tilskuer" onClick={() => {bankerotHandler("tilskuer")}}>Tilskuertilstand</button>
                        <button type="button" className="opret-element-btn" id="modtag" onClick={() => {bankerotHandler("modtag")}}>Modtag x kr.</button>
                        <button type="button" className="opret-element-btn" id="runde" onClick={() => {bankerotHandler("runde")}}>Alle modtager x kr. pr. runde</button>
                    </div>
                    <div className="opret-element" id="belob">
                        <div className="opret-element-top">
                            <p className="opret-element-h2">Angiv beløbet for variablen ovenfor</p>
                        </div>
                        <div className="opret-element-input-container" onClick={() => {document.getElementById("spillerDropdown").classList.toggle("display")}}>
                            <div className="opret-element-input-trans" style={{paddingLeft: "15px"}}>
                                <p className="opret-element-input-p">{spilAntal}</p>
                                <div className="opret-element-dropdown" id="spillerDropdown">
                                    <div className="opret-drop-element" onClick={() => {setAntal("Beløb: 10 kr.");}}>
                                        <p className="opret-drop-element-p">10,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setAntal("Beløb: 100 kr.");}}>
                                        <p className="opret-drop-element-p">100,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setAntal("Beløb: 250 kr.");}}>
                                        <p className="opret-drop-element-p">250,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setAntal("Beløb: 500 kr.");}}>
                                        <p className="opret-drop-element-p">500,-</p>
                                    </div>
                                    <div className="opret-drop-element" onClick={() => {setAntal("Beløb: 1000 kr.");}}>
                                        <p className="opret-drop-element-p">1000,-</p>
                                    </div>
                                    <div className="opret-drop-element-other">
                                        <p className="opret-drop-element-p-other">Andet</p>
                                        <input type="number" min="0" max="20" className="opret-drop-element-input" placeholder="Antal" />
                                    </div>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </div><br />
                    <button type="submit" className="main-btn-default">Rediger gruppespil</button>
                    <button type="button" className="main-btn-warning" onClick={() => deleteGame()}>Slet gruppespil</button><br /><br /><br />
                    <div className={messageType} id="errorCon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                </div>
                </form>
            </div>
        </>
    );
}
 
export default StageGameindstillinger;
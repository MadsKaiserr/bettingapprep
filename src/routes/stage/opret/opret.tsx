import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

import "./opret.css";
 
function StageOpret () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const [messageType, setMessageType] = useState("error-con-error");

    function setNotiMessage(type, heading, message) {
        if (type === "error") {
            setMessageType("error-con-error");
            document.getElementById("errorIcon").classList.add("display");
            document.getElementById("errorCon").classList.add("display");
            document.getElementById("errorConH").innerHTML = heading;
            document.getElementById("errorConP").innerHTML = message;
        } else if (type === "success") {
            document.getElementById("errorIcon").classList.remove("display");
            setMessageType("error-con-success");
            document.getElementById("errorCon").classList.add("display");
            document.getElementById("errorConH").innerHTML = heading;
            document.getElementById("errorConP").innerHTML = message;
        } else if (type === "remove") {
            document.getElementById("errorCon").classList.remove("display");
            document.getElementById("errorConH").innerHTML = heading;
            document.getElementById("errorConP").innerHTML = message;
        }
    }

    const [spilNavn, setSpilNavn] = useState("");
    const [spilVarighed, setVarighed] = useState("");
    const [spilStart, setStart] = useState("Startbeløb");
    const [spilMin, setMin] = useState("Min-beløb pr. kupon");
    const [spilMax, setMax] = useState("Maks-beløb pr. kupon");
    const [spilSynlighed, setSynlighed] = useState("offentlig");

    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/gruppesession";
    const user_email = localStorage.getItem("email");

    function opretHandler() {
        setNotiMessage("remove", "", "");
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/playergruppespil?player=" + user_email;

        const requestConfig = {
            headers: {
                "x-api-key": process.env.REACT_APP_API_SECRET
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log(response)
                var gCount = 0;
                for (var y in response.data.allGruppespil) {
                    var varighedDate = new Date(response.data.allGruppespil[y].varighed).getTime();
                    var nowDate = new Date().getTime();
                    if (nowDate < varighedDate) {
                        gCount = gCount + 1;
                    }
                }
                console.log(gCount);
                if (gCount >= 4) {
                    setNotiMessage("error", "For mange spil", "Du har allerede 5 aktive spil, og du kan derfor ikke oprette flere.");
                } else {
                    if (spilMax !== "Maks-beløb pr. kupon" && spilMin !== "Min-beløb pr. kupon" && spilNavn !== "" && spilVarighed !== "" && spilStart !== "Startbeløb") {
                        const gruppespilConfig = {
                            headers: {
                                "x-api-key": process.env.REACT_APP_API_SECRET
                            }
                        }
                
                        var auth = JSON.parse(localStorage.getItem("auth"));
                        var medlemsskab = auth.rolle;
                
                        const gruppespilBody = {
                            name: spilNavn,
                            varighed: spilVarighed,
                            start_amount: (spilStart.substring(12)).slice(0, -4),
                            min_amount: spilMin.substring(12),
                            max_amount: spilMax.substring(13),
                            bankerot_tilstand: "tilskuer",
                            bankerot_belob: "0",
                            admin: user_email,
                            synlighed: spilSynlighed,
                            players: [{player: user_email, info: {money: parseInt((spilStart.substring(12)).slice(0, -4)), notifikationer: [], medlemsskab: medlemsskab}, odds: []}]
                        }
                        console.log(gruppespilBody);
                
                        axios.post(signupURL, gruppespilBody, gruppespilConfig).then(result => {
                            console.log("API REQUEST");
                            window.open("/stage/aktive-spil", "_self");
                        }).catch(error => {
                            console.log(error);
                        })
                    } else {
                        if (spilMax === "Maks-beløb pr. kupon") {
                            setNotiMessage("error", "Manglende oplysning", "Du mangler at vælge maks-beløbet pr. kupon");
                        } else if (spilMin === "Min-beløb pr. kupon") {
                            setNotiMessage("error", "Manglende oplysning", "Du mangler at vælge min-beløbet pr. kupon");
                        } else if (spilNavn === "") {
                            setNotiMessage("error", "Manglende oplysning", "Du mangler at afgive spillets navn");
                        } else if (spilVarighed === "") {
                            setNotiMessage("error", "Manglende oplysning", "Du mangler at afgive spillets slutdato");
                        } else if (spilStart === "Startbeløb") {
                            setNotiMessage("error", "Manglende oplysning", "Du mangler at afgive spillets startbeløb");
                        }
                    }
                }
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    function getSection(type) {
        if (type === "basic") {
            document.getElementById("basic").classList.add("display");
            document.getElementById("synlighed").classList.remove("display");
            document.getElementById("eco").classList.remove("display");
        } else if (type === "synlighed") {
            document.getElementById("basic").classList.remove("display");
            document.getElementById("eco").classList.remove("display");
            document.getElementById("synlighed").classList.add("display");
        } else if (type === "eco") {
            document.getElementById("basic").classList.remove("display");
            document.getElementById("eco").classList.add("display");
            document.getElementById("synlighed").classList.remove("display");
        }
    }

    function removeDrop(type) {
        if (type === "start") {
            document.getElementById("startDropdown").classList.remove("display");
            document.getElementById("maksDropdown").classList.add("display");
        } else if (type === "maks") {
            document.getElementById("minDropdown").classList.add("display");
            document.getElementById("maksDropdown").classList.remove("display");
        } else if (type === "min") {
            document.getElementById("minDropdown").classList.remove("display");
        }
    }

    function openDropdown(type) {
        if (type === "start") {
            document.getElementById("startDropdown").classList.toggle("display");
        } else if (type === "maks") {
            document.getElementById("maksDropdown").classList.toggle("display");
        } else if (type === "min") {
            document.getElementById("minDropdown").classList.toggle("display");
        }
    }

    return (
        <>
            <div className="stageopret-container">
                <div className={messageType} id="errorCon">
                <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div className="error-text">
                    <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                    <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                </div>
            </div>
                <div className="opret-section display" id="basic">
                    <h1 className="opret-title">Angiv gruppespillets navn og slutdato</h1>
                    <div className="opret-form">
                        <input className="opret-input" type="text" placeholder='Angiv spillets navn' value={spilNavn} onChange={event => setSpilNavn(event.target.value)}></input>
                        <div className="opret-button">
                            <input className="opret-overlay" type="date" value={spilVarighed} placeholder="Vælg venligst en slutdato" onChange={event => setVarighed(event.target.value)}></input>
                            <div className="opret-button-main">
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon' viewBox="0 0 16 16">
                                    <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className='opret-right' viewBox="0 0 16 16" onMouseLeave={() => {document.getElementById("datoTool").classList.remove("display")}} onMouseOver={() => {document.getElementById("datoTool").classList.add("display")}}>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </svg>
                            <div className="opret-tool" id="datoTool">
                                Vælg den dato dit gruppespil skal slutte. Efter datoen vil dit gruppespil stadig være synligt i 30 dage, men ikke brugbart eller åben for tilmelding.
                            </div>
                        </div>
                        <div className="opret-nav">
                            <div className="opret-next" onClick={() => getSection("synlighed")}>
                                <p className="opret-p2">Næste</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon-small-next' viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opret-section" id="synlighed">
                    <h1 className="opret-title">Angiv gruppespillets synlighed</h1>
                    <div className="opret-form">
                        <div className="opret-button" onClick={() => {setSynlighed("offentlig"); getSection("eco");}}>
                            <div className="opret-button-main">
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon' viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg>
                                <p className="opret-p">Offentlig</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className='opret-right' viewBox="0 0 16 16" onMouseLeave={() => {document.getElementById("offentligTool").classList.remove("display")}} onMouseOver={() => {document.getElementById("offentligTool").classList.add("display")}}>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </svg>
                            <div className="opret-tool" id="offentligTool">
                                Dit gruppespil vil være offentligt for alle kan tilmelde sig. Tilmelding sker over "Gruppespil" siden.
                            </div>
                        </div>
                        <div className="opret-button" onClick={() => {setSynlighed("privat"); getSection("eco");}}>
                            <div className="opret-button-main">
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon' viewBox="0 0 16 16">
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                </svg>
                                <p className="opret-p">Privat</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className='opret-right' viewBox="0 0 16 16" onMouseLeave={() => {document.getElementById("privatTool").classList.remove("display")}} onMouseOver={() => {document.getElementById("privatTool").classList.add("display")}}>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </svg>
                            <div className="opret-tool" id="privatTool">
                                Dit gruppespil vil være privat, og folk kan derfor kun tilmelde sig med specielt link, som kan tilgås via dit aktive gruppespil.
                            </div>
                        </div>
                        <div className="opret-nav">
                            <div className="opret-back" onClick={() => getSection("basic")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon-small' viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                                </svg>
                                <p className="opret-p2">Forrige</p>
                            </div>
                            <div className="opret-next" onClick={() => getSection("eco")}>
                                <p className="opret-p2">Næste</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon-small-next' viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opret-section" id="eco">
                    <h1 className="opret-title">Angiv gruppespillets økonomi</h1>
                    <div className="opret-form">
                        <div className="opret-button-drop">
                            <div className="button-element" onClick={() => openDropdown("start")}>
                                <div className="opret-button-main">
                                    <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon' viewBox="0 0 16 16">
                                        <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z"/>
                                    </svg>
                                    <p className="opret-p">{spilStart}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-right' viewBox="0 0 16 16" onMouseLeave={() => {document.getElementById("startTool").classList.remove("display")}} onMouseOver={() => {document.getElementById("startTool").classList.add("display")}}>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                </svg>
                                <div className="opret-tool" id="startTool">
                                Angiv hvor mange penge en spiller skal starte med i dit gruppespil ved tilmelding.
                            </div>
                            </div>
                            <div className="button-dropdown display" id="startDropdown">
                                <div className="button-dropdown-element" onClick={() => {setStart("Startbeløb: 100 kr."); removeDrop("start")}}>
                                    <p className="button-dropdown-p">100,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setStart("Startbeløb: 500 kr."); removeDrop("start")}}>
                                    <p className="button-dropdown-p">500,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setStart("Startbeløb: 1000 kr."); removeDrop("start")}}>
                                    <p className="button-dropdown-p">1000,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setStart("Startbeløb: 2000 kr."); removeDrop("start")}}>
                                    <p className="button-dropdown-p">2000,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setStart("Startbeløb: 5000 kr."); removeDrop("start")}}>
                                    <p className="button-dropdown-p">5000,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setStart("Startbeløb: 10000 kr."); removeDrop("start")}}>
                                    <p className="button-dropdown-p">10.000,-</p>
                                </div>
                            </div>
                        </div>
                        <div className="opret-button-drop">
                            <div className="button-element" onClick={() => openDropdown("maks")}>
                                <div className="opret-button-main">
                                    <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon' viewBox="0 0 16 16">
                                        <path d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1z"/>
                                    </svg>
                                    <p className="opret-p">{spilMax}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-right' viewBox="0 0 16 16" onMouseLeave={() => {document.getElementById("maksTool").classList.remove("display")}} onMouseOver={() => {document.getElementById("maksTool").classList.add("display")}}>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                </svg>
                                <div className="opret-tool" id="maksTool">
                                Angiv højeste beløb en spiller kan placere på ét væddemål.
                            </div>
                            </div>
                            <div className="button-dropdown" id="maksDropdown">
                                <div className="button-dropdown-element" onClick={() => {setMax("Maks. beløb: 100 kr."); removeDrop("maks")}}>
                                    <p className="button-dropdown-p">100,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMax("Maks. beløb: 250 kr."); removeDrop("maks")}}>
                                    <p className="button-dropdown-p">250,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMax("Maks. beløb: 500 kr."); removeDrop("maks")}}>
                                    <p className="button-dropdown-p">500,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMax("Maks. beløb: 1000 kr."); removeDrop("maks")}}>
                                    <p className="button-dropdown-p">1000,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMax("Maks. beløb: 2500 kr."); removeDrop("maks")}}>
                                    <p className="button-dropdown-p">2500,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMax("Maks. beløb: 5000 kr."); removeDrop("maks")}}>
                                    <p className="button-dropdown-p">5000,-</p>
                                </div>
                            </div>
                        </div>
                        <div className="opret-button-drop">
                            <div className="button-element" onClick={() => openDropdown("min")}>
                                <div className="opret-button-main">
                                    <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon-90' viewBox="0 0 16 16">
                                        <path d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1z"/>
                                    </svg>
                                    <p className="opret-p">{spilMin}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-right' viewBox="0 0 16 16" onMouseLeave={() => {document.getElementById("minTool").classList.remove("display")}} onMouseOver={() => {document.getElementById("minTool").classList.add("display")}}>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                </svg>
                                <div className="opret-tool" id="minTool">
                                Angiv mindste mængde en spiller skal lægge på sit væddemål.
                            </div>
                            </div>
                            <div className="button-dropdown" id="minDropdown">
                                <div className="button-dropdown-element" onClick={() => {setMin("Min. beløb: 50 kr."); removeDrop("min")}}>
                                    <p className="button-dropdown-p">50,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMin("Min. beløb: 150 kr."); removeDrop("min")}}>
                                    <p className="button-dropdown-p">150,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMin("Min. beløb: 300 kr."); removeDrop("min")}}>
                                    <p className="button-dropdown-p">300,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMin("Min. beløb: 500 kr."); removeDrop("min")}}>
                                    <p className="button-dropdown-p">500,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMin("Min. beløb: 1000 kr."); removeDrop("min")}}>
                                    <p className="button-dropdown-p">1000,-</p>
                                </div>
                                <div className="button-dropdown-element" onClick={() => {setMin("Min. beløb: 2000 kr."); removeDrop("min")}}>
                                    <p className="button-dropdown-p">2000,-</p>
                                </div>
                            </div>
                        </div>
                        <button className="square-btn-default" style={{marginTop: "20px"}} onClick={() => opretHandler()}>Opret gruppespil</button>
                        <div className="opret-nav">
                            <div className="opret-back" onClick={() => getSection("synlighed")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='opret-icon-small' viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                                </svg>
                                <p className="opret-p2">Forrige</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default StageOpret;
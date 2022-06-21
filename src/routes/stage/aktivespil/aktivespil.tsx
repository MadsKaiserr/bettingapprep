import * as React from 'react';
import { useState, useEffect } from 'react';
import { getUser } from "../../../services/authService";
import axios from "axios";
import { Link } from 'react-router-dom';

import "./aktivespil.css";
import { DocumentGrid } from 'docx';
 
function StageAktiveSpil () {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [dataLoad, setDataLoad] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState("Indlæser...")

    const user = getUser();
    const fornavn = user !== 'undefined' && user ? user.username : '';

    const [nav, setNav] = useState("alle");

    function setActiveGame(id, index, name) {
        localStorage.setItem("activeGame", id);
        localStorage.setItem("playerIndex", index);
        window.open("/stage/", "_self");
    }

    function getGroups() {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppespil";

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log(response)
            setItems(response.data.allGruppespil);
            if (response.data.allGruppespil.length === 0) {
                setCheckEmpty(1)
            }
            setLoading("");
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }
    if (dataLoad === false) {
        setTimeout(function (){
            getGroups();
            console.log("API: Called");
        }, 500);
        setDataLoad(true);
    }

    const [modalh1, setModalH1] = useState("Benyt adgangsbillet");
    const [modalh2, setModalH2] = useState("Det ser ud til, at du ikke har noget abonnement til at oprette gruppespil. Vil du gøre brug af en af dine adgangsbilletter istedet?");

    function showModal() {
        setModalH1("Benyt adgangsbillet");
        setModalH2("Det ser ud til, at du ikke har noget abonnement til at oprette gruppespil. Vil du gøre brug af en af dine adgangsbilletter istedet?");
        document.getElementById("main-modal").classList.add("display-flex");
    }

    function opretSpilHandler() {
        if (JSON.parse(localStorage.getItem("auth")).rolle === "premium" || JSON.parse(localStorage.getItem("auth")).rolle === "administrator") {
            window.open("/stage/opret-spil", "_self");
        } else {
            showModal();
        }
    }

    const [checkEmpty, setCheckEmpty] = useState(0);

    function checkEmptyDiv() {
        if (checkEmpty === 1) {
            return (<p className='gruppespil-stage-404'>Der blev ikke fundet nogle gruppespil...</p>);
        } else {
            return (<></>);
        }
    }

    const [messageType, setMessageType] = useState("error-con-error");

    function setNotiMessage(type, heading, message) {
    window.scrollTo(0, 0)
        if (type === "error") {
            setMessageType("error-con-error");
            document.getElementById("errorIcon").classList.add("display");
        } else if (type === "success") {
            document.getElementById("errorIcon").classList.remove("display");
            setMessageType("error-con-success");
        }
        document.getElementById("errorCon").classList.add("display");
        document.getElementById("errorConH").innerHTML = heading;
        document.getElementById("errorConP").innerHTML = message;
    }

    function billetHandler() {
        const user_email = localStorage.getItem("email");
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/adgangsbilletter?player=" + user_email;
        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log(response);
            if (response.data.adgangsbilletter.length > 0) {
                var foundBillet = false;
                var billetIndex = -1;
                for (var i in response.data.adgangsbilletter) {
                    if (response.data.adgangsbilletter[i].used === false && response.data.adgangsbilletter[i].type === "gruppespil") {
                        foundBillet = true;
                        billetIndex = parseInt(i);
                    }
                }
                if (foundBillet === true && billetIndex >= 0) {
                    const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/adgangsbilletter";
                    const requestConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }

                    const requestBody = {
                        "player": user_email,
                        "index": billetIndex
                    }

                    axios.patch(URL, requestBody, requestConfig).then(response => {
                        console.log(response)
                        document.getElementById("main-modal").classList.remove("display-flex");
                        window.open("/stage/opret-spil", "_self");
                    }).catch(error => {
                        console.log("Fejl ved indhentning af data" + error)
                        setNotiMessage("error", "Serverfejl", "Der skete en fejl ved opdatering af din billet.");
                        document.getElementById("main-modal").classList.remove("display-flex");
                    })
                } else {
                    document.getElementById("main-modal").classList.remove("display-flex");
                    setNotiMessage("error", "Ingen billetter", "Det ser ud til, at du ikke har nogle gruppespil-adgangsbilletter. Du kan købe dem under 'Priser'.");
                }
            } else {
                document.getElementById("main-modal").classList.remove("display-flex");
                setNotiMessage("error", "Ingen billetter", "Det ser ud til, at du ikke har nogle adgangsbilletter. Du kan købe dem under 'Priser'.");
            }
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    useEffect(() => {
        if (nav === "alle") {
            document.getElementById("alle").className = "display";
            document.getElementById("private").className = "display-not";
            document.getElementById("offentlige").className = "display-not";
            document.getElementById("afsluttede").className = "display-not";

            document.getElementById("alleN").className = "aktivespil-element-active";
            document.getElementById("privateN").className = "aktivespil-element";
            document.getElementById("offentligeN").className = "aktivespil-element";
            document.getElementById("afsluttedeN").className = "aktivespil-element";
        } else if (nav === "private") {
            document.getElementById("alle").className = "display-not";
            document.getElementById("private").className = "display";
            document.getElementById("offentlige").className = "display-not";
            document.getElementById("afsluttede").className = "display-not";

            document.getElementById("alleN").className = "aktivespil-element";
            document.getElementById("privateN").className = "aktivespil-element-active";
            document.getElementById("offentligeN").className = "aktivespil-element";
            document.getElementById("afsluttedeN").className = "aktivespil-element";
        } else if (nav === "offentlige") {
            document.getElementById("alle").className = "display-not";
            document.getElementById("private").className = "display-not";
            document.getElementById("offentlige").className = "display";
            document.getElementById("afsluttede").className = "display-not";

            document.getElementById("alleN").className = "aktivespil-element";
            document.getElementById("privateN").className = "aktivespil-element";
            document.getElementById("offentligeN").className = "aktivespil-element-active";
            document.getElementById("afsluttedeN").className = "aktivespil-element";
        } else if (nav === "afsluttede") {
            document.getElementById("alle").className = "display-not";
            document.getElementById("private").className = "display-not";
            document.getElementById("offentlige").className = "display-not";
            document.getElementById("afsluttede").className = "display";

            document.getElementById("alleN").className = "aktivespil-element";
            document.getElementById("privateN").className = "aktivespil-element";
            document.getElementById("offentligeN").className = "aktivespil-element";
            document.getElementById("afsluttedeN").className = "aktivespil-element-active";
        }
    }, [nav])

    return (
        <>
            <div className="main-modal" id="main-modal">
                <div className="modal-box">
                    <p className="main-modal-h1">{modalh1}</p>
                    <p className="main-modal-h2">{modalh2}</p>
                    <button className="modal-btn" onClick={() => {billetHandler()}}>Brug billet</button>
                    <button className="modal-btn-outline" onClick={() => {setModalH1("");setModalH2("");document.getElementById("main-modal").classList.remove("display-flex")}}>Fortryd</button>
                    <br/><Link to="/priser" className="modal-p">Køb adgangsbillet</Link>
                </div>
            </div>
            <div className="gruppespil-container">
                <div className={messageType} id="errorCon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div className="error-text">
                        <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                        <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                    </div>
                </div>
                <div className="gruppespil-section">
                <div className="aktivespil-header">
                    <h1 className="aktivespil-h1">Dine gruppespil</h1>
                    <div className="aktivespil-nav">
                        <button className="aktivespil-element-active" id="alleN" onClick={() => setNav("alle")}>Aktive spil</button>
                        <button className="aktivespil-element" id="privateN" onClick={() => setNav("private")}>Private spil</button>
                        <button className="aktivespil-element" id="offentligeN" onClick={() => setNav("offentlige")}>Offentligt spil</button>
                        <button className="aktivespil-element" id="afsluttedeN" onClick={() => setNav("afsluttede")}>Afsluttede spil</button>
                    </div>
                </div>
                <div className="spil-container">
                    <ul id="alle" className="display">
                        {loading}
                        {items.map(item => {
                            for (var x in item.players) {
                                if (item.players[x].player === localStorage.getItem("email")) {
                                    const index = item.players.findIndex(obj => obj.player === localStorage.getItem("email"));
                                    const bank = item.players[index].info.money;
                                    const name = item.name;
                                    const id = item.id;
        
                                    var activeClass = "spil-element";
                                    if (localStorage.getItem("activeGame") === item.id) {
                                        activeClass = "spil-element-active";
                                    }
                                    return (
                                        <li key={id}>
                                            <div className="spil-element-con" onClick={() => setActiveGame(id, index, name)}>
                                                <div className={activeClass}>
                                                    <p className="spil-h1">{name}</p>
                                                    <div className="spil-element-bottom">
                                                        <div className="spil-divider"></div>
                                                        <p className="spil-p">{fornavn}</p>
                                                        <div className="spil-p-right">{bank},-</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>);
                                }
                            }
                            }
                        )}
                        {checkEmptyDiv()}
                    </ul>
                    <ul id="private" className="display-not">
                        {loading}
                        {items.map(item => {
                            for (var x in item.players) {
                                if (item.players[x].player === localStorage.getItem("email") && item.synlighed === "privat") {
                                    const index = item.players.findIndex(obj => obj.player === localStorage.getItem("email"));
                                    const bank = item.players[index].info.money;
                                    const name = item.name;
                                    const id = item.id;
        
                                    var activeClass = "spil-element";
                                    if (localStorage.getItem("activeGame") === item.id) {
                                        activeClass = "spil-element-active";
                                    }
                                    return (
                                        <li key={id}>
                                            <div className="spil-element-con" onClick={() => setActiveGame(id, index, name)}>
                                                <div className={activeClass}>
                                                    <p className="spil-h1">{name}</p>
                                                    <div className="spil-element-bottom">
                                                        <div className="spil-divider"></div>
                                                        <p className="spil-p">{fornavn}</p>
                                                        <div className="spil-p-right">{bank},-</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>);
                                }
                            }
                            }
                        )}
                    </ul>
                    <ul id="offentlige">
                    {loading}
                        {items.map(item => {
                            for (var x in item.players) {
                                if (item.players[x].player === localStorage.getItem("email") && (item.synlighed === "offentlig" || item.synlighed === "dyst")) {
                                    const index = item.players.findIndex(obj => obj.player === localStorage.getItem("email"));
                                    const bank = item.players[index].info.money;
                                    const name = item.name;
                                    const id = item.id;
        
                                    var activeClass = "spil-element";
                                    if (localStorage.getItem("activeGame") === item.id) {
                                        activeClass = "spil-element-active";
                                    }
                                    return (
                                        <li key={id}>
                                            <div className="spil-element-con" onClick={() => setActiveGame(id, index, name)}>
                                                <div className={activeClass}>
                                                    <p className="spil-h1">{name}</p>
                                                    <div className="spil-element-bottom">
                                                        <div className="spil-divider"></div>
                                                        <p className="spil-p">{fornavn}</p>
                                                        <div className="spil-p-right">{bank},-</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>);
                                }
                            }
                            }
                        )}
                    </ul>
                    <ul id="afsluttede">
                    {loading}
                        {items.map(item => {
                            for (var x in item.players) {
                                if (item.players[x].player === localStorage.getItem("email") && item.synlighed === "afsluttet") {
                                    const index = item.players.findIndex(obj => obj.player === localStorage.getItem("email"));
                                    const bank = item.players[index].info.money;
                                    const name = item.name;
                                    const id = item.id;
        
                                    var activeClass = "spil-element";
                                    if (localStorage.getItem("activeGame") === item.id) {
                                        activeClass = "spil-element-active";
                                    }
                                    return (
                                        <li key={id}>
                                            <div className="spil-element-con" onClick={() => setActiveGame(id, index, name)}>
                                                <div className={activeClass}>
                                                    <p className="spil-h1">{name}</p>
                                                    <div className="spil-element-bottom">
                                                        <div className="spil-divider"></div>
                                                        <p className="spil-p">{fornavn}</p>
                                                        <div className="spil-p-right">{bank},-</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>);
                                }
                            }
                            }
                        )}
                    </ul>
                </div>
                <button className="main-btn-login" onClick={() => {opretSpilHandler()}}>Opret nyt gruppespil</button>
                <Link to="/stage/find-spil"><button className="main-btn-outline marginLeft20">Find nye gruppespil</button></Link>
                </div>
                </div>
        </>
    )
}
 
export default StageAktiveSpil;
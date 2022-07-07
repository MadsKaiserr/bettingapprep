import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import './find.css';
 
function StageFind () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const [dataLoad, setDataLoad] = useState(false);

    const [items, setItems] = useState([]);

    const [checkEmpty, setCheckEmpty] = useState(0);

    const [loading, setLoading] = useState("Indlæser...");

    useEffect(() => {
        if (loading !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
        }
      }, [loading])

    function apiCall() {
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
            apiCall();
            console.log("API: Called");
        }, 500);
        setDataLoad(true);
    }

    function checkEmptyDiv() {
        if (checkEmpty === 1) {
            return (<p className='gruppespil-table-404'>Der blev ikke fundet nogle gruppespil...</p>);
        } else {
            return (<></>);
        }
    }

    function changeNav(nav) {
        if (nav === "alle") {
            document.getElementById("alleG").className = "display";
            document.getElementById("privateG").className = "display-not";
            document.getElementById("offentligeG").className = "display-not";
            document.getElementById("dysterG").className = "display-not";

            document.getElementById("alleGK").className = "aktivespil-element-active";
            document.getElementById("privateGK").className = "aktivespil-element";
            document.getElementById("offentligeGK").className = "aktivespil-element";
            document.getElementById("dysterGK").className = "aktivespil-element";
        } else if (nav === "private") {
            document.getElementById("alleG").className = "display-not";
            document.getElementById("privateG").className = "display";
            document.getElementById("offentligeG").className = "display-not";
            document.getElementById("dysterG").className = "display-not";

            document.getElementById("alleGK").className = "aktivespil-element";
            document.getElementById("privateGK").className = "aktivespil-element-active";
            document.getElementById("offentligeGK").className = "aktivespil-element";
            document.getElementById("dysterGK").className = "aktivespil-element";
        } else if (nav === "offentlige") {
            document.getElementById("alleG").className = "display-not";
            document.getElementById("privateG").className = "display-not";
            document.getElementById("offentligeG").className = "display";
            document.getElementById("dysterG").className = "display-not";

            document.getElementById("alleGK").className = "aktivespil-element";
            document.getElementById("privateGK").className = "aktivespil-element";
            document.getElementById("offentligeGK").className = "aktivespil-element-active";
            document.getElementById("dysterGK").className = "aktivespil-element";
        } else if (nav === "dyster") {
            document.getElementById("alleG").className = "display-not";
            document.getElementById("privateG").className = "display-not";
            document.getElementById("offentligeG").className = "display-not";
            document.getElementById("dysterG").className = "display";

            document.getElementById("alleGK").className = "aktivespil-element";
            document.getElementById("privateGK").className = "aktivespil-element";
            document.getElementById("offentligeGK").className = "aktivespil-element";
            document.getElementById("dysterGK").className = "aktivespil-element-active";
        }
    }

    return (
        <div className="find-wrapper">
            <div className="find-div">
            <div className="gruppespil-top">
                    <h1 className="gruppespil-h1">Find gruppespil</h1>
                    <div className="aktivespil-nav">
                        <button className="aktivespil-element-active" id="alleGK" onClick={() => {changeNav("alle")}}>Alle gruppespil</button>
                        <button className="aktivespil-element" id="privateGK" onClick={() => {changeNav("private")}}>Private spil</button>
                        <button className="aktivespil-element" id="offentligeGK" onClick={() => {changeNav("offentlige")}}>Offentligt spil</button>
                        <button className="aktivespil-element" id="dysterGK" onClick={() => {changeNav("dyster")}}>Præmieturneringer</button>
                    </div>
                </div>
                <div className="gruppespi-body">
                    <div className="gruppespil-input-div">
                    <svg xmlns="http://www.w3.org/2000/svg" className="gruppespil-search-icon" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                        <input type="text" className="login-form-input" style={{paddingLeft: "45px"}} placeholder="Find det rette gruppespil"/>
                    </div>
                    <div className="gruppespil-table">
                        <div className="gruppespil-table-top">
                            <p className="gruppespil-table-title gruppetable-navn2" style={{marginLeft: "10px"}}>NAVN</p>
                            <p className="gruppespil-table-title gruppetable-number2">SYNLIGHED</p>
                            <p className="gruppespil-table-title gruppetable-kapital2">SPILLERE</p>
                            <p className="gruppespil-table-title gruppetable-number2">ADMINISTRATOR</p>
                        </div>
                        <ul id="alleG">
                            <div className="match-loader display" id="stage-loader1"></div>
                            {items.map((item) => {
                                const gruppespilURL = "/gruppesession?game=" + item.id;
                                var synlighed = item.synlighed;
                                var dystClass = ""
                                var dystSpan = ""
                                if (item.synlighed === "dyst") {
                                    synlighed = "Præmiedyst";
                                    dystClass = "dyst-span";
                                    dystSpan = "Præmiedyst";
                                }
                                return (
                                    <li key={item.id} className="display" style={{width: "100%"}}>
                                        <Link to={gruppespilURL} className="gruppespil-table-row">
                                            <p className="gruppespil-table-h1 gruppetable-navn2-el">{item.name}<span className={dystClass}>{dystSpan}</span></p>
                                            <p className="gruppespil-table-p gruppetable-number2-el2">{synlighed}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="gruppespiltable-icon" viewBox="0 0 16 16">
                                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                            </svg>
                                            <p className="gruppespil-table-p gruppetable-kapital2-el">{item.players.length}</p>
                                            <p className="gruppespil-table-p gruppetable-number2-el">{item.admin}</p>
                                        </Link>
                                    </li>
                                    );
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                        <ul className="display-not" id="privateG">
                            {items.map((item) => {
                                if (item.synlighed === "privat") {
                                    const gruppespilURL = "/gruppesession?game=" + item.id;
                                    var synlighed = item.synlighed;
                                    var dystClass = ""
                                    var dystSpan = ""
                                    if (item.synlighed === "dyst") {
                                        synlighed = "Præmiedyst";
                                        dystClass = "dyst-span";
                                        dystSpan = "Præmiedyst";
                                    }
                                    return (
                                        <li key={item.id} className="display" style={{width: "100%"}}>
                                            <Link to={gruppespilURL} className="gruppespil-table-row">
                                                <p className="gruppespil-table-h1 gruppetable-navn2-el">{item.name}<span className={dystClass}>{dystSpan}</span></p>
                                                <p className="gruppespil-table-p gruppetable-number2-el2">{synlighed}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="gruppespiltable-icon" viewBox="0 0 16 16">
                                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                </svg>
                                                <p className="gruppespil-table-p gruppetable-kapital2-el">{item.players.length}</p>
                                                <p className="gruppespil-table-p gruppetable-number2-el">{item.admin}</p>
                                            </Link>
                                        </li>
                                        );
                                    }
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                        <ul className="display-not" id="offentligeG">
                            {items.map((item) => {
                                if (item.synlighed === "offentlig") {
                                    const gruppespilURL = "/gruppesession?game=" + item.id;
                                    var synlighed = item.synlighed;
                                    var dystClass = ""
                                    var dystSpan = ""
                                    if (item.synlighed === "dyst") {
                                        synlighed = "Præmiedyst";
                                        dystClass = "dyst-span";
                                        dystSpan = "Præmiedyst";
                                    }
                                    return (
                                        <li key={item.id} className="display" style={{width: "100%"}}>
                                            <Link to={gruppespilURL} className="gruppespil-table-row">
                                                <p className="gruppespil-table-h1 gruppetable-navn2-el">{item.name}<span className={dystClass}>{dystSpan}</span></p>
                                                <p className="gruppespil-table-p gruppetable-number2-el2">{synlighed}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="gruppespiltable-icon" viewBox="0 0 16 16">
                                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                </svg>
                                                <p className="gruppespil-table-p gruppetable-kapital2-el">{item.players.length}</p>
                                                <p className="gruppespil-table-p gruppetable-number2-el">{item.admin}</p>
                                            </Link>
                                        </li>
                                        );
                                    }
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                        <ul className="display-not" id="dysterG">
                            {items.map((item) => {
                                if (item.synlighed === "dyst") {
                                    const gruppespilURL = "/gruppesession?game=" + item.id;
                                    var synlighed = item.synlighed;
                                    var dystClass = ""
                                    var dystSpan = ""
                                    if (item.synlighed === "dyst") {
                                        synlighed = "Præmiedyst";
                                        dystClass = "dyst-span";
                                        dystSpan = "Præmiedyst";
                                    }
                                    return (
                                        <li key={item.id} className="display" style={{width: "100%"}}>
                                            <Link to={gruppespilURL} className="gruppespil-table-row">
                                                <p className="gruppespil-table-h1 gruppetable-navn2-el">{item.name}<span className={dystClass}>{dystSpan}</span></p>
                                                <p className="gruppespil-table-p gruppetable-number2-el2">{synlighed}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="gruppespiltable-icon" viewBox="0 0 16 16">
                                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                </svg>
                                                <p className="gruppespil-table-p gruppetable-kapital2-el">{item.players.length}</p>
                                                <p className="gruppespil-table-p gruppetable-number2-el">{item.admin}</p>
                                            </Link>
                                        </li>
                                        );
                                    }
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default StageFind;
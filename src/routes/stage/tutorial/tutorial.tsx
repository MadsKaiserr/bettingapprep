import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link, NavLink } from 'react-router-dom';

import "./tutorial.css";
 
function StageTutorial () {

    const [resultat, setResultat] = useState("");
    const [odds, setOdds] = useState("");
    const [indsats, setIndsats] = useState(30);
    const [udbetaling, setUdbetaling] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const body = document.getElementById("body");
    body.classList.add("no-scroll");

    const navigate = useNavigate();

    function nextHandler(current) {
        if (current !== 3) {
            const tut = document.getElementById("tut" + current);
            tut.classList.remove("display");
            tut.classList.remove("display-flex");

            const tutNext = document.getElementById("tut" + (current + 1));
            tutNext.classList.add("display-flex");
        }
        if (current === 3) {
            if (indsats === 30 || indsats < 1 || indsats > 200 ) {

            } else {
                const tut = document.getElementById("tut" + current);
                tut.classList.remove("display");
                tut.classList.remove("display-flex");

                const tutNext = document.getElementById("tut" + (current + 1));
                tutNext.classList.add("display-flex");
                var local = JSON.parse(localStorage.getItem("auth"));
                local.tutorial = true;
                localStorage.setItem("auth", JSON.stringify(local));
                body.classList.remove("no-scroll");
            }
        }
    }

    function skipHandler() {
        document.getElementById("tut-container").classList.add("display-not");
        var local = JSON.parse(localStorage.getItem("auth"));
        local.tutorial = true;
        localStorage.setItem("auth", JSON.stringify(local));
        body.classList.remove("no-scroll");
    }

    function placeBet(odd) {
        if (odd === "0") {
            setResultat("Manchester United");
            setOdds("2.25");
        } else if (odd === "1") {
            setResultat("Uafgjort");
            setOdds("3.50");
        } else if (odd === "2") {
            setResultat("Tottenham");
            setOdds("3.10");
        }
        nextHandler(2);
    }

    return (
        <>
            <div className="tut-container" id="tut-container">
                <div className="tut-element display" id="tut0">
                    <div className="modal-box">
                        <p className="main-modal-h1">Velkommen til Betting.App - Beta version</p>
                        <p className="main-modal-h2">For at hjælpe dig igang med brug af platformen, vil vi nu give dig en rundvisning i vores særlige funktioner.</p>
                        <p className="main-modal-h2">Du kan altid forlade, eller springe rundvisningen over undervejs.</p>
                        <p className="main-modal-h2">Du vil få et indblik i, hvordan du tilmelder dig og opretter gruppespil, placerer kuponer, laver væddemål, analyserer kampe og meget mere.</p>
                        <button className="modal-btn" onClick={() => {nextHandler(0)}}>Fortsæt</button>
                        <button className="modal-btn-outline" onClick={() => {skipHandler()}}>Spring over</button>
                    </div>
                </div>
                <div className="tut-element" id="tut1">
                    <div className="info-section" id="tut1pic">
                        <p className="info-h1">Velkommen, {JSON.parse(localStorage.getItem("auth")).username}</p>
                        <p className="info-p">Valgte spil: <span className="info-p-span">Betting.App Dysten</span></p><br />
                        <p className="info-p">Placering: <span className="info-p-span">1</span> af <span className="info-p-span">2</span></p><br />
                        <p className="info-p">Tilgængelige ligaer: <span className="info-p-span">Europa</span>, <span className="info-p-span">Nations League</span></p><br />
                        <p className="info-p">Slutdato: <span className="info-p-span">23/06/2022</span></p>
                    </div>
                    <div className="tut-modal">
                        <p className="main-modal-h1">Gruppespil</p>
                        <p className="main-modal-h2">På forsiden finder du først dit aktive gruppespil. Her kan du se forskellige informationer om gruppespillet, og blandt andet din nuværende placering.</p>
                        <button className="modal-btn" onClick={() => {nextHandler(1)}}>Fortsæt</button>
                        <button className="modal-btn-outline" onClick={() => {skipHandler()}}>Spring over</button>
                    </div>
                </div>
                <div className="tut-element" id="tut2">
                    <div className="stage-main-section" id="tutstage">
                        <div className="stage-section-indhold">
                            <div className="stage-kampe-top">
                                <p className="stage-kampe-h1">Dagens kampe</p>
                                <div className="stage-kampe-top-calendar">
                                    <div className="stage-kampe-calendar">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="calendarIcon" viewBox="0 0 16 16">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                    </svg>
                                        <input className="date-picker" type="date"/>
                                    </div>
                                </div>
                            </div>
                            <div className="stage-kampe-section">
                                <div className="stage-kampe-head">
                                    <p className="stage-league">Superliga</p>
                                </div>
                                <div className="stage-kampe">
                                    <ul>
                                        <div className="stage-match">
                                            <div className="stage-kampe-top">
                                                <p className="stage-top-p">Fodbold / Danmark / Superliga</p>
                                            </div>
                                            <div className="stage-indhold-down">
                                                <div className="stage-kampe-hold">
                                                    <p className={"stage-kampe-minut"}>12/03</p>
                                                    <div className="stage-kampe-hold-div">
                                                        <div className="stage-kampe-team">
                                                            <p className={"stage-stilling-p-none"}>0</p>
                                                            <img alt="." src={"https://cdn.sportmonks.com/images/soccer/teams/14/14.png"} className="stage-img" />
                                                            <p className={"stage-kampe-p"}>Manchester United</p>
                                                        </div>
                                                        <div className="stage-kampe-team">
                                                            <p className={"stage-stilling-p-none"}>0</p>
                                                            <img alt="." src={"https://cdn.sportmonks.com/images/soccer/teams/6/6.png"} className="stage-img" />
                                                            <p className={"stage-kampe-p"}>Tottenham</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="stage-kampe-odds">
                                                    <button className="stage-kampe-odds-btn" onClick={() => placeBet("0")}><p className="odd-data-p">1</p><p className="odd-data-h1">2.25</p></button>
                                                    <button className="stage-kampe-odds-btn" onClick={() => placeBet("1")}><p className="odd-data-p">X</p><p className="odd-data-h1">3.50</p></button>
                                                    <button className="stage-kampe-odds-btn" onClick={() => placeBet("2")}><p className="odd-data-p">2</p><p className="odd-data-h1">3.10</p></button>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tut-modal">
                        <p className="main-modal-h1">Kampe</p>
                        <p className="main-modal-h2">Dernæst har vi alle kampe der bliver spillet på dagen. Her kan du nemt og hurtigt lave dit første væddemål om en kamps resultat.</p>
                        <p className="main-modal-h2">Klik nu på en af resultaterne.</p>
                        <button className="modal-btn-outline" onClick={() => {skipHandler()}}>Spring over</button>
                    </div>
                </div>
                <div className="tut-element" id="tut3">
                    <div className="tut-modal">
                        <p className="main-modal-h1">Indsatser</p>
                        <p className="main-modal-h2">Efter du har mixet og matchet din kupon, kan du angive en indsats, og se din udbetaling og totale odds stige.</p>
                        <p className="main-modal-h2">Angiv din indsats (op til 200kr), og klik på "Placér bet".</p>
                        <button className="modal-btn-outline" onClick={() => {skipHandler()}}>Spring over</button>
                    </div>
                    <div className="stage-kupon" id="tutkupon">
                        <div className="kupon-top">
                            <p className="kupon-header-p">Single</p>
                            <p className="kupon-blue-p">Ryd alle</p>
                        </div>
                        <div className="kupon-container">
                            <div className="kupon-divider-first"></div>
                            <p className="kupon-top-p">Dit væddemål</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="kupon-icon2" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            <div className="kupon-divider"></div>
                            <div className="kupon-info">
                                <p className="kupon-h1">Manchester United - Tottenham</p>
                                <p className="kupon-p">Kamperesultat: <span className="weight600">{resultat}</span></p>
                            </div>
                            <div className="kupon-odds">
                                <p className="kupon-h2">{odds}</p>
                            </div>
                        </div>
                        <div className="kupon-bottom">
                            <div className="kupon-bottom-info">
                                <div className="kupon-indsats">
                                    <input type="number" className="kupon-input" autoComplete="off" id="indsatsInput" placeholder="Indsats" onChange={event => {setIndsats(parseInt(event.target.value)); setUdbetaling(parseInt(event.target.value)*parseFloat(odds))}}/>
                                </div>
                                <div className="kupon-info-div">
                                    <p className="kupon-bottom-info-p">Total indsats</p>
                                    <p className="kupon-bottom-info-p-right">{indsats},00 kr.</p>
                                </div>
                                <div className="kupon-info-div">
                                    <p className="kupon-bottom-info-p">Total odds</p>
                                    <p className="kupon-bottom-info-p-right">{odds}</p>
                                </div>
                            </div>
                            <div className="kupon-confirm">
                                <div className="kupon-confirm-div">
                                    <p className="kupon-confirm-p">Udbetaling:</p>
                                    <p className="kupon-confirm-h1">{udbetaling} kr.</p>
                                </div>
                                <button className="kupon-btn" id="placeBetBTN" onClick={() => {nextHandler(3)}}>Placér bet</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tut-element" id="tut4">
                    <div className="nav-container-bottom">
                        <div className="nav-link-container">
                            <p className="nav-p-stage">Udforsk</p>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/stage/gruppespil" className="nav-p-stage">Gruppespil</Link>
                        </div>
                        <div className="nav-link-container">
                            <p className="nav-p-stage">FAQ</p>
                        </div>
                        <div className="nav-link-container">
                            <p className="nav-p-stage">Blog</p>
                        </div>
                    </div>
                    <div className="tut-modal">
                        <p className="main-modal-h1">Navigation</p>
                        <p className="main-modal-h2">Naviger dig nemt igennem her på siden ved brug af navigationen.</p>
                        <p className="main-modal-h2">Lad os tage et kig på kuponen du netop har oprettet. Klik på gruppespil.</p>
                        <button className="modal-btn-outline" onClick={() => {skipHandler()}}>Spring over</button>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default StageTutorial; 
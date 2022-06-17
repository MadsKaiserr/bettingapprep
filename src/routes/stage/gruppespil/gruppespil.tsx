import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { getUser } from "../../../services/authService.ts";
import { Link } from 'react-router-dom';

import "./gruppespil.css";
 
function StageGruppespil () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const user = getUser();
    const username = user !== 'undefined' && user ? user.username : '';

    const [dataLoad, setDataLoad] = useState(false);
    const [playerOdds, setPlayerOdds] = useState([]);

    const [tableArray, setTableArray] = useState([]);

    const [gevinst, setGevinst] = useState("Indlæser...");
    const [first, setFirst] = useState("Indlæser...");
    const [kuponer, setKuponer] = useState("Indlæser...");
    const [gameName, setGameName] = useState("");

    const [gameAdmin, setGameAdmin] = useState("");

    var activeGame = localStorage.getItem("activeGame");

    const [loadingText, setLoadingText] = useState("Indlæser...");
    
    useEffect(() => {
        if (loadingText !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
            document.getElementById("stage-loader2").classList.remove("display");
        }
      }, [loadingText])

    function apiCall() {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/gruppesession?game=" + activeGame;

        const requestConfig = {
            headers: {
                "x-api-key": process.env.REACT_APP_API_SECRET
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log(response)
            var myPlayer = [];
            for (var k in response.data.players) {
                if (response.data.players[k].player === localStorage.getItem("email")) {
                    myPlayer = response.data.players[k].odds;
                    setGameAdmin(response.data.admin);
                    localStorage.setItem("notifikationer", response.data.players[k].info.notifikationer.length);
                }
            }
            setPlayerOdds(myPlayer);
            setGameName(response.data.name);

            var startValue = parseInt(response.data.start_amount);
            var gevinstVar = 0;
            var antalKuponer = 0;
            for (var i in response.data.players) {
                var kapital = response.data.players[i].info.money;
                gevinstVar = gevinstVar + (kapital - startValue);

                var playerKuponer = response.data.players[i].odds.length;
                antalKuponer = antalKuponer + playerKuponer;
                var finalKuponer = antalKuponer + "";
            }
            var gevinstDone = gevinstVar+" kr.";
            setGevinst(gevinstDone);
            setKuponer(finalKuponer);

            function getTopN(arr, n) {
                var clone = arr.slice(0);
                // sort descending
                clone.sort(function(x, y) {
                    if (x.info.money === y.info.money) return 0;
                    else if (parseInt(x.info.money) < parseInt(y.info.money)) return 1;
                    else return -1;
                });
                return clone.slice(0, n);
            }

            var n = response.data.players.length;
            var topScorers = getTopN(response.data.players, n);
            topScorers.forEach(function(item, index) {
                if (index === 0) {
                    setFirst(item.player+"");
                }
                setTableArray(tableArray => [...tableArray, item]);
            });
            setLoadingText("")
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

    if (!localStorage.getItem("activeGame")) {
        return (
            <>
                <div className="gruppespil-container">
                    <div className="gruppespil-section">
                        <div className="gruppespil-title">
                            <h1 className="gruppespil-h1">Velkommen til, {username}</h1><br></br>
                            <p className="info-p">Du har ikke noget valgt spil.</p>
                            <Link to="/stage/aktive-spil">
                                <button className="gruppespil-btn">Vælg spil</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        const game_settings = "/stage/gameindstillinger?game=" + activeGame;

        function adminSettings() {
            if (gameAdmin === localStorage.getItem("email")){
                return (
                    <Link to={game_settings}>
                        <button className="gruppespil2-btn">Indstillinger</button>
                    </Link>
                );
            } else {
                return (
                    <></>
                );
            }
        }

        return (
            <>
                <div className="gruppespil-container">
                    <div className="gruppespil-section">
                        <div className="gruppespil-info">
                            <div className="gruppespil-title">
                                <h1 className="gruppespil-h1">{gameName}</h1>
                                <Link to="/stage/aktive-spil">
                                    <button className="gruppespil2-btn">Skift</button>
                                </Link>
                                {adminSettings()}
                            </div>
                            <div className="gruppespil-info-info">
                                <div className="gruppespil-info-element">
                                    <p className="gruppespil-info-element-p">Total Gevinst</p>
                                    <p className="gruppespil-info-element-h1">{Number(parseFloat(gevinst).toFixed(2))} kr.</p>
                                </div>
                                <div className="gruppespil-info-element">
                                    <p className="gruppespil-info-element-p">Førende</p>
                                    <p className="gruppespil-info-element-h1">{first}</p>
                                </div>
                                <div className="gruppespil-info-element">
                                    <p className="gruppespil-info-element-p">Antal Kuponer</p>
                                    <p className="gruppespil-info-element-h1">{kuponer}</p>
                                </div>
                            </div>
                        </div>
                        <div className="gruppespil-info">
                            <div className="gruppespil-title">
                                <h1 className="gruppespil-h1">Dine Kuponer</h1>
                            </div>
                            <div className="spil-loader display" id="stage-loader1"></div>
                            <div className="gruppespil-kuponer">
                                <ul>
                                    {playerOdds.map((item) => {
                                        var kuponClass = "gruppespil-kupon";
                                        if (item.vundet === 1) {
                                            kuponClass = "gruppespil-kupon-1";
                                        } else if (item.vundet === 2) {
                                            kuponClass = "gruppespil-kupon-2";
                                        }
                                        var mstime = new Date().getTime();
                                        var randomNumber = Math.floor(Math.random() * 512);
                                        var randomId = mstime+"-"+randomNumber;
                                        return (
                                            <li key={item.id + "-" + randomId} className="display">
                                                <div className={kuponClass}>
                                                    <div className="kupon-top">
                                                        <p className="kupon-header-p">Single</p>
                                                    </div>
                                                    <ul>
                                                        {item.bets.map((element) => {
                                                            var mstime = new Date().getTime();
                                                            var randomNumber = Math.floor(Math.random() * 512);
                                                            var randomId = mstime+"-"+randomNumber;

                                                            var betType = "Ukendt";
                                                            var resultType = "";
                                                            if (element.betType === "3Way Result") {
                                                                betType = "Kampresultat";
                                                                resultType = "team";
                                                            } else if (element.betType === "Team To Score First") {
                                                                betType = "Første målscorer";
                                                                resultType = "team";
                                                            } else if (element.betType === "Double Chance") {
                                                                betType = "Dobbelt chance";
                                                                resultType = "teams";
                                                            } else if (element.betType === "Highest Scoring Half") {
                                                                betType = "Flest mål i halvleg";
                                                                resultType = "team";
                                                            } else if (element.betType === "Both Teams To Score") {
                                                                betType = "Begge hold scorer";
                                                                resultType = "answer";
                                                            } else if (element.betType === "Time Of First Corner") {
                                                                betType = "";
                                                                resultType = "Time Of First Corner";
                                                            } else if (element.betType === "Corner Match Bet") {
                                                                betType = "Flest hjørnespark";
                                                                resultType = "team";
                                                            } else if (element.betType === "A Red Card in the Match") {
                                                                betType = "Rødt kort i kampen";
                                                                resultType = "answer";
                                                            } else if (element.betType === "First Match Corner") {
                                                                betType = "Første hjørnespark";
                                                                resultType = "team";
                                                            } else if (element.betType === "Last Match Corner") {
                                                                betType = "Sidste hjørnespark";
                                                                resultType = "team";
                                                            } else if (element.betType === "Both Teams To Receive 2+ Cards") {
                                                                betType = "Begge hold modtager 2+ kort";
                                                                resultType = "answer";
                                                            } else if (element.betType === "Both Teams To Receive A Card") {
                                                                betType = "Begge hold mfår kort";
                                                                resultType = "answer";
                                                            } else if (element.betType === "First Card Received") {
                                                                betType = "Første hold, som modtager kort";
                                                                resultType = "team";
                                                            } else if (element.betType === "Time Of First Card") {
                                                                betType = "Første kort inden 33:00";
                                                                resultType = "answer";
                                                            } else if (element.betType === "3Way Result 1st Half") {
                                                                betType = "Kampresultat 1. halvleg";
                                                                resultType = "team";
                                                            } else if (element.betType === "Team To Score Last") {
                                                                betType = "Sidste målscorer";
                                                                resultType = "team";
                                                            } else if (element.betType === "3Way Result 2nd Half") {
                                                                betType = "Kampresultat 2. halvleg";
                                                                resultType = "team";
                                                            } else if (element.betType === "Double Chance - 1st Half") {
                                                                betType = "Dobbelt chance 1. halvleg";
                                                                resultType = "teams";
                                                            } else if (element.betType === "Double Chance - 2nd Half") {
                                                                betType = "Dobbelt chance 2. halvleg";
                                                                resultType = "teams";
                                                            } else if (element.betType === "Odd/Even") {
                                                                betType = "Lige/ulige";
                                                                resultType = "answer";
                                                            } else if (element.betType === "Own Goal") {
                                                                betType = "Selvmål";
                                                                resultType = "answer";
                                                            } else if (element.betType === "Clean Sheet - Home") {
                                                                betType = "Clean sheet " + element.hometeam;
                                                                resultType = "answer";
                                                            } else if (element.betType === "Clean Sheet - Away") {
                                                                betType = "Clean sheet " + element.visitorteam;
                                                                resultType = "answer";
                                                            } else if (element.betType === "2-Way Corners") {
                                                                betType = "";
                                                                resultType = "2-Way Corners";
                                                            }

                                                            var resultString = "Ukendt";
                                                            if (resultType === "team") {
                                                                if (element.result === "0") {
                                                                    resultString = element.hometeam;
                                                                } else if (element.result === "1") {
                                                                    if (betType === "Første målscorer") {
                                                                        resultString = "Ingen mål";
                                                                    } else if (betType === "Kampresultat" || betType === "Kampresultat - 1. halvleg") {
                                                                        resultString = "Uafgjort";
                                                                    } else if (betType === "Første kort") {
                                                                        resultString = "Ingen kort";
                                                                    } else {
                                                                        resultString = element.result;
                                                                    }
                                                                } else if (element.result === "2") {
                                                                    resultString = element.visitorteam;
                                                                }
                                                            } else if (resultType === "2-Way Corners") {
                                                                if (element.result === "0") {
                                                                    resultString = "Over 9.5 hjørnespark";
                                                                } else {
                                                                    resultString = "Under 9.5 hjørnespark";
                                                                }
                                                            } else if (resultType === "teams") {
                                                                if (element.result === "0") {
                                                                    resultString = element.hometeam + " eller uafgjort";
                                                                } else if (element.result === "1") {
                                                                    resultString = "Uafgjort eller " + element.visitorteam;
                                                                } else if (element.result === "2") {
                                                                    resultString = element.hometeam+ " eller " + element.visitorteam;
                                                                }
                                                            } else if (resultType === "Time Of First Corner") {
                                                                if (element.result === "0") {
                                                                    resultString = "Første hjørnespark inden 7:00";
                                                                } else {
                                                                    resultString = "Ingen hjørnespark inden 7:00";
                                                                }
                                                            } else if (resultType === "Both Teams To Score") {
                                                                if (element.result === "0") {
                                                                    resultString = "Begge hold scorer";
                                                                } else {
                                                                    resultString = "Begge hold scorer ikke";
                                                                }
                                                            } else if (resultType === "none") {
                                                                resultString = "";
                                                            } else if (resultType === "answer") {
                                                                if (element.result === "0") {
                                                                    resultString = "Ja";
                                                                } else {
                                                                    resultString = "Nej";
                                                                }
                                                            }

                                                            var returnDate = new Date(element.bet_date*1000);
                                                            var returnMinutes = "" + returnDate.getMinutes();
                                                            if ((returnMinutes.toString()).length < 2) {
                                                                returnMinutes = "0" + returnMinutes;
                                                            }

                                                            var returnHours = "" + returnDate.getHours();
                                                            if ((returnHours.toString()).length < 2) {
                                                                returnHours = "0" + returnHours;
                                                            }

                                                            var returnDay = "";
                                                            if (new Date().getDate() !== returnDate.getDate()) {
                                                                var returnMonth = "" + returnDate.getMonth();
                                                                if ((returnMonth.toString()).length < 2) {
                                                                    returnMonth = "0" + returnMonth;
                                                                }
                                                                returnDay = returnDate.getDate() + "/" + returnMonth + " - ";
                                                            } else {
                                                                returnDay = "I dag";
                                                            }

                                                            return (
                                                                <li key={randomId} className="display">
                                                                    <div className="kupon-container">
                                                                        <div className="kupon-divider-first"></div>
                                                                        <div className="bet-top">
                                                                            <p className="kupon-top-p">Dit væddemål</p>
                                                                            <p className="kupon-top-p">{returnDay} {returnHours}:{returnMinutes}</p>
                                                                        </div>
                                                                        <div className="kupon-divider"></div>
                                                                        <div className="kupon-info">
                                                                            <p className="kupon-h1">{element.hometeam} - {element.visitorteam}</p>
                                                                            <p className="kupon-p">{betType}: <span className="weight600">{resultString}</span></p>
                                                                        </div>
                                                                        <div className="kupon-odds">
                                                                            <p className="kupon-h2">{(Number(element.probability)).toFixed(2)}</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                    <div className="kupon-bottom">
                                                        <div className="kupon-bottom-info">
                                                            <p className="kupon-bottom-info-p">Total indsats</p>
                                                            <p className="kupon-bottom-info-p-right">{item.indsats},00 kr.</p><br />
                                                            <p className="kupon-bottom-info-p">Total odds</p>
                                                            <p className="kupon-bottom-info-p-right">{(Number(item.fullProb)).toFixed(2)}</p>
                                                        </div>
                                                        <div className="kupon-confirm">
                                                            <div className="kupon-confirm-div">
                                                                <p className="kupon-confirm-p">Udbetaling:</p>
                                                                <p className="kupon-confirm-h1">{(item.indsats * item.fullProb).toFixed(2)} kr.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="gruppespil-info">
                            <div className="gruppespil-title">
                                <h1 className="gruppespil-h1">Spildeltagere</h1>
                            </div>
                            <div className="spil-loader display" id="stage-loader2"></div>
                            <div className="gruppespil-table">
                                <div className="gruppespil-table-top">
                                    <p className="gruppespil-table-title gruppetable-navn">NAVN</p>
                                    <p className="gruppespil-table-title gruppetable-number" id="table-anv">VÆDDEMÅL</p>
                                    <p className="gruppespil-table-title gruppetable-kapital">KAPITAL</p>
                                    <p className="gruppespil-table-title gruppetable-number" id="table-av">AKTIVE VÆDDEMÅL</p>
                                </div>
                                <ul>
                                    {tableArray.map((item, index) => {
                                        console.log(item)
                                        var kapital = item.info.money;
                                        if ((kapital % 1) === 0) {
                                            kapital = kapital + ",00";
                                        }
    
                                        var medlemsskab = item.info.medlemsskab;
                                        if (medlemsskab === "plus") {
                                            medlemsskab = "gruppespil-table-medlemsskab-primary";
                                        } else if (medlemsskab === "premium") {
                                            medlemsskab = "gruppespil-table-medlemsskab-gold";
                                        } else if (medlemsskab === "administrator") {
                                            medlemsskab = "gruppespil-table-medlemsskab-special";
                                        } else {
                                            medlemsskab = "gruppespil-table-medlemsskab-silver";
                                        }

                                        var aktive = 0;
                                        for (var w in item.odds) {
                                            if (item.odds[w].calculated === "false") {
                                                aktive = aktive + 1;
                                            }
                                        }
    
                                        return (
                                            <li key={item.player}>
                                                <div className="gruppespil-table-row">
                                                    <p className="gruppespil-table-place gruppetable-place">{index + 1}</p>
                                                    <div className={medlemsskab}></div>
                                                    <p className="gruppespil-table-h1 gruppetable-el-navn">{item.player}</p>
                                                    <p className="gruppespil-table-p gruppetable-number" id="table-anv-data">{item.odds.length}</p>
                                                    <p className="gruppespil-table-p gruppetable-kapital">{kapital} kr.</p>
                                                    <p className="gruppespil-table-p gruppetable-number" id="table-av-data">{aktive}</p>
                                                </div>
                                            </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="gruppespil-info" id="inviteInfo">
                            <div className="gruppespil-title">
                                <h1 className="gruppespil-h1">Inviter venner</h1>
                            </div>
                            <div className="opret-element-input gruppespil-invite" onClick={() => {navigator.clipboard.writeText("http://localhost:3000/stage/gruppesession?game=" + activeGame + "&type=invite")}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="invite-icon" viewBox="0 0 16 16">
                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                                </svg>
                                <p className="invite-p">bettingapp.invite/{activeGame}&type=invite</p>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            </>
        )
    }
}
 
export default StageGruppespil;
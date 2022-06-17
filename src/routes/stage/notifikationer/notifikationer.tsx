import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import "./notifikationer.css";
 
function StageNotifikationer () {

    const [items, setItems] = useState([]);

    const [loadingText, setLoadingText] = useState("Indlæser...");
    const [errorText, setErrorText] = useState("Der blev ikke fundet nogle notifikationer...")

    useEffect(() => {
        window.scrollTo(0, 0)
        if (localStorage.getItem("activeGame") && localStorage.getItem("activeGame") !== "") {
            var activeGame = localStorage.getItem("activeGame");
            const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/gruppesession?game=" + activeGame;
    
            const requestConfigen = {
                headers: {
                    "x-api-key": process.env.REACT_APP_API_SECRET
                }
            }
            console.log("API REQUEST");
            axios.get(URL, requestConfigen).then(response => {
                for (var i in response.data.players) {
                    if (response.data.players[i].player === localStorage.getItem("email")) {
                        setItems(response.data.players[i].info.notifikationer);
                        if (response.data.players[i].info.notifikationer.length > 0) {
                            setErrorText("");
                        }
                    }
                }
                setLoadingText("")
            }).catch(error => {
                setErrorText(error);
                console.log("Fejl ved indhentning af data" + error)
            })
        } else {
            setErrorText("Tilmed dig et gruppespil, for at få notifikationer fra det...")
            setLoadingText("")
        }
    }, [])
    
    useEffect(() => {
        if (loadingText !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
        }
    }, [loadingText])

    return (
        <>
            <div className="noti-main">
                <h1 className="noti-h1">Notifikationer</h1>
                <p className="nogames display left" style={{paddingTop: "15px"}}>{errorText}</p>
                <div className="spil-loader display" id="stage-loader1"></div>
                {items.slice(0).reverse().map(noti => {
                    var calcDate = new Date(noti.date);
                    var returnHours = "" + calcDate.getHours();
                    if ((returnHours.toString()).length < 2) {
                        returnHours = "0" + returnHours;
                    }
                    var returnMinutes = "" + calcDate.getMinutes();
                    if ((returnMinutes.toString()).length < 2) {
                        returnMinutes = "0" + returnMinutes;
                    }
                    var returnMonth = "" + calcDate.getMonth();
                    if ((returnMonth.toString()).length < 2) {
                        returnMonth = "0" + returnMonth;
                    }
                    var returnDate = "" + calcDate.getDate();
                    if ((returnDate.toString()).length < 2) {
                        returnDate = "0" + returnDate;
                    }

                    if (noti.type === "bet_place") {
                        return (
                        <li key={noti.id}>
                            <div className="noti-section">
                                <p className="noti-sec-h1">Du har placeret en kupon</p>
                                <p className="noti-sec-p">Du har gennemført et køb af en kupon, som med en <span className="noti-span">indsats: {noti.indsats} kr.</span> giver dig en <span className="noti-span">udbetaling: {parseInt(parseFloat(noti.indsats)*parseFloat(noti.fullProb))} kr.</span> hvis du vinder.</p>
                                <p className="noti-sec-dato">{returnDate+"/"+returnMonth+"/"+calcDate.getFullYear()+" - "+returnHours+":"+returnMinutes}</p>
                            </div>
                        </li>
                            );
                    } else if (noti.type === "bet_won") {
                        return (
                        <li key={noti.id}>
                            <div className="noti-section-success">
                                <p className="noti-sec-h1">Væddemål vundet</p>
                                <p className="noti-sec-p">Du har vundet et væddemål, som havde en <span className="noti-span">udbetaling: {noti.udbetaling} kr.</span></p>
                                <p className="noti-sec-dato">{returnDate+"/"+returnMonth+"/"+calcDate.getFullYear()+" - "+returnHours+":"+returnMinutes}</p>
                            </div>
                        </li>
                    );
                    } else if (noti.type === "bet_lose") {
                        return (
                        <li key={noti.id}>
                            <div className="noti-section-error">
                                <p className="noti-sec-h1">Væddemål tabt</p>
                                <p className="noti-sec-p">Du har tabt din væddemål <span className="noti-span">nummer: {noti.odds}</span>.</p>
                                <p className="noti-sec-dato">{returnDate+"/"+returnMonth+"/"+calcDate.getFullYear()+" - "+returnHours+":"+returnMinutes}</p>
                            </div>
                        </li>
                    );
                    }
                })}
            </div>
        </>
    )
}
 
export default StageNotifikationer;
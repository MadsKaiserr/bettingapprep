import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { getUser } from "../../../services/authService";
import { Link } from 'react-router-dom';
import { getKupon, getString } from "../../../services/algo.js";
import { DayPicker } from 'react-day-picker';
import da from 'date-fns/locale/da';
import 'react-day-picker/dist/style.css';
import Congrats from '../../../assets/img/congrats.svg';

import './forside.css';
 
function StageForside () {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [currentLeagues, setCurrentLeagues] = useState([]);
    const [ligaLoad, setLigaLoad] = useState(false);

    const today = new Date();
    const [selected, setSelected] = useState<Date | undefined>(today);
    const [chosenDate, setChosenDate] = useState("I dag");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0,10))

    function showCal() {
        document.getElementById("cal").classList.toggle("display");
    }

    const user = getUser();
    const username = user !== 'undefined' && user ? user.username : '';

    const [position, setPosition] = useState(0);
    const [positionCount, setPositionCount] = useState(0);
    const [slutdato, setSlutdato] = useState("Ingen");
    const [activeGameName, setActiveGameName] = useState("Indlæser...");
    const [selectedGame, setSelectedGame] = useState([]);

    const [dataLoad, setDataLoad] = useState(false);
    const [items, setItems] = useState([]);
    const [loadingText, setLoadingText] = useState("Indlæser...");

    const [favoritter, setFavoritter] = useState([]);

    const [kuponType, setKuponType] = useState("Single");

    useEffect(() => {
        if (loadingText !== "Indlæser...") {
            document.getElementById("stage-main1").classList.add("opacity100");
            document.getElementById("stage-main2").classList.add("display");
            document.getElementById("stage-main3").classList.add("display");

            document.getElementById("stage-loader1").classList.remove("display");
            document.getElementById("stage-loader2").classList.remove("display");
        }
    }, [loadingText])

    const [notUsableBtn, setNotUsableBtn] = useState([]);

    const [kuponBtn, setKuponBtn] = useState("kupon-btn odd-off");
    const [odds, setOdds] = useState([]);
    const [returnOdds, setReturnOdds] = useState(1);

    useEffect(() => {
        if (odds.length > 0) {
            document.getElementById("kombination-content").classList.add("display");
            if (odds.length > 1) {
                setKuponType("Kombination");
                document.getElementById("kuponType").classList.add("display-flex");
            } else {
                setKuponType("Single");
                document.getElementById("kuponType").classList.remove("display-flex");
            }
        } else {
            document.getElementById("kombination-content").classList.remove("display");
            document.getElementById("kuponType").classList.remove("display-flex");
        }
    }, [odds])

    useEffect(() => {
        if (kuponType === "Singler") {
            document.getElementById("singler").classList.add("kupon-type-element-active");
            document.getElementById("kombination").classList.remove("kupon-type-element-active");
            // document.getElementById("system").classList.remove("kupon-type-element-active");
            
            document.getElementById("singler-content").classList.add("display");
            document.getElementById("kombination-content").classList.remove("display");

            document.getElementById("singler-bottom").classList.add("display");
            document.getElementById("kombination-bottom").classList.remove("display");
        } else if (kuponType === "Kombination") {
            document.getElementById("singler").classList.remove("kupon-type-element-active");
            document.getElementById("kombination").classList.add("kupon-type-element-active");
            // document.getElementById("system").classList.remove("kupon-type-element-active");

            document.getElementById("singler-content").classList.remove("display");
            document.getElementById("kombination-content").classList.add("display");

            document.getElementById("singler-bottom").classList.remove("display");
            document.getElementById("kombination-bottom").classList.add("display");
        }
    }, [kuponType])

    const [singleIndsats, setSingleIndsats] = useState(0);
    const [singleUdbetaling, setSingleUdbetaling] = useState(0);

    const [indsats, setIndsats] = useState(0);
    const [udbetaling, setUdbetaling] = useState(0);
    const [currentMoney, setCurrentMoney] = useState(0);

    var leagueQuery = "fixtures/date/"+ new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();

    useEffect(() => {
        if (new Date(selected).getDate() === new Date().getDate() && new Date(selected).toLocaleString("da-DK", {month: 'long'}) === new Date().toLocaleString("da-DK", {month: 'long'}) && new Date(selected).getFullYear === new Date().getFullYear) {
            setChosenDate("I dag");
        } else if (new Date(selected).getDate() === new Date().getDate() + 1 && new Date(selected).toLocaleString("da-DK", {month: 'long'}) === new Date().toLocaleString("da-DK", {month: 'long'}) && new Date(selected).getFullYear === new Date().getFullYear) {
            setChosenDate("I morgen")
        } else if (new Date(selected).getDate() === new Date().getDate() - 1 && new Date(selected).toLocaleString("da-DK", {month: 'long'}) === new Date().toLocaleString("da-DK", {month: 'long'}) && new Date(selected).getFullYear === new Date().getFullYear) {
            setChosenDate("I går")
        } else {
            setChosenDate(new Date(selected).getDate() + " " + new Date(selected).toLocaleString("da-DK", {month: 'long'}))
        }
        document.getElementById("superliga").classList.add("display-not");
        document.getElementById("seriea").classList.add("display-not");
        document.getElementById("championsleague").classList.add("display-not");
        document.getElementById("ligue1").classList.add("display-not");
        document.getElementById("laliga").classList.add("display-not");
        document.getElementById("bundesliga").classList.add("display-not");
        document.getElementById("restenafverden").classList.add("display-not");
        document.getElementById("premierleague").classList.add("display-not");
        document.getElementById("nogames").classList.add("display");

        document.getElementById("superliga").classList.remove("display");
        document.getElementById("seriea").classList.remove("display");
        document.getElementById("championsleague").classList.remove("display");
        document.getElementById("ligue1").classList.remove("display");
        document.getElementById("laliga").classList.remove("display");
        document.getElementById("bundesliga").classList.remove("display");
        document.getElementById("restenafverden").classList.remove("display");
        document.getElementById("premierleague").classList.remove("display");
        document.getElementById("nogames").classList.remove("display-not");
        leagueQuery = "fixtures/date/" + new Date(selected).getFullYear() + "-" + (new Date(selected).getMonth() + 1) + "-" + new Date(selected).getDate();
        
        var tMonth = (new Date(selected).getMonth() + 1) + "";
        if (tMonth.length === 1) {
            tMonth = "0" + tMonth;
        }
        var tDate = new Date(selected).getDate() + "";
        if (tDate.length === 1) {
            tDate = "0" + tDate;
        }
        setSelectedDate(new Date(selected).getFullYear() + "-" + tMonth + "-" + tDate);
        setLoadingText("Indlæser...");
        apiCall();
    }, [selected])

    window.addEventListener("scroll", function(){
        if (document.getElementById("kupon")) {
            var kupon = document.getElementById("kupon");
            kupon.classList.toggle("kupon-top", window.scrollY >0);
        }
    })

    if (!dataLoad) {
        var favorit = [];
        if (localStorage.getItem("favoritter")) {
            favorit = JSON.parse(localStorage.getItem("favoritter"));
        } else {
            favorit = [];
        }
        setFavoritter(favorit);
        setTimeout(function (){
            apiCall();
            if (localStorage.getItem("activeGame")) {
                gameCall();
            }

            if (odds !== null && odds !== undefined) {
                if (sessionStorage.getItem("odds") !== "" && sessionStorage.getItem("odds") !== null && sessionStorage.getItem("odds") !== undefined) {
                    var secreturn = JSON.parse(sessionStorage.getItem("odds"));
                    var oddsreplice = 1;
                    for (var u in secreturn) {
                        oddsreplice = oddsreplice * parseFloat(secreturn[u].probability);
                    }
                    setReturnOdds(oddsreplice);
                    setOdds(JSON.parse(sessionStorage.getItem("odds")));
                    setNotUsableBtn(JSON.parse(sessionStorage.getItem("notUsableBtn")));
                    setKuponBtn("kupon-btn");
                }
            }
            if (document.getElementById("superliga")) {
                document.getElementById("superliga").classList.add("display-not");
                document.getElementById("seriea").classList.add("display-not");
                document.getElementById("championsleague").classList.add("display-not");
                document.getElementById("ligue1").classList.add("display-not");
                document.getElementById("laliga").classList.add("display-not");
                document.getElementById("bundesliga").classList.add("display-not");
                document.getElementById("restenafverden").classList.add("display-not");
                document.getElementById("premierleague").classList.add("display-not");
                document.getElementById("nogames").classList.add("display");
    
                document.getElementById("superliga").classList.remove("display");
                document.getElementById("seriea").classList.remove("display");
                document.getElementById("championsleague").classList.remove("display");
                document.getElementById("ligue1").classList.remove("display");
                document.getElementById("laliga").classList.remove("display");
                document.getElementById("bundesliga").classList.remove("display");
                document.getElementById("restenafverden").classList.remove("display");
                document.getElementById("premierleague").classList.remove("display");
                document.getElementById("nogames").classList.remove("display-not");
            }
        }, 500);
        setDataLoad(true);
    }

    function place3wayBet(btnId, matchId, homeTeam, visitorTeam, probability, oddsResult, oddsDate) {
        if (!notUsableBtn.includes(btnId) && odds.length < 5) {
            document.getElementById(btnId).classList.add("odd-off");
            setNotUsableBtn([...notUsableBtn, "3Way Result"+btnId]);
            sessionStorage.setItem("notUsableBtn", JSON.stringify([...notUsableBtn, "3Way Result"+btnId]))
    
            var mstime = new Date().getTime();
            var randomNumber = Math.floor(Math.random() * 512);
            var randomId = mstime+"-"+randomNumber;
            const jsonNote = {
                "id": randomId,
                "match": matchId,
                "hometeam": homeTeam,
                "visitorteam": visitorTeam,
                "probability": probability,
                "odds_type": "3Way Result",
                "odds_result": oddsResult,
                "odds_date": oddsDate
            }
    
            setOdds([...odds, jsonNote]);
    
            for (var o in odds) {
                setReturnOdds(returnOdds * odds[o].probability);
            }
            setReturnOdds(returnOdds * jsonNote.probability);
            if (udbetaling === 0) {
                setUdbetaling((jsonNote.probability * indsats));
            } else {
                setUdbetaling((returnOdds * jsonNote.probability) * indsats);
            }
            setKuponBtn("kupon-btn");
            sessionStorage.setItem("odds", JSON.stringify([...odds, jsonNote]))
        } else if (odds.length > 5) {
            setNotiMessage("error", "For mange væddemål", "Du har allerede 6 ud af 6 mulige væddemål pr. kupon.")
        }
    }

    function updateUdbetaling(type, oddsSend, indsats) {
        if (type === "kombination") {
            var indsatsValue = (document.getElementById("indsatsInput") as HTMLInputElement).value;
            setUdbetaling(returnOdds * parseInt(indsatsValue));
        } else {
            var totalUdbetaling = 0;
            for (var q in odds) {
                var dc = document.getElementById("singleindsats"+odds[q].match+"-"+odds[q].odds_result);
                if ((dc as HTMLInputElement).value !== "" && (dc as HTMLInputElement).value !== null && (dc as HTMLInputElement).value !== undefined) {
                    totalUdbetaling = totalUdbetaling + (parseFloat((dc as HTMLInputElement).value) * parseFloat(odds[q].probability));
                }
            }
            setSingleUdbetaling(totalUdbetaling);
        }
    }

    function delBet(betId, matchId) {
        var returnOddsNew = 1;
        var udbetalingNew = 0;
        for (var y in odds) {
            if (odds[y].id === betId) {
                const betIdIndex = "3Way Result"+matchId+"-"+odds[y].odds_result;

                var index = notUsableBtn.indexOf(betIdIndex);
                notUsableBtn.splice(index, 1);

                var storageReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                var indexRep = storageReplica.indexOf(betIdIndex);
                storageReplica.splice(indexRep, 1)
                sessionStorage.setItem("notUsableBtn", JSON.stringify(storageReplica));

                setOdds(odds.filter(item => item.id !== betId));
                var replica = odds.filter(item => item.id !== betId);
                sessionStorage.setItem("odds", JSON.stringify(replica));
            } else {
                returnOddsNew = returnOddsNew * odds[y].probability;
                udbetalingNew = returnOddsNew * indsats;
            }
        }
        setReturnOdds(returnOddsNew);
        setUdbetaling(udbetalingNew);
        if ((odds.length - 1) <= 0) {
            setKuponBtn("kupon-btn odd-off");
            document.getElementById("kombination-content").classList.remove("display");
            document.getElementById("singler-content").classList.remove("display");

            document.getElementById("kombination-bottom").classList.add("display");
            document.getElementById("singler-bottom").classList.remove("display");
        }
    }

    function placeBet(type) {
        if (type === "kombination") {
            var nowDate = new Date().getTime();
            var varighedDate = new Date(slutdato).getTime();
            var placeBetBTN = document.getElementById("placeBetBTN");
            if (!(odds.length > 0) || !(localStorage.getItem("activeGame")) || indsats <= 0) {
                if (!(odds.length > 0)) {
                    setNotiMessage("error", "Ingen væddemål", "Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.");
                    placeBetBTN.innerHTML = "Placér bet";
                } else if (!(localStorage.getItem("activeGame"))) {
                    setNotiMessage("error", "Intet aktivt gruppespil", "For at placere et væddemål, skal du være tilmeldt et gruppespil, og sætte det som aktivt.");
                    placeBetBTN.innerHTML = "Placér bet";
                } else if (indsats <= 0) {
                    setNotiMessage("error", "Positivt beløb", "Din indsats på dit væddemål skal være positiv.");
                    placeBetBTN.innerHTML = "Placér bet";
                }
            } else if (nowDate > varighedDate) {
                setNotiMessage("error", "Gruppespil slut", "Gruppespillet er desværre allerede færdiggjort.");
                placeBetBTN.innerHTML = "Placér bet";
            } else {
                if (currentMoney < indsats || indsats < parseInt(selectedGame["min_amount"].slice(0, -4)) || indsats > parseInt(selectedGame["max_amount"].slice(0, -4))) {
                    if (currentMoney < indsats) {
                        setNotiMessage("error", "Ikke nok penge", "Du har ikke nok penge, til at placere denne kupon. Prøv med et lavere beløb.");
                        placeBetBTN.innerHTML = "Placér bet";
                    } else if (indsats < parseInt(selectedGame["min_amount"].slice(0, -4))) {
                        setNotiMessage("error", "Minimumsbeløb", "Dette gruppespil spiller med et minimumsbeløb på " + selectedGame["min_amount"]);
                        placeBetBTN.innerHTML = "Placér bet";
                    } else if (indsats > parseInt(selectedGame["max_amount"].slice(0, -4))) {
                        setNotiMessage("error", "Maksimumsbeløb", "Dette gruppespil spiller med et maksimumsbeløb på " + selectedGame["max_amount"]);
                        placeBetBTN.innerHTML = "Placér bet";
                    }
                } else {
                    const placeBetUrl = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/bet";
                const userEmail = localStorage.getItem("email");
        
                const betConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                const localGame = localStorage.getItem("activeGame");
                const localIndex = parseInt(localStorage.getItem("playerIndex"));
    
                var last_date = 0;
                var gammel = false;
                var currentDate = new Date().getTime();
                for (var p in odds) {
                    const bet_dato = parseInt(odds[p].odds_date);
                    if (bet_dato*1000 < currentDate) {
                        setNotiMessage("error", "Gammel væddemål", "Et væddemål du prøver at oddse på er allerede startet.");
                        placeBetBTN.innerHTML = "Placér bet";
                        gammel = true;
                    } else {
                        if (bet_dato > last_date) {
                            last_date = bet_dato;
                        }
                    }
                }
    
                if (gammel !== true) {
                    const betBody = {
                        "betId": localGame,
                        "updateValue": {
                            "bets": [],
                            "player": userEmail,
                            "indsats": indsats,
                            "fullProb": returnOdds,
                            "last_date": last_date,
                            "type": "kombination"
                        },
                        "index": localIndex
                    }
            
                    for (var m in odds) {
                        const match = odds[m].match;
                        const result = odds[m].odds_result;
                        const probability = odds[m].probability;
                        const type = odds[m].odds_type;
                        const visitorteamString = odds[m].visitorteam;
                        const hometeamString = odds[m].hometeam;
                        const bet_date = odds[m].odds_date;
            
                        betBody.updateValue.bets[m] = {
                            "game" : match,
                            "betType": type,
                            "result": result,
                            "probability": probability,
                            "hometeam": hometeamString,
                            "visitorteam": visitorteamString,
                            "bet_date": bet_date,
                            "indsats": 0
                        }
                    }
            
                    axios.patch(placeBetUrl, betBody, betConfig).then(response => {
                        document.getElementById("bet-modal").classList.add("display-not");
                        document.getElementById("singler-modal").classList.add("display-not")
                        document.getElementById("placed-modal").classList.remove("display-not");
                        console.log("Bet oprettet:", betBody, response)
                        setCurrentMoney(currentMoney - indsats);
                    }).catch(error => {
                        console.log(error);
                        setNotiMessage("error", "Fejl ved oprettelse af væddemål", error);
                    })
                    emptyBets();
                    setNotiMessage("success", "Væddemål placeret", "Dit væddemål er nu placeret. Gå til 'Mine gruppespil' for at se dine væddemål.");
                    var placeBetBTN2 = document.getElementById("placeBetBTN");
                    placeBetBTN2.innerHTML = "Placér bet";
                }
                }
            }
        } else {
            var nowDate = new Date().getTime();
        var varighedDate = new Date(slutdato).getTime();
        var placeBetBTN = document.getElementById("placeBetBTN");
        if (!(odds.length > 0) || !(localStorage.getItem("activeGame")) || singleIndsats <= 0) {
            if (!(odds.length > 0)) {
                setNotiMessage("error", "Ingen væddemål", "Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.");
                placeBetBTN.innerHTML = "Placér bet";
            } else if (!(localStorage.getItem("activeGame"))) {
                setNotiMessage("error", "Intet aktivt gruppespil", "For at placere et væddemål, skal du være tilmeldt et gruppespil, og sætte det som aktivt.");
                placeBetBTN.innerHTML = "Placér bet";
            } else if (singleIndsats <= 0) {
                setNotiMessage("error", "Positivt beløb", "Din indsats på dit væddemål skal være positiv.");
                placeBetBTN.innerHTML = "Placér bet";
            }
        } else if (nowDate > varighedDate) {
            setNotiMessage("error", "Gruppespil slut", "Gruppespillet er desværre allerede færdiggjort.");
            placeBetBTN.innerHTML = "Placér bet";
        } else {
            if (currentMoney < singleIndsats || singleIndsats < parseInt(selectedGame["min_amount"].slice(0, -4)) || singleIndsats > parseInt(selectedGame["max_amount"].slice(0, -4))) {
                if (currentMoney < singleIndsats) {
                    setNotiMessage("error", "Ikke nok penge", "Du har ikke nok penge, til at placere denne kupon. Prøv med et lavere beløb.");
                    placeBetBTN.innerHTML = "Placér bet";
                } else if (singleIndsats < parseInt(selectedGame["min_amount"].slice(0, -4))) {
                    setNotiMessage("error", "Minimumsbeløb", "Dette gruppespil spiller med et minimumsbeløb på " + selectedGame["min_amount"]);
                    placeBetBTN.innerHTML = "Placér bet";
                } else if (singleIndsats > parseInt(selectedGame["max_amount"].slice(0, -4))) {
                    setNotiMessage("error", "Maksimumsbeløb", "Dette gruppespil spiller med et maksimumsbeløb på " + selectedGame["max_amount"]);
                    placeBetBTN.innerHTML = "Placér bet";
                }
            } else {
                const placeBetUrl = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/bet";
            const userEmail = localStorage.getItem("email");
    
            const betConfig = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }

            const localGame = localStorage.getItem("activeGame");
            const localIndex = parseInt(localStorage.getItem("playerIndex"));

            var last_date = 0;
            var gammel = false;
            var currentDate = new Date().getTime();
            for (var p in odds) {
                const bet_dato = parseInt(odds[p].odds_date);
                if (bet_dato*1000 < currentDate) {
                    setNotiMessage("error", "Aktiv kamp", "En kamp du prøver at oddse på, er allerede sat igang.");
                    placeBetBTN.innerHTML = "Placér bet";
                    gammel = true;
                } else {
                    if (bet_dato > last_date) {
                        last_date = bet_dato;
                    }
                }
            }

            if (gammel !== true) {
                const betBody = {
                    "betId": localGame,
                    "updateValue": {
                        "bets": [],
                        "player": userEmail,
                        "last_date": last_date,
                        "type": "singler",
                        "indsats": 0,
                        "fullProb": 0
                    },
                    "index": localIndex
                }
        
                for (var m in odds) {
                    const match = odds[m].match;
                    const result = odds[m].odds_result;
                    const probability = odds[m].probability;
                    const type = odds[m].odds_type;
                    const visitorteamString = odds[m].visitorteam;
                    const hometeamString = odds[m].hometeam;
                    const bet_date = odds[m].odds_date;

                    var single_indsats = parseFloat((document.getElementById("singleindsats"+match+"-"+result) as HTMLInputElement).value);
                    if (single_indsats === NaN) {
                        single_indsats = 0;
                    }
                    betBody.updateValue.bets[m] = {
                        "game" : match,
                        "betType": type,
                        "result": result,
                        "probability": probability,
                        "hometeam": hometeamString,
                        "visitorteam": visitorteamString,
                        "bet_date": bet_date,
                        "indsats": single_indsats
                    }
                }
        
                axios.patch(placeBetUrl, betBody, betConfig).then(response => {
                    document.getElementById("bet-modal").classList.add("display-not")
                    document.getElementById("singler-modal").classList.add("display-not")
                    document.getElementById("placed-modal").classList.remove("display-not");
                    console.log("Bet oprettet:", betBody, response)
                    setCurrentMoney(currentMoney - indsats);
                }).catch(error => {
                    console.log(error);
                    setNotiMessage("error", "Fejl ved oprettelse af væddemål", error);
                })
                emptyBets();
                setNotiMessage("success", "Væddemål placeret", "Dit væddemål er nu placeret. Gå til 'Mine gruppespil' for at se dine væddemål.");
                var placeBetBTN2 = document.getElementById("placeBetBTN");
                placeBetBTN2.innerHTML = "Placér bet";
            }
            }
        }
        }
    }

    function emptyBets() {
        document.getElementById("kombination-content").classList.remove("display");
        document.getElementById("singler-content").classList.remove("display");

        document.getElementById("kombination-bottom").classList.add("display");
        document.getElementById("singler-bottom").classList.remove("display");
        setSingleIndsats(0);
        setSingleUdbetaling(0);
        setOdds([]);
        sessionStorage.setItem("odds", "");
        setReturnOdds(1);
        setIndsats(0);
        setUdbetaling(0);
        setKuponBtn("kupon-btn odd-off");

        setNotUsableBtn([]);
        sessionStorage.setItem("notUsableBtn", "");
        (document.getElementById("indsatsInput") as HTMLInputElement).value = "";
        if (sessionStorage.getItem("notUsableBtn") !== "" && sessionStorage.getItem("notUsableBtn") !== undefined && sessionStorage.getItem("notUsableBtn") !== null) {
            for (var l in notUsableBtn) {
                var removedPart = JSON.parse(sessionStorage.getItem("notUsableBtn"))[l].slice(11)
                const el = document.getElementById(removedPart);
                el.classList.remove("odd-off");
            }
        }
    }

    function apiCall() {
        console.log("API CALL");
        var t0 = new Date().getTime();
        if (sessionStorage.getItem(leagueQuery)) {
            var cache = sessionStorage.getItem(leagueQuery);
            var cacheJSON = JSON.parse(cache);
            setItems(cacheJSON.data);
            console.log("CACHE-Pull");
            var t1 = new Date().getTime()
            var responseTime = t1 - t0;
            cacheJSON.meta.response_time = responseTime+"ms - Cache";
            console.log(cacheJSON);
            setLoadingText("");
        } else {
            fetch("https://soccer.sportmonks.com/api/v2.0/"+leagueQuery+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=localTeam,visitorTeam,odds&bookmakers=2&tz=Europe/Copenhagen")
            .then(response => response.json())
            .then(function (result) {
                    var t1 = new Date().getTime()
                    var responseTime = t1 - t0;
                    result.meta.response_time = responseTime+"ms";
                    for (var i in result.data) {
                        delete result.data[i].weather_report;
                        var time_status = result.data[i].time.status;

                        if (time_status === "NS") {
                            time_status = result.data[i].time.starting_at.time;
                            time_status = time_status.slice(0,-3);
                        }
                        }
                setItems(result.data);
                console.log("API-Pull:", result);
                setLoadingText("");
                })
                .catch(error => console.log('error', error));
        }
    }

    function multiFetch(l,checkArray, calcUdbetaling, odd_ids, k, kupon, type) {
        if (type === "kombination") {
            var activeGame = localStorage.getItem("activeGame");
            const requestConfig = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
            fetch("https://soccer.sportmonks.com/api/v2.0/fixtures/multi/"+odd_ids+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=odds&bookmakers=2&tz=Europe/Copenhagen")
            .then(response => response.json())
            .then(function (result) {
                var doneGames = 0;
                for (var o in result.data) {
                    if (result.data[o].time.status === "FT") {
                        doneGames = doneGames + 1;
                    }
                }
                var winning = 0;
                var winsArray = [];
                if (doneGames === result.data.length) {
                    for (var u in result.data) {
                        for (var t in checkArray) {
                            if (checkArray[t].game === result.data[u].id) {
                                if (result.data[u].odds.data[result.data[u].odds.data.findIndex(obj => obj.name === checkArray[t].type)].bookmaker.data[0].odds.data[parseInt(checkArray[t].result)].winning === true) {
                                    winning = winning + 1;
                                    winsArray.push(checkArray[t]);
                                }
                            }
                        }
                    }
                    if (winning === parseInt(checkArray.length)) {
                        const betCalcURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updatewin";
    
                        const winBody = {
                            game: activeGame,
                            playerIndex: parseInt(k),
                            udbetaling: Number(Number(parseFloat(calcUdbetaling)).toFixed(2)),
                            odds: parseInt(l),
                            kupon: kupon,
                            wins: winsArray
                        }
                        axios.patch(betCalcURL, winBody, requestConfig).then(responseTem => {
                            console.log("Vundet - Beregnet", responseTem, winBody);
                        }).catch(error => {
                            if (error.response.status === 401 || error.response.status === 403) {
                                setNotiMessage("error","Fejl i opdatering af udbetaling" , error.response.data.message);
                            } else {
                                setNotiMessage("error","Serverfejl" , "Serveren slog fejl. Dette skyldes ofte for meget trafik på hjemmesiden. Kontakt os for mere information.");
                            }
                        })
                    } else {
                        const betCalcURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updatelose";
    
                        const loseBody = {
                            game: activeGame,
                            playerIndex: parseInt(k),
                            odds: parseInt(l),
                            kupon: kupon,
                            wins: winsArray
                        }
                
                        axios.patch(betCalcURL2, loseBody, requestConfig).then(responseItem => {
                            console.log("Tabt - Beregnet", responseItem, loseBody);
                        }).catch(error => {
                            if (error.response.status === 401 || error.response.status === 403) {
                                setNotiMessage("error","Fejl i opdatering af calc" , error.response.data.message);
                            } else {
                                setNotiMessage("error","Serverfejl" , "Serveren slog fejl. Dette skyldes ofte for meget trafik på hjemmesiden. Kontakt os for mere information.");
                            }
                        })
                    }
                } else {
                    console.log("IKKE ALLE SPIL ER FÆRDIGE");
                }
                })
                .catch(error => console.log('error', error));
        } else {
            var activeGame = localStorage.getItem("activeGame");
        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }
        fetch("https://soccer.sportmonks.com/api/v2.0/fixtures/multi/"+odd_ids+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=odds&bookmakers=2&tz=Europe/Copenhagen")
        .then(response => response.json())
        .then(function (result) {
            var doneGames = 0;
            for (var o in result.data) {
                if (result.data[o].time.status === "FT") {
                    doneGames = doneGames + 1;
                }
            }
            var winning = 0;
            var winsArray = [];
            if (doneGames === result.data.length) {
                for (var u in result.data) {
                    for (var t in checkArray) {
                        if (checkArray[t].game === result.data[u].id) {
                            if (result.data[u].odds.data[result.data[u].odds.data.findIndex(obj => obj.name === checkArray[t].type)].bookmaker.data[0].odds.data[parseInt(checkArray[t].result)].winning === true) {
                                winning = winning + 1;
                                winsArray.push(checkArray[t]);
                            }
                        }
                    }
                }
                if (winning > 0) {
                    var doneUdbetaling = 0;
                    for (var y in winsArray) {
                        for (var u in kupon.bets) {
                            if (kupon.bets[u].game === winsArray[y].game && kupon.bets[u].result === winsArray[y].result) {
                                doneUdbetaling = kupon.bets[u].indsats * parseFloat(kupon.bets[u].probability);
                            }
                        }
                    }
                    const betCalcURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updatewin";

                    const winBody = {
                        game: activeGame,
                        playerIndex: parseInt(k),
                        udbetaling: doneUdbetaling,
                        odds: parseInt(l),
                        kupon: kupon,
                        wins: winsArray
                    }
                    axios.patch(betCalcURL, winBody, requestConfig).then(responseTem => {
                        console.log("Vundet single - Beregnet", responseTem, winBody);
                    }).catch(error => {
                        if (error.response.status === 401 || error.response.status === 403) {
                            setNotiMessage("error","Fejl i opdatering af udbetaling" , error.response.data.message);
                        } else {
                            setNotiMessage("error","Serverfejl" , "Serveren slog fejl. Dette skyldes ofte for meget trafik på hjemmesiden. Kontakt os for mere information.");
                        }
                    })
                } else {
                    const betCalcURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updatelose";

                    const loseBody = {
                        game: activeGame,
                        playerIndex: parseInt(k),
                        odds: parseInt(l),
                        kupon: kupon,
                        wins: winsArray
                    }
            
                    axios.patch(betCalcURL2, loseBody, requestConfig).then(responseItem => {
                        console.log("Tabt - Beregnet", responseItem, loseBody);
                    }).catch(error => {
                        if (error.response.status === 401 || error.response.status === 403) {
                            setNotiMessage("error","Fejl i opdatering af calc" , error.response.data.message);
                        } else {
                            setNotiMessage("error","Serverfejl" , "Serveren slog fejl. Dette skyldes ofte for meget trafik på hjemmesiden. Kontakt os for mere information.");
                        }
                    })
                }
            } else {
                console.log("IKKE ALLE SPIL ER FÆRDIGE");
            }
            })
            .catch(error => console.log('error', error));
        }
    }

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

    function gameCall() {
        var activeGame = localStorage.getItem("activeGame");
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession?game=" + activeGame;

        const requestConfigen = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfigen).then(response => {
            if (response.data.admin !== undefined && response.data.admin !== null) {
                setActiveGameName(response.data.name);
                setSelectedGame(response.data);
                setSlutdato(response.data.varighed);
    
                for (var k in response.data.players) {
                    if (response.data.players[k].player === localStorage.getItem("email")) {
                        localStorage.setItem("notifikationer", response.data.players[k].info.notifikationer.length);
                    }
                    for (var l in response.data.players[k].odds) {
                        var calcUdbetaling = parseFloat(response.data.players[k].odds[l].fullProb) * parseFloat(response.data.players[k].odds[l].indsats);
                        const newDate = new Date().getTime();
                        if (response.data.players[k].odds[l].calculated === "false" && response.data.players[k].odds[l].last_date <  parseInt((newDate.toString()).slice(0, -3))) {
                            var odd_ids = "";
                            var checkArray = [];
                            for (var y in response.data.players[k].odds[l].bets) {
                                var oddId = response.data.players[k].odds[l].bets[y].game;
                                var resultId = response.data.players[k].odds[l].bets[y].result;
                                var type = response.data.players[k].odds[l].bets[y].betType;
                                var bettype = response.data.players[k].odds[l].type;
                                checkArray.push({
                                    "game": oddId,
                                    "result": resultId,
                                    "type": type
                                })
                                if (odd_ids === "") {
                                    odd_ids = oddId;
                                } else {
                                    odd_ids = odd_ids + "," + oddId;
                                }
                            }
                            var kupon = response.data.players[k].odds[l];
                            multiFetch(l,checkArray,calcUdbetaling,odd_ids,k,kupon,bettype);
                        } else {
                        }
                    }
                }
    
                var n = response.data.players.length;
                setPositionCount(n);
                var topScorers = getTopN(response.data.players, n);
                topScorers.forEach(function(gameItem, index) {
                    if (gameItem.player === localStorage.getItem("email")) {
                        setCurrentMoney(response.data.players[index].info.money)
                        setPosition(index + 1);
                    }
                });
            } else {
                if (localStorage.getItem("activeGame")) {
                    document.getElementById("main-error").classList.add("display-flex");
                    document.getElementById("main-error-p").innerHTML = "Dit aktive spil er suspenderet.";
                    localStorage.setItem("aktive-spil-suspend", "true");
                }
            }
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    function getMatchHtml(leagueParse, dateParse) {
        if (items.length !== 0) {
            return items.map(item => {
                var timeClass = "stage-kampe-minut";
                var liveView = "FT";
                var scoreLocal = "stage-stilling-p";
                var scoreVisitor = "stage-stilling-p";
                var teamNameLocal = "stage-kampe-p";
                var teamNameVisitor = "stage-kampe-p";
                if (item.time.status === "LIVE") {
                    timeClass = "stage-kampe-minut stage-kampe-minut-active";
                    liveView = item.time.minute+" MIN";
                } else if (item.time.status === "NS") {
                    scoreLocal = "stage-stilling-p-none";
                    scoreVisitor = "stage-stilling-p-none";
                    var calcTime = item.time.starting_at.time;
                    calcTime = calcTime.slice(0,-3);
                    liveView = calcTime;
                } else if (item.time.status === "FT") {
                    if (item.winner_team_id === item.localteam_id) {
                        scoreLocal = "stage-stilling-p-fat";
                        teamNameLocal = "stage-kampe-p-fat";
                    } else if (item.winner_team_id === item.visitorteam_id) {
                        scoreVisitor = "stage-stilling-p-fat";
                        teamNameVisitor = "stage-kampe-p-fat";
                    }
                } else if (item.time.status === "CANCL") {
                    liveView = "AFLYST";
                } else if (item.time.status === "HT") {
                    liveView = "HALVLEG";
                } else if (item.time.status === "ET") {
                    liveView = "EX. TID";
                } else if (item.time.status === "PEN_LIVE") {
                    liveView = "STR.";
                } else if (item.time.status === "BREAK") {
                    liveView = "PAUSE";
                } else if (item.time.status === "POSTP") {
                    liveView = "UDSKUDT";
                } else if (item.time.status === "INT") {
                    liveView = "AFBRUDT";
                } else if (item.time.status === "ABAN") {
                    liveView = "FORLADT";
                } else if (item.time.status === "ABAN") {
                    liveView = "FORLADT";
                } else if (item.time.status === "SUSP") {
                    liveView = "SUSP.";
                } else if (item.time.status === "TBA") {
                    liveView = "TBA";
                } else if (item.time.status === "DELAYED") {
                    liveView = "FORSINKET";
                } else if (item.time.status === "WO") {
                    liveView = "WO";
                } else if (item.time.status === "AU") {
                    liveView = "AFVENTER";
                } else if (item.time.status === "Deleted") {
                    liveView = "Slettet";
                }
    
                var wherearewe = "";
                if (item.league_id === 271) {
                    wherearewe = "Danmark / Super Liga"
                    document.getElementById("superliga").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 2) {
                    wherearewe = "Verden / Champions League"
                    document.getElementById("championsleague").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 5) {
                    wherearewe = "Europa / Europa League"
                } else if (item.league_id === 8) {
                    wherearewe = "England / Premier League"
                    document.getElementById("premierleague").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 82) {
                    wherearewe = "Tyskland / Bundesliga"
                    document.getElementById("bundesliga").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 301) {
                    wherearewe = "Frankrig / Ligue 1"
                    document.getElementById("ligue1").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 384) {
                    wherearewe = "Italien / Serie A"
                    document.getElementById("seriea").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 564) {
                    wherearewe = "Spanien / La Liga"
                    document.getElementById("laliga").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 720) {
                    wherearewe = "Europa / VM Kvalifikation Europa"
                    document.getElementById("restenafverden").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 1325) {
                    wherearewe = "Europa / EM Kvalifikation"
                    document.getElementById("restenafverden").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 1326) {
                    wherearewe = "Europa / EM"
                    document.getElementById("restenafverden").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 2286) {
                    wherearewe = "Europa / Conference League"
                    document.getElementById("restenafverden").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 732) {
                    wherearewe = "Verden / VM"
                    document.getElementById("restenafverden").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 1082) {
                    wherearewe = "Verden / Venskabskamp"
                    document.getElementById("restenafverden").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 1125) {
                    wherearewe = "Verden / OL"
                    document.getElementById("restenafverden").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else if (item.league_id === 1398) {
                    wherearewe = "Verden / Audi Cup"
                } else if (item.league_id === 1538) {
                    wherearewe = "Europa / UEFA Nations League"
                    document.getElementById("restenafverden").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                } else {
                    wherearewe = "Mindre liga"
                    document.getElementById("restenafverden").classList.remove("display-not");
                    document.getElementById("nogames").classList.add("display-not");
                }
                    if ((leagueParse !== 0 && item.league_id === leagueParse && item.time.starting_at.date === dateParse && item.odds.data.length > 0) || (leagueParse === 0 && item.league_id !== 2 && item.league_id !== 271 && item.league_id !== 8 && item.league_id !== 564 && item.league_id !== 301 && item.league_id !== 82 && item.league_id !== 573 && item.time.starting_at.date === dateParse && item.odds.data.length > 0) && (item.odds.data[0].bookmaker.data[0].odds.data[0] && item.odds.data[0].bookmaker.data[0].odds.data[1] && item.odds.data[0].bookmaker.data[0].odds.data[2])) {
                        var betButton1;
                        var betButton2;
                        var betButton3;
                        if (item.time.status === "NS") {
                        betButton1 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "0"} onClick={() => place3wayBet(item.id + "-" + "0", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[0].bookmaker.data[0].odds.data[0].value, "0", item.time.starting_at.timestamp)}><p className="odd-data-p">1</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[0].value}</p></button>;
                        betButton2 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "1"} onClick={() => place3wayBet(item.id + "-" + "1", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[0].bookmaker.data[0].odds.data[1].value, "1", item.time.starting_at.timestamp)}><p className="odd-data-p">X</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[1].value}</p></button>;
                        betButton3 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "2"} onClick={() => place3wayBet(item.id + "-" + "2", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[0].bookmaker.data[0].odds.data[2].value, "2", item.time.starting_at.timestamp)}><p className="odd-data-p">2</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[2].value}</p></button>;
                    } else {
                        betButton1 = <button className="stage-kampe-odds-btn odd-off">{item.odds.data[0].bookmaker.data[0].odds.data[0].value}</button>;
                        betButton2 = <button className="stage-kampe-odds-btn odd-off">{item.odds.data[0].bookmaker.data[0].odds.data[1].value}</button>;
                        betButton3 = <button className="stage-kampe-odds-btn odd-off">{item.odds.data[0].bookmaker.data[0].odds.data[2].value}</button>;
                        }
    
                        if (sessionStorage.getItem("notUsableBtn") !== "" && sessionStorage.getItem("notUsableBtn") !== null && sessionStorage.getItem("notUsableBtn") !== undefined) {
                            for (var p in JSON.parse(sessionStorage.getItem("notUsableBtn"))) {
                                var removedPart = JSON.parse(sessionStorage.getItem("notUsableBtn"))[p].slice(11)
                                if (removedPart === item.id + "-" + "0") {
                                    betButton1 = <button className="stage-kampe-odds-btn odd-off"><p className="odd-data-p">1</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[0].value}</p></button>;
                                }
                                if (removedPart === item.id + "-" + "1") {
                                    betButton2 = <button className="stage-kampe-odds-btn odd-off"><p className="odd-data-p">X</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[1].value}</p></button>;
                                }
                                if (removedPart === item.id + "-" + "2") {
                                    betButton3 = <button className="stage-kampe-odds-btn odd-off"><p className="odd-data-p">2</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[2].value}</p></button>;
                                }
                            }
                        }
                        const gameURL = "/stage/match?game=" + item.id;
                        return (
                            <li key={item.id}>
                                <div className="stage-match">
                                    <div className="stage-kampe-top">
                                        <p className="stage-top-p">Fodbold / {wherearewe}</p>
                                    </div>
                                    <div className="stage-indhold-down">
                                        <Link to={gameURL} className="stage-kampe-hold">
                                            <p className={timeClass}>{liveView}</p>
                                            <div className="stage-kampe-hold-div">
                                                <div className="stage-kampe-team">
                                                    <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                    <img alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                    <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                </div>
                                                <div className="stage-kampe-team">
                                                    <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                    <img alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                    <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                </div>
                                            </div>
                                        </Link>
                                            <div className="stage-kampe-odds">
                                                {betButton1}
                                                {betButton2}
                                                {betButton3}
                                           </div>
                                        </div>
                                    </div>
                            </li>);
                    } else {
                        if ((leagueParse !== 0 && item.league_id === leagueParse && item.time.starting_at.date === dateParse) || (leagueParse === 0 && item.league_id !== 2 && item.league_id !== 271 && item.league_id !== 8 && item.league_id !== 564 && item.league_id !== 301 && item.league_id !== 82 && item.league_id !== 573 && item.time.starting_at.date === dateParse)) {
                            const gameURL = "/stage/match?game=" + item.id;
                            return (
                                <li key={item.id}>
                                    <div className="stage-match">
                                        <div className="stage-kampe-top">
                                            <p className="stage-top-p">Fodbold / {wherearewe}</p>
                                        </div>
                                        <div className="stage-indhold-down">
                                            <Link to={gameURL} className="stage-kampe-hold">
                                                <p className={timeClass}>{liveView}</p>
                                                <div className="stage-kampe-hold-div">
                                                    <div className="stage-kampe-team">
                                                        <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                        <img alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                        <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                    </div>
                                                    <div className="stage-kampe-team">
                                                        <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                        <img alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                        <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                                <div className="stage-kampe-odds">
                                                    <p className="noodds">Odds ikke opdateret</p>
                                            </div>
                                            </div>
                                        </div>
                                </li>);
                        }
                    }
            })
        } else if (document.getElementById("superliga")) {
            document.getElementById("superliga").classList.add("display-not");
            document.getElementById("seriea").classList.add("display-not");
            document.getElementById("championsleague").classList.add("display-not");
            document.getElementById("ligue1").classList.add("display-not");
            document.getElementById("laliga").classList.add("display-not");
            document.getElementById("bundesliga").classList.add("display-not");
            document.getElementById("restenafverden").classList.add("display-not");
            document.getElementById("premierleague").classList.add("display-not");
            document.getElementById("nogames").classList.add("display");

            document.getElementById("superliga").classList.remove("display");
            document.getElementById("seriea").classList.remove("display");
            document.getElementById("championsleague").classList.remove("display");
            document.getElementById("ligue1").classList.remove("display");
            document.getElementById("laliga").classList.remove("display");
            document.getElementById("bundesliga").classList.remove("display");
            document.getElementById("restenafverden").classList.remove("display");
            document.getElementById("premierleague").classList.remove("display");
            document.getElementById("nogames").classList.remove("display-not");
        }
    }

    function setSingleIndsatser(indsats, id) {
        var tempIndsats = 0;
        var classArray = document.getElementsByClassName("single-kupon-input");
        for(var i = 0; i < classArray.length; i++){
            if ((classArray[i] as HTMLInputElement).value !== "" && (classArray[i] as HTMLInputElement).value !== null && (classArray[i] as HTMLInputElement).value !== undefined) {
                tempIndsats = tempIndsats + parseInt((classArray[i] as HTMLInputElement).value);
            }
        }
        setSingleIndsats(tempIndsats);
    }

    function showLigaer() {
        if (ligaLoad === false) {
            fetch("https://soccer.sportmonks.com/api/v2.0/leagues?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=country&bookmakers=2&tz=Europe/Copenhagen")
            .then(response => response.json())
            .then(function (result) {
                console.log("Leagues", result);
                setCurrentLeagues(result.data);
                document.getElementById("stage-loader3").classList.remove("display");
            })
            .catch(error => console.log('error', error));
            setLigaLoad(true);
        }
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        document.getElementById("leagueModal").classList.remove("display-not");
    }

    function remLigaer() {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        document.getElementById("leagueModal").classList.add("display-not");
    }

    function gameInfo() {
        if (localStorage.getItem("activeGame")) {
            return (
                <div className="info-section">
                    <p className="info-h1">Velkommen, {username}</p>
                    <p className="info-p">Valgte spil: <span className="info-p-span">{activeGameName}</span></p><br />
                    <p className="info-p">Placering: <span className="info-p-span">{position}</span> af <span className="info-p-span">{positionCount}</span></p><br />
                    <p className="info-p">Tilgængelige ligaer: <span className="info-p-span-hover" onClick={() => {showLigaer()}}>Se tilgængelige ligaer</span></p><br />
                    <p className="info-p">Slutdato: <span className="info-p-span">{slutdato}</span></p>
                </div>
            );
        } else {
            return (
                <div className="info-section">
                    <p className="info-h1">Velkommen, {username}</p>
                    <p className="info-p">Du har ikke noget valgt spil.</p>
                    <Link to="/stage/aktive-spil">
                        <button className="gruppespil-btn">Vælg spil</button>
                    </Link>
                </div>
            );
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

    function showSearch() {
        document.getElementById("mb-search").classList.remove("display-not")
        document.getElementById("nav-hits").classList.add("display");
        document.getElementById("hits-close").classList.add("display");
    }

    function getFavorit() {
        if (favoritter.length > 0) {
            return favoritter.map((item) => {
                var linkURL = "/stage/team?team=" + item.id;
                return (
                    <li key={item.name + item.image} className="display" style={{width: "100%"}}>
                        <div className="stage-team">
                            <Link to={linkURL} className="stage-kampe-team2">
                                <div className="stage-kampe-teams-div">
                                    <img src={item.image} className="stage-teams-img" />
                                    <div className="stage-teams-element">
                                        <p className="stage-teams-h1">{item.name}</p>
                                        <p className="stage-teams-h2">{item.liga}</p>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </Link>
                        </div>
                    </li>
                    );
                }
            )
        } else {
            return (
                <div className="stage-team" style={{backgroundColor: "var(--surface)"}} onClick={() => {showSearch()}}>
                    <div className="stage-kampe-team2">
                        <div className="stage-kampe-teams-div">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stage-teams-img" style={{opacity: "0.2"}} viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                            </svg>
                            <div className="stage-teams-element">
                                <p className="stage-teams-h2">Klik for at tilføje dit første hold som favorit</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    function showModal(type, modalType) {
        if (type === "bet") {
            if (modalType === "kombination") {
                var nowDate = new Date().getTime();
            var varighedDate = new Date(slutdato).getTime();
            if (!(odds.length > 0) || !(localStorage.getItem("activeGame")) || indsats <= 0) {
                if (!(odds.length > 0)) {
                    setNotiMessage("error", "Ingen væddemål", "Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.");
                } else if (!(localStorage.getItem("activeGame"))) {
                    setNotiMessage("error", "Intet aktivt gruppespil", "For at placere et væddemål, skal du være tilmeldt et gruppespil, og sætte det som aktivt.");
                } else if (indsats <= 0) {
                    setNotiMessage("error", "Positivt beløb", "Din indsats på dit væddemål skal være positiv.");
                }
            } else if (nowDate > varighedDate) {
                setNotiMessage("error", "Gruppespil slut", "Gruppespillet er desværre allerede færdiggjort.");
            } else {
                if (currentMoney < indsats || indsats < parseInt(selectedGame["min_amount"].slice(0, -4)) || indsats > parseInt(selectedGame["max_amount"].slice(0, -4))) {
                    if (currentMoney < indsats) {
                        setNotiMessage("error", "Ikke nok penge", "Du har ikke nok penge, til at placere denne kupon. Prøv med et lavere beløb.");
                    } else if (indsats < parseInt(selectedGame["min_amount"].slice(0, -4))) {
                        setNotiMessage("error", "Minimumsbeløb", "Dette gruppespil spiller med et minimumsbeløb på " + selectedGame["min_amount"]);
                    } else if (indsats > parseInt(selectedGame["max_amount"].slice(0, -4))) {
                        setNotiMessage("error", "Maksimumsbeløb", "Dette gruppespil spiller med et maksimumsbeløb på " + selectedGame["max_amount"]);
                    }
                } else {

                var last_date = 0;
                var gammel = false;
                var currentDate = new Date().getTime();
                for (var p in odds) {
                    const bet_dato = parseInt(odds[p].odds_date);
                    if (bet_dato*1000 < currentDate) {
                        setNotiMessage("error", "Gammel væddemål", "Et væddemål du prøver at oddse på er allerede startet.");
                        gammel = true;
                    } else {
                        if (bet_dato > last_date) {
                            last_date = bet_dato;
                        }
                    }
                }

                if (gammel !== true) {
                    document.getElementById("bet-modal").classList.remove("display-not")
                        document.getElementById("errorCon").classList.remove("display")
                }
                }
            }
            } else {
                var nowDate = new Date().getTime();
            var varighedDate = new Date(slutdato).getTime();
            if (!(odds.length > 0) || !(localStorage.getItem("activeGame")) || singleIndsats <= 0) {
                if (!(odds.length > 0)) {
                    setNotiMessage("error", "Ingen væddemål", "Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.");
                } else if (!(localStorage.getItem("activeGame"))) {
                    setNotiMessage("error", "Intet aktivt gruppespil", "For at placere et væddemål, skal du være tilmeldt et gruppespil, og sætte det som aktivt.");
                } else if (singleIndsats <= 0) {
                    setNotiMessage("error", "Positivt beløb", "Din indsats på dit væddemål skal være positiv.");
                }
            } else if (nowDate > varighedDate) {
                setNotiMessage("error", "Gruppespil slut", "Gruppespillet er desværre allerede færdiggjort.");
            } else {
                if (currentMoney < singleIndsats || singleIndsats < parseInt(selectedGame["min_amount"].slice(0, -4)) || singleIndsats > parseInt(selectedGame["max_amount"].slice(0, -4))) {
                    if (currentMoney < singleIndsats) {
                        setNotiMessage("error", "Ikke nok penge", "Du har ikke nok penge, til at placere denne kupon. Prøv med et lavere beløb.");
                    } else if (singleIndsats < parseInt(selectedGame["min_amount"].slice(0, -4))) {
                        setNotiMessage("error", "Minimumsbeløb", "Dette gruppespil spiller med et minimumsbeløb på " + selectedGame["min_amount"]);
                    } else if (singleIndsats > parseInt(selectedGame["max_amount"].slice(0, -4))) {
                        setNotiMessage("error", "Maksimumsbeløb", "Dette gruppespil spiller med et maksimumsbeløb på " + selectedGame["max_amount"]);
                    }
                } else {
    
                var last_date = 0;
                var gammel = false;
                var currentDate = new Date().getTime();
                for (var p in odds) {
                    const bet_dato = parseInt(odds[p].odds_date);
                    if (bet_dato*1000 < currentDate) {
                        setNotiMessage("error", "Aktiv kamp", "En kamp du prøver at oddse på, er allerede sat igang.");
                        gammel = true;
                    } else {
                        if (bet_dato > last_date) {
                            last_date = bet_dato;
                        }
                    }
                }
    
                if (gammel !== true) {
                    document.getElementById("singler-modal").classList.remove("display-not")
                        document.getElementById("errorCon").classList.remove("display")
                }
                }
            }
            }
        }
    }

    function getCurrentLeagues() {
        return (
            <div className="league-modal display-not" id="leagueModal">
                <div className="league-wrapper">
                    <div className="leagues-top-right">
                        <svg xmlns="http://www.w3.org/2000/svg" className="exp-icon" viewBox="0 0 16 16" onClick={() => remLigaer()}>
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                    </div>
                    <p className="league-modal-h1">Tilgængelige ligaer</p>
                    <div className="match-loader display" id="stage-loader3"></div>
                    <ul className="league-modal-table">
                        <li className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <img src="https://cdn.sportmonks.com/images/countries/png/short/dk.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Danmark</p>
                            </div>
                            <p className="league-modal-p">#320</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Denmark") {
                                return (
                                    <li className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <img src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <img src="https://cdn.sportmonks.com/images/countries/png/short/eu.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">International</p>
                            </div>
                            <p className="league-modal-p">#41</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Europe") {
                                return (
                                    <li className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <img src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <img src="https://cdn.sportmonks.com/images/countries/png/short/gb.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">England</p>
                            </div>
                            <p className="league-modal-p">#462</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "England") {
                                return (
                                    <li className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <img src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <img src="https://cdn.sportmonks.com/images/countries/png/short/de.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Tyskland</p>
                            </div>
                            <p className="league-modal-p">#11</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Germany") {
                                return (
                                    <li className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <img src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <img src="https://cdn.sportmonks.com/images/countries/png/short/fr.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Frankrig</p>
                            </div>
                            <p className="league-modal-p">#17</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "France") {
                                return (
                                    <li className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <img src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <img src="https://cdn.sportmonks.com/images/countries/png/short/it.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Italien</p>
                            </div>
                            <p className="league-modal-p">#251</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Italy") {
                                return (
                                    <li className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <img src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <img src="https://cdn.sportmonks.com/images/countries/png/short/es.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Spanien</p>
                            </div>
                            <p className="league-modal-p">#32</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Spain") {
                                return (
                                    <li className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <img src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <img src="https://cdn.sportmonks.com/images/countries/png/short/eu.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Resten af verden</p>
                            </div>
                            <p className="league-modal-p">#</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name !== "Germany" && item.country.data.name !== "England" && item.country.data.name !== "Denmark" && item.country.data.name !== "Spain" && item.country.data.name !== "Europe" && item.country.data.name !== "Italy" && item.country.data.name !== "France") {
                                return (
                                    <li className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <img src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <>
        {getCurrentLeagues()}
        <div className="modal-test display-not" id="bet-modal">
            <div className="modal-con">
                <p className="con-modal-p">Er du sikker på, at du vil placere din kupon, med en indsats på {indsats},00 kr? Dette beløb er ikke refunderbart.</p>
                <div className="modal-wrapper">
                    <button className="con-modal-btn" id="placeBetBTN1" onClick={() => {var placeBetBTN = document.getElementById("placeBetBTN");
                        placeBetBTN.innerHTML = "<div class='loader'></div>";
                        placeBet("kombination");}}>Placér kupon</button>
                    <button className="con-modal-afbryd" onClick={() => {document.getElementById("bet-modal").classList.add("display-not")}}>Afbryd</button>
                </div>
            </div>
        </div>
        <div className="modal-test display-not" id="singler-modal">
            <div className="modal-con">
                <p className="con-modal-p">Er du sikker på, at du vil placere din kupon, med en indsats på {singleIndsats},00 kr? Dette beløb er ikke refunderbart.</p>
                <div className="modal-wrapper">
                    <button className="con-modal-btn" id="placeBetBTN1" onClick={() => {var placeBetBTN1 = document.getElementById("placeBetBTN1");
                        placeBetBTN1.innerHTML = "<div class='loader'></div>";
                        placeBet("singler");}}>Placér kupon</button>
                    <button className="con-modal-afbryd" onClick={() => {document.getElementById("singler-modal").classList.add("display-not")}}>Afbryd</button>
                </div>
            </div>
        </div>
        <div className="modal-test display-not" id="placed-modal" style={{textAlign: "center"}}>
            <div className="modal-con">
                <div className="con-modal-img-con">
                    <img src={Congrats} alt="" className="con-modal-img" />
                </div>
                <p className="con-modal-h1">Din kupon er placeret!</p>
                <p className="con-modal-p">Tag et kig under dit aktive gruppespil, for at se din kupon.</p>
                <div className="modal-wrapper">
                    <button className="con-modal-btn" onClick={() => {document.getElementById("placed-modal").classList.add("display-not")}}>Modtaget</button>
                </div>
            </div>
        </div>
        <div className="stage-main-container">
            <div className={messageType} id="errorCon">
                <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div className="error-text">
                    <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                    <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                </div>
            </div>
            <div className="stage-main">
                {gameInfo()}
                <div className="stage-main-kampe-section">
                <div className="stage-main-section">
                <div className="match-loader display" id="stage-loader1"></div>
                    <div className="stage-section-indhold" id="stage-main1">
                    <div className="stage-kampe-top">
                        <p className="stage-kampe-h1">Dagens kampe</p>
                        <div className="stage-cal">
                            <div className="stage-cal-val">
                                <div className="cal-element" onClick={() => {setSelected(new Date(new Date(selected).getTime() - (3600 * 1000 * 24)))}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="cal-sicon" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </div>
                                <div className="cal-element" onClick={() => {setSelected(new Date(new Date(selected).getTime() + (3600 * 1000 * 24)))}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="cal-sicon" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="chosen-cal-con" onClick={() => {showCal()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="cal-icon" viewBox="0 0 16 16">
                                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                                <p className="stage-chosen-cal">{chosenDate}</p>
                            </div>
                            <div className="stage-daypicker" id="cal">
                                <DayPicker
                                    mode="single"
                                    selected={selected}
                                    onSelect={setSelected}
                                    locale={da}
                                    styles={{
                                        caption: { color: 'var(--softBlack)' }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="nogames" id="nogames">Der kunne ikke findes nogen kampe d. {new Date(selected).getDate()}/{new Date(selected).getMonth() + 1}/{new Date(selected).getFullYear()}...</p>
                    <div className="stage-kampe-section" id="superliga">
                        <div className="stage-kampe-head">
                            <p className="stage-league">Superliga</p>
                        </div>
                        <div className="stage-kampe">
                            {loadingText}
                            <ul>
                                {getMatchHtml(271, selectedDate)}
                            </ul>
                        </div>
                    </div>
                    <div className="stage-kampe-section" id="premierleague">
                        <div className="stage-kampe-head" style={{borderLeft: "4px var(--green) solid"}}>
                            <p className="stage-league">Premier League</p>
                        </div>
                        <div className="stage-kampe" id="premierleague">
                        {loadingText}
                            <ul>
                                {getMatchHtml(8, selectedDate)}
                            </ul>
                        </div>
                    </div>
                    <div className="stage-kampe-section" id="championsleague">
                        <div className="stage-kampe-head" style={{borderLeft: "4px var(--red) solid"}}>
                            <p className="stage-league">Champions League</p>
                        </div>
                        <div className="stage-kampe" id="premierleague">
                        {loadingText}
                            <ul>
                                {getMatchHtml(2, selectedDate)}
                            </ul>
                        </div>
                    </div>
                    <div className="stage-kampe-section" id="laliga">
                        <div className="stage-kampe-head" style={{borderLeft: "4px var(--green) solid"}}>
                            <p className="stage-league">La Liga</p>
                        </div>
                        <div className="stage-kampe" id="restoftheworld">
                        {loadingText}
                            <ul>
                                {getMatchHtml(564, selectedDate)}
                            </ul>
                        </div>
                    </div>
                    <div className="stage-kampe-section" id="ligue1">
                        <div className="stage-kampe-head" style={{borderLeft: "4px var(--green) solid"}}>
                            <p className="stage-league">Ligue 1</p>
                        </div>
                        <div className="stage-kampe" id="restoftheworld">
                        {loadingText}
                            <ul>
                                {getMatchHtml(301, selectedDate)}
                            </ul>
                        </div>
                    </div>
                    <div className="stage-kampe-section" id="seriea">
                        <div className="stage-kampe-head" style={{borderLeft: "4px var(--green) solid"}}>
                            <p className="stage-league">Serie A</p>
                        </div>
                        <div className="stage-kampe" id="restoftheworld">
                        {loadingText}
                            <ul>
                                {getMatchHtml(503, selectedDate)}
                            </ul>
                        </div>
                    </div>
                    <div className="stage-kampe-section" id="bundesliga">
                        <div className="stage-kampe-head" style={{borderLeft: "4px var(--green) solid"}}>
                            <p className="stage-league">Bundesliga</p>
                        </div>
                        <div className="stage-kampe" id="restoftheworld">
                        {loadingText}
                            <ul>
                                {getMatchHtml(82, selectedDate)}
                            </ul>
                        </div>
                    </div>
                    <div className="stage-kampe-section" id="restenafverden">
                        <div className="stage-kampe-head" style={{borderLeft: "4px var(--green) solid"}}>
                            <p className="stage-league">Resten af verden</p>
                        </div>
                        <div className="stage-kampe" id="restoftheworld">
                        {loadingText}
                            <ul>
                                {getMatchHtml(0, selectedDate)}
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="stage-main-small-section">
                    <div className="match-loader display" id="stage-loader2"></div>
                        <div className="stage-section-indhold" id="stage-main2">
                            <div className="stage-kampe-top">
                                <p className="stage-kampe-h1">Favoritter</p>
                            </div>
                            <ul>
                                {getFavorit()}
                            </ul>
                        </div>
                        <div className="stage-section-indhold" id="stage-main3">
                            <div className="stage-kampe-top">
                                <p className="stage-kampe-h1">Populære hold</p>
                            </div>
                            <div className="stage-team">
                                <Link to="/stage/team?team=18583" className="stage-kampe-team2">
                                    <div className="stage-kampe-teams-div">
                                        <img src="https://cdn.sportmonks.com/images/soccer/teams/23/18583.png" className="stage-teams-img" />
                                        <div className="stage-teams-element">
                                            <p className="stage-teams-h1">Danmark</p>
                                            <p className="stage-teams-h2">Landshold</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>
                                </Link>
                            </div>
                            <div className="stage-team">
                                <Link to="/stage/team?team=18647" className="stage-kampe-team2">
                                    <div className="stage-kampe-teams-div">
                                        <img src="https://cdn.sportmonks.com/images/soccer/teams/23/18647.png" className="stage-teams-img" />
                                        <div className="stage-teams-element">
                                            <p className="stage-teams-h1">Frankrig</p>
                                            <p className="stage-teams-h2">Landshold</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>
                                </Link>
                            </div>
                            <div className="stage-team">
                                <Link to="/stage/team?team=8" className="stage-kampe-team2">
                                    <div className="stage-kampe-teams-div">
                                        <img src="https://cdn.sportmonks.com/images/soccer/teams/8/8.png" className="stage-teams-img" />
                                        <div className="stage-teams-element">
                                            <p className="stage-teams-h1">Liverpool</p>
                                            <p className="stage-teams-h2">Premier League</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>
                                </Link>
                            </div>
                            <div className="stage-team">
                                <Link to="/stage/team?team=3468" className="stage-kampe-team2">
                                    <div className="stage-kampe-teams-div">
                                        <img src="https://cdn.sportmonks.com/images/soccer/teams/12/3468.png" className="stage-teams-img" />
                                        <div className="stage-teams-element">
                                            <p className="stage-teams-h1">Real Madrid</p>
                                            <p className="stage-teams-h2">La Liga</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>
                                </Link>
                            </div>
                            <div className="stage-team">
                                <Link to="/stage/team?team=14" className="stage-kampe-team2">
                                    <div className="stage-kampe-teams-div">
                                        <img src="https://cdn.sportmonks.com/images/soccer/teams/14/14.png" className="stage-teams-img" />
                                        <div className="stage-teams-element">
                                            <p className="stage-teams-h1">Manchester United</p>
                                            <p className="stage-teams-h2">Premier League</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>
                                </Link>
                            </div>
                            <div className="stage-team">
                                <Link to="/stage/team?team=85" className="stage-kampe-team2">
                                    <div className="stage-kampe-teams-div">
                                        <img src="https://cdn.sportmonks.com/images/soccer/teams/21/85.png" className="stage-teams-img" />
                                        <div className="stage-teams-element">
                                            <p className="stage-teams-h1">FC København</p>
                                            <p className="stage-teams-h2">Superliga</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stage-kupon" id="kupon">
                <div className="kupon-top">
                    <p className="kupon-header-p">{kuponType}</p>
                    <p className="kupon-blue-p" onClick={() => emptyBets()}>Ryd alle</p>
                </div>
                <div className="kupon-type" id="kuponType">
                    <div className="kupon-type-element" id="singler" onClick={() => {setKuponType("Singler")}}>Singler</div>
                    <div className="kupon-type-element kupon-type-element-active" id="kombination" onClick={() => {setKuponType("Kombination")}}>Kombination</div>
                    {/* <div className="kupon-type-element" id="system" onClick={() => {setKuponType("System")}}>System</div> */}
                </div>
                <ul className="stage-ul" id="kombination-content">
                    {odds.map(bet => {
                        return (
                            <li key={bet.id}>
                                <div className="kupon-container">
                                    <div className="kupon-divider-first"></div>
                                    <p className="kupon-top-p">Dit væddemål</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="kupon-icon2" onClick={() => {delBet(bet.id, bet.match);}} viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                    <div className="kupon-divider"></div>
                                    <div className="kupon-content">
                                        <div className="kupon-info">
                                            <p className="kupon-h1">{bet.hometeam} - {bet.visitorteam}</p>
                                            <p className="kupon-p">{getKupon(bet.odds_type,bet.hometeam,bet.visitorteam)}: <span className="weight600">{getString(bet.odds_type,bet.odds_result,bet.hometeam,bet.visitorteam)}</span></p>
                                        </div>
                                        <div className="kupon-odds">
                                            <p className="kupon-h2">{bet.probability}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <ul className="stage-ul" id="singler-content">
                    {odds.map(bet => {
                        return (
                            <li key={bet.id}>
                                <div className="kupon-container">
                                    <div className="kupon-divider-first"></div>
                                    <p className="kupon-top-p">Dit væddemål</p>
                                    <div className="kupon-divider"></div>
                                    <div className="kupon-content">
                                        <div className="kupon-info">
                                            <p className="kupon-h1">{bet.hometeam} - {bet.visitorteam}</p>
                                            <p className="kupon-p">{getKupon(bet.odds_type,bet.hometeam,bet.visitorteam)}: <span className="weight600">{getString(bet.odds_type,bet.odds_result,bet.hometeam,bet.visitorteam)}</span></p>
                                        </div>
                                        <div className="kupon-odds">
                                            <p className="kupon-h2">{bet.probability}</p>
                                            <input type="number" className="single-kupon-input" autoComplete="off" id={"singleindsats"+bet.match+"-"+bet.odds_result} placeholder="Indsats" onChange={event => {setSingleIndsatser(parseInt(event.target.value), bet.id); updateUdbetaling("singler", bet.probability, parseInt(event.target.value))}}/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className="kupon-bottom display" id="kombination-bottom">
                    <div className="kupon-bottom-info">
                        <div className="kupon-indsats">
                            <input type="number" className="kupon-input" autoComplete="off" id="indsatsInput" placeholder="Indsats" onChange={event => {setIndsats(parseInt(event.target.value)); updateUdbetaling("kombination", "", 0)}}/>
                        </div>
                        <div className="kupon-info-div">
                            <p className="kupon-bottom-info-p">Total indsats</p>
                            <p className="kupon-bottom-info-p-right">{indsats},00 kr.</p>
                        </div>
                        <div className="kupon-info-div">
                            <p className="kupon-bottom-info-p">Total odds</p>
                            <p className="kupon-bottom-info-p-right">{returnOdds.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="kupon-confirm">
                        <div className="kupon-confirm-div">
                            <p className="kupon-confirm-p">Udbetaling:</p>
                            <p className="kupon-confirm-h1">{udbetaling.toFixed(2)} kr.</p>
                        </div>
                        <button className={kuponBtn} id="placeBetBTN" onClick={() => {showModal("bet", "kombination")}}>Placér bet</button>
                    </div>
                </div>
                <div className="kupon-bottom" id="singler-bottom">
                    <div className="kupon-bottom-info">
                        <div className="kupon-info-div">
                            <p className="kupon-bottom-info-p">Total indsats</p>
                            <p className="kupon-bottom-info-p-right">{singleIndsats},00 kr.</p>
                        </div>
                    </div>
                    <div className="kupon-confirm">
                        <div className="kupon-confirm-div">
                            <p className="kupon-confirm-p">Udbetaling:</p>
                            <p className="kupon-confirm-h1">{singleUdbetaling.toFixed(2)} kr.</p>
                        </div>
                        <button className={kuponBtn} id="placeBetBTN" onClick={() => {showModal("bet", "singler")}}>Placér bet</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
 
export default StageForside;
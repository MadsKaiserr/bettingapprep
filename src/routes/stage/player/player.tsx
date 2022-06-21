import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link, NavLink } from 'react-router-dom';

// import "./player.css";
 
function StagePlayer () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const [loadingText, setLoadingText] = useState("Indlæser...");

    // useEffect(() => {
    //     if (loadingText !== "Indlæser...") {
    //         document.getElementById("stage-loader1").classList.remove("display");
    //         document.getElementById("stage-loader2").classList.remove("display");
    //     }
    // }, [loadingText])


    const [dataLoad, setDataLoad] = useState(false);

    const [player_name, setPlayer_name] = useState("...");
    const [logo, setLogo] = useState("");
    const [player_team, setPlayer_team] = useState("Indlæser...");

    if (!dataLoad) {
        setTimeout(function (){
            getGame();
        }, 500);
        setDataLoad(true);
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var playerID = parseInt(urlParams.get("id"));

    function getGame() {
        fetch("https://soccer.sportmonks.com/api/v2.0/players/" + playerID + "?api_token="+process.env.REACT_APP_BETTING_API_SECRET+"&include=&tz=Europe/Copenhagen")
        .then(response => response.json())
        .then(function (result) {
            console.log(result);
            setLogo(result.data.image_path);
            setPlayer_name(result.data.fullname);
            setPlayer_team(result.data.nationality);
            setLoadingText("");
        }) .catch(error => 
            console.log('error', error
        ));
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

    const navigate = useNavigate();

    return (
        <>
            <div className="stage-main-article-container">
                <div className={messageType} id="errorCon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div className="error-text">
                        <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                        <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                    </div>
                </div>
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="match-back" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                </button>
                <div className="match-info">
                    <div className="team-team">
                        <div className="match-title-text">
                            <h1 className="match-h1">{player_name}</h1>
                            <p className="match-p team-p">{player_team}</p>
                        </div>
                        <img src={logo} alt="" className="match-img" />
                    </div>
                </div>
                {/* <div className="match-info" id="team_match">
                </div> */}
            </div>
        </>
    )
}
 
export default StagePlayer; 
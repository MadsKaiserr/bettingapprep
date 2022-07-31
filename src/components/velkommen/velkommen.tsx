import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import './velkommen.css';
import VelkommenImg from '../../assets/img/velkommen.svg';
 
function Velkommen () {

    document.getElementsByTagName("body")[0].style.overflow = "hidden";

    function close() {
        document.getElementById("velkommen").classList.add("display-not");
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        localStorage.setItem("velkommen", "no");
    }

    return (
        <>
            <div className="velkommen-wrapper" id="velkommen">
                <div className="velkommen-container">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => close()} className="login-close" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    <img src={VelkommenImg} alt="" className="velkommen-img" />
                    <p className="velkommen-h1">Tips til at komme igang</p>
                    <div className="velkommen-list">
                        <div className="velkommen-element">
                            <p className="velkommen-h2">1</p>
                            <p className="velkommen-h3">Inden du kan bette løs mod dine venner, skal du finde et gruppespil at spille i</p>
                        </div>
                        <div className="velkommen-element">
                            <p className="velkommen-h2">2</p>
                            <p className="velkommen-h3">Tilmeld dig et gruppespil, og bet løs mod dine modstandere</p>
                        </div>
                        <div className="velkommen-element">
                            <p className="velkommen-h2">3</p>
                            <p className="velkommen-h3">Placer din første kupon her på hjemmesiden</p>
                        </div>
                        <div className="velkommen-element">
                            <p className="velkommen-h2">4</p>
                            <p className="velkommen-h3">Inviter dine venner, og ha' det sjovt</p>
                        </div>
                    </div>
                    <Link to="/stage/find-spil"><button className="velkommen-btn" onClick={() => {close();}}>FIND SPIL</button></Link>
                </div>
            </div>
        </>
    )
}
 
export default Velkommen;
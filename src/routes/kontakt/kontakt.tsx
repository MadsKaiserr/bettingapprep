import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link, NavLink } from 'react-router-dom';

import './kontakt.css';

function Kontakt() {

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="kontakt-parent"><path className="pages-wave" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <div className="kontakt-container">
                <div className="kontakt-where">
                    <p className="kontakt-where-h1">Kontakt os</p>
                    <div className="kontakt-where-splitter"></div>
                    <p className="kontakt-where-h2">Tipsspillet</p>
                </div>
                <h1 className="kontakt-h1">Kontakt os</h1>
                <p className="kontakt-h3" style={{fontSize: "16px"}}>Vi, hos Tipsspillet, stræber os på at brugeren kan benytte sig af en online betting-platform i alle aldre uden økonomisk risiko.</p>
            </div>
        </>
    );
}

export default Kontakt;
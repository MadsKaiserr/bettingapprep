import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import dollar from '../../assets/img/dollar.png';

import './about.css';
 
function About () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>
            <div className="pages-top">
                <div className="pages-where">
                    <p className="pages-where-h1">Om os</p>
                    <div className="pages-where-splitter"></div>
                    <p className="pages-where-h2">Tipsspillet</p>
                </div>
                <h1 className="pages-h1">Tipsspillet underholder<br />over 40.000 brugere.</h1>
                <p className="start-h3" style={{fontSize: "16px"}}>Vi, hos Tipsspillet, stræber os på at brugeren<br />kan benytte sig af en online betting-platform i<br />alle aldre uden økonomisk risiko.</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="pages-parent"><path className="pages-wave" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <div className="forside-section" style={{marginTop: "-130px"}}>
                <h2 className="fsection-h1">Gratis betting til alle fodbold-interesserede</h2>
                <p className="fsection-h3">Placer væddemål på alverdens kampe med Liveodds direkte fra Bet365. <br />Odds så meget du vil i dine gruppespil - med virtuelle penge.</p>
                <div className="fsection-elements">
                    <div className="fsection-element">
                        <img src={dollar} alt="" className="fsection-img" />
                        <p className="fsection-h4">Virtuelle penge</p>
                        <p className="fsection-h5">SPIL HELT GRATIS</p>
                        <p className="fsection-p">Du modtager et startbeløb i hvert gruppespil. Placer væddemål, og få dit kapital til at stige. Højeste kapital i slutningen af gruppespillet vinder.</p>
                        <Link to="/gruppespil" className="fsection-a">Find gruppespil</Link>
                    </div>
                    <div className="fsection-element">
                        <svg xmlns="http://www.w3.org/2000/svg" className="fsection-img" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
                        </svg>
                        <p className="fsection-h4">Liveodds fra Bet365</p>
                        <p className="fsection-h5">LIVEODDS</p>
                        <p className="fsection-p">Liveodds gør det muligt at opdatere oddsene løbende, i takt med kampene sættes igang. Kan du finde de bedste odds i tide?</p>
                        <br />
                        <Link to="/signup" className="fsection-a">Kom igang med en konto</Link>
                    </div>
                    <div className="fsection-element">
                        <svg xmlns="http://www.w3.org/2000/svg" className="fsection-img" viewBox="0 0 16 16">
                            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
                        </svg>
                        <p className="fsection-h4">Præmiedyster</p>
                        <p className="fsection-h5">VIND OP IMOD 5.000 KR</p>
                        <p className="fsection-p">Deltag i vores præmiedyster, og vind op imod 5.000 kr, hvis du kan finde de rigtige væddemål. Besøg vores sponsorater, og vind fede præmier.</p>
                        <Link to="/priser" className="fsection-a">Find præmiedyster</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default About;
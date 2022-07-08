import * as React from 'react';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';

import './forside.css';
import windowTable from '../../assets/img/table.png';

import red from '../../assets/img/red.png';
import blue from '../../assets/img/blue.png';
import dollar from '../../assets/img/dollar.png';

import CtaSections from '../../components/ctaSections/ctaSections';
import Spiloffer from '../../components/spiloffer/spiloffer';
 
function Forside () {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="hero-container">
                <div className="hero-text">
                    <h1 className="main-component-h1">Fodbold betting<br />- Helt gratis.</h1>
                    <h2 className="main-component-h1-h2">Dyst venner og familie i betting uden risiko.</h2>
                    <div className="hero-divider"></div>
                    <Link to="/gruppespil">
                        <button className="main-btn-default hero-btn">Find gruppespil</button>
                    </Link>
                </div>
                <div className="hero-figures">
                    <img src={red} className="redFigure" alt="Rød animated fodbold figur" />
                    <img src={blue} className="blueFigure" alt="Blå animated fodbold figur" />
                </div>
                <div className="hero-info">
                    <div className="hero-info-block">
                        <p className="hero-info-block-h1">27+</p>
                        <p className="hero-info-block-h2">Ligaer</p>
                    </div>
                    <div className="hero-info-block">
                        <p className="hero-info-block-h1">40K</p>
                        <p className="hero-info-block-h2">Brugere</p>
                    </div>
                    <div className="hero-info-block">
                        <p className="hero-info-block-h1">30+</p>
                        <p className="hero-info-block-h2">Aktive spil</p>
                    </div>
                </div>
                <div className="hero-help">
                    <div className="help-top"></div>
                    <div className="help-container"></div>
                </div>
            </div>
            <div className="forside-section">
                <h2 className="fsection-h1">Liveodds fra Bet365 - Med virtuelle penge</h2>
                <p className="fsection-h3">Placer væddemål på alverdens kampe med Liveodds direkte fra Bet365. <br />Odds så meget du vil i dine gruppespil - med virtuelle penge.</p>
                <div className="fsection-elements" id="anim1">
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
            <div className="section-nyheder-kupon">
                <div className="ny-kupon-left">
                    <p className="ny-kupon-h2">Kuponer og væddemål</p>
                    <h2 className="ny-kupon-h1">Brugerdefinerede<br />væddemål</h2>
                    <p className="ny-kupon-p">Mix og match dine favorit kampe til din forestilling. <br />Fremvis dine betting-evner for dine venner, ved at bygge de bedste væddemål.</p>
                    <Link to="/signup" className="ny-kupon-a">Kom igang her</Link>
                </div>
                <div className="nyheder-kupon">
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
                            <p className="kupon-h1">Liverpool - Tottenham</p>
                            <p className="kupon-p">Kampresultat: <span className="weight600">Liverpool</span></p>
                        </div>
                        <div className="kupon-odds">
                            <p className="kupon-h2">1.40</p>
                        </div>
                    </div>
                    <div className="kupon-container">
                        <div className="kupon-divider-first"></div>
                        <p className="kupon-top-p">Dit væddemål</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="kupon-icon2" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <div className="kupon-divider"></div>
                        <div className="kupon-info">
                            <p className="kupon-h1">Real Madrid - Barcelona</p>
                            <p className="kupon-p">Clean Sheet: <span className="weight600">Barcelona</span></p>
                        </div>
                        <div className="kupon-odds">
                            <p className="kupon-h2">4.33</p>
                        </div>
                    </div>
                    <div className="kupon-bottom">
                        <div className="kupon-bottom-info">
                            <div className="kupon-info-div">
                                <p className="kupon-bottom-info-p">Total indsats</p>
                                <p className="kupon-bottom-info-p-right">100,00 kr.</p>
                            </div>
                            <div className="kupon-info-div">
                                <p className="kupon-bottom-info-p">Total odds</p>
                                <p className="kupon-bottom-info-p-right">6.06</p>
                            </div>
                        </div>
                        <div className="kupon-confirm">
                            <div className="kupon-confirm-div">
                                <p className="kupon-confirm-p">Udbetaling:</p>
                                <p className="kupon-confirm-h1">606 kr.</p>
                            </div>
                            <button className="kupon-btn">Placér bet</button>
                        </div>
                    </div>
                </div>
            </div>
            <Spiloffer />
            <div className="section-nyheder-table">
                <div className="ny-kupon-left">
                    <p className="ny-kupon-h2">Gruppespil</p>
                    <h2 className="ny-kupon-h1">Private gruppespil</h2>
                    <p className="ny-kupon-p">Opret dit eget gruppespil, og sæt dine og dine venners evner på prøve.<br />Find ud af, hvem der er den bedste fodbold-analytiker i din klasse, på dit arbejde eller iblandt venner og familie.</p>
                    <p className="ny-kupon-a">Opret dit første gruppespil</p>
                </div>
                <div className="ny-window">
                    <div className="ny-window-top">
                        <div className="ny-window-dot"></div>
                        <div className="ny-window-dot"></div>
                        <div className="ny-window-dot"></div>
                    </div>
                    <img src={windowTable} alt="" className="window-image"/>
                </div>
            </div>
            <CtaSections />
        </>
    )
}
 
export default Forside;
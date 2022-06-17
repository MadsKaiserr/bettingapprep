import * as React from 'react';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';

import './forside.css';
import windowTable from '../../assets/img/table.png';

import red from '../../assets/img/red.png';
import blue from '../../assets/img/blue.png';

import Abonnement from '../../components/abonnement/abonnement.tsx';
import CtaSections from '../../components/ctaSections/ctaSections.tsx';
import Spiloffer from '../../components/spiloffer/spiloffer.tsx';
 
function Forside () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>
            <div className="hero-container">
                <div className="hero-text">
                    <h1 className="main-component-h1">Dyst venner i betting<br />- Helt gratis.</h1>
                    <h2 className="main-component-h1-h2">Hvem er den bedste better i vennegruppen?</h2>
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
                <div className="blackCircle"></div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className="section-bet" fill-opacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
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
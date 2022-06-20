import * as React from 'react';
import axios from "axios";
import { setNotiMessage } from "../../services/errorMessage.ts";
import { Link } from 'react-router-dom';
import savings from '../../assets/img/savings.svg';
 
function Abonnement () {

    function setMedlemsskab(medlemsskab) {
        console.log(medlemsskab);
    }

    return (
        <>
                <div className="section-price">
                    <div className="plans-container">
                        <div className="plans-con">
                            <div className="plan-element standard">
                                <div className="plan-element-top">
                                    <h5 className="plan-element-identifier">Basic</h5>
                                    <h4 className="plan-element-pris">GRATIS</h4>
                                    <p className="plan-element-binding">For evigt</p>
                                </div>
                                <div className="plan-element-divider"></div>
                                <div className="plan-element-perks">
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i 2 spil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i venners gruppespil</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Opret gruppespil i alle ligaer</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i præmieturneringer</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Gratis betting tips</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Udvidet statistikker</p>
                                    </div>
                                </div>
                                <Link to="/signup">
                                    <button className="square-btn-outline plan-btn">Opret Gratis Konto</button>
                                </Link>
                            </div>
                            <div className="plan-element standard">
                                <div className="plan-element-top">
                                    <h5 className="plan-element-identifier">Premium</h5>
                                    <h4 className="plan-element-pris">79 kr.</h4>
                                    <p className="plan-element-binding">Per sæson</p>
                                </div>
                                <div className="plan-element-divider"></div>
                                <div className="plan-element-perks">
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i uendelige spil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i venners gruppespil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Opret gruppespil i alle ligaer</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Deltag i præmieturneringer</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Gratis betting tips</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Udvidet statistikker</p>
                                    </div>
                                </div>
                                <Link to="/signup">
                                    <button className="square-btn-default plan-btn" onClick={() => { if(!localStorage.getItem("auth")) {window.open("/signup", "_self");} else {setMedlemsskab("premium")}}}>Køb abonnement</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="plan-funktioner">
                        <div className="plan-define">
                            <div className="plan-define-block1">
                                <p className="plan-func-h3">Basic</p>
                                <p className="plan-func-h4">Gratis for evigt</p>
                            </div>
                            <div className="plan-define-block2">
                                <p className="plan-func-h3">Premium</p>
                                <p className="plan-func-h4">79,- per sæson</p>
                            </div>
                        </div>
                        <div className="plan-func-content">
                            <div className="plan-func-top">
                                <p className="plan-func-h1">Fordele og funktioner</p>
                            </div>
                            <div className="plan-func-element">
                                <div className="plan-el-desc">
                                    <p className="plan-func-p">Deltag i private og offentlige spil</p>
                                </div>
                                <div className="plan-el-1">
                                    <p className="plan-func-p">Maks 2</p>
                                </div>
                                <div className="plan-el-2">
                                    <p className="plan-func-p">Uendelige</p>
                                </div>
                            </div>
                            <div className="plan-func-element">
                                <div className="plan-el-desc">
                                    <p className="plan-func-p">Opret gruppespil</p>
                                </div>
                                <div className="plan-el-1">
                                    <p className="plan-func-p">Nej</p>
                                </div>
                                <div className="plan-el-2">
                                    <p className="plan-func-p">Ja</p>
                                </div>
                            </div>
                            <div className="plan-func-element">
                                <div className="plan-el-desc">
                                    <p className="plan-func-p">Deltag i præmiedyster</p>
                                </div>
                                <div className="plan-el-1">
                                    <p className="plan-func-p">Nej</p>
                                </div>
                                <div className="plan-el-2">
                                    <p className="plan-func-p">Ja</p>
                                </div>
                            </div>
                            <div className="plan-func-element">
                                <div className="plan-el-desc">
                                    <p className="plan-func-p">Udvidet statistikker</p>
                                </div>
                                <div className="plan-el-1">
                                    <p className="plan-func-p">Nej</p>
                                </div>
                                <div className="plan-el-2">
                                    <p className="plan-func-p">Ja</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
 
export default Abonnement;
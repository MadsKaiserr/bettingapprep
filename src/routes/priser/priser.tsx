import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'

import './priser.css';
import Abonnement from '../../components/abonnement/abonnement';
import Spiloffer from '../../components/spiloffer/spiloffer';
 
function Priser () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    
    const buyPremium = async e => {
        const stripePromise = await loadStripe('pk_test_51L8ohSHmQPuzRZTtLiNLkrvy2P1EobTAfX90Gl56CIHdj3yHfQU8XpOtdJ8IGxDlP3qPt2CTpRA4H33KBAn7WZK000YexYChIT')
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
        lineItems: [{
            price: 'price_1LGPKhHmQPuzRZTt6V11b9HO',
            quantity: 1,
        }],
        mode: 'payment',
        successUrl: 'https://main.d3hbwy9kjihi1v.amplifyapp.com/priser/done?status=success',
        cancelUrl: 'https://main.d3hbwy9kjihi1v.amplifyapp.com/priser/done?status=cancel',
        });
    };

    return (
        <>
            <div className="pages-top" style={{paddingBottom: "150px"}}>
                <div className="pages-where">
                    <p className="pages-where-h1">Priser</p>
                    <div className="pages-where-splitter"></div>
                    <p className="pages-where-h2">Udforsk</p>
                </div>
                <h1 className="pages-h1">Køb abonnement eller<br />adgangsbilletter.</h1>
                <p className="pages-p">Ingen binding - Betaling pr. sæson uden ekstra betalinger.<br />Start ud med gratis konto. Hurtig, nem opgradering.</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="pages-parent"><path className="pages-wave" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <div className="priser-container">
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
                                <button className="square-btn-default plan-btn" onClick={buyPremium}>Køb abonnement</button>
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
                <Spiloffer />
                <div className="section-price-small">
                    <div className="main-trans">
                        <h2 className="main-component-h2">Er et abonnement ikke noget for dig?</h2>
                        <h3 className="main-component-h2-h2">Engangsbetaling - Ingen binding, nemt, hurtigt og billigt.</h3>
                    </div>
                    <div className="plans-container" style={{marginTop: "50px"}}>
                        <div className="plans-con">
                            <div className="plan-element standard">
                                <div className="plan-element-top">
                                    <h5 className="plan-element-identifier">Præmiedyst adgangsbillet</h5>
                                    <h4 className="plan-element-pris plan-element-pris-gratis">9,-</h4>
                                    <h5 className="plan-element-desc">Få adgang til en valgri præmieturnering, og vind præmier af værdi på op til 5.000 kr.</h5>
                                </div>
                                <div className="plan-element-divider"></div>
                                <div className="plan-element-perks">
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Direkte adgang til valgfrit præmiespil</p>
                                    </div>
                                </div>
                                <Link to="/signup">
                                    <button className="square-btn-outline plan-btn">Køb adgang</button>
                                </Link>
                            </div>
                            <div className="plan-element standard">
                                <div className="plan-element-top">
                                    <h5 className="plan-element-identifier">Gruppespilbillet</h5>
                                    <h4 className="plan-element-pris plan-element-pris-gratis">34,-</h4>
                                    <h5 className="plan-element-desc">Opret dit helt eget private eller offentlige gruppespil, så du kan dyste mod venner eller familie.</h5>
                                </div>
                                <div className="plan-element-divider"></div>
                                <div className="plan-element-perks">
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="plan-element-perk-desc">Opret dit helt eget gruppespil</p>
                                    </div>
                                </div>
                                <Link to="/signup">
                                    <button className="square-btn-outline plan-btn">Køb adgang</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Priser;
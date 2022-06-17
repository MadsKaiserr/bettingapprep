import * as React from 'react';
import { Link } from 'react-router-dom';
 
function CtaSections () {
    return (
        <>
            <div className="plan-container">
                <h1 className="plan-h1">Deltag i præmiespil uden abonnement</h1>
                <p className="plan-h2">Du kan stadig deltage i præmiedyster uden abonnement, ved at betale en engangsbetaling på sølle 9 kr.</p>
                <Link to="/priser"><button className="main-btn-white">Vælg præmiedyst</button></Link>
            </div>
        </>
    )
}
 
export default CtaSections;
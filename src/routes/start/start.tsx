import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './start.css';
 
function Start () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>
            <div className="pages-top">
                <h1 className="start-h1">Dyst venner i betting<br />- Helt gratis.</h1>
                <h2 className="start-h2">Benyttet af flere fodbold-analytikere</h2>
                <div className="start-input">
                    <input type="text" className="start-felt" placeholder="Indtast email-addressse" />
                    <button className="start-btn">Opret konto</button>
                </div>
                <p className="start-h3">Udfordre venner og familie i en hæsblæsende fodbold-betting turnering.<br />Placer dine personlige væddemål helt uden at betale en eneste øre.</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="pages-parent"><path className="pages-wave" fill-opacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        </>
    )
}
 
export default Start;
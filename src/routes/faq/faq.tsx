import * as React from 'react';
import { useEffect } from 'react';

import CtaSections from '../../components/ctaSections/ctaSections';

import './faq.css';
 
function Faq () {

    function showQuestion(id) {
        let q_p = document.getElementById(id+"-p");
        let q_a = document.getElementById(id+"-a");
        let q_i = document.getElementById(id+"-i");
        q_p.classList.toggle("faq-q-active");
        q_a.classList.toggle("display");
        q_i.classList.toggle("faq-chevron-active");
    }

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>
            <div className="pages-top">
                <div className="pages-where">
                    <p className="pages-where-h1">FAQ</p>
                    <div className="pages-where-splitter"></div>
                    <p className="pages-where-h2">Spørgsmål og svar</p>
                </div>
                <h1 className="pages-h1">Få svar på dine<br />spørgsmål.</h1>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="pages-parent-dir"><path className="pages-wave" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <div className="stage-main-container" style={{paddingLeft: "300px", paddingRight: "300px", marginTop: "-100px", backgroundColor: "#fff"}}>
                <div className="faq-input-con">
                    <input type="text" className="faq-input" placeholder='Få svar på dine spørgsmål'/>
                    <button className="faq-input-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="faq-input-icon" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
                    </button>
                </div>
                <div className="faq-container">
                    <div className="faq-element" onClick={() => {showQuestion("q1")}}>
                        <div className="faq-question">
                            <p className="faq-q" id="q1-p">Hvordan opretter man nye gruppespil?</p>
                            <svg xmlns="http://www.w3.org/2000/svg" id="q1-i" className="faq-chevron" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                        <div className="faq-answer" id="q1-a">
                            <p className="faq-a-p">For at oprette et gruppespil, skal du have et abonnement. Dette kan være Plus eller Premium. For at opgradere, og se hvilke fordele du får, kan du gå til Priser i toppen af skærmen.</p>
                            <p className="faq-a-p">Har du allerede et abonnement, er alt du skal gøre blot at gå til "Mine gruppespil", og klikke på knappen "Opret gruppespil".</p>
                        </div>
                    </div>
                    <div className="faq-element" onClick={() => {showQuestion("q2")}}>
                        <div className="faq-question">
                            <p className="faq-q" id="q2-p">Hvornår får jeg min udbetaling?</p>
                            <svg xmlns="http://www.w3.org/2000/svg" id="q2-i" className="faq-chevron" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                        <div className="faq-answer" id="q2-a">
                            <p className="faq-a-p">Hvis alle kampe i din kupon er færdigspillede, får du din udbetaling næste gang dig, eller en af dine venner, logger ind på gruppespillet kuponen er placeret i.</p>
                            <p className="faq-a-p">Bemærk: Alle kampe SKAL være færdiggjorte og vundet, før du kan modtage din udbetaling</p>
                        </div>
                    </div>
                    <div className="faq-element" onClick={() => {showQuestion("q3")}}>
                        <div className="faq-question">
                            <p className="faq-q" id="q3-p">Hvordan inviterer jeg folk til mit gruppespil?</p>
                            <svg xmlns="http://www.w3.org/2000/svg" id="q3-i" className="faq-chevron" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                        <div className="faq-answer" id="q3-a">
                            <p className="faq-a-p">For at invitere venner til dit gruppespil, skal du gå ind på dit gruppespil leaderboard, og rulle ned til "inviter venner". Her finder du et link, som du kan give til venner og familie.</p>
                            <p className="faq-a-p">Bemærk: Du kan kun invitere, hvis DU ejer gruppespillet.</p>
                        </div>
                    </div>
                </div>
            </div>
            <CtaSections />
        </>
    )
}
 
export default Faq;
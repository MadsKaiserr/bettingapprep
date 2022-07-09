import React from 'react';
import { showLogin } from "../../services/login";
import { Link } from 'react-router-dom';

import '../main.css';
import '../../styles/main.css';
import '../../styles/utilities.css';

import DownArrow from '../../assets/img/down-arrow.png';

import logo from '../../assets/img/long-logo-primary.png';
// import flag from '../../assets/img/danmark.png';
 
function Header () {

    window.addEventListener("scroll", function(){
        if (document.getElementById("nav-bar-main")) {
            var header = document.getElementById("nav-bar-main");
            header.classList.toggle("nav-scrolled", window.scrollY >0);
        }
    })

    function sideMenu() {
        document.getElementById("sidemenu").classList.add("display");
    }

    function closeMenu() {
        document.getElementById("sidemenu").classList.remove("display");
    }

    var auth = <div className="nav-container-right">
              {/* <div className="nav-forside-flag-container">
                 <img src={flag} alt="Danmarks flag" className="nav-flag" />
             </div> */}
    <p className="nav-btn-outline" onClick={() => showLogin()}>Log ind</p>
    <Link to="/signup">
    <button className="nav-btn-default">Opret Profil<span className="nav-in">Det gratis</span></button></Link>
    <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham" onClick={() => {sideMenu()}} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
    </div>;

    var isAuthenticated = false;
    if (localStorage.getItem("auth")) {
        isAuthenticated = true;
    }

    if (isAuthenticated) {
        auth = <div className="nav-container-right">
             {/* <div className="nav-forside-flag-container">
                 <img src={flag} alt="Danmarks flag" className="nav-flag" />
             </div> */}
             <Link to="/stage">
                <p className="nav-btn-outline">Begynd at bette</p>
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham" onClick={() => {sideMenu()}} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <div className="sidemenu" id="sidemenu">
                <svg xmlns="http://www.w3.org/2000/svg" className="ham-close" onClick={() => {closeMenu()}} viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                <div className="side-nav">
                    <Link to="/gruppespil" className="side-nav-p" onClick={() => {closeMenu()}}>Gruppespil</Link>
                    <Link to="/priser" className="side-nav-p" onClick={() => {closeMenu()}}>Priser</Link>
                    {/* <Link to="/blog" className="side-nav-p" onClick={() => {closeMenu()}}>Blog</Link> */}
                    <Link to="/faq" className="side-nav-p" onClick={() => {closeMenu()}}>Spørgsmål og svar</Link>
                    <Link to="/stage" className="side-nav-p" onClick={() => {closeMenu()}}>Begynd at bette</Link>
                </div>
            </div>
            </div>;
    } else {
        auth = <div className="nav-container-right">
             {/* <div className="nav-forside-flag-container">
                 <img src={flag} alt="Danmarks flag" className="nav-flag" />
             </div> */}
            <p className="nav-btn-outline" onClick={() => showLogin()}>Log ind</p>
            <Link to="/signup">
            <button className="nav-btn-default">Opret Profil<div className="nav-in-before"></div><span className="nav-in">Det gratis</span></button></Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham" onClick={() => {sideMenu()}} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <div className="sidemenu" id="sidemenu">
                <svg xmlns="http://www.w3.org/2000/svg" className="ham-close" onClick={() => {closeMenu()}} viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                <div className="side-nav">
                    <Link to="/gruppespil" className="side-nav-p" onClick={() => {closeMenu()}}>Gruppespil</Link>
                    <Link to="/priser" className="side-nav-p" onClick={() => {closeMenu()}}>Priser</Link>
                    {/* <Link to="/blog" className="side-nav-p" onClick={() => {closeMenu()}}>Blog</Link> */}
                    <Link to="/faq" className="side-nav-p" onClick={() => {closeMenu()}}>Spørgsmål og svar</Link>
                    <p className="side-nav-p" onClick={() => {closeMenu(); showLogin()}}>Login</p>
                    <Link to="/signup" className="side-nav-p" onClick={() => {closeMenu()}}>Opret konto</Link>
                </div>
            </div>
            </div>;
    }

    return (
        <>
            <div className="nav-bar" id="nav-bar-main">
                <div className="nav-container-fix">
                    <div className="nav-container-left">
                        <Link to="/">
                            <img src={logo} alt="Tipsspillet Logo" className="main-logo" />
                        </Link>
                    </div>
                    <div className="nav-container-mid">
                        <div className="nav-link-container">
                            <p className="nav-p" id="nav-drop">Gruppespil
                                <img src={DownArrow} alt="" className="nav-icon" />
                                <div className="nav-drop-fix">
                                    <div className="nav-dropdown">
                                        <div className="ndp-section">
                                            <div className="ndp-section-top">
                                                <p className="ndp-h1">Find gruppespil</p>
                                                <p className="ndp-h2">Find offentlige eller dine venners gruppespil, og tilmeld dig for at komme i gang.</p>
                                            </div>
                                            <div className="ndp-content">
                                                <div className="ndp-element">
                                                    <Link to="/gruppespil" className="ndp-a">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
                                                        </svg>
                                                        Alle gruppespil
                                                    </Link>
                                                </div>
                                                <div className="ndp-element">
                                                    <Link to="/gruppespil" className="ndp-a">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                                        </svg>
                                                        Private gruppespil
                                                    </Link>
                                                </div>
                                                <div className="ndp-element">
                                                    <Link to="/gruppespil" className="ndp-a">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                                        </svg>
                                                        Offentlige gruppespil
                                                    </Link>
                                                </div>
                                                <div className="ndp-element">
                                                    <Link to="/gruppespil" className="ndp-a">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                                        </svg>
                                                        Præmiespil
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ndp-section" style={{borderRight: "0px"}}>
                                            <div className="ndp-section-top">
                                                <p className="ndp-h1">Egne gruppespil</p>
                                                <p className="ndp-h2">Opret dit eget gruppespil, inviter dine venner, og kæmp for titlen som den bedste better.</p>
                                            </div>
                                            <div className="ndp-content">
                                                <div className="ndp-element">
                                                    <Link to="/stage/aktive-spil" className="ndp-a">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path d="M4 4v2H2V4h2zm1 7V9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 5V9a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 4v2H7V4h2zm5 0h-2v2h2V4zM4 9v2H2V9h2zm5 0v2H7V9h2zm5 0v2h-2V9h2zm-3-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2z"/>
                                                        </svg>
                                                        Mine gruppespil
                                                    </Link>
                                                </div>
                                                <div className="ndp-element">
                                                    <Link to="/stage/gruppespil" className="ndp-a">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                                                        </svg>
                                                        Aktivt gruppespil
                                                    </Link>
                                                </div>
                                                <div className="ndp-element">
                                                    <Link to="/priser" className="ndp-a">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                                                        </svg>
                                                        Opret gruppespil
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </p>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/priser" className="nav-p">Priser</Link>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/blog" className="nav-p">Blog</Link>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/faq" className="nav-p">Spørgsmål og svar</Link>
                        </div>
                    </div>
                </div>
                {auth}
            </div>
        </>
    )
}
 
export default Header;
import React from 'react';
import { showLogin } from "../../services/login";
import { Link } from 'react-router-dom';

import '../main.css';
import '../../styles/main.css';
import '../../styles/utilities.css';

import logo from '../../assets/img/long-logo-primary.png';
// import flag from '../../assets/img/danmark.png';
 
function Header () {

    window.addEventListener("scroll", function(){
        if (document.getElementById("nav-bar-main")) {
            var header = document.getElementById("nav-bar-main");
            header.classList.toggle("nav-scrolled", window.scrollY >0);
        }
    })

    var auth = <div className="nav-container-right">
              {/* <div className="nav-forside-flag-container">
                 <img src={flag} alt="Danmarks flag" className="nav-flag" />
             </div> */}
    <p className="nav-btn-outline" onClick={() => showLogin()}>Log ind</p>
    <Link to="/signup">
    <button className="nav-btn-default">Opret Profil<span className="nav-in">Det gratis</span></button></Link></div>;

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
            </div>;
    } else {
        auth = <div className="nav-container-right">
             {/* <div className="nav-forside-flag-container">
                 <img src={flag} alt="Danmarks flag" className="nav-flag" />
             </div> */}
            <p className="nav-btn-outline" onClick={() => showLogin()}>Log ind</p>
            <Link to="/signup">
            <button className="nav-btn-default">Opret Profil<div className="nav-in-before"></div><span className="nav-in">Det gratis</span></button></Link></div>;;
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
                            <Link to="/gruppespil" className="nav-p">Gruppespil</Link>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/priser" className="nav-p">Priser</Link>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/blog" className="nav-p">Blog</Link>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/faq" className="nav-p">FAQ</Link>
                        </div>
                    </div>
                </div>
                {auth}
            </div>
        </>
    )
}
 
export default Header;
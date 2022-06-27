import React from 'react';
import { showLogin } from "../../services/login";
import { Link } from 'react-router-dom';

import logo from '../../assets/img/premierleague.png';
 
function BlogHeader () {

    window.addEventListener("scroll", function(){
        if (document.getElementById("nav-bar-main")) {
            var header = document.getElementById("nav-bar-main");
            header.classList.toggle("nav-scrolled", window.scrollY >0);
        }
    })

    var auth = <div className="nav-container-right">
    <p className="nav-btn-outline" onClick={() => showLogin()}>Log ind</p>
    <Link to="/signup">
    <button className="nav-btn-default">Opret Profil<span className="nav-in">Det gratis</span></button></Link></div>;

    var isAuthenticated = false;
    if (localStorage.getItem("auth")) {
        isAuthenticated = true;
    }

    if (isAuthenticated) {
        auth = <div className="nav-container-right">
             <Link to="/stage">
                <p className="nav-btn-outline">Begynd at bette</p>
            </Link>
            </div>;
    } else {
        auth = <div className="nav-container-right">
            <p className="nav-btn-outline" onClick={() => showLogin()}>Log ind</p>
            <Link to="/signup">
            <button className="nav-btn-default">Opret Profil<div className="nav-in-before"></div><span className="nav-in">Det gratis</span></button></Link></div>;;
    }

    return (
        <>
            <div className="nav-bar" id="nav-bar-main">
                <div className="nav-container-fix" id="fix-fix">
                    <div className="nav-container-left">
                        <Link to="/blog" className="blog-header">
                            <img src={logo} alt="BettingApp Logo" className="main-logo" />
                            <p className="blog-header-h1">BLOG</p>
                        </Link>
                    </div>
                    <div className="nav-container-mid">
                        <div className="nav-link-container">
                            <Link to="/blog/nyeste" className="nav-p">Nyeste</Link>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/blog/emner" className="nav-p">Emner</Link>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/blog/tips" className="nav-p">Tips og tricks</Link>
                        </div>
                        <div className="nav-link-container">
                            <Link to="/" className="nav-p">Tilbage til forsiden</Link>
                        </div>
                    </div>
                </div>
                {auth}
            </div>
        </>
    )
}
 
export default BlogHeader;
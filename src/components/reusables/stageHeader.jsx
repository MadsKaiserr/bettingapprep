import * as React from 'react';
import { useState } from 'react';
import { getUser, resetUserSession } from "../../services/authService";
import { Link, Navigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import {InstantSearch, SearchBox, Hits} from "react-instantsearch/dom";
import algoliasearch from 'algoliasearch/lite';

import '../main.css';
import logo from '../../assets/img/long-logo-primary.png';
import flag from '../../assets/img/danmark.png';
import england from '../../assets/img/england.png';
 
function StageHeader () {

    const searchClient = algoliasearch(
        'OY1FZUYYG8',
        '45fbfc95b1c0078ce5f8591b7a5f886b'
    );

    const [dataLoad, setDataLoad] = useState(false);
    const user = getUser();
    const fornavn = user !== 'undefined' && user ? user.username : '';
    const email = user !== 'undefined' && user ? user.email : '';

    const [notifikationer, sestNotifikationer] = useState("");

    function getAdmin() {
        if (localStorage.getItem("auth")) {
            const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
        
            var decodedToken = jwtDecode(authToken);
            var todayTime = new Date().getTime();
            var todayMS = todayTime/1000;
            
            if (decodedToken.exp > todayMS && decodedToken.rolle === "administrator") {
                return (
                    <Link to="/admin/hjem">
                        <div className="user-element">
                            <p className="user-element-p">Admin-Panel</p>
                        </div>
                    </Link>
                );
            } else {
                return;
            }
        } else {
            return (
                <Navigate to="/signup" state={{ from: "/"}} replace />
            );
        }
    }
    
    if (dataLoad === false) {
        setTimeout(function (){
            if (localStorage.getItem("notifikationer")) {
                document.getElementById("notital").classList.add("display-flex");
                sestNotifikationer(localStorage.getItem("notifikationer"));
            } else {
                document.getElementById("notital").classList.remove("display-flex");
                sestNotifikationer("0");
            }
        }, 500);
        setDataLoad(true);
    }

    function logout() {
        resetUserSession();
        window.open("/", "_self");
    }

    window.addEventListener("scroll", function(){
        if (document.getElementById("nav-bar")) {
            var header = document.getElementById("nav-bar");
            header.classList.toggle("normalHeader", window.scrollY >0);
        }
    })

    function Hit(props) {
        return (
          <div onClick={() => {window.open(props.hit.url, "_SELF");}} className="hit-elem">
            <img src={props.hit.img} alt="" className="hit-img" />
            <div className="hit-info">
                <p className="hit-h1">{props.hit.klub}</p>
                <p className="hit-h2">{props.hit.land}</p>
            </div>
          </div>
        );
      }

    function showSearch() {
        document.getElementById("mb-search").classList.remove("display-not")
        document.getElementById("nav-hits").classList.add("display");
        document.getElementById("hits-close").classList.add("display");
    }

    function closeSearch() {
        document.getElementById("mb-search").classList.add("display-not")
        document.getElementById("nav-hits").classList.remove("display");
        document.getElementById("hits-close").classList.remove("display");
    }

    function sideMenu() {
        document.getElementById("sidemenu").classList.add("display");
    }

    function closeMenu() {
        document.getElementById("sidemenu").classList.remove("display");
    }

    return (
        <>
            <div className="nav-bar-stage">
                <div className="nav-container-top-stage">
                    <div className="nav-flag-container">
                        <div className="nav-flag-section">
                            <img src={flag} alt="Danmarks flag" className="nav-flag" onClick={() => {document.getElementById("userDropdownFlag").classList.toggle("display");}} />
                            <div className="user-dropdownFlag" id="userDropdownFlag">
                                <div className="user-elementFlag">
                                    <img src={flag} alt="" className="user-flag-icon" />
                                    <p className="user-element-p">Dansk</p>
                                </div>
                                <div className="user-elementFlag">
                                    <img src={england} alt="" className="user-flag-icon" />
                                    <p className="user-element-p">Engelsk</p>
                                </div>
                            </div>
                        </div>
                        <div className="nav-search">
                            <svg xmlns="http://www.w3.org/2000/svg" className="nav-short-search" onClick={() => {showSearch()}} viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <InstantSearch searchClient={searchClient} indexName="dev_bettingapp">
                                <div className="nav-hits" id="nav-hits">
                                    <div className="search-el display-not" id="mb-search">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="hits-close" onClick={() => {closeSearch()}} className="hits-close" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                        <SearchBox translations={{placeholder: "Søg"}}></SearchBox>
                                    </div>
                                    <Hits hitComponent={Hit} />
                                </div>
                            </InstantSearch>
                        </div>
                    </div>
                    <Link to="/stage">
                        <img src={logo} alt="Tipsspillet Logo" className="main-logo middle-logo" />
                    </Link>
                    <div className="nav-container-stage-right">
                        <div className="nav-profile">
                            {/* <div className="nav-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-error-img" viewBox="0 0 16 16" id="errorIcon">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                <p className="nav-error-p">Din konto er suspenderet.</p>
                                <Link to="#" className="nav-error-a">Find ud af hvorfor</Link>
                            </div> */}
                            <div className="nav-error">
                                <p className="nav-info-p">Alpha - V. 1.0.1</p>
                            </div>
                            <Link to="/stage/indstillinger" className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                </svg>
                            </Link>
                            <Link to="/stage/notifikationer" className="nav-link">
                                <div className="noti-icon" id="notital">{notifikationer}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                </svg>
                            </Link>
                            <div className="nav-profile-btn" onClick={() => {document.getElementById("userDropdown").classList.toggle("display"); document.getElementById("profileArrow").classList.toggle("deg90");}}>
                                <div className="nav-profile-pic"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="profile-icon" id="profileArrow" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                            <div className="user-dropdown" id="userDropdown">
                            <div className="user-info">
                                <img className="user-logo-tem" src="" alt="" />
                                <div className="user-info-desc">
                                    <p className="user-name">{fornavn}</p>
                                    <p className="user-email">{email}</p>
                                </div>
                            </div>
                            <div className="user-divider"></div>
                            <div className="user-element">
                                <p className="user-element-p">Din profil</p>
                            </div>
                            {getAdmin()}
                            <div className="user-element" onClick={() => logout()}>
                                <p className="user-element-p">Log ud</p>
                            </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham" onClick={() => {sideMenu()}} viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                            <div className="sidemenu" id="sidemenu">
                                <svg xmlns="http://www.w3.org/2000/svg" className="ham-close" onClick={() => {closeMenu()}} viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                                <div className="side-nav">
                                    <Link to="/stage" className="side-nav-p" onClick={() => {closeMenu()}}>Udforsk</Link>
                                    <Link to="/stage/gruppespil" className="side-nav-p" onClick={() => {closeMenu()}}>Gruppespil</Link>
                                    <Link to="/stage/faq" className="side-nav-p" onClick={() => {closeMenu()}}>Spørgsmål og svar</Link>
                                    {/* <Link to="/blog" className="side-nav-p" onClick={() => {closeMenu()}}>Blog</Link> */}
                                    <Link to="/stage/notifikationer" className="side-nav-p" onClick={() => {closeMenu()}}>Notifikationer</Link>
                                    <Link to="/stage/indstillinger" className="side-nav-p" onClick={() => {closeMenu()}}>Indstillinger</Link>
                                    <p className="side-nav-p" onClick={() => logout()}>Log ud</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-container-bottom" id="nav-bar">
                    <div className="nav-link-container">
                        <Link to="/stage/" className="nav-p-stage">Udforsk</Link>
                    </div>
                    <div className="nav-link-container">
                        <Link to="/stage/gruppespil" className="nav-p-stage">Gruppespil</Link>
                    </div>
                    <div className="nav-link-container">
                        <Link to="/stage/faq" className="nav-p-stage">FAQ</Link>
                    </div>
                    <div className="nav-link-container">
                        <Link to="/blog" className="nav-p-stage">Blog</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default StageHeader;
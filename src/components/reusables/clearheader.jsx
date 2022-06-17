import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../main.css';
import '../../styles/main.css';
import '../../styles/utilities.css';

import logo from '../../assets/img/premierwhite.png';
 
function Header () {

    return (
        <>
            <div className="nav-bar-clear">
                <Link to="/">
                    <img src={logo} alt="BettingApp Logo" className="main-logo" />
                </Link>
            </div>
        </>
    )
}
 
export default Header;
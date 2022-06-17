import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './marketing.css';
 
function AdminMarketing () {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className="admin-container">
            <div className="admin-topbar">
                <button className="admin-nav-button">Brugerdefinerbar knap</button>
                <Link to="/admin/notifikationer" className="nav-link">
                    <div className="noti-icon" id="notital">1</div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg>
                </Link>
                <Link to="/admin/profil" className="nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" className="profile-pic-icon" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                </Link>
            </div>
            <div className="admin-content">
                <div className="admin-section">
                    <div className="admin-section-big">Marketing</div>
                    <div className="admin-section-small"></div>
                </div>
                <div className="admin-section">
                    <div className="admin-section-large"></div>
                </div>
                <div className="admin-section">
                    <div className="admin-section-small"></div>
                    <div className="admin-section-small"></div>
                    <div className="admin-section-small"></div>
                </div>
                <div className="admin-section">
                    <div className="admin-section-medium"></div>
                    <div className="admin-section-medium"></div>
                </div>
            </div>
        </div>
    )
}
 
export default AdminMarketing;
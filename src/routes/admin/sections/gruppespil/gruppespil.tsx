import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Chart from 'chart.js/auto';

import './gruppespil.css';
 
function AdminGruppespil () {

    const [gruppespilCount, setGruppespilCount] = useState(0);
    const [gruppespilResultater, setGruppespilResultater] = useState("Søg i gruppespil");
    const [loading, setLoading] = useState("Indlæser...");
    const [items, setItems] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)

        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/gruppespil";

        const requestConfig = {
            headers: {
                "x-api-key": process.env.REACT_APP_API_SECRET
            }
        }

        axios.get(URL, requestConfig).then(result => {
            setItems(result.data.allGruppespil);
            setGruppespilCount(result.data.allGruppespil.length);
            setGruppespilResultater("Søg i " + result.data.allGruppespil.length + " resultater");

            const labels = [
                '6 dage',
                '5 dage',
                '4 dage',
                '3 dage',
                'I forgårs',
                'I går',
                'I dag'
              ];

              var gruppespilArray = [0, 0, 0, 0, 0, 0, 0];
              for (var i in result.data.allGruppespil) {
                const timeO = new Date(result.data.allGruppespil[i].oprettelse).getTime();
                const time = new Date().getTime();
                if ((timeO + (7 * 86400000)) > time) {
                    if ((timeO + (6 * 86400000)) > time) {
                        if ((timeO + (5 * 86400000)) > time) {
                            if ((timeO + (4 * 86400000)) > time) {
                                if ((timeO + (3 * 86400000)) > time) {
                                    if ((timeO + (2 * 86400000)) > time) {
                                        if ((timeO + (1 * 86400000)) > time) {
                                            gruppespilArray[6] = gruppespilArray[6] + 1;
                                        } else {
                                            gruppespilArray[5] = gruppespilArray[5] + 1;
                                        }
                                    } else {
                                        gruppespilArray[4] = gruppespilArray[4] + 1;
                                    }
                                } else {
                                    gruppespilArray[3] = gruppespilArray[3] + 1;
                                }
                            } else {
                                gruppespilArray[2] = gruppespilArray[2] + 1;
                            }
                        } else {
                            gruppespilArray[1] = gruppespilArray[1] + 1;
                        }
                    } else {
                        gruppespilArray[0] = gruppespilArray[0] + 1;
                    }
                }

              }
            
              const data = {
                labels: labels,
                datasets: [
                {
                    label: 'Gruppespil',
                    backgroundColor: '#3d6deb',
                    borderColor: '#3d6deb',
                    borderJoinStyle: "round",
                    borderCapStyle: "round",
                    borderWidth: 4,
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderWidth: 3,
                    pointHoverBorderColor: "#3d6deb",
                    fill: false,
                    data: gruppespilArray,
              }]
              };
            
              const config = {
                type: 'line',
                hoverBackgroundColor: "#4eae5d",
                data: data,
                options: {
                    scales: {
                        x: {
                          ticks: {
                            color: 'rgb(60, 66, 87, 0.6)'
                          }
                        },
                        y: {
                          min: 0,
                          ticks: {
                            stepSize: 1,
                            color: 'rgb(60, 66, 87, 0.6)'
                          }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
              };
        
              const gruppespilChart = new Chart(
                document.getElementById('gruppespilChart'),
                config
              );
              setLoading("");
        }).catch(error => {
            console.log("Fejl ved indhentning af gruppespil" + error)
        })
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
                    <div className="admin-section-big">
                        <div>
                            <p className="admin-canvas-label">Analyser</p>
                            {loading}
                            <canvas id="gruppespilChart" className="admin-gruppespil-main-canvas" width="600px" height="150px"></canvas>
                        </div>
                    </div>
                    <div className="admin-section-small admin-home-small">
                        <p className="admin-hjem-small-h1">{gruppespilCount}</p>
                        <p className="admin-hjem-small-h2">Gruppespil</p>
                    </div>
                </div>
                <div className="admin-section">
                    <div className="admin-section-large admin-section-large-gruppespil">
                        <div className="admin-section-table-top">
                            <p className="admin-canvas-label" style={{padding: "0px"}}>Gruppespil</p>
                            <button className="admin-nav-button">Brugerdefinerbar</button>
                        </div>
                        <div className="admin-table-filters">
                            <div className="gruppespil-input-div">
                                <svg xmlns="http://www.w3.org/2000/svg" className="gruppespil-search-icon" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                                <input type="text" className="login-form-input" style={{paddingLeft: "45px"}} placeholder={gruppespilResultater}/>
                            </div>
                            <div className="admin-filters-btns">
                                <button className="admin-table-button">Rediger</button>
                                <button className="admin-table-button-warning">Slet valgte</button>
                            </div>
                        </div>
                        <div className="admin-table">
                            <div className="admin-table-top">
                                <div className="admin-table-check"></div>
                                <p className="admin-table-label admin-navn">Navn</p>
                                <p className="admin-table-label admin-spillere">Spillere</p>
                                <p className="admin-table-label admin-oprettelse">Oprettelse</p>
                                <p className="admin-table-label admin-admin">Admin</p>
                                <p className="admin-table-label admin-synlighed">Synlighed</p>
                            </div>
                            <div className="admin-table-section">
                                {loading}
                                <ul>
                                    {items.map((item) => {
                                        const gruppespilURL = "/admin/gruppespil?game=" + item.id;
                                        return (
                                            <li key={item.id}>
                                                <Link to={gruppespilURL}>
                                                <div className="admin-table-cell">
                                                    <div className="admin-table-check"></div>
                                                    <p className="admin-table-label admin-navn">{item.name}</p>
                                                    <p className="admin-table-p admin-spillere">{item.players.length}</p>
                                                    <p className="admin-table-p admin-oprettelse">{item.oprettelse}</p>
                                                    <p className="admin-table-p admin-admin">{item.admin}</p>
                                                    <p className="admin-table-p admin-synlighed">{item.synlighed}</p>
                                                </div>
                                                </Link>
                                            </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default AdminGruppespil;
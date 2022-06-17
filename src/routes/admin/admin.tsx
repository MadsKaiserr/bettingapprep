import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from "axios";

import './admin.css';
 
function Admin () {

    const [loading, setLoading] = useState("Indlæser...");
    const [userCount, setUserCount] = useState(0);
    const [gruppespilCount, setGruppespilCount] = useState(0);
    const [usersToday, setUsersToday] = useState("Ingen nye medlemmer idag");

    useEffect(() => {
        window.scrollTo(0, 0)

        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/users";

        const requestConfig = {
            headers: {
                "x-api-key": process.env.REACT_APP_API_SECRET
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log(response)
            const URL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/gruppespil";

        axios.get(URL2, requestConfig).then(result => {
            console.log(result)
            const labels = [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31',
              ];
              
            setLoading("");

              var gruppespilArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              for (var i in result.data.allGruppespil) {
                const day = new Date(result.data.allGruppespil[i].oprettelse).getDate();
                const month = new Date(result.data.allGruppespil[i].oprettelse).getMonth();
                const year = new Date(result.data.allGruppespil[i].oprettelse).getFullYear();
                const Tmonth = new Date().getMonth();
                const Tyear = new Date().getFullYear();
                if (Tyear === year && Tmonth === month) {
                    for (var l in gruppespilArray) {
                        if (day <= parseInt(l) + 1) {
                            gruppespilArray[l] = gruppespilArray[l] + 1;
                        }
                    }
                }
              }

              var dataArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              var usersToday = 0;
              for (var k in response.data.allUsers) {
                const day = new Date(response.data.allUsers[k].oprettelse).getDate();
                const month = new Date(response.data.allUsers[k].oprettelse).getMonth();
                const year = new Date(response.data.allUsers[k].oprettelse).getFullYear();
                const Tday = new Date().getDate();
                const Tmonth = new Date().getMonth();
                const Tyear = new Date().getFullYear();
                if (Tyear === year && Tmonth === month) {
                    if (day === Tday) {
                        usersToday = usersToday + 1;
                    }
                    for (var o in dataArray) {
                        if (day <= parseInt(o) + 1) {
                            dataArray[o] = dataArray[o] + 1;
                        }
                    }
                }
              }
              if (usersToday === 1) {
                setUsersToday(usersToday + " nyt medlem i dag");
              } else if (usersToday > 0){
                setUsersToday(usersToday + " nye medlemmer i dag");
              }

              setUserCount(response.data.allUsers.length);
            
              const data = {
                labels: labels,
                datasets: [{
                  label: 'Brugere',
                  backgroundColor: '#3d6deb',
                  borderColor: '#3d6deb',
                  fill: false,
                  borderJoinStyle: "round",
                  borderCapStyle: "round",
                  borderWidth: 4,
                  pointBackgroundColor: "transparent",
                  pointBorderColor: "transparent",
                  pointHoverBorderWidth: 3,
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "#3d6deb",
                  data: dataArray,
                },
                {
                    label: 'Gruppespil',
                    backgroundColor: '#4eae5d',
                    borderColor: '#4eae5d',
                    borderJoinStyle: "round",
                    borderCapStyle: "round",
                    borderWidth: 4,
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderWidth: 3,
                    pointHoverBorderColor: "#4eae5d",
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
        
              const myChart = new Chart(
                document.getElementById('myChart'),
                config
              );

              setGruppespilCount(result.data.allGruppespil.length);
            setLoading("");
        }).catch(error => {
            console.log("Fejl ved indhentning af gruppespil" + error)
        })
        }).catch(error => {
            console.log("Fejl ved indhentning af brugere" + error)
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
            <div className="admin-offer">
                <p className="offer-p">{usersToday}</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="offer-icon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg>
            </div>
                <div className="admin-section">
                    <div className="admin-section-small admin-home-small">
                        <p className="admin-hjem-small-h1">{userCount}</p>
                        <p className="admin-hjem-small-h2">Brugere</p>
                    </div>
                    <div className="admin-section-small admin-home-small">
                        <p className="admin-hjem-small-h1">{gruppespilCount}</p>
                        <p className="admin-hjem-small-h2">Gruppespil</p>
                    </div>
                    <div className="admin-section-small admin-home-small">
                        <p className="admin-hjem-small-h1">298</p>
                        <p className="admin-hjem-small-h2">Besøgende</p>
                    </div>
                </div>
                <div className="admin-section">
                    <div className="admin-section-large">
                    <div>
                        <p className="admin-canvas-label">Brugere og gruppespil</p>
                        {loading}
                        <canvas id="myChart" className="admin-hjem-main-canvas" width="400px" height="100px"></canvas>
                    </div>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </div>
    )
}
 
export default Admin;
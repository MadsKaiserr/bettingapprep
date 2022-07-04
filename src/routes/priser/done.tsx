import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './priser.css';
 
function Done () {

    useEffect(() => {
        window.scrollTo(0, 0)
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.get("status") === "success") {
            const userEmail = localStorage.getItem("email");
            const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/prod/user";

            const requestConfig = {
                headers: {
                    "x-api-key": process.env.REACT_APP_API_SECRET
                }
            }

            const requestBody = {
                "rolle": "premium",
                "id": userEmail
            }

            axios.patch(URL, requestBody, requestConfig).then(response => {
                console.log("Medlemskab oprettet: " + response)
                setMsg("Success");
            }).catch(error => {
                console.log("Fejl ved indhentning af data" + error)
                setMsg("Error: " + error);
            })
        } else {
            console.log("Medlemsskab cancelled")
            setMsg("Cancel");
        }
    }, [])

    const [msg, setMsg] = useState("");

    return (
        <>
            {msg}
        </>
    )
}
 
export default Done;
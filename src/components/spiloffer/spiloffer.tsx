import * as React from 'react';
import { Link } from 'react-router-dom';
    
function Spiloffer () {
    return (
        <>
            <Link to="/gruppespil">
                <div className="section-offer">
                    <p className="offer-p">Deltag i præmiespil, og vind præmier med værdi af op til 5.000 kr.</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="offer-icon" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                    </svg>
                </div>
            </Link>
        </>
    )
}
    
export default Spiloffer;
import React from 'react';
import './FrontPage.css';
import { Link } from 'react-router-dom';
import Instructions from '../../components/Instructions/Instructions';

const FrontPage = props => {
    return (
        <div className="FrontPage">
            <Instructions />
            <div className="login-signup">
                <div className="fp-letter-container">
                    <div className="first-last letter-outer"><div className="letter-inner">W</div></div>
                    <div className="letter-outer"><div className="letter-inner">E</div></div>
                    <div className="first-last letter-outer"><div className="letter-inner">L</div></div>
                    <div className="letter-outer"><div className="letter-inner">C</div></div>
                    <div className="first-last letter-outer"><div className="letter-inner">O</div></div>
                    <div className="letter-outer"><div className="letter-inner">M</div></div>
                    <div className="first-last letter-outer"><div className="letter-inner">E</div></div>
                </div>
                <div className="links login">
                    <Link to='/login'>LOG IN</Link>
                </div>
                <div className="links signup">
                    <Link to='/signup'>SIGN UP</Link>
                </div>
            </div>
        </div>
    );
}

export default FrontPage;
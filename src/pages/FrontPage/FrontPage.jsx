import React from 'react';
import './FrontPage.css';
import { Link } from 'react-router-dom';

const FrontPage = props => {
    return (
        <div className="FrontPage">
            <div className="fp-letter-container">
                <div className="letter-outer"><div className="letter-inner">W</div></div>
                <div className="letter-outer"><div className="letter-inner">E</div></div>
                <div className="letter-outer"><div className="letter-inner">L</div></div>
                <div className="letter-outer"><div className="letter-inner">C</div></div>
                <div className="letter-outer"><div className="letter-inner">O</div></div>
                <div className="letter-outer"><div className="letter-inner">M</div></div>
                <div className="letter-outer"><div className="letter-inner">E</div></div>
            </div>
            <div className="links">
                <Link className="login" to='/login'>LOG IN</Link>
            </div>
            <div className="links">
                <Link className="signup" to='/signup'>SIGN UP</Link>
            </div>
        </div>
    );
}

export default FrontPage;
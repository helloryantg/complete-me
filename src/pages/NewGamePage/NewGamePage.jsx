import React from 'react';
import './NewGamePage';
import { Link } from 'react-router-dom';
import './NewGamePage.css'

const NewGamePage = props => {
    return (
        <div className="NewGamePage">
            <div className="fp-letter-container">
                <div className="letter-outer"><div className="letter-inner">N</div></div>
                <div className="letter-outer"><div className="letter-inner">E</div></div>
                <div className="letter-outer"><div className="letter-inner">W</div></div>
            </div>
            <div className="fp-letter-container">
                <div className="letter-outer"><div className="letter-inner">G</div></div>
                <div className="letter-outer"><div className="letter-inner">A</div></div>
                <div className="letter-outer"><div className="letter-inner">M</div></div>
                <div className="letter-outer"><div className="letter-inner">E</div></div>
            </div>
            
            <div className="links">
                <Link to='/create'>CREATE GAME</Link>
            </div>
            <div className="links">
                <Link to='/join'>JOIN GAME</Link>
            </div>

        </div>
    );
}

export default NewGamePage;
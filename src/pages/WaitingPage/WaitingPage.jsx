import React from 'react';
import './WaitingPage.css';

const WaitingPage = props => {
    return (
        <div className="WaitingPage">
            <div className="fp-letter-container">
                <div className="first-last letter-outer"><div className="letter-inner">N</div></div>
                <div className="letter-outer"><div className="letter-inner">O</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">W</div></div>
            </div>
            <div className="fp-letter-container">
                <div className="letter-outer"><div className="letter-inner">W</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">A</div></div>
                <div className="letter-outer"><div className="letter-inner">I</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">T</div></div>
                <div className="letter-outer"><div className="letter-inner">I</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">N</div></div>
                <div className="letter-outer"><div className="letter-inner">G</div></div>
            </div>
        </div>
    );
}

export default WaitingPage;
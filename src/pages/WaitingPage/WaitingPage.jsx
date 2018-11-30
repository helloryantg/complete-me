import React from 'react';
import './WaitingPage.css';

const WaitingPage = props => {
    return (
        <div className="WaitingPage">
            <div className="fp-letter-container">
                <div className="first-last letter">N</div>
                <div className="letter">O</div>
                <div className="first-last letter">W</div>
            </div>
            <div className="fp-letter-container">
                <div className="letter">W</div>
                <div className="first-last letter">A</div>
                <div className="letter">I</div>
                <div className="first-last letter">T</div>
                <div className="letter">I</div>
                <div className="first-last letter">N</div>
                <div className="letter">G</div>
            </div>

            <div className="gameCode">{props.game._id}</div>
            <p className="game-text">Send this code to your opponent to begin!</p>
        </div>
    );
}

export default WaitingPage;
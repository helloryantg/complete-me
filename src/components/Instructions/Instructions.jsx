import React from 'react';
import './Instructions.css';

const Instructions = props => {
    return (
        <div className="Instructions">
            <div className="fp-letter-container">
                <div className="first-last letter-outer"><div className="letter-inner">I</div></div>
                <div className="letter-outer"><div className="letter-inner">N</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">S</div></div>
                <div className="letter-outer"><div className="letter-inner">T</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">R</div></div>
                <div className="letter-outer"><div className="letter-inner">U</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">C</div></div>
                <div className="letter-outer"><div className="letter-inner">T</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">I</div></div>
                <div className="letter-outer"><div className="letter-inner">O</div></div>
                <div className="first-last letter-outer"><div className="letter-inner">N</div></div>
                <div className="letter-outer"><div className="letter-inner">S</div></div>
            </div>
            <div className="game-rules">
                <p><em>Complete Me!</em> is a multiplayer word completion game that tests your English vocabulary word range.</p>
                <p>Complete the word using the last letter of the previous word.</p>
                <p>Longer words get more points.</p>
                <p>Match words to the word challenges and get even more points!</p>
                <p>Each player is given a total of 30 seconds to submit words per game.</p>
                <p>The timer is paused during the opponent's turn.</p>
                <p>The quicker you submit your words, the better.</p>
                <p>If a player runs out of time, the other player may start and complete their own words until the timer runs out.</p>
            </div>
        </div>
    );
}

export default Instructions;
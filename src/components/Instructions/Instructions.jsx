import React from 'react';
import './Instructions.css';
import { Link } from 'react-router-dom';

const Instructions = props => {
    return (
        <div className="Instructions">
            <div className="fp-letter-container">
                <div className="first-last letter">I</div>
                <div className="letter">N</div>
                <div className="first-last letter">S</div>
                <div className="letter">T</div>
                <div className="first-last letter">R</div>
                <div className="letter">U</div>
                <div className="first-last letter">C</div>
                <div className="letter">T</div>
                <div className="first-last letter">I</div>
                <div className="letter">O</div>
                <div className="first-last letter">N</div>
                <div className="letter">S</div>
            </div>
            <div className="game-rules">
                <p className="title">Complete Me!</p>
                <p>Multiplayer word completion game that tests your English vocabulary</p>
                <p>Complete the word using the last letter of the previous word.</p>
                <p>Longer words get more points. 1 Point for every letter in between.</p>
                <p>Match words to the word challenges and acquire score multipliers!</p>
                <p>Each player is given a total of 60 seconds to submit words each game.</p>
                <p>The timer is paused during your opponent's turn.</p>
                <p>The quicker you submit your words, the better.</p>
                <p>If a player runs out of time, the other player may start and complete their own words until their timer runs out.</p>
            </div>
            <Link className="links" to='/'>BACK</Link>
        </div>
    );
}

export default Instructions;
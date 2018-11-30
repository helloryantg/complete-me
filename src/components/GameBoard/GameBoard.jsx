import React from 'react';
import './GameBoard.css';
import Letter from '../Letter/Letter';

const GameBoard = props => (
    <div className="GameBoard">
        <div className="Letter first-last letter-outer"><div className="letter-inner">P</div></div>
        <div className="letter-outer"><div className="letter-inner">L</div></div>
        <div className="first-last letter-outer"><div className="letter-inner">E</div></div>
        <div className="letter-outer"><div className="letter-inner">A</div></div>
        <div className="first-last letter-outer"><div className="letter-inner">S</div></div>
        <div className="letter-outer"><div className="letter-inner">E</div></div>
        <div className="first-last letter-outer"><div className="letter-inner">W</div></div>
        <div className="letter-outer"><div className="letter-inner">O</div></div>
        <div className="first-last letter-outer"><div className="letter-inner">R</div></div>
        <div className="letter-outer"><div className="letter-inner">K</div></div>
        
        {props.game.gameList.map((word, idx) => 
            <Letter 
                word={word}
                key={idx}
            />
        )}
    </div>
)

export default GameBoard;
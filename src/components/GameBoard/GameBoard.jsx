import React from 'react';
import './GameBoard.css';
import Letter from '../Letter/Letter';

const GameBoard = props => (
    <div className="GameBoard">
        <div className="Letter first-last letter">P</div>
        <div className="letter">L</div>
        <div className="first-last letter">E</div>
        <div className="letter">A</div>
        <div className="first-last letter">S</div>
        <div className="letter">E</div>
        <div className="first-last letter">W</div>
        <div className="letter">O</div>
        <div className="first-last letter">R</div>
        <div className="letter">K</div>
        
        {props.game.gameList.map((word, idx) => 
            <Letter 
                word={word}
                key={idx}
            />
        )}
    </div>
)

export default GameBoard;
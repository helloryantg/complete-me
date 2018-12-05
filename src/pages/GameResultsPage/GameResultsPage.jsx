import React from 'react';
import './GameResultsPage.css';

const GameResultsPage = props => {
    return (
        <div className="GameResultsPage">
            <div className="fp-letter-container">
                <div className="first-last letter">G</div>
                <div className="letter">A</div>
                <div className="first-last letter">M</div>
                <div className="letter">E</div>
            </div>
            <div className="fp-letter-container">
                <div className="letter">O</div>
                <div className="first-last letter">V</div>
                <div className="letter">E</div>
                <div className="first-last letter">R</div>
            </div>

            {props.game.player[0].wordList.reduce((acc, word) => acc + word.score, 0) 
                > 
            props.game.player[1].wordList.reduce((acc, word) => acc + word.score, 0) 
                ? 
            <p>Player 1 Wins!</p>
                :
            <p>Player 2 Wins</p>   
            }
        </div>
    );
}

export default GameResultsPage;
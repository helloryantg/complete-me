import React from 'react';
import { Link } from 'react-router-dom';
import './GameResultsPage.css';

const GameResultsPage = props => {
    var page;
    var playerOne = props.game.players[0].wordList.reduce((acc, word) => acc + word.score, 0);
    var playerTwo = props.game.players[1].wordList.reduce((acc, word) => acc + word.score, 0);
    if (playerOne > playerTwo) {
        page = 
        <div className="winner">
            <p>Player 1 Wins!</p>
            <p>Score: {playerOne}</p>
        </div>
    } else if (playerOne < playerTwo) {
        page = 
        <div className="winner">
            <p>Player 2 Wins</p>   
            <p>Score: {playerTwo}</p>
        </div>
    } else {
        page = 
        <div className="winner">
            <p>It's a Tie!</p>
        </div>
    }
    
    return (
        <div className="GameResultsPage">
            <div>
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
            </div>
            {page}
            <Link onClick={props.handleCancelClick} className="links play-again" to='/'>PLAY AGAIN</Link>

        </div>
    );
}

export default GameResultsPage;
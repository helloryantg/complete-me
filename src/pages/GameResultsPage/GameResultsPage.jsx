import React from 'react';
import './GameResultsPage.css';

const GameResultsPage = props => {
    var playerOne = props.game.players[0].wordList.reduce((acc, word) => acc + word.score, 0);
    var playerTwo = props.game.players[1].wordList.reduce((acc, word) => acc + word.score, 0);

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

            {playerOne > playerTwo ? 
                <div className="winner">
                    <p>Player 1 Wins!</p>
                    <p>{playerOne}</p>
                </div>
                :
                <div className="winner">
                    <p>Player 2 Wins</p>   
                    <p>{playerTwo}</p>
                </div>
            }
        </div>
    );
}

export default GameResultsPage;
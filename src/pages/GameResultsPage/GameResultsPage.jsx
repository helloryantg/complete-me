import React from 'react';
import './GameResultsPage.css';

const GameResultsPage = props => {
    return (
        <div className="GameResultsPage">
            {props.game.player[0].wordList.reduce((acc, word) => acc + word.score, 0) 
                > 
            props.game.player[1].wordList.reduce((acc, word) => acc + word.score, 0) 
                ? 
            <p>Player 1 wins</p>
                :
            <p>Player 2 wins</p>   
            }
        </div>
    );
}

export default GameResultsPage;
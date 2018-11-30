import React from 'react';
import './PlayerScore.css';

const PlayerScore = props => {
    return (
        <div className="PlayerScore">
            {props.playerOneList ? <p>Score: {props.playerOneList.reduce((acc, word) => acc + word.score, 0)}</p> : null}
            {props.playerTwoList ? <p>Score: {props.playerTwoList.reduce((acc, word) => acc + word.score, 0)}</p>  : null}
        </div>
    );
}

export default PlayerScore;
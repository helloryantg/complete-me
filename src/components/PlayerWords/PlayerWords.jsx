import React from 'react';
import './PlayerWords.css';

const PlayerWords = props => {
    return (
        <div className="PlayerWords">
            <div className="words">
                {props.playerOneList ? props.playerOneList.map((list, idx) => <p style={{color: (list.challenges.length > 0) ? '#DA5700' : null}} key={idx}>{list.word.toLowerCase()} <span>{list.score < 0 ? list.score : `+ ${list.score}`}</span></p>) : null}
                {props.playerTwoList ? props.playerTwoList.map((list, idx) => <p style={{color: (list.challenges.length > 0) ? '#DA5700' : null}} key={idx}>{list.word.toLowerCase()} <span>{list.score < 0 ? list.score : `+ ${list.score}`}</span></p>) : null} 
            </div>
        </div>
    );
}

export default PlayerWords;



import React from 'react';
import './PlayerWords.css';

const PlayerWords = props => {
    return (
        <div className="PlayerWords">
            <div id="words">
                {/* {props.game.players.wordList.map(list => <p>{list.word}</p>)} */}
                {/* Show only a max of 5 words  */}
            </div>
        </div>
    );
}

export default PlayerWords;
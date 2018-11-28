import React from 'react';
import './PlayerWords.css';

const PlayerWords = props => {
    return (
        <div className="PlayerWords">
            <div id="words">
                <p>bogusWord +1</p>
                <p>bogusWord +2</p>
                <p>bogusWord +3</p>
                <p>bogusWord +4</p>
                <p>bogusWord +5</p>
                {/* Show only a max of 5 words  */}
            </div>
        </div>
    );
}

export default PlayerWords;
import React from 'react';
import './Challenge.css';

const Challenge = props => {
    return (
        <div className="Challenge">
            <div>
                <p><span className="multiplier">4x</span>Words that describe foods</p>
                <p><span className="multiplier">2x</span>Words that start and end with the same letter</p>
            </div>
        </div>
    );
}

export default Challenge;
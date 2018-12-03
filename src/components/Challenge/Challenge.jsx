import React from 'react';
import './Challenge.css';

const Challenge = props => {
    return (
        <div className="Challenge">
            <div>
                {props.game.challenges.map((challenge, idx) => 
                    <p key={idx} className={`color-${challenge.color}`}><span className={`color-${challenge.color} multiplier`}>x{challenge.multiplier}</span>{challenge.text}</p>
                )}
            </div>
        </div>
    );
}

export default Challenge;
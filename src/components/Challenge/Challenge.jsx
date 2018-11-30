import React from 'react';
import './Challenge.css';

const Challenge = props => {
    return (
        <div className="Challenge">
            <div>
                {props.game.challenges.map(challenge => 
                    <p><span className="multiplier">{challenge.multiplier}</span>{challenge.text}</p>
                )}
            </div>
        </div>
    );
}

export default Challenge;
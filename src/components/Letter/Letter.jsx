import React from 'react';
import './Letter.css';

const Letter = props => {
    return (
        <div className="Letter letter-outer">
            <div className="letter-inner">{props.letter}</div>
        </div>
    );
}

export default Letter;